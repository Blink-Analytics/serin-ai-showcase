import { useEffect, useState } from 'react';
import { TextEffect } from '@/components/ui/text-effect';
import AnimatedGradientBackground from '@/components/ui/animated-gradient-background';
import { GRADIENT_COLORS, ANIMATION_CONFIG } from '@/lib/gradient-constants';

const Hero = () => {
  const [showHello, setShowHello] = useState(false);
  const [showSerin, setShowSerin] = useState(false);
  const [animationCycle, setAnimationCycle] = useState(0);

  useEffect(() => {
    // Stagger the animations
    const helloTimer = setTimeout(() => setShowHello(true), 300);
    const serinTimer = setTimeout(() => setShowSerin(true), 1200);
    
    return () => {
      clearTimeout(helloTimer);
      clearTimeout(serinTimer);
    };
  }, []);

  // Auto-cycle animations to demonstrate exit effects
  useEffect(() => {
    const cycleTimer = setInterval(() => {
      setAnimationCycle(prev => prev + 1);
      
      // Reset animations every 8 seconds
      setShowHello(false);
      setShowSerin(false);
      
      // Restart them with delay
      setTimeout(() => setShowHello(true), 500);
      setTimeout(() => setShowSerin(true), 1400);
    }, 8000);
    
    return () => clearInterval(cycleTimer);
  }, []);

  return (
    <div className="hero-container min-h-screen flex items-center justify-center relative">
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
      
      <div className="hero-content text-center max-w-6xl mx-auto px-4 relative z-10">
        <div className="space-y-12">
          {/* First line: "Hello!" */}
          <div className="relative">
            <TextEffect
              as="h1"
              per="char"
              delay={0}
              trigger={showHello}
              className="text-8xl md:text-9xl lg:text-[12rem] font-black tracking-tight text-white drop-shadow-2xl"
              preset="blur"
            >
              Hello!
            </TextEffect>
            {/* Intense glow effect behind "Hello!" */}
            <div className={`absolute inset-0 bg-gradient-to-r ${GRADIENT_COLORS.GLOW.BLUE} blur-3xl scale-150 -z-10`} />
          </div>
          
          {/* Second line: "I'm Serin" with emphasized "Serin" */}
          <div className="relative">
            <div className="flex flex-wrap justify-center items-baseline gap-4">
              <TextEffect
                as="h2"
                per="char"
                delay={0}
                trigger={showSerin}
                className="text-6xl md:text-7xl lg:text-8xl font-bold tracking-wide text-gray-300"
                preset="blur"
              >
                I'm
              </TextEffect>
              <TextEffect
                as="h2"
                per="char"
                delay={0.2}
                trigger={showSerin}
                className={`text-7xl md:text-8xl lg:text-9xl font-black bg-gradient-to-r ${GRADIENT_COLORS.TEXT_GRADIENT} bg-clip-text text-transparent drop-shadow-2xl`}
                preset="blur"
              >
                Serin.
              </TextEffect>
            </div>
            {/* Enhanced glow effect behind "Serin" */}
            <div className={`absolute inset-0 bg-gradient-to-r ${GRADIENT_COLORS.GLOW.ENHANCED} blur-3xl scale-130 -z-10`} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;