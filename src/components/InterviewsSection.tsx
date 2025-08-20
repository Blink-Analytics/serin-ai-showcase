import React, { useState, useRef, useEffect } from 'react';
import { motion, useInView, useScroll, useMotionValueEvent } from 'framer-motion';
import ScrollFloat from './ScrollFloat';
import { GradientText } from '@/components/ui/gradient-text';
import AnimatedGradientBackground from '@/components/ui/animated-gradient-background';
import { GRADIENT_COLORS, ANIMATION_CONFIG } from '@/lib/gradient-constants';

const InterviewsSection = () => {
  const [showOnDemand, setShowOnDemand] = useState(false);
  const [showInterviewsText, setShowInterviewsText] = useState(false);
  const sectionRef = useRef(null);
  const { scrollY } = useScroll();

  // Track scroll to trigger "Interviews" text and "On Demand" 
  useMotionValueEvent(scrollY, 'change', (latest) => {
    const windowHeight = window.innerHeight;
    const scrollProgress = latest / windowHeight;
    
    // Show "Interviews" text when entering this section (around 0.8 viewport)
    if (scrollProgress > 0.8 && !showInterviewsText) {
      setShowInterviewsText(true);
    }
    
    // Show "On Demand" after "Interviews" is visible (around 2.5 viewport)
    if (scrollProgress > 2.5 && !showOnDemand) {
      setShowOnDemand(true);
    }
    
    // Reset when scrolling back up
    if (scrollProgress < 0.5 && showInterviewsText) {
      setShowInterviewsText(false);
      setShowOnDemand(false);
    }
  });

  return (
    <div 
      ref={sectionRef}
      className="min-h-screen flex items-start justify-center pt-8 pb-20 px-6 md:px-12 lg:px-20 relative"
    >
      {/* Same gradient background as Hero for seamless transition */}
      <AnimatedGradientBackground 
        Breathing={true}
        startingGap={ANIMATION_CONFIG.BREATHING.startingGap}
        breathingRange={ANIMATION_CONFIG.BREATHING.breathingRange}
        animationSpeed={ANIMATION_CONFIG.BREATHING.animationSpeed}
        topOffset={ANIMATION_CONFIG.BREATHING.topOffset}
        gradientColors={GRADIENT_COLORS.BACKGROUND}
        gradientStops={GRADIENT_COLORS.STOPS}
      />
      
      <div className="max-w-7xl mx-auto w-full relative z-10">
        {/* "Interviews" Text - Large and Prominent */}
        {showInterviewsText && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ 
              duration: 1.5, 
              ease: [0.25, 0.46, 0.45, 0.94],
              delay: 0.3
            }}
            className="flex items-center justify-center min-h-screen"
          >
            <GradientText className="text-8xl md:text-9xl lg:text-[12rem] xl:text-[14rem] 2xl:text-[16rem] font-black tracking-tighter drop-shadow-[0_0_50px_rgba(59,130,246,0.8)] font-arimo leading-[1.05] text-center">
              Interviews
            </GradientText>
          </motion.div>
        )}

        {/* Rest of content appears after "Interviews" */}
        {showOnDemand && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="flex flex-col lg:flex-row items-center justify-center lg:justify-start gap-8 lg:gap-12 xl:gap-16 min-h-screen"
          >
            {/* "On Demand" text with gradient styling */}
            <div className="relative flex-shrink-0 min-w-0">
              <ScrollFloat
                animationDuration={1.5}
                ease='back.inOut(1.5)'
                scrollStart='top bottom-=20%'
                scrollEnd='bottom bottom-=60%'
                stagger={0.1}
                containerClassName="whitespace-nowrap text-center lg:text-left"
                textClassName="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black leading-tight"
              >
                <GradientText
                  className="drop-shadow-[0_0_25px_rgba(168,85,247,0.8)] font-arimo tracking-tight"
                >
                  On Demand
                </GradientText>
              </ScrollFloat>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default InterviewsSection;
