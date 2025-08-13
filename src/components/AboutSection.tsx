import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';

const AboutSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section 
      ref={sectionRef}
      className={`scroll-section py-20 px-6 ${isVisible ? 'visible' : ''}`}
    >
      <div className="container mx-auto max-w-4xl text-center space-y-8">
        <h2 className="text-4xl md:text-5xl font-bold mb-8 bg-gradient-to-r from-accent-violet via-primary to-accent bg-clip-text text-transparent">
          The Future of Recruitment
        </h2>
        
        <div className="text-lg md:text-xl text-muted-foreground leading-relaxed space-y-6">
          <p>
            Serin represents a paradigm shift in how we approach talent acquisition. 
            By combining advanced natural language processing with deep learning algorithms, 
            we've created an AI that doesn't just ask questions—it understands context, 
            emotion, and potential.
          </p>
          
          <p>
            Our mission is to eliminate bias, reduce time-to-hire, and help companies 
            discover exceptional talent through intelligent, data-driven conversations 
            that reveal what traditional interviews might miss.
          </p>
        </div>

        <div className="flex gap-6 justify-center flex-wrap mt-12">
          <Button 
            size="lg" 
            className="bg-gradient-to-r from-primary to-accent-violet hover:from-primary-glow hover:to-accent text-white font-semibold px-8 py-4 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            Start Free Trial
          </Button>
          
          <Button 
            variant="outline" 
            size="lg"
            className="border-accent text-accent hover:bg-accent/10 font-semibold px-8 py-4 rounded-full transition-all duration-300"
          >
            Schedule Demo
          </Button>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;