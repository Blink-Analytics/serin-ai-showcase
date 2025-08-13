import { useEffect, useState } from 'react';
import { useScroll, useMotionValueEvent } from 'framer-motion';
import { TextEffect } from '@/components/ui/text-effect';
import AnimatedGradientBackground from '@/components/ui/animated-gradient-background';
import { GRADIENT_COLORS, ANIMATION_CONFIG } from '@/lib/gradient-constants';

const Hero = () => {
  const [showText, setShowText] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [animationKey, setAnimationKey] = useState(0);
  const { scrollY } = useScroll();

  // Start animation on component mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowText(true);
      setHasAnimated(true);
    }, 800); // Slight delay for elegant entrance

    return () => clearTimeout(timer);
  }, []);

  // Handle exit animation on scroll
  useMotionValueEvent(scrollY, "change", (latest) => {
    // Exit animation when user scrolls down significantly from hero section
    if (latest > 300 && hasAnimated && showText) {
      setShowText(false);
    }
    // Re-enter if scrolled back to top
    else if (latest < 150 && hasAnimated && !showText) {
      // Increment key to force re-mount for clean animation
      setAnimationKey(prev => prev + 1);
      setTimeout(() => {
        setShowText(true);
      }, 200);
    }
  });

  return (
    <div className="hero-container min-h-screen flex items-center relative">
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
      
      {/* Left-aligned text content - center of attraction */}
      <div className="hero-content max-w-7xl mx-auto px-8 lg:px-16 relative z-10 w-full">
        <div className="space-y-0 text-left">
          {/* First line: "Hello!" */}
          <div className="relative">
            <TextEffect
              key={`hello-${animationKey}`}
              as="h1"
              per="char"
              delay={0}
              trigger={showText}
              className="text-8xl md:text-9xl lg:text-[10rem] font-black tracking-tight text-white drop-shadow-2xl font-arimo leading-none"
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
            <div className={`absolute inset-0 bg-gradient-to-r ${GRADIENT_COLORS.GLOW.BLUE} blur-3xl scale-150 -z-10 opacity-60`} />
          </div>
          
          {/* Second line: "I'm Serin" */}
          <div className="relative pb-4">
            <div className="flex items-baseline gap-4">
              <TextEffect
                key={`im-${animationKey}`}
                as="span"
                per="char"
                delay={0.6}
                trigger={showText}
                className="text-8xl md:text-9xl lg:text-[10rem] font-bold tracking-wide text-white drop-shadow-2xl font-arimo leading-none"
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
              
              <TextEffect
                key={`serin-${animationKey}`}
                as="span"
                per="char"
                delay={0.8}
                trigger={showText}
                className="text-9xl md:text-[10rem] lg:text-[12rem] font-black tracking-tighter drop-shadow-[0_0_25px_rgba(138,43,226,0.8)] font-arimo leading-[1.05]"
                preset="gradient"
                variants={{
                  container: {
                    hidden: { opacity: 0 },
                    visible: {
                      opacity: 1,
                      transition: {
                        staggerChildren: 0.08,
                        delayChildren: 0.4,
                      },
                    },
                    exit: {
                      opacity: 0,
                      transition: { 
                        staggerChildren: 0.04, 
                        staggerDirection: -1,
                        duration: 0.8 
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
                        duration: 1.6,
                        ease: [0.25, 0.46, 0.45, 0.94]
                      }
                    },
                    exit: { 
                      opacity: 0, 
                      filter: 'blur(25px)',
                      y: -30,
                      scale: 1.1,
                      transition: {
                        duration: 0.9,
                        ease: [0.55, 0.06, 0.68, 0.19]
                      }
                    },
                  },
                }}
              >
                Serin
              </TextEffect>
            </div>
            {/* Enhanced glow effect behind "I'm Serin" */}
            <div className={`absolute inset-0 bg-gradient-to-r ${GRADIENT_COLORS.GLOW.ENHANCED} blur-3xl scale-130 -z-10 opacity-50`} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;