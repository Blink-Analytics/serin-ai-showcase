import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AnimatedGradientBackground from '@/components/ui/animated-gradient-background';
import Hero from '@/components/Hero';
import { FloatingNavDemo } from '@/components/FloatingNavDemo';
import { Footer } from '@/components/ui/footer-section-new';
import InterviewsSection from '@/components/InterviewsSection';
import { GRADIENT_COLORS, ANIMATION_CONFIG } from '@/lib/gradient-constants';

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate page load and let hero animation complete
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence mode="wait">
      {isLoading ? (
        <motion.div
          key="loading"
          className="fixed inset-0 z-50 bg-black flex items-center justify-center"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <motion.div
            className="w-16 h-16 border-2 border-blue-400/30 border-t-blue-400 rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
        </motion.div>
      ) : (
        <motion.div
          key="content"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          className="relative min-h-screen"
        >
          {/* Floating Navigation */}
          <FloatingNavDemo waitForIntro={true} />
          
          {/* Seamless gradient background that blends with footer */}
          <AnimatedGradientBackground 
            Breathing={true}
            startingGap={ANIMATION_CONFIG.SUBTLE.startingGap}
            breathingRange={ANIMATION_CONFIG.SUBTLE.breathingRange}
            animationSpeed={ANIMATION_CONFIG.SUBTLE.animationSpeed}
            topOffset={ANIMATION_CONFIG.SUBTLE.topOffset}
            gradientColors={GRADIENT_COLORS.BACKGROUND}
            gradientStops={GRADIENT_COLORS.STOPS}
          />
          
          {/* Main content */}
          <main className="relative z-10">
            {/* Hero Section */}
            <Hero />
            
            {/* Seamless gradient continuation - no overlays that break continuity */}
            <div className="h-32 relative" />
            
            {/* Empty section with seamless integration */}
            <motion.section 
              className="relative py-24 md:py-32 lg:py-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.2, duration: 1.8 }}
            >
              {/* Subtle animated elements - no gradient overlays */}
              <div className="relative max-w-6xl mx-auto px-6">
                <motion.div 
                  className="w-full h-px bg-gradient-to-r from-transparent via-blue-400/20 to-transparent mb-16"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 2.5, duration: 2, ease: [0.25, 0.1, 0.25, 1] }}
                />
                
                {/* Breathing gradient orbs */}
                <motion.div 
                  className="absolute top-1/2 left-1/4 w-32 h-32 bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-full blur-3xl"
                  animate={{ 
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.6, 0.3]
                  }}
                  transition={{ 
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
                
                <motion.div 
                  className="absolute top-1/3 right-1/4 w-24 h-24 bg-gradient-to-r from-purple-500/5 to-blue-500/5 rounded-full blur-2xl"
                  animate={{ 
                    scale: [1, 1.3, 1],
                    opacity: [0.2, 0.5, 0.2]
                  }}
                  transition={{ 
                    duration: 8,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1
                  }}
                />
                
                <motion.div 
                  className="w-full h-px bg-gradient-to-r from-transparent via-purple-400/20 to-transparent mt-16"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 3, duration: 2, ease: [0.25, 0.1, 0.25, 1] }}
                />
              </div>
            </motion.section>
            
            {/* Interviews Section */}
            <InterviewsSection />
            
            {/* Footer with scroll-triggered animations */}
            <Footer />
          </main>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Index;
