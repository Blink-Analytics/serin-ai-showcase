import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { TextEffect } from '@/components/ui/text-effect';
import AudioPlayer from './AudioPlayer';

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [showAudioControls, setShowAudioControls] = useState(false);
  const [isScrollingDown, setIsScrollingDown] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrollingDown(scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowAudioControls(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const scrollToNextSection = () => {
    const nextSection = document.getElementById('features');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="hero-container min-h-screen flex items-center justify-center relative">
      <div className="hero-content text-center space-y-8 max-w-6xl mx-auto px-4">
        {isVisible && (
          <>
            <div className="relative">
              <TextEffect
                as="h1"
                per="word"
                delay={0.3}
                trigger={!isScrollingDown}
                className="hero-text mb-8 drop-shadow-2xl text-white text-6xl md:text-7xl lg:text-8xl font-bold"
                preset="blur"
                variants={{
                  container: {
                    hidden: { opacity: 0 },
                    visible: {
                      opacity: 1,
                      transition: {
                        staggerChildren: 0.15,
                        delayChildren: 0.3,
                      },
                    },
                    exit: {
                      opacity: 1,
                      transition: { 
                        staggerChildren: 0.1, 
                        staggerDirection: -1,
                        duration: 0.6
                      },
                    },
                  },
                  item: {
                    hidden: { 
                      opacity: 0, 
                      filter: 'blur(20px)',
                      y: 30,
                      scale: 0.8
                    },
                    visible: { 
                      opacity: 1, 
                      filter: 'blur(0px)',
                      y: 0,
                      scale: 1,
                      transition: {
                        type: "spring",
                        damping: 25,
                        stiffness: 200,
                        duration: 0.8,
                      }
                    },
                    exit: { 
                      opacity: 0, 
                      filter: 'blur(15px)',
                      y: -20,
                      scale: 0.9,
                      transition: {
                        duration: 0.4,
                        ease: "easeInOut"
                      }
                    },
                  },
                }}
              >
                Hello! I'm Serin.
              </TextEffect>
              {/* Glow effect behind text - reduced blur */}
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-accent-violet/20 to-primary/20 blur-sm scale-110 -z-10" />
            </div>
            
            <div className={`transition-all duration-700 ${isScrollingDown ? 'opacity-0 translate-y-8' : 'opacity-100 translate-y-0'}`}>
              <p className="hero-subtitle max-w-3xl mx-auto leading-relaxed">
                Your intelligent AI interview agent, designed to revolutionize 
                recruitment with advanced conversational capabilities and deep insights.
              </p>
            </div>

            {showAudioControls && (
              <div className="space-y-6">
                <AudioPlayer />
                
                <div className="flex gap-4 justify-center flex-wrap">
                  <Button 
                    size="lg" 
                    className="electric-glow bg-primary hover:bg-primary-glow text-primary-foreground font-semibold px-8 py-4 rounded-full transition-all duration-300"
                    onClick={scrollToNextSection}
                  >
                    Explore Features
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    size="lg"
                    className="border-primary text-primary hover:bg-primary/10 font-semibold px-8 py-4 rounded-full transition-all duration-300"
                  >
                    Watch Demo
                  </Button>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* Scroll indicator */}
      {showAudioControls && (
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <div className="animate-bounce">
            <div className="w-6 h-10 border-2 border-primary rounded-full flex justify-center">
              <div className="w-1 h-3 bg-primary rounded-full mt-2 animate-pulse" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Hero;