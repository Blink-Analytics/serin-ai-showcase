import React, { useEffect, useRef, FC, useState } from "react";
import { Renderer, Program, Mesh, Triangle, Vec3 } from "ogl";

interface MultiLayeredOrbProps {
  isTextAnimating?: boolean;
  audioIntensity?: number;
}

export const MultiLayeredOrb: FC<MultiLayeredOrbProps> = ({
  isTextAnimating = false,
  audioIntensity = 0.5,
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
      
      // Layer-specific color selection - theme-matching blues and purples
      vec3 color1, color2, color3;
      if (layer < 0.33) {
        // Layer 1: Deep blue core with theme blue
        color1 = getDeepBlue();
        color2 = getMidBlue(); 
        color3 = getElectricBlue();
      } else if (layer < 0.66) {
        // Layer 2: Electric blue with indigo
        color1 = getMidBlue();
        color2 = getElectricBlue();
        color3 = getIndigo();
      } else {
        // Layer 3: Indigo with purple accents
        color1 = getElectricBlue();
        color2 = getIndigo();
        color3 = getPurple();
      }
      
      float ang = atan(uv.y, uv.x);
      float len = length(uv);
      float invLen = len > 0.0 ? 1.0 / len : 0.0;
      
      // Layer-specific timing and audio modulation
      float layerTime = iTime + layer * 2.0; // Offset timing per layer
      float audioMod = 1.0 + audioReaction * (0.2 + layer * 0.1) * sin(layerTime * (8.0 + layer * 2.0));
      float n0 = snoise3(vec3(uv * noiseScale * audioMod, layerTime * (0.4 + layer * 0.1))) * 0.5 + 0.5;
      
      // Dynamic radius with layer variations
      float baseRadius = innerRadius + layer * 0.2;
      float audioPulse = audioReaction * (0.1 + layer * 0.05) * sin(layerTime * (10.0 + layer * 3.0));
      float r0 = mix(mix(baseRadius, 1.0, 0.3 + layer * 0.1), mix(baseRadius, 1.0, 0.7 - layer * 0.1), n0) + audioPulse;
      
      // Softer, more circular edges with improved falloff
      float d0 = distance(uv, (r0 * invLen) * uv);
      float v0 = light1(1.4 - layer * 0.15, 12.0 + layer * 3.0, d0);
      
      // Improved circular falloff to eliminate rectangular edges
      float circularFalloff = smoothstep(r0 * 1.1, r0 * 0.7, len);
      v0 *= circularFalloff;
      
      // Layer-specific color cycling with violet highlights
      float colorCycle = layerTime * (1.2 + layer * 0.3) + audioReaction * 2.0 * sin(layerTime * (4.0 + layer));
      float cl = cos(ang + colorCycle) * 0.5 + 0.5;
      
      // Violet highlight instead of red - only on peaks
      float violetHighlight = smoothstep(0.8, 1.0, v0) * smoothstep(0.9, 1.0, cl) * 0.2;
      vec3 violetAccentColor = getVioletAccent();
      
      // Rotating elements with layer variations
      float rotation = layerTime * rotationSpeed * (1.0 + layer * 0.3);
      vec2 pos = vec2(cos(rotation), sin(rotation)) * r0 * (0.8 + layer * 0.2);
      float d = distance(uv, pos);
      float v1 = light2(1.8 + audioReaction * (0.5 + layer * 0.3), 4.0 + layer, d);
      v1 *= light1(1.0, 40.0 + layer * 10.0, d0);
      
      // Improved color blending with tighter cohesion
      float v2 = smoothstep(1.0 - layer * 0.05, mix(baseRadius, 1.0, n0 * (0.5 + layer * 0.1)), len);
      float v3 = smoothstep(baseRadius * (0.95 + layer * 0.02), mix(baseRadius, 1.0, 0.5 + layer * 0.05), len);
      
      vec3 col = mix(color1, color2, cl);
      col = mix(color3, col, v0 * (0.8 + layer * 0.1));
      
      // Add violet highlights instead of red
      col = mix(col, violetAccentColor, violetHighlight);
      
      col = (col + v1 * (0.9 + layer * 0.05)) * v2 * v3;
      
      // Layer-specific intensity and load progress
      col *= loadProgress * (0.6 + layer * 0.3);
      
      col = clamp(col, 0.0, 1.0);
      
      return extractAlpha(col);
    }
    
    vec4 mainImage(vec2 fragCoord) {
      vec2 center = iResolution.xy * 0.5;
      float size = min(iResolution.x, iResolution.y);
      vec2 uv = (fragCoord - center) / size * 2.0;
      
      // Layer-specific distortions
      float totalEffect = hover * hoverIntensity + audioReaction * (0.6 + layer * 0.2);
      float distortionFreq = 8.0 + layer * 4.0;
      uv.x += totalEffect * 0.08 * sin(uv.y * distortionFreq + iTime * (2.0 + layer));
      uv.y += totalEffect * 0.08 * sin(uv.x * distortionFreq + iTime * (2.5 + layer * 0.5));
      
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
    { layer: 0.0, offset: [0.0, 0.0], scale: 1.0, rotationSpeed: -0.3, opacity: 0.95 },
    { layer: 0.33, offset: [0.01, -0.01], scale: 0.98, rotationSpeed: 0.2, opacity: 0.85 },
    { layer: 0.66, offset: [-0.01, 0.01], scale: 0.96, rotationSpeed: -0.4, opacity: 0.75 },
    { layer: 1.0, offset: [0.005, 0.005], scale: 0.94, rotationSpeed: 0.5, opacity: 0.65 }
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

          // Load progress animation
          const loadProgress = Math.min((Date.now() - loadStartTime) / 2000, 1);
          program.uniforms.loadProgress.value = loadProgress;
          
          if (loadProgress >= 1 && !isLoaded && index === 0) {
            setIsLoaded(true);
          }

          program.uniforms.hover.value += (targetHover - program.uniforms.hover.value) * 0.1;

          // Audio reaction effect
          if (isTextAnimating) {
            program.uniforms.audioReaction.value += (audioIntensity - program.uniforms.audioReaction.value) * 0.15;
          } else {
            program.uniforms.audioReaction.value += (0 - program.uniforms.audioReaction.value) * 0.1;
          }

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
  }, [isTextAnimating, audioIntensity]);

  return <div ref={ctnDom} className="w-full h-full" />;
};
