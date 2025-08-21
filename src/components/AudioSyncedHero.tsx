import { useEffect, useState } from 'react';
import { useScroll, useMotionValueEvent } from 'framer-motion';
import { TextEffect } from '@/components/ui/text-effect';
import AnimatedGradientBackground from '@/components/ui/animated-gradient-background';
import { GRADIENT_COLORS, ANIMATION_CONFIG } from '@/lib/gradient-constants';
import { useAudioSync } from '@/hooks/useAudioSync';
import { Play, Pause, Square, Volume2 } from 'lucide-react';

const AudioSyncedHero = () => {
  const [hasInitiallyPlayed, setHasInitiallyPlayed] = useState(false);
  const [animationKey, setAnimationKey] = useState(0);
  const { scrollY } = useScroll();

  // Audio sync configuration
  const audioSync = useAudioSync({
    audioUrl: '/audio/hello-im-shree.mp3', // You'll need to add this audio file
    fallbackMode: true, // Enable fallback mode if audio file not found
    animationTimings: {
      hello: {
        start: 200, // Start "Hello!" at 200ms
        duration: 1500, // Duration for the word
      },
      im: {
        start: 1800, // Start "I'm" at 1.8s
        duration: 800,
      },
      shree: {
        start: 2700, // Start "Shree" at 2.7s
        duration: 1200,
      },
    },
    onAnimationStart: (section) => {
      console.log(`Starting animation for: ${section}`);
    },
    onAnimationComplete: () => {
      console.log('Audio and animation complete');
    },
  });

  // Auto-play on component mount
  useEffect(() => {
    if ((audioSync.audioLoaded || audioSync.isFallbackMode) && !hasInitiallyPlayed) {
      const timer = setTimeout(() => {
        audioSync.play();
        setHasInitiallyPlayed(true);
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [audioSync.audioLoaded, audioSync.isFallbackMode, hasInitiallyPlayed, audioSync.play]);

  // Handle exit animation on scroll
  useMotionValueEvent(scrollY, "change", (latest) => {
    // Stop audio and reset animations when scrolling down
    if (latest > 300 && hasInitiallyPlayed) {
      audioSync.stop();
    }
    // Restart when scrolling back to top
    else if (latest < 150 && hasInitiallyPlayed && !audioSync.isPlaying) {
      setAnimationKey(prev => prev + 1);
      setTimeout(() => {
        audioSync.play();
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
      
      {/* Audio Controls */}
      <div className="fixed top-6 right-6 z-50 flex items-center gap-3">
        <div className="bg-black/40 backdrop-blur-xl rounded-full p-3 border border-white/10">
          <div className="flex items-center gap-2">
            <Volume2 className="w-4 h-4 text-white" />
            <div className="flex gap-2">
              {!audioSync.isPlaying ? (
                <button
                  onClick={audioSync.play}
                  disabled={!audioSync.audioLoaded}
                  className="p-2 rounded-full bg-purple-600 hover:bg-purple-700 disabled:opacity-50 transition-colors"
                  title="Play audio"
                >
                  <Play className="w-4 h-4 text-white fill-white" />
                </button>
              ) : (
                <button
                  onClick={audioSync.pause}
                  className="p-2 rounded-full bg-purple-600 hover:bg-purple-700 transition-colors"
                  title="Pause audio"
                >
                  <Pause className="w-4 h-4 text-white fill-white" />
                </button>
              )}
              <button
                onClick={audioSync.stop}
                className="p-2 rounded-full bg-red-600 hover:bg-red-700 transition-colors"
                title="Stop audio"
              >
                <Square className="w-3 h-3 text-white fill-white" />
              </button>
            </div>
          </div>
        </div>
        
        {/* Audio loading indicator */}
        {!audioSync.audioLoaded && (
          <div className="bg-yellow-500/20 backdrop-blur-xl rounded-full px-3 py-1 border border-yellow-500/30">
            <span className="text-yellow-300 text-sm">Loading audio...</span>
          </div>
        )}
      </div>

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
              trigger={audioSync.showHello}
              className="text-8xl md:text-9xl lg:text-[10rem] font-black tracking-tight text-white drop-shadow-2xl font-arimo leading-none"
              preset="blur"
              variants={{
                container: {
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: {
                      staggerChildren: 0.08,
                      delayChildren: 0.1,
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
                      duration: 0.8,
                      ease: [0.25, 0.46, 0.45, 0.94]
                    }
                  },
                  exit: { 
                    opacity: 0, 
                    filter: 'blur(15px)',
                    y: -30,
                    scale: 1.1,
                    transition: {
                      duration: 0.4,
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
          
          {/* Second line: "I'm Shree" */}
          <div className="relative pb-4">
            <div className="flex items-baseline gap-4">
              <TextEffect
                key={`im-${animationKey}`}
                as="span"
                per="char"
                delay={0}
                trigger={audioSync.showIm}
                className="text-8xl md:text-9xl lg:text-10xl font-bold tracking-wide text-white drop-shadow-2xl font-arimo leading-none"
                preset="blur"
                variants={{
                  container: {
                    hidden: { opacity: 0 },
                    visible: {
                      opacity: 1,
                      transition: {
                        staggerChildren: 0.06,
                        delayChildren: 0.1,
                      },
                    },
                    exit: {
                      opacity: 0,
                      transition: { 
                        staggerChildren: 0.03, 
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
                        duration: 0.6,
                        ease: [0.25, 0.46, 0.45, 0.94]
                      }
                    },
                    exit: { 
                      opacity: 0, 
                      filter: 'blur(20px)',
                      y: -25,
                      scale: 1.05,
                      transition: {
                        duration: 0.4,
                        ease: [0.55, 0.06, 0.68, 0.19]
                      }
                    },
                  },
                }}
              >
                I'm 
              </TextEffect>
              
              <TextEffect
                key={`shree-${animationKey}`}
                as="span"
                per="char"
                delay={0}
                trigger={audioSync.showShree}
                className="text-9xl md:text-[10rem] lg:text-[12rem] font-black tracking-tighter drop-shadow-[0_0_25px_rgba(138,43,226,0.8)] font-arimo leading-[1.05]"
                preset="gradient"
                variants={{
                  container: {
                    hidden: { opacity: 0 },
                    visible: {
                      opacity: 1,
                      transition: {
                        staggerChildren: 0.08,
                        delayChildren: 0.1,
                      },
                    },
                    exit: {
                      opacity: 0,
                      transition: { 
                        staggerChildren: 0.04, 
                        staggerDirection: -1,
                        duration: 0.5 
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
                        duration: 0.8,
                        ease: [0.25, 0.46, 0.45, 0.94]
                      }
                    },
                    exit: { 
                      opacity: 0, 
                      filter: 'blur(25px)',
                      y: -30,
                      scale: 1.1,
                      transition: {
                        duration: 0.5,
                        ease: [0.55, 0.06, 0.68, 0.19]
                      }
                    },
                  },
                }}
              >
                Shree
              </TextEffect>
            </div>
            {/* Enhanced glow effect behind "I'm Shree" */}
            <div className={`absolute inset-0 bg-gradient-to-r ${GRADIENT_COLORS.GLOW.ENHANCED} blur-3xl scale-130 -z-10 opacity-50`} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AudioSyncedHero;
