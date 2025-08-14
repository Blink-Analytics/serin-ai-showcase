import { useEffect, useState } from 'react';
import { useScroll, useMotionValueEvent } from 'framer-motion';
import { TextEffect } from '@/components/ui/text-effect';
import AnimatedGradientBackground from '@/components/ui/animated-gradient-background';
import { MultiLayeredOrb } from '@/components/ui/multi-layered-orb';
import { GRADIENT_COLORS, ANIMATION_CONFIG } from '@/lib/gradient-constants';

const Hero = () => {
  const [showText, setShowText] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [isOrbLoaded, setIsOrbLoaded] = useState(false);
  const [isTextAnimating, setIsTextAnimating] = useState(false);
  const [orbScale, setOrbScale] = useState(2.8); // Start larger for more dramatic effect
  const [orbAnimationPhase, setOrbAnimationPhase] = useState<'loading' | 'textSync' | 'idle'>('loading');
  const [exitAnimation, setExitAnimation] = useState(false);
  const { scrollY } = useScroll();

  // Enhanced animation sequence with ultra-smooth, natural transitions
  useEffect(() => {
    if (hasAnimated) return; // Prevent multiple animations
    
    const sequence = async () => {
      // Phase 1: Orb loads with gradual, breathing entry (2000ms total)
      setIsOrbLoaded(true);
      setOrbAnimationPhase('loading');
      await new Promise(resolve => setTimeout(resolve, 600)); // Let orb fully initialize and breathe
      
      // Ultra-smooth multi-step scale down animation
      setOrbScale(2.2); // First gentle reduction
      await new Promise(resolve => setTimeout(resolve, 400));
      
      setOrbScale(1.8); // Second step down
      await new Promise(resolve => setTimeout(resolve, 400));
      
      setOrbScale(1.4); // Third step down
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setOrbScale(1.1); // Near final size
      await new Promise(resolve => setTimeout(resolve, 400));
      
      // Final scale to normal size with extended duration
      setOrbScale(1);
      await new Promise(resolve => setTimeout(resolve, 600));
      
      // Phase 2: Extended gradual transition to text sync (1200ms overlap for maximum smoothness)
      setOrbAnimationPhase('textSync');
      await new Promise(resolve => setTimeout(resolve, 600)); // Extended pre-text sync breathing
      
      // Start text animation with orb fully synchronized for perfect coordination
      setShowText(true);
      setIsTextAnimating(true);
      setHasAnimated(true);
      
      // Phase 3: Extended sync duration for full text animation experience (5 seconds)
      await new Promise(resolve => setTimeout(resolve, 5000));
      
      // Phase 4: Ultra-gentle transition to idle state with extended cross-fade
      setIsTextAnimating(false);
      await new Promise(resolve => setTimeout(resolve, 800)); // Extended overlap for natural fadeout
      setOrbAnimationPhase('idle');
    };

    sequence();
  }, []); // Empty dependency array - runs only once

  // Enhanced scroll-based exit animation with smooth scaling
  useMotionValueEvent(scrollY, "change", (latest) => {
    if (!hasAnimated) return; // Don't trigger until initial animation is done
    
    const windowHeight = window.innerHeight;
    const scrollProgress = latest / windowHeight;
    
    if (scrollProgress > 0.1 && scrollProgress < 0.8) {
      // Gradual scaling as user scrolls
      const scaleProgress = Math.min((scrollProgress - 0.1) / 0.7, 1);
      const newScale = 1 + (scaleProgress * 2.5); // Scale from 1 to 3.5
      setOrbScale(newScale);
      
      if (!exitAnimation) {
        setExitAnimation(true);
        setOrbAnimationPhase('idle'); // Transition to gentle idle state
      }
    } else if (scrollProgress >= 0.8) {
      // Final enlargement and fade
      setOrbScale(4);
      setTimeout(() => {
        setShowText(false);
      }, 200);
    } else if (scrollProgress < 0.05 && exitAnimation) {
      // Return to normal when scrolling back up
      setExitAnimation(false);
      setOrbScale(1);
      setShowText(true);
      setOrbAnimationPhase('idle');
    }
  });

  return (
    <div className="hero-container min-h-screen flex items-center relative overflow-hidden">
      {/* Optimized Animated Gradient Background */}
      <AnimatedGradientBackground 
        Breathing={true}
        startingGap={ANIMATION_CONFIG.BREATHING.startingGap}
        breathingRange={10} // Reduced from 20 for better performance
        animationSpeed={0.01} // Reduced from 0.02 for smoother performance
        topOffset={ANIMATION_CONFIG.BREATHING.topOffset}
        gradientColors={GRADIENT_COLORS.BACKGROUND}
        gradientStops={GRADIENT_COLORS.STOPS}
      />

      <div className="w-full mx-auto px-2 sm:px-4 md:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col items-center justify-center text-center min-h-screen relative overflow-hidden">
          
          {/* Multi-Layered Orb - Center of Attraction - Enhanced Phased Animation */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div 
              className={`w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] md:w-[500px] md:h-[500px] lg:w-[600px] lg:h-[600px] xl:w-[700px] xl:h-[700px] 2xl:w-[800px] 2xl:h-[800px] relative transition-all ${
                orbAnimationPhase === 'loading' ? 'duration-[1200ms] ease-out' : 
                orbAnimationPhase === 'textSync' ? 'duration-[800ms] ease-in-out' : 
                exitAnimation ? 'duration-[400ms] ease-out' : 'duration-[1000ms] ease-in-out'
              }`}
              style={{ 
                transform: `scale(${orbScale})`,
                opacity: exitAnimation && orbScale > 3 ? 0.3 : 1,
                filter: exitAnimation ? 'blur(1px)' : 'none'
              }}
            >
              <MultiLayeredOrb
                isTextAnimating={isTextAnimating}
                audioIntensity={
                  orbAnimationPhase === 'loading' ? 0.25 :
                  orbAnimationPhase === 'textSync' ? (isTextAnimating ? 0.45 : 0.35) :
                  0.12
                }
                pulseActive={orbAnimationPhase === 'textSync'}
                animationPhase={orbAnimationPhase}
              />
            </div>
          </div>

          {/* Text content - overlaid on orb with improved responsive spacing */}
          <div className="relative z-20 space-y-1 sm:space-y-2 px-1 sm:px-2 md:px-4 max-w-full">
            {/* First line: "Hello!" */}
            <div className="relative mb-3 sm:mb-4 md:mb-6">
              <TextEffect
                key="hello-text"
                as="h1"
                per="char"
                delay={0}
                trigger={showText}
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-black tracking-tight text-white drop-shadow-2xl font-arimo leading-none"
                preset="blur"
                variants={{
                  container: {
                    hidden: { opacity: 0 },
                    visible: {
                      opacity: 1,
                      transition: {
                        staggerChildren: 0.06, // Slower stagger for smoothness
                        delayChildren: 0.3,
                        duration: 1.0, // Longer container animation
                      },
                    },
                    exit: {
                      opacity: 0,
                      transition: { 
                        staggerChildren: 0.02, 
                        staggerDirection: -1,
                        duration: 0.5 // Smoother exit
                      },
                    },
                  },
                  item: {
                    hidden: { 
                      opacity: 0, 
                      filter: 'blur(20px)',
                      y: 50,
                      scale: 0.8
                    },
                    visible: { 
                      opacity: 1, 
                      filter: 'blur(0px)',
                      y: 0,
                      scale: 1,
                      transition: {
                        duration: 1.4, // Slightly longer
                        ease: [0.23, 1, 0.320, 1] // Custom easing for smooth motion
                      }
                    },
                    exit: { 
                      opacity: 0, 
                      filter: 'blur(15px)',
                      y: -30,
                      scale: 1.1,
                      transition: {
                        duration: 0.4, // Smoother exit
                        ease: [0.55, 0.06, 0.68, 0.19]
                      }
                    },
                  },
                }}
              >
                Hello!
              </TextEffect>
              {/* Enhanced glow effect behind "Hello!" with violet theme */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400/40 via-purple-500/50 to-violet-600/40 blur-3xl scale-150 -z-10" />
            </div>
            
            {/* Second line: "I'm Serin" - Improved Responsive */}
            <div className="relative">
              <div className="flex items-center justify-center gap-1 sm:gap-2 md:gap-3 flex-wrap">
                <TextEffect
                  key="im-text"
                  as="span"
                  per="char"
                  delay={0.6}
                  trigger={showText}
                  className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-bold tracking-wide text-white drop-shadow-2xl font-arimo leading-none"
                  preset="blur"
                  variants={{
                    container: {
                      hidden: { opacity: 0 },
                      visible: {
                        opacity: 1,
                        transition: {
                          staggerChildren: 0.05, // Faster stagger for "I'm"
                          delayChildren: 0.4,
                          duration: 0.8,
                        },
                      },
                      exit: {
                        opacity: 0,
                        transition: { 
                          staggerChildren: 0.02, 
                          staggerDirection: -1,
                          duration: 0.4 
                        },
                      },
                    },
                    item: {
                      hidden: { 
                        opacity: 0, 
                        filter: 'blur(25px)',
                        y: 40,
                        scale: 0.9
                      },
                      visible: { 
                        opacity: 1, 
                        filter: 'blur(0px)',
                        y: 0,
                        scale: 1,
                        transition: {
                          duration: 1.2,
                          ease: [0.23, 1, 0.320, 1] // Matching smooth easing
                        }
                      },
                      exit: { 
                        opacity: 0, 
                        filter: 'blur(20px)',
                        y: -25,
                        scale: 1.05,
                        transition: {
                          duration: 0.6, // Smoother exit
                          ease: [0.55, 0.06, 0.68, 0.19]
                        }
                      },
                    },
                  }}
                >
                  I'm 
                </TextEffect>
                
                <TextEffect
                  key="serin-text"
                  as="span"
                  per="char"
                  delay={0.8}
                  trigger={showText}
                  className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl 2xl:text-9xl font-black tracking-tight drop-shadow-[0_0_25px_rgba(168,85,247,0.8)] font-arimo leading-[1.05] max-w-full"
                  preset="gradient"
                  variants={{
                    container: {
                      hidden: { opacity: 0 },
                      visible: {
                        opacity: 1,
                        transition: {
                          staggerChildren: 0.07, // Slightly slower for "Serin"
                          delayChildren: 0.5,
                          duration: 1.2,
                        },
                      },
                      exit: {
                        opacity: 0,
                        transition: { 
                          staggerChildren: 0.03, 
                          staggerDirection: -1,
                          duration: 0.6 // Longer exit for dramatic effect
                        },
                      },
                    },
                    item: {
                      hidden: { 
                        opacity: 0, 
                        filter: 'blur(30px)',
                        y: 50,
                        scale: 0.8
                      },
                      visible: { 
                        opacity: 1, 
                        filter: 'blur(0px)',
                        y: 0,
                        scale: 1,
                        transition: {
                          duration: 1.6, // Longest duration for hero text
                          ease: [0.23, 1, 0.320, 1] // Matching smooth easing
                        }
                      },
                      exit: { 
                        opacity: 0, 
                        filter: 'blur(25px)',
                        y: -30,
                        scale: 1.1,
                        transition: {
                          duration: 0.8, // Extended exit for dramatic effect
                          ease: [0.55, 0.06, 0.68, 0.19]
                        }
                      },
                    },
                  }}
                >
                  Serin
                </TextEffect>
              </div>
              {/* Enhanced glow effect behind "I'm Serin" with purple theme */}
              <div className="absolute inset-0 bg-gradient-to-r from-violet-500/30 via-purple-500/40 to-blue-500/30 blur-3xl scale-130 -z-10" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
