import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AnimatedGradientBackground from '@/components/ui/animated-gradient-background';
import Hero from '@/components/Hero';
import { FloatingNavDemo } from '@/components/FloatingNavDemo';
import { Footer } from '@/components/ui/footer-section-new';
import InterviewsSection from '@/components/InterviewsSection';
import FeatureSection from '@/components/FeatureSection';
import AboutSection from '@/components/AboutSection';
import { GRADIENT_COLORS, ANIMATION_CONFIG } from '@/lib/gradient-constants';

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);
  const footerRef = useRef<HTMLDivElement>(null);

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
          
          {/* Seamless gradient background that extends throughout all sections */}
          <AnimatedGradientBackground 
            Breathing={true}
            startingGap={ANIMATION_CONFIG.SUBTLE.startingGap}
            breathingRange={ANIMATION_CONFIG.SUBTLE.breathingRange}
            animationSpeed={ANIMATION_CONFIG.SUBTLE.animationSpeed}
            topOffset={ANIMATION_CONFIG.SUBTLE.topOffset}
            gradientColors={GRADIENT_COLORS.BACKGROUND}
            gradientStops={GRADIENT_COLORS.STOPS}
            containerClassName="fixed inset-0"
            containerStyle={{ height: '500vh' }} // Extend to cover all sections
          />
          
          {/* Minimal gradient overlay for very subtle transitions */}
          <div 
            className="fixed inset-0 pointer-events-none z-[1]"
            style={{
              height: '500vh',
              background: `linear-gradient(to bottom, 
                transparent 0%, 
                transparent 80%, 
                rgba(0,0,0,0.01) 90%, 
                rgba(0,0,0,0.03) 95%, 
                rgba(0,0,0,0.05) 100%)`
            }}
          />
          
          {/* Main content */}
          <main className="relative z-10" style={{ maxHeight: '300vh' }}>
            {/* Hero Section */}
            <Hero />
            
            {/* Interviews Section - direct transition */}
            <InterviewsSection />
            
            {/* Footer with scroll-triggered animations */}
            <div ref={footerRef}>
              <Footer />
            </div>
          </main>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Index;
