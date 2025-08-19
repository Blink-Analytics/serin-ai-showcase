import React, { useState, useRef, useEffect } from 'react';
import { motion, useInView, useScroll, useMotionValueEvent } from 'framer-motion';
import ScrollFloat from './ScrollFloat';
import { GradientText } from '@/components/ui/gradient-text';

const InterviewsSection = () => {
  const [showOnDemand, setShowOnDemand] = useState(false);
  const sectionRef = useRef(null);
  const { scrollY } = useScroll();

  // Track scroll to trigger "On Demand" after "Interviews" completes
  useMotionValueEvent(scrollY, 'change', (latest) => {
    const windowHeight = window.innerHeight;
    const scrollProgress = latest / windowHeight;
    
    // Show "On Demand" after user scrolls past hero section (around 1.3 viewport)
    if (scrollProgress > 1.3 && !showOnDemand) {
      setShowOnDemand(true);
    }
  });

  return (
    <div 
      ref={sectionRef}
      className="min-h-screen flex items-start justify-center pt-8 pb-20 px-6 md:px-12 lg:px-20 relative"
    >
      {/* Seamless background blend */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `linear-gradient(to bottom, 
            transparent 0%, 
            rgba(0,0,0,0.02) 20%, 
            rgba(0,0,0,0.08) 60%, 
            rgba(0,0,0,0.15) 100%)`
        }}
      />
      
      <div className="max-w-7xl mx-auto w-full relative z-10">
        {/* Horizontal layout: "Interviews" and "On Demand" side by side */}
        <div className="flex flex-col lg:flex-row items-center justify-center lg:justify-start gap-8 lg:gap-12 xl:gap-16">
          
          {/* "Interviews" text - appears immediately after hero section */}
          <div className="flex-shrink-0">
            <ScrollFloat
              animationDuration={1.5}
              ease='back.inOut(1.5)'
              scrollStart='top bottom-=20%'
              scrollEnd='bottom bottom-=60%'
              stagger={0.1}
              containerClassName="text-center lg:text-left"
              textClassName="text-white text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold leading-tight"
            >
              Interviews
            </ScrollFloat>
          </div>
          
          {/* "On Demand" text with gradient styling and same animation as "Interviews" */}
          <div className="relative flex-shrink-0 min-w-0">
            {showOnDemand && (
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
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InterviewsSection;
