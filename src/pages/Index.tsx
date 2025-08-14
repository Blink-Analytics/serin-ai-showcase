import { useEffect } from 'react';
import AnimatedBackground from '@/components/AnimatedBackground';
import Hero from '@/components/Hero';
import FeatureSection from '@/components/FeatureSection';
import AboutSection from '@/components/AboutSection';
import { FloatingNavDemo } from '@/components/FloatingNavDemo';

const Index = () => {
  useEffect(() => {
    // Initialize smooth scrolling and animation triggers
    const handleScroll = () => {
      const sections = document.querySelectorAll('.scroll-section');
      
      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight * 0.8 && rect.bottom > 0;
        
        if (isVisible) {
          section.classList.add('visible');
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial state

    // Preload any assets
    const preloadImages = () => {
      // Add any image preloading logic here if needed
    };

    preloadImages();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="relative">
      {/* Floating Navigation - wait for intro animation on home page */}
      <FloatingNavDemo waitForIntro={true} />
      
      {/* Animated gradient background */}
      <AnimatedBackground />
      
      {/* Main content */}
      <main className="relative z-10">
        {/* Hero Section */}
        <Hero />
        
        {/* Features Section */}
        <FeatureSection />
        
        {/* About Section */}
        <AboutSection />
        
        {/* Contact/CTA Section */}
        <section className="scroll-section py-20 px-6 border-t border-border/20">
          <div className="container mx-auto max-w-4xl text-center space-y-8">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Transform Your Hiring?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Join leading companies already using Serin to revolutionize their recruitment process.
            </p>
            
            <div className="bg-gradient-to-r from-primary/10 to-accent-violet/10 backdrop-blur-xl rounded-3xl p-8 border border-primary/20">
              <div className="space-y-6">
                <h3 className="text-2xl font-semibold text-primary">Get Started Today</h3>
                <p className="text-muted-foreground">
                  Experience the future of AI-powered interviews with our risk-free trial.
                </p>
                <div className="flex gap-4 justify-center flex-wrap">
                  <button className="electric-glow bg-primary hover:bg-primary-glow text-primary-foreground font-semibold px-8 py-4 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl">
                    Start Free Trial
                  </button>
                  <button className="border-2 border-accent text-accent hover:bg-accent/10 font-semibold px-8 py-4 rounded-full transition-all duration-300">
                    Contact Sales
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="relative z-10 py-8 px-6 border-t border-border/20">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center text-muted-foreground">
            <p>&copy; 2024 Serin AI. Revolutionizing recruitment with intelligent conversations.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
