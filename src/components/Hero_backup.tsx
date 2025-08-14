import React, { useState, useEffect, useMemo } from 'react';
import { TextEffect } from '@/components/ui/text-effect';
import { MultiLayeredOrb } from '@/components/ui/multi-layered-orb';
import AnimatedGradientBackground from '@/components/ui/animated-gradient-background';

const Hero: React.FC = () => {
  const [showText, setShowText] = useState(false);
  const [isTextAnimating, setIsTextAnimating] = useState(false);
  const [animationKey, setAnimationKey] = useState(0);

  // Animation configuration
  const ANIMATION_CONFIG = useMemo(() => ({
    BREATHING: {
      startingGap: 45,
      breathingRange: 15,
      animationSpeed: 4000,
      topOffset: 12
    }
  }), []);

  // Color schemes
  const GRADIENT_COLORS = useMemo(() => ({
    BACKGROUND: [
      '#1a1a2e',
      '#16213e',
      '#0f3460',
      '#533a7b',
      '#8b5a6b'
    ],
    STOPS: [0, 15, 40, 70, 100]
  }), []);

  // Trigger text animation on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowText(true);
      setIsTextAnimating(true);
      
      // Reset animation state after completion
      const animationTimer = setTimeout(() => {
        setIsTextAnimating(false);
      }, 4000);
      
      return () => clearTimeout(animationTimer);
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  // Reset animation function
  const resetAnimation = () => {
    setShowText(false);
    setIsTextAnimating(false);
    setAnimationKey(prev => prev + 1);
    
    setTimeout(() => {
      setShowText(true);
      setIsTextAnimating(true);
      
      setTimeout(() => {
        setIsTextAnimating(false);
      }, 4000);
    }, 100);
  };

  return (
    <div className="hero-container min-h-screen flex items-center justify-center relative overflow-hidden">
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

      {/* Centered Multi-Layered Orb - Main Attraction */}
      <div className="absolute inset-0 flex items-center justify-center z-[5]">
        <div className="w-[800px] h-[800px] lg:w-[1000px] lg:h-[1000px] xl:w-[1200px] xl:h-[1200px] relative">
          <MultiLayeredOrb
            isTextAnimating={isTextAnimating}
            audioIntensity={0.9}
          />
          {/* Enhanced glow effects around the orb */}
          <div className="absolute inset-0 bg-gradient-radial from-blue-900/20 via-violet-900/10 to-transparent blur-3xl scale-150 -z-10" />
          <div className="absolute inset-0 bg-gradient-radial from-red-900/15 via-transparent to-transparent blur-2xl scale-125 -z-10" />
        </div>
      </div>

      {/* Text Content - Positioned over the orb */}
      <div className="relative z-10 text-center px-8 lg:px-16">
        <div className="space-y-4">
          {/* First line: "Hello!" */}
          <div className="relative">
            <TextEffect
              key={`hello-${animationKey}`}
              as="h1"
              per="char"
              delay={0}
              trigger={showText}
              className="text-7xl md:text-8xl lg:text-9xl xl:text-[12rem] font-black tracking-tight text-white drop-shadow-2xl font-arimo leading-none"
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
            {/* Enhanced glow effect behind "Hello!" */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400/30 via-violet-500/40 to-red-400/30 blur-3xl scale-150 -z-10" />
          </div>
          
          {/* Second line: "I'm Serin" */}
          <div className="relative">
            <div className="flex items-baseline justify-center gap-4">
              <TextEffect
                key={`im-${animationKey}`}
                as="span"
                per="char"
                delay={0.6}
                trigger={showText}
                className="text-7xl md:text-8xl lg:text-9xl xl:text-[12rem] font-bold tracking-wide text-white drop-shadow-2xl font-arimo leading-none"
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
                className="text-8xl md:text-9xl lg:text-[12rem] xl:text-[15rem] font-black tracking-tighter bg-gradient-to-r from-blue-400 via-violet-500 to-red-400 bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(99,102,241,0.8)] font-arimo leading-[1.05]"
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
            <div className="absolute inset-0 bg-gradient-to-r from-violet-500/30 via-red-500/40 to-blue-500/30 blur-3xl scale-130 -z-10" />
          </div>
        </div>

        {/* Interaction hint */}
        <div className="mt-16 text-center">
          <button
            onClick={resetAnimation}
            className="px-8 py-3 bg-gradient-to-r from-blue-600/20 to-violet-600/20 border border-blue-400/30 rounded-lg text-white hover:bg-gradient-to-r hover:from-blue-600/30 hover:to-violet-600/30 transition-all duration-300 backdrop-blur-sm"
          >
            Replay Animation
          </button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
