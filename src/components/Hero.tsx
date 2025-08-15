import { useEffect, useState } from 'react';
import { motion, animate, useMotionValue, useTransform, useMotionValueEvent, useScroll } from 'framer-motion';
import { TextEffect } from '@/components/ui/text-effect';
import { GradientText } from '@/components/ui/gradient-text';
import AnimatedGradientBackground from '@/components/ui/animated-gradient-background';
import { MultiLayeredOrb } from '@/components/ui/multi-layered-orb';
import { GRADIENT_COLORS, ANIMATION_CONFIG } from '@/lib/gradient-constants';

const EASE = [0.22, 1, 0.36, 1] as const; // unified easing

const Hero = () => {
  // Single animation states
  const [hasAnimated, setHasAnimated] = useState(false);
  const [exitAnimation, setExitAnimation] = useState(false);

  // Master animation controller - clean simple approach
  const masterProgress = useMotionValue(0);
  
  // Animation phase tracking for seamless flow
  const animationPhase = useTransform(masterProgress, (p) => {
    if (p < 0.5) return 'loading';    // Longer orb scaling phase for overlap
    if (p < 0.9) return 'textSync';   // Longer text sync for seamless transition
    return 'idle';                    // Gentle idle phase
  });

  // Convert transforms to state for components (except orb scale - using direct motion value)
  const [showHello, setShowHello] = useState(false);
  const [showShree, setShowShree] = useState(false);
  const [audioIntensity, setAudioIntensity] = useState(0);
  const [orbAnimationPhase, setOrbAnimationPhase] = useState<'loading' | 'textSync' | 'idle'>('loading');

  // Animation phase and timing control
  useMotionValueEvent(animationPhase, 'change', (phase) => {
    setOrbAnimationPhase(phase as 'loading' | 'textSync' | 'idle');
    
    // Set audio intensity based on animation phase
    if (phase === 'textSync') {
      setAudioIntensity(0.8); // High intensity during text sync (speaking)
    } else if (phase === 'loading') {
      setAudioIntensity(0.2); // Minimal during loading
    } else {
      setAudioIntensity(0); // No audio activity during idle
    }
  });

  // Timing-based text triggers for seamless flow
  useEffect(() => {
    const helloTimer = setTimeout(() => setShowHello(true), 1200);  // Start during orb scaling
    const shreeTimer = setTimeout(() => setShowShree(true), 1600);  // Overlap with hello

    return () => {
      clearTimeout(helloTimer);
      clearTimeout(shreeTimer);
    };
  }, []);

  // Start the ONE SEAMLESS ANIMATION
  useEffect(() => {
    // Start animation immediately on mount
    const controls = animate(masterProgress, 1, {
      duration: 3.5, // Reduced for faster, more cohesive flow
      ease: [0.25, 0.1, 0.25, 1.0],
    });
    
    // Mark complete earlier for seamless transition
    const completeTimer = setTimeout(() => setHasAnimated(true), 3000);
    
    return () => {
      controls.stop();
      clearTimeout(completeTimer);
    };
  }, []); // Remove masterProgress dependency to prevent re-triggering

  // Scroll-driven exit: unified with main animation
  const { scrollY } = useScroll();
  const [scrollScale, setScrollScale] = useState(1);

  useMotionValueEvent(scrollY, 'change', (latest) => {
    if (!hasAnimated) return;

    const windowHeight = window.innerHeight;
    const sp = latest / windowHeight;

    if (sp > 0.1 && sp < 0.8) {
      const scaleProgress = Math.min((sp - 0.1) / 0.7, 1);
      const newScale = 1 + scaleProgress * 2.5;
      setScrollScale(newScale);
      if (!exitAnimation) setExitAnimation(true);
    } else if (sp >= 0.8) {
      setScrollScale(4);
      setShowHello(false);
      setShowShree(false);
    } else if (sp < 0.05 && exitAnimation) {
      setScrollScale(1);
      setExitAnimation(false);
      setShowHello(true);
      setShowShree(true);
    }
  });

  return (
    <div className="hero-container min-h-screen flex items-center relative overflow-hidden">
      {/* Optimized Background */}
      <AnimatedGradientBackground 
        Breathing={true}
        startingGap={ANIMATION_CONFIG.BREATHING.startingGap}
        breathingRange={12}
        animationSpeed={0.02}
        topOffset={ANIMATION_CONFIG.BREATHING.topOffset}
        gradientColors={GRADIENT_COLORS.BACKGROUND}
        gradientStops={GRADIENT_COLORS.STOPS}
      />

      <div className="w-full mx-auto px-2 sm:px-4 md:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col items-center justify-center text-center min-h-screen relative overflow-hidden">

          {/* ORB - Ultra Smooth Seamless Animation */}
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              className="w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] md:w-[500px] md:h-[500px] lg:w-[600px] lg:h-[600px] xl:w-[700px] xl:h-[700px] 2xl:w-[800px] 2xl:h-[800px] relative"
              initial={{ scale: 8, opacity: 0.15, rotate: 0 }}
              animate={{
                scale: exitAnimation ? scrollScale : 1,
                opacity: exitAnimation ? 0.3 : 1,
                rotate: exitAnimation ? 0 : [0, 2, -1, 1, 0], // Gentle rotation in idle
              }}
              transition={{
                scale: exitAnimation ? { duration: 0.3 } : {
                  duration: 1.8, // Faster, smoother scaling
                  ease: [0.16, 1, 0.3, 1],
                  delay: 0.2
                },
                opacity: exitAnimation ? { duration: 0.3 } : {
                  duration: 1.8, // Match scale duration
                  ease: "easeInOut"
                },
                rotate: exitAnimation ? { duration: 0.3 } : {
                  duration: 20, // Slow rotation cycle
                  ease: "easeInOut",
                  repeat: Infinity,
                  delay: 2.5 // Start rotating after main animation
                }
              }}
              style={{
                willChange: 'transform, opacity',
                transform: 'translateZ(0)'
              }}
            >
              <MultiLayeredOrb
                isTextAnimating={orbAnimationPhase === 'textSync'}
                audioIntensity={audioIntensity}
                pulseActive={orbAnimationPhase === 'textSync'}
                animationPhase={orbAnimationPhase}
                isSpeaking={orbAnimationPhase === 'textSync'}
              />
            </motion.div>
          </div>

          {/* TEXT - Unified Single Animation Flow */}
          <div className="relative z-20 space-y-1 sm:space-y-2 px-1 sm:px-2 md:px-4 max-w-full" style={{ willChange: 'transform', transform: 'translateZ(0)' }}>
            {/* "Hello!" - Seamless Animation During Orb Scaling */}
            <motion.div 
              className="relative mb-3 sm:mb-4 md:mb-6 playwrite-au-qld"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{
                delay: 1.2, // Start during orb scaling for seamless flow
                duration: 0.6,
                ease: [0.25, 0.1, 0.25, 1]
              }}
            >
              <TextEffect
                key="hello-text"
                as="h1"
                per="word"
                delay={0}
                trigger={showHello}
                className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl tracking-tight text-white drop-shadow-2xl leading-none"
                preset="blur"
                variants={{
                  container: {
                    hidden: { opacity: 0 },
                    visible: {
                      opacity: 1,
                      transition: { staggerChildren: 0.02, delayChildren: 0, duration: 0.4 } // Faster, smoother
                    }
                  },
                  item: {
                    hidden: { opacity: 0, filter: 'blur(4px)', y: 10, scale: 0.98 }, // Reduced blur and movement
                    visible: {
                      opacity: 1, filter: 'blur(0px)', y: 0, scale: 1,
                      transition: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] } // Faster transition
                    }
                  }
                }}
              >
                Hello!
              </TextEffect>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400/30 via-purple-500/40 to-violet-600/30 blur-3xl scale-150 -z-10" />
            </motion.div>

            {/* "I'm Shree" - Seamless Overlap with Hello */}
            <motion.div 
              className="relative"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{
                delay: 1.6, // Overlap with hello for seamless flow
                duration: 0.8,
                ease: [0.25, 0.1, 0.25, 1]
              }}
            >
              <div className="flex items-center justify-center gap-1 sm:gap-2 md:gap-3 flex-wrap">
                <span className="playwrite-au-qld">
                  <TextEffect
                    key="im-text"
                    as="span"
                    per="word"
                    delay={0}
                    trigger={showShree}
                    className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl tracking-tight text-white drop-shadow-2xl leading-none"
                  preset="blur"
                  variants={{
                    container: {
                      hidden: { opacity: 0 },
                      visible: {
                        opacity: 1,
                        transition: { staggerChildren: 0.02, delayChildren: 0, duration: 0.4 } // Faster, smoother
                      }
                    },
                    item: {
                      hidden: { opacity: 0, filter: 'blur(4px)', y: 10, scale: 0.98 }, // Reduced blur and movement
                      visible: {
                        opacity: 1, filter: 'blur(0px)', y: 0, scale: 1,
                        transition: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] } // Faster transition
                      }
                    }
                  }}
                >
                  I'm
                </TextEffect>
                </span>

                <motion.div
                  initial={{ opacity: 0, filter: 'blur(6px)', y: 15, scale: 0.95 }}
                  animate={showShree ? { 
                    opacity: 1, 
                    filter: 'blur(0px)', 
                    y: 0, 
                    scale: 1 
                  } : {}}
                  transition={{ 
                    duration: 0.6, 
                    ease: [0.25, 0.1, 0.25, 1],
                    delay: 0.2
                  }}
                >
                  <GradientText
                    className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl 2xl:text-9xl font-black tracking-tight drop-shadow-[0_0_25px_rgba(168,85,247,0.8)] font-arimo leading-[1.05] max-w-full"
                  >
                    Shree
                  </GradientText>
                </motion.div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-violet-500/30 via-purple-500/40 to-blue-500/30 blur-3xl scale-130 -z-10" />
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
