import { useEffect } from 'react';
import Hero from '@/components/Hero';
import FeatureSection from '@/components/FeatureSection';
import AboutSection from '@/components/AboutSection';

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

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="relative bg-black min-h-screen">
      {/* Main content */}
      <main className="relative">
        {/* Hero Section - Full screen with integrated background */}
        <Hero />
        
        {/* Content sections with dark background */}
        <div className="bg-black relative z-10">
          {/* Features Section */}
          <FeatureSection />
          
          {/* About Section */}
          <AboutSection />
          
          {/* Contact/CTA Section */}
          <section className="scroll-section py-20 px-6 border-t border-gray-800/30">
            <div className="container mx-auto max-w-4xl text-center space-y-8">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
                Ready to Transform Your Hiring?
              </h2>
              <p className="text-lg text-gray-300 mb-8">
                Join leading companies already using Serin to revolutionize their recruitment process.
              </p>
              
              <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 backdrop-blur-xl rounded-3xl p-8 border border-blue-500/20">
                <div className="space-y-6">
                  <h3 className="text-2xl font-semibold text-blue-400">Get Started Today</h3>
                  <p className="text-gray-300">
                    Experience the future of AI-powered interviews with our risk-free trial.
                  </p>
                  <div className="flex gap-4 justify-center flex-wrap">
                    <button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold px-8 py-4 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
                      Start Free Trial
                    </button>
                    <button className="border-2 border-blue-500 text-blue-400 hover:bg-blue-500/10 hover:border-blue-400 font-semibold px-8 py-4 rounded-full transition-all duration-300">
                      Contact Sales
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 py-8 px-6 border-t border-gray-800/30 bg-black">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center text-gray-400">
            <p>&copy; 2024 Serin AI. Revolutionizing recruitment with intelligent conversations.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
