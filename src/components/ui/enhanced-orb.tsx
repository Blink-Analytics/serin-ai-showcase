import React, { useEffect, useRef, FC, useState } from "react";
import { Renderer, Program, Mesh, Triangle, Vec3 } from "ogl";

interface EnhancedOrbProps {
  hue?: number;
  hoverIntensity?: number;
  rotateOnHover?: boolean;
  forceHoverState?: boolean;
  isTextAnimating?: boolean;
  audioIntensity?: number;
  pulseActive?: boolean;
  animationPhase?: 'loading' | 'textSync' | 'idle';
  onLoadComplete?: () => void;
}

export const EnhancedOrb: FC<EnhancedOrbProps> = ({
  hue = 210, // Blue theme to match website
  hoverIntensity = 0.2,
  rotateOnHover = true,
  forceHoverState = false,
  isTextAnimating = false,
  audioIntensity = 0.5,
  pulseActive = false,
  animationPhase = 'idle',
  onLoadComplete,
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
    uniform float hue;
    uniform float hover;
    uniform float rot;
    uniform float hoverIntensity;
    uniform float audioReaction;
    uniform float loadProgress;
    uniform float pulseIntensity;
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
    
    // Enhanced base colors to match website theme
    const vec3 baseColor1 = vec3(0.231373, 0.509804, 0.964706); // Electric blue (#3B82F6)
    const vec3 baseColor2 = vec3(0.388235, 0.388235, 0.945098); // Indigo (#6366F1)
    const vec3 baseColor3 = vec3(0.541176, 0.364706, 0.964706); // Purple (#8B5CF6)
    const float innerRadius = 0.55;
    const float noiseScale = 0.7;
    
    float light1(float intensity, float attenuation, float dist) {
      return intensity / (1.0 + dist * attenuation);
    }
    
    float light2(float intensity, float attenuation, float dist) {
      return intensity / (1.0 + dist * dist * attenuation);
    }
    
    vec4 draw(vec2 uv) {
      vec3 color1 = adjustHue(baseColor1, hue);
      vec3 color2 = adjustHue(baseColor2, hue);
      vec3 color3 = adjustHue(baseColor3, hue);
      
      float ang = atan(uv.y, uv.x);
      float len = length(uv);
      float invLen = len > 0.0 ? 1.0 / len : 0.0;
      
      // Enhanced audio-reactive noise modulation
      float audioMod = 1.0 + audioReaction * 0.4 * sin(iTime * 6.0);
      float pulseMod = 1.0 + pulseIntensity * 0.3 * sin(iTime * 8.0);
      float n0 = snoise3(vec3(uv * noiseScale * audioMod * pulseMod, iTime * 0.5)) * 0.5 + 0.5;
      
      // Enhanced radius with smooth pulsing
      float basePulse = mix(innerRadius, 1.0, 0.5);
      float audioPulse = audioReaction * 0.2 * sin(iTime * 10.0);
      float wavePulse = pulseIntensity * 0.15 * sin(iTime * 12.0 + ang * 3.0);
      float r0 = mix(mix(innerRadius, 1.0, 0.4), mix(innerRadius, 1.0, 0.7), n0) + audioPulse + wavePulse;
      
      float d0 = distance(uv, (r0 * invLen) * uv);
      float v0 = light1(1.2, 8.0, d0);
      v0 *= smoothstep(r0 * 1.1, r0, len);
      
      // Enhanced color cycling with audio reaction
      float audioColorShift = audioReaction * 3.0 * sin(iTime * 5.0);
      float pulseColorShift = pulseIntensity * 2.0 * sin(iTime * 7.0);
      float cl = cos(ang + iTime * 1.5 + audioColorShift + pulseColorShift) * 0.5 + 0.5;
      
      // Dynamic rotating light source
      float a = iTime * -0.8;
      vec2 pos = vec2(cos(a), sin(a)) * r0;
      float d = distance(uv, pos);
      float v1 = light2(1.8 + audioReaction * 1.2 + pulseIntensity * 0.8, 4.0, d);
      v1 *= light1(1.2, 30.0, d0);
      
      // Enhanced layering
      float v2 = smoothstep(1.2, mix(innerRadius, 1.0, n0 * 0.6), len);
      float v3 = smoothstep(innerRadius * 0.9, mix(innerRadius, 1.0, 0.6), len);
      
      vec3 col = mix(color1, color2, cl);
      col = mix(color3, col, v0);
      col = (col + v1) * v2 * v3;
      
      // Apply load progress with smooth fade-in
      col *= smoothstep(0.0, 1.0, loadProgress);
      
      col = clamp(col, 0.0, 1.0);
      
      return extractAlpha(col);
    }
    
    vec4 mainImage(vec2 fragCoord) {
      vec2 center = iResolution.xy * 0.5;
      float size = min(iResolution.x, iResolution.y);
      vec2 uv = (fragCoord - center) / size * 2.0;
      
      float angle = rot;
      float s = sin(angle);
      float c = cos(angle);
      uv = vec2(c * uv.x - s * uv.y, s * uv.x + c * uv.y);
      
      // Enhanced distortion effects
      float totalEffect = hover * hoverIntensity + audioReaction * 0.6 + pulseIntensity * 0.4;
      uv.x += totalEffect * 0.08 * sin(uv.y * 12.0 + iTime * 2.0);
      uv.y += totalEffect * 0.08 * sin(uv.x * 12.0 + iTime * 2.0);
      
      return draw(uv);
    }
    
    void main() {
      vec2 fragCoord = vUv * iResolution.xy;
      vec4 col = mainImage(fragCoord);
      gl_FragColor = vec4(col.rgb * col.a, col.a);
    }
  `;

  useEffect(() => {
    const container = ctnDom.current;
    if (!container) return;

    let rendererInstance: Renderer | null = null;
    let glContext: WebGLRenderingContext | WebGL2RenderingContext | null = null;
    let rafId: number;
    let loadStartTime = Date.now();
    
    try {
        rendererInstance = new Renderer({ 
          alpha: true, 
          premultipliedAlpha: false, 
          antialias: true, 
          dpr: window.devicePixelRatio || 1 
        });
        glContext = rendererInstance.gl;
        glContext.clearColor(0, 0, 0, 0);
        
        if (container.firstChild) {
            container.removeChild(container.firstChild);
        }
        container.appendChild(glContext.canvas as HTMLCanvasElement);

        const geometry = new Triangle(glContext as any);
        const program = new Program(glContext as any, {
        vertex: vert,
        fragment: frag,
        uniforms: {
            iTime: { value: 0 },
            iResolution: {
            value: new Vec3(
                glContext.canvas.width,
                glContext.canvas.height,
                glContext.canvas.width / glContext.canvas.height
            ),
            },
            hue: { value: hue },
            hover: { value: 0 },
            rot: { value: 0 },
            hoverIntensity: { value: hoverIntensity },
            audioReaction: { value: 0 },
            loadProgress: { value: 0 },
            pulseIntensity: { value: 0 },
        },
        });

        const mesh = new Mesh(glContext as any, { geometry, program });

        const resize = () => {
            if (!container || !rendererInstance || !glContext) return;
            const dpr = window.devicePixelRatio || 1;
            const width = container.clientWidth;
            const height = container.clientHeight;

            if (width === 0 || height === 0) return;

            rendererInstance.setSize(width * dpr, height * dpr);
            (glContext.canvas as HTMLCanvasElement).style.width = width + "px";
            (glContext.canvas as HTMLCanvasElement).style.height = height + "px";
            
            program.uniforms.iResolution.value.set(
                glContext.canvas.width,
                glContext.canvas.height,
                glContext.canvas.width / glContext.canvas.height
            );
        };
        window.addEventListener("resize", resize);
        resize();

        let targetHover = 0;
        let lastTime = 0;
        let currentRot = 0;
        const rotationSpeed = 0.2;

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

          if (Math.sqrt(uvX * uvX + uvY * uvY) < 0.9) {
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
          program.uniforms.hue.value = hue;
          program.uniforms.hoverIntensity.value = hoverIntensity;

          // Smooth load progress animation (3 seconds)
          const loadProgress = Math.min((Date.now() - loadStartTime) / 3000, 1);
          program.uniforms.loadProgress.value = loadProgress;
          
          if (loadProgress >= 1 && !isLoaded) {
            setIsLoaded(true);
            onLoadComplete?.();
          }

          const effectiveHover = forceHoverState ? 1 : targetHover;
          program.uniforms.hover.value += (effectiveHover - program.uniforms.hover.value) * 0.08;

          // Enhanced animation phase controls
          let targetAudioReaction = 0;
          let targetPulse = 0;

          if (animationPhase === 'loading') {
            targetAudioReaction = 0.1;
            targetPulse = 0.2;
          } else if (animationPhase === 'textSync') {
            targetAudioReaction = isTextAnimating ? audioIntensity : 0.3;
            targetPulse = pulseActive ? 0.6 : 0.4;
          } else {
            targetAudioReaction = 0;
            targetPulse = 0.1;
          }

          program.uniforms.audioReaction.value += (targetAudioReaction - program.uniforms.audioReaction.value) * 0.12;
          program.uniforms.pulseIntensity.value += (targetPulse - program.uniforms.pulseIntensity.value) * 0.1;

          if (rotateOnHover && (effectiveHover > 0.3 || animationPhase === 'idle')) {
            currentRot += dt * rotationSpeed;
          }
          program.uniforms.rot.value = currentRot;

          if (rendererInstance) {
            rendererInstance.render({ scene: mesh });
          }
        };
        rafId = requestAnimationFrame(update);

        return () => {
          cancelAnimationFrame(rafId);
          window.removeEventListener("resize", resize);
          if (container) {
            container.removeEventListener("mousemove", handleMouseMove);
            container.removeEventListener("mouseleave", handleMouseLeave);
            if (glContext && glContext.canvas && (glContext.canvas as HTMLCanvasElement).parentNode === container) {
              container.removeChild(glContext.canvas as HTMLCanvasElement);
            }
          }
          if (glContext) {
            glContext.getExtension("WEBGL_lose_context")?.loseContext();
          }
        };

    } catch (error) {
        console.error("Error initializing Enhanced Orb:", error);
        if (container && container.firstChild) {
            container.removeChild(container.firstChild);
        }
        return () => {
             window.removeEventListener("resize", () => {});
        };
    }

  }, [hue, hoverIntensity, rotateOnHover, forceHoverState, isTextAnimating, audioIntensity, pulseActive, animationPhase]);

  return <div ref={ctnDom} className="w-full h-full" />;
};