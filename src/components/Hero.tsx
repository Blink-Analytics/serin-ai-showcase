import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { TextEffect } from '@/components/ui/text-effect';
import AudioPlayer from './AudioPlayer';

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [showAudioControls, setShowAudioControls] = useState(false);
  const [isScrollingDown, setIsScrollingDown] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 500);

    const audioTimer = setTimeout(() => {
      setShowAudioControls(true);
    }, 1500);

    // Handle scroll detection for exit animation
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const threshold = window.innerHeight * 0.3;
      
      if (scrollY > threshold && !isScrollingDown) {
        setIsScrollingDown(true);
      } else if (scrollY <= threshold && isScrollingDown) {
        setIsScrollingDown(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      clearTimeout(timer);
      clearTimeout(audioTimer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isScrollingDown]);

  const scrollToNextSection = () => {
    const nextSection = document.getElementById('features');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative px-6">
      <div className="text-center space-y-8 max-w-4xl">
        {isVisible && (
          <>
            <TextEffect
              as="h1"
              per="word"
              delay={0.2}
              trigger={!isScrollingDown}
              className="hero-text"
              variants={{
                container: {
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: {
                      staggerChildren: 0.08,
                    },
                  },
                  exit: {
                    opacity: 0,
                    transition: { 
                      staggerChildren: 0.05, 
                      staggerDirection: -1 
                    },
                  },
                },
                item: {
                  hidden: { 
                    opacity: 0, 
                    y: 30,
                    filter: 'blur(8px)' 
                  },
                  visible: { 
                    opacity: 1, 
                    y: 0,
                    filter: 'blur(0px)',
                    transition: {
                      type: "spring",
                      damping: 12,
                      stiffness: 200,
                    }
                  },
                  exit: { 
                    opacity: 0, 
                    y: -20,
                    filter: 'blur(8px)',
                    transition: {
                      duration: 0.3,
                    }
                  },
                },
              }}
            >
              Hello!, I'm Serin.
            </TextEffect>
            
            <p className="hero-subtitle max-w-2xl mx-auto">
              Your intelligent AI interview agent, designed to revolutionize 
              recruitment with advanced conversational capabilities and deep insights.
            </p>

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