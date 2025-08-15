import React, { useEffect, useRef, FC, useState } from "react";
import { Renderer, Program, Mesh, Triangle, Vec3 } from "ogl";

interface MultiLayeredOrbProps {
  isTextAnimating?: boolean;
  audioIntensity?: number;
  pulseActive?: boolean;
  animationPhase?: 'loading' | 'textSync' | 'idle';
  isSpeaking?: boolean;
}

export const MultiLayeredOrb: FC<MultiLayeredOrbProps> = ({
  isTextAnimating = false,
  audioIntensity = 0,
  pulseActive = false,
  animationPhase = 'idle',
  isSpeaking = false,
}) => {
  const ctnDom = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  const vert = /* glsl */ `
    precision highp float;
    attribute vec2 position;
    attribute vec2 uv;
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = vec4(position, 0.0, 1.0);
    }
  `;

  const frag = /* glsl */ `
    precision highp float;

    uniform float iTime;
    uniform vec3 iResolution;
    uniform float layer;
    uniform float hover;
    uniform float hoverIntensity;
    uniform float audioReaction;
    uniform float loadProgress;
    uniform vec2 offset;
    uniform float scale;
    uniform float rotationSpeed;
    varying vec2 vUv;

    vec3 rgb2yiq(vec3 c) {
      float y = dot(c, vec3(0.299, 0.587, 0.114));
      float i = dot(c, vec3(0.596, -0.274, -0.322));
      float q = dot(c, vec3(0.211, -0.523, 0.312));
      return vec3(y, i, q);
    }
    
    vec3 yiq2rgb(vec3 c) {
      float r = c.x + 0.956 * c.y + 0.621 * c.z;
      float g = c.x - 0.272 * c.y - 0.647 * c.z;
      float b = c.x - 1.106 * c.y + 1.703 * c.z;
      return vec3(r, g, b);
    }
    
    vec3 adjustHue(vec3 color, float hueDeg) {
      float hueRad = hueDeg * 3.14159265 / 180.0;
      vec3 yiq = rgb2yiq(color);
      float cosA = cos(hueRad);
      float sinA = sin(hueRad);
      float i = yiq.y * cosA - yiq.z * sinA;
      float q = yiq.y * sinA + yiq.z * cosA;
      yiq.y = i;
      yiq.z = q;
      return yiq2rgb(yiq);
    }
    
    vec3 hash33(vec3 p3) {
      p3 = fract(p3 * vec3(0.1031, 0.11369, 0.13787));
      p3 += dot(p3, p3.yxz + 19.19);
      return -1.0 + 2.0 * fract(vec3(
        p3.x + p3.y,
        p3.x + p3.z,
        p3.y + p3.z
      ) * p3.zyx);
    }
    
    float snoise3(vec3 p) {
      const float K1 = 0.333333333;
      const float K2 = 0.166666667;
      vec3 i = floor(p + (p.x + p.y + p.z) * K1);
      vec3 d0 = p - (i - (i.x + i.y + i.z) * K2);
      vec3 e = step(vec3(0.0), d0 - d0.yzx);
      vec3 i1 = e * (1.0 - e.zxy);
      vec3 i2 = 1.0 - e.zxy * (1.0 - e);
      vec3 d1 = d0 - (i1 - K2);
      vec3 d2 = d0 - (i2 - K1);
      vec3 d3 = d0 - 0.5;
      vec4 h = max(0.6 - vec4(
        dot(d0, d0),
        dot(d1, d1),
        dot(d2, d2),
        dot(d3, d3)
      ), 0.0);
      vec4 n = h * h * h * h * vec4(
        dot(d0, hash33(i)),
        dot(d1, hash33(i + i1)),
        dot(d2, hash33(i + i2)),
        dot(d3, hash33(i + 1.0))
      );
      return dot(vec4(31.316), n);
    }
    
    vec4 extractAlpha(vec3 colorIn) {
      float a = max(max(colorIn.r, colorIn.g), colorIn.b);
      return vec4(colorIn.rgb / (a + 1e-5), a);
    }
    
    // Blue palette that matches the overall theme
    vec3 getDeepBlue() { return vec3(0.063, 0.082, 0.145); }      // #101525 - Deep dark blue
    vec3 getMidBlue() { return vec3(0.118, 0.227, 0.541); }       // #1E3A8A - Theme dark blue
    vec3 getElectricBlue() { return vec3(0.231, 0.510, 0.965); }  // #3B82F6 - Theme electric blue
    vec3 getIndigo() { return vec3(0.388, 0.400, 0.945); }        // #6366F1 - Theme indigo
    vec3 getPurple() { return vec3(0.545, 0.361, 0.965); }        // #8B5CF6 - Theme purple
    vec3 getVioletAccent() { return vec3(0.659, 0.333, 0.969); }  // #A855F7 - Purple highlight
    
    const float innerRadius = 0.5;
    const float noiseScale = 0.8;
    
    float light1(float intensity, float attenuation, float dist) {
      return intensity / (1.0 + dist * attenuation);
    }
    
    float light2(float intensity, float attenuation, float dist) {
      return intensity / (1.0 + dist * dist * attenuation);
    }
    
    vec4 draw(vec2 uv) {
      // Apply layer-specific transformations
      uv += offset;
      uv *= scale;
      
      // Simplified layer-specific color selection for 2 layers
      vec3 color1, color2, color3;
      if (layer < 0.5) {
        // Layer 1: Deep blue core
        color1 = getDeepBlue();
        color2 = getMidBlue(); 
        color3 = getElectricBlue();
      } else {
        // Layer 2: Purple-violet outer layer
        color1 = getElectricBlue();
        color2 = getIndigo();
        color3 = getPurple();
      }
      
      float ang = atan(uv.y, uv.x);
      float len = length(uv);
      float invLen = len > 0.0 ? 1.0 / len : 0.0;
      
      // Enhanced synchronization - both layers move perfectly together
      float layerTime = iTime + layer * 0.1; // Minimal offset for subtle depth
      float audioMod = 1.0 + audioReaction * 0.2 * sin(layerTime * 5.0);
      float n0 = snoise3(vec3(uv * noiseScale * audioMod, layerTime * 0.25)) * 0.5 + 0.5;
      
      // Synchronized radius calculation - both layers pulse together
      float baseRadius = innerRadius + layer * 0.08; // Closer layers
      float audioPulse = audioReaction * 0.06 * sin(layerTime * 6.0); // Gentler pulse
      float r0 = mix(baseRadius, 1.0, 0.35) + audioPulse;
      
      // Reduced lighting intensity for softer appearance
      float d0 = distance(uv, (r0 * invLen) * uv);
      float v0 = light1(1.2, 10.0, d0); // Reduced intensity
      
      // Improved circular falloff to eliminate rectangular edges
      float circularFalloff = smoothstep(r0 * 1.1, r0 * 0.7, len);
      v0 *= circularFalloff;
      
      // Simplified color cycling for smoother motion
      float colorCycle = layerTime + audioReaction * sin(layerTime * 5.0);
      float cl = cos(ang + colorCycle) * 0.5 + 0.5;
      
      // Synchronized rotating elements with reduced intensity
      float rotation = layerTime * rotationSpeed * 0.8; // Slower, more synchronized
      vec2 pos = vec2(cos(rotation), sin(rotation)) * r0 * 0.9;
      float d = distance(uv, pos);
      float v1 = light2(1.4 + audioReaction * 0.3, 3.5, d); // Reduced intensity
      v1 *= light1(0.8, 35.0, d0); // Softer secondary light
      
      // Smoother edge blending to prevent rectangles
      float v2 = smoothstep(0.98, mix(baseRadius, 1.0, n0 * 0.5), len);
      float v3 = smoothstep(baseRadius * 0.92, mix(baseRadius, 1.0, 0.55), len);
      
      vec3 col = mix(color1, color2, cl);
      col = mix(color3, col, v0 * 0.8); // Slightly reduced mixing
      
      col = (col + v1 * 0.6) * v2 * v3; // Reduced final lighting intensity
      
      // Simplified load progress
      col *= loadProgress;
      
      col = clamp(col, 0.0, 1.0);
      
      return extractAlpha(col);
    }
    
    vec4 mainImage(vec2 fragCoord) {
      vec2 center = iResolution.xy * 0.5;
      float size = min(iResolution.x, iResolution.y);
      vec2 uv = (fragCoord - center) / size * 2.0;
      
      // Simplified distortions for smoother motion
      float totalEffect = hover * hoverIntensity + audioReaction * 0.8;
      uv.x += totalEffect * 0.05 * sin(uv.y * 8.0 + iTime * 2.0);
      uv.y += totalEffect * 0.05 * sin(uv.x * 8.0 + iTime * 2.5);
      
      return draw(uv);
    }
    
    void main() {
      vec2 fragCoord = vUv * iResolution.xy;
      vec4 col = mainImage(fragCoord);
      gl_FragColor = vec4(col.rgb * col.a, col.a);
    }
  `;

  // Tightly knit orb layer configurations
  const orbLayers = [
    { layer: 0.0, offset: [0.0, 0.0], scale: 1.0, rotationSpeed: -0.1, opacity: 0.9 }, // Slower rotation for idle
    { layer: 0.5, offset: [0.005, -0.005], scale: 0.95, rotationSpeed: 0.15, opacity: 0.7 } // Slower rotation for idle
  ];

  useEffect(() => {
    const container = ctnDom.current;
    if (!container) return;

    const cleanupFunctions: (() => void)[] = [];
    let loadStartTime = Date.now();

    orbLayers.forEach((config, index) => {
      const layerContainer = document.createElement('div');
      layerContainer.className = 'absolute inset-0';
      layerContainer.style.opacity = config.opacity.toString();
      layerContainer.style.mixBlendMode = index === 0 ? 'normal' : 'screen';
      container.appendChild(layerContainer);

      let rendererInstance: Renderer | null = null;
      let rafId: number;

      try {
        rendererInstance = new Renderer({ 
          alpha: true, 
          premultipliedAlpha: false, 
          antialias: true, 
          dpr: window.devicePixelRatio || 1 
        });
        const gl = rendererInstance.gl;
        gl.clearColor(0, 0, 0, 0);
        
        layerContainer.appendChild(gl.canvas as HTMLCanvasElement);

        const geometry = new Triangle(gl);
        const program = new Program(gl, {
          vertex: vert,
          fragment: frag,
          uniforms: {
            iTime: { value: 0 },
            iResolution: {
              value: new Vec3(
                gl.canvas.width,
                gl.canvas.height,
                gl.canvas.width / gl.canvas.height
              ),
            },
            layer: { value: config.layer },
            hover: { value: 0 },
            hoverIntensity: { value: 0.4 },
            audioReaction: { value: 0 },
            loadProgress: { value: 0 },
            offset: { value: config.offset },
            scale: { value: config.scale },
            rotationSpeed: { value: config.rotationSpeed },
          },
        });

        const mesh = new Mesh(gl, { geometry, program });

        const resize = () => {
          if (!layerContainer || !rendererInstance || !gl) return;
          const dpr = window.devicePixelRatio || 1;
          const width = layerContainer.clientWidth;
          const height = layerContainer.clientHeight;

          if (width === 0 || height === 0) return;

          rendererInstance.setSize(width * dpr, height * dpr);
          (gl.canvas as HTMLCanvasElement).style.width = width + "px";
          (gl.canvas as HTMLCanvasElement).style.height = height + "px";
          
          program.uniforms.iResolution.value.set(
            gl.canvas.width,
            gl.canvas.height,
            gl.canvas.width / gl.canvas.height
          );
        };

        window.addEventListener("resize", resize);
        resize();

        let targetHover = 0;
        let lastTime = 0;

        const handleMouseMove = (e: MouseEvent) => {
          if (!container) return;
          const rect = container.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          const width = rect.width;
          const height = rect.height;
          const size = Math.min(width, height);
          const centerX = width / 2;
          const centerY = height / 2;
          const uvX = ((x - centerX) / size) * 2.0;
          const uvY = ((y - centerY) / size) * 2.0;

          if (Math.sqrt(uvX * uvX + uvY * uvY) < 1.2) {
            targetHover = 1;
          } else {
            targetHover = 0;
          }
        };

        const handleMouseLeave = () => {
          targetHover = 0;
        };

        container.addEventListener("mousemove", handleMouseMove);
        container.addEventListener("mouseleave", handleMouseLeave);

        const update = (t: number) => {
          rafId = requestAnimationFrame(update);
          if (!program) return;

          const dt = (t - lastTime) * 0.001;
          lastTime = t;
          program.uniforms.iTime.value = t * 0.001;

          // Load progress animation - simplified
          const loadProgress = Math.min((Date.now() - loadStartTime) / 1500, 1); // Faster load
          program.uniforms.loadProgress.value = loadProgress;
          
          if (loadProgress >= 1 && !isLoaded && index === 0) {
            setIsLoaded(true);
          }

          // Optimized hover transitions
          program.uniforms.hover.value += (targetHover - program.uniforms.hover.value) * 0.1;

          // Dynamic rotation speed based on animation phase and interactions
          let targetRotationSpeed = config.rotationSpeed;
          const hasInteraction = program.uniforms.hover.value > 0.01 || audioIntensity > 0.1 || isSpeaking;
          
          switch (animationPhase) {
            case 'idle':
              targetRotationSpeed = hasInteraction ? config.rotationSpeed * 1.5 : config.rotationSpeed;
              break;
            case 'textSync':
              targetRotationSpeed = config.rotationSpeed * 2.0; // Faster during speaking
              break;
            case 'loading':
              targetRotationSpeed = config.rotationSpeed * 0.8; // Slightly slower during loading
              break;
          }
          
          // Smooth rotation speed transition
          program.uniforms.rotationSpeed.value += (targetRotationSpeed - program.uniforms.rotationSpeed.value) * 0.05;

          // Unified smooth animation - minimal computation for 60fps
          const audioScale = window.innerWidth < 768 ? 0.5 : 1.0;
          
          let targetIntensity = 0;
          const smoothingFactor = 0.06; // Consistent smooth factor
          
          switch (animationPhase) {
            case 'loading':
              // Steady glow during orb scaling
              targetIntensity = audioIntensity * audioScale;
              break;
            case 'textSync':
              // Unified wave during text - single calculation
              const wave = Math.sin(t * 0.0012) * 0.12;
              const pulse = pulseActive ? Math.sin(t * 0.002) * 0.08 : 0;
              targetIntensity = (audioIntensity * audioScale) + wave + pulse;
              break;
            case 'idle':
            default:
              // Gentle rotation with subtle variation - no pulsating but not completely static
              const hasInteraction = program.uniforms.hover.value > 0.01 || audioIntensity > 0.1 || isSpeaking;
              
              if (hasInteraction) {
                // Enhanced effects when there's interaction or speaking
                const gentle = Math.sin(t * 0.0005 + index * 0.5) * 0.008;
                const rotate = Math.sin(t * 0.0003) * 0.003;
                const speakingPulse = isSpeaking ? Math.sin(t * 0.002) * 0.06 : 0;
                targetIntensity = (audioIntensity * audioScale * 0.6) + gentle + rotate + speakingPulse;
              } else {
                // Calm idle state with subtle rotation - alive but peaceful
                const subtleRotation = Math.sin(t * 0.0002 + index * 0.3) * 0.004; // Very slow rotation
                const breathingEffect = Math.sin(t * 0.0001) * 0.002; // Extremely gentle breathing
                targetIntensity = 0.025 + subtleRotation + breathingEffect; // Base value with gentle movement
              }
              break;
          }
          
          // Unified smooth transition
          program.uniforms.audioReaction.value += (targetIntensity - program.uniforms.audioReaction.value) * smoothingFactor;

          if (rendererInstance) {
            rendererInstance.render({ scene: mesh });
          }
        };
        
        rafId = requestAnimationFrame(update);

        const cleanup = () => {
          cancelAnimationFrame(rafId);
          window.removeEventListener("resize", resize);
          if (container) {
            container.removeEventListener("mousemove", handleMouseMove);
            container.removeEventListener("mouseleave", handleMouseLeave);
            if (gl && gl.canvas && (gl.canvas as HTMLCanvasElement).parentNode === layerContainer) {
              layerContainer.removeChild(gl.canvas as HTMLCanvasElement);
            }
          }
          if (layerContainer && layerContainer.parentNode === container) {
            container.removeChild(layerContainer);
          }
          if (gl) {
            gl.getExtension("WEBGL_lose_context")?.loseContext();
          }
        };

        cleanupFunctions.push(cleanup);

      } catch (error) {
        console.error(`Error initializing Multi-Layered Orb Layer ${index}:`, error);
        if (layerContainer && layerContainer.parentNode === container) {
          container.removeChild(layerContainer);
        }
      }
    });

    return () => {
      cleanupFunctions.forEach(cleanup => cleanup());
    };
  }, [isTextAnimating, audioIntensity, pulseActive, animationPhase]);

  return <div ref={ctnDom} className="w-full h-full" />;
};
