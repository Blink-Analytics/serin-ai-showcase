import { useEffect, useState } from 'react';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { TextEffect } from '@/components/ui/text-effect';
import { GradientText } from '@/components/ui/gradient-text';
import AnimatedGradientBackground from '@/components/ui/animated-gradient-background';
import { MultiLayeredOrb } from '@/components/ui/multi-layered-orb';
import { GRADIENT_COLORS, ANIMATION_CONFIG } from '@/lib/gradient-constants';

const Hero = () => {
  // Animation states
  const [showText, setShowText] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [animationKey, setAnimationKey] = useState(0);
  const [isOrbLoaded, setIsOrbLoaded] = useState(false);
  const [isTextAnimating, setIsTextAnimating] = useState(false);
  const [exitAnimation, setExitAnimation] = useState(false);
  const [orbScale, setOrbScale] = useState(1);

  const { scrollY } = useScroll();

  // Start orb loading animation immediately
  useEffect(() => {
    const orbTimer = setTimeout(() => {
      setIsOrbLoaded(true);
    }, 1000); // Orb loads first

    return () => clearTimeout(orbTimer);
  }, []);

  // Start text animation after orb is loaded
  useEffect(() => {
    if (isOrbLoaded) {
      const timer = setTimeout(() => {
        setShowText(true);
        setHasAnimated(true);
        setIsTextAnimating(true);
        
        // Stop text animation reaction after text is done
        setTimeout(() => {
          setIsTextAnimating(false);
        }, 3000); // Adjust based on text animation duration
      }, 800);

      return () => clearTimeout(timer);
    }
  }, [isOrbLoaded]);

  // Handle exit animation on scroll - with orb scaling
  useMotionValueEvent(scrollY, "change", (latest) => {
    if (!hasAnimated) return;

    const windowHeight = window.innerHeight;
    const scrollProgress = latest / windowHeight;

    if (scrollProgress > 0.1) {
      // Start orb exit animation with scaling - expand globally across all sections
      const scaleProgress = Math.min((scrollProgress - 0.1) / 4.0, 4); // Expand over 4 viewport heights
      const newScale = 1 + scaleProgress * 25; // Scale up to 26x size for screen coverage
      setOrbScale(newScale);
      
      if (!exitAnimation) setExitAnimation(true);
      
      // Hide hero text when scrolling down significantly
      if (scrollProgress > 0.3 && showText) {
        setShowText(false);
      }
    } else if (scrollProgress < 0.05 && exitAnimation) {
      // Reset when scrolled back to top
      setOrbScale(1);
      setExitAnimation(false);
      setAnimationKey(prev => prev + 1);
      setTimeout(() => {
        setShowText(true);
      }, 200);
    }
  });

  return (
    <div className="hero-container min-h-screen flex items-center relative overflow-hidden">
      {/* Enhanced Animated Gradient Background */}
      <AnimatedGradientBackground 
        Breathing={true}
        startingGap={ANIMATION_CONFIG.BREATHING.startingGap}
        breathingRange={ANIMATION_CONFIG.BREATHING.breathingRange}
        animationSpeed={ANIMATION_CONFIG.BREATHING.animationSpeed}
        topOffset={ANIMATION_CONFIG.BREATHING.topOffset}
        gradientColors={GRADIENT_COLORS.BACKGROUND}
        gradientStops={GRADIENT_COLORS.STOPS}
      />

      <div className="max-w-7xl mx-auto px-8 lg:px-16 relative z-10 w-full">
        <div className="flex flex-col items-center justify-center text-center min-h-screen relative">
          
          {/* Multi-Layered Orb with Global Exit Animation */}
          <div className="fixed inset-0 flex items-center justify-center pointer-events-none" style={{ height: '100vh', width: '100vw', zIndex: 5 }}>
            <motion.div
              className="w-[800px] h-[800px] lg:w-[1000px] lg:h-[1000px] relative"
              initial={{ scale: 3, opacity: 0.3 }} // Start from 3x size with lower opacity
              animate={{
                scale: exitAnimation ? orbScale : 1,
                opacity: exitAnimation ? Math.max(0, 1 - (orbScale - 1) / 15) : 1, // Very gradual fade out
                rotate: exitAnimation ? 0 : [0, 2, -1, 1, 0], 
              }}
              transition={{
                scale: exitAnimation ? { 
                  duration: 0, // Instant scale updates for smooth scroll following
                  ease: "linear" 
                } : {
                  duration: 2.5, // Slower intro animation
                  ease: [0.25, 0.46, 0.45, 0.94], // Smooth ease
                  delay: 0.3
                },
                opacity: exitAnimation ? { 
                  duration: 0.3, 
                  ease: "easeOut" 
                } : {
                  duration: 2.5, // Match scale duration
                  ease: "easeInOut",
                  delay: 0.3
                },
                rotate: exitAnimation ? { duration: 0.3 } : {
                  duration: 20,
                  ease: "easeInOut",
                  repeat: Infinity,
                  delay: 2.5
                }
              }}
              style={{
                willChange: 'transform, opacity',
                transform: 'translateZ(0)'
              }}
            >
              <MultiLayeredOrb
                isTextAnimating={isTextAnimating}
                audioIntensity={0.2}
              />
            </motion.div>
          </div>

          {/* Text content - overlaid on orb */}
          <div className="relative z-20 space-y-0">
            {/* First line: "Hello!" */}
            <div className="relative mb-4">
              <TextEffect
                key={`hello-${animationKey}`}
                as="h1"
                per="word"
                delay={0}
                trigger={showText}
                className="text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-black tracking-tight text-white drop-shadow-2xl playwrite-au-qld leading-none"
                preset="blur"
                variants={{
                  container: {
                    hidden: { opacity: 0 },
                    visible: {
                      opacity: 1,
                      transition: {
                        staggerChildren: 0.08,
                        delayChildren: 0.2,
                      },
                    },
                    exit: {
                      opacity: 0,
                      transition: { 
                        staggerChildren: 0.015, 
                        staggerDirection: -1,
                        duration: 0.3
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
                        duration: 1.2,
                        ease: [0.25, 0.46, 0.45, 0.94]
                      }
                    },
                    exit: { 
                      opacity: 0, 
                      filter: 'blur(15px)',
                      y: -30,
                      scale: 1.1,
                      transition: {
                        duration: 0.3,
                        ease: [0.55, 0.06, 0.68, 0.19]
                      }
                    },
                  },
                }}
              >
                Hello!
              </TextEffect>
              {/* Intense glow effect behind "Hello!" */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400/40 via-red-500/50 to-violet-600/40 blur-3xl scale-150 -z-10" />
            </div>
            
            {/* Second line: "I'm Shree" */}
            <div className="relative">
              <div className="flex items-baseline justify-center gap-4">
                <TextEffect
                  key={`im-${animationKey}`}
                  as="span"
                  per="char"
                  delay={0.6}
                  trigger={showText}
                  className="text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold tracking-wide text-white drop-shadow-2xl playwrite-au-qld leading-none"
                  preset="blur"
                  variants={{
                    container: {
                      hidden: { opacity: 0 },
                      visible: {
                        opacity: 1,
                        transition: {
                          staggerChildren: 0.06,
                          delayChildren: 0.3,
                        },
                      },
                      exit: {
                        opacity: 0,
                        transition: { 
                          staggerChildren: 0.015, 
                          staggerDirection: -1,
                          duration: 0.3 
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
                          duration: 1.4,
                          ease: [0.25, 0.46, 0.45, 0.94]
                        }
                      },
                      exit: { 
                        opacity: 0, 
                        filter: 'blur(20px)',
                        y: -25,
                        scale: 1.05,
                        transition: {
                          duration: 0.8,
                          ease: [0.55, 0.06, 0.68, 0.19]
                        }
                      },
                    },
                  }}
                >
                  I'm 
                </TextEffect>
                
                <motion.div
                  initial={{ opacity: 0, filter: 'blur(6px)', y: 15, scale: 0.95 }}
                  animate={showText ? { 
                    opacity: 1, 
                    filter: 'blur(0px)', 
                    y: 0, 
                    scale: 1 
                  } : {}}
                  transition={{ 
                    duration: 0.6, 
                    ease: [0.25, 0.1, 0.25, 1],
                    delay: 0.8
                  }}
                >
                  <GradientText
                    className="text-7xl md:text-8xl lg:text-9xl xl:text-[10rem] font-black tracking-tighter drop-shadow-[0_0_25px_rgba(168,85,247,0.8)] font-arimo leading-[1.05] max-w-full"
                  >
                    Shree
                  </GradientText>
                </motion.div>
              </div>
              {/* Enhanced glow effect behind "I'm Shree" */}
              <div className="absolute inset-0 bg-gradient-to-r from-violet-500/30 via-red-500/40 to-blue-500/30 blur-3xl scale-130 -z-10" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
