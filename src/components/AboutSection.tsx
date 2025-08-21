import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { GRADIENT_COLORS } from '@/lib/gradient-constants';

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
    <motion.section 
      ref={sectionRef}
      className="relative z-10 py-32 px-6"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
    >
      <div className="container mx-auto max-w-5xl text-center space-y-12 relative z-10">
        <motion.h2 
          className="text-4xl md:text-6xl font-bold mb-12 bg-gradient-to-r from-blue-300 via-purple-400 to-blue-500 bg-clip-text text-transparent drop-shadow-2xl"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          The Future of Recruitment
        </motion.h2>
        
        <motion.div 
          className="text-lg md:text-xl text-blue-100/90 leading-relaxed space-y-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <p className="backdrop-blur-sm bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-blue-600/10 rounded-2xl p-8 border border-blue-400/20">
            Shree represents a paradigm shift in how we approach talent acquisition. 
            By combining advanced natural language processing with deep learning algorithms, 
            we've created an AI that doesn't just ask questions—it understands context, 
            emotion, and potential.
          </p>
          
          <p className="backdrop-blur-sm bg-gradient-to-r from-purple-600/10 via-blue-600/10 to-purple-600/10 rounded-2xl p-8 border border-purple-400/20">
            Our mission is to eliminate bias, reduce time-to-hire, and help companies 
            discover exceptional talent through intelligent, data-driven conversations 
            that reveal what traditional interviews might miss.
          </p>
        </motion.div>

        <motion.div 
          className="flex gap-6 justify-center flex-wrap mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <Button 
            size="lg" 
            className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-700 hover:from-blue-700 hover:via-purple-700 hover:to-blue-800 text-white font-semibold px-10 py-4 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl border border-blue-400/30 hover:border-blue-300/50"
          >
            Start Free Trial
          </Button>
          
          <Button 
            variant="outline" 
            size="lg"
            className="border-2 border-blue-400/50 text-blue-200 hover:bg-blue-500/10 hover:border-blue-300 hover:text-blue-100 font-semibold px-10 py-4 rounded-full transition-all duration-300 backdrop-blur-sm"
          >
            Schedule Demo
          </Button>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default AboutSection;