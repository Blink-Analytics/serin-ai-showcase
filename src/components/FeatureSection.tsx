import { useEffect, useRef, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Brain, MessageSquare, BarChart3, Shield, Zap, Users } from 'lucide-react';
import { motion } from 'framer-motion';
import { GRADIENT_COLORS } from '@/lib/gradient-constants';

const features = [
  {
    icon: Brain,
    title: "Advanced AI Intelligence",
    description: "Powered by cutting-edge machine learning algorithms to conduct natural, insightful interviews."
  },
  {
    icon: MessageSquare,
    title: "Natural Conversations", 
    description: "Engages candidates with human-like dialogue flow and contextual understanding."
  },
  {
    icon: BarChart3,
    title: "Real-time Analytics",
    description: "Comprehensive insights and scoring with detailed performance metrics."
  },
  {
    icon: Shield,
    title: "Secure & Compliant",
    description: "Enterprise-grade security ensuring data privacy and regulatory compliance."
  },
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Instant interview setup with immediate results and feedback generation."
  },
  {
    icon: Users,
    title: "Scalable Solution",
    description: "Handle hundreds of interviews simultaneously with consistent quality."
  }
];

const FeatureSection = () => {
  const [visibleCards, setVisibleCards] = useState<number[]>([]);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observers = cardRefs.current.map((ref, index) => {
      if (!ref) return null;
      
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setVisibleCards(prev => [...prev.filter(i => i !== index), index]);
            }
          });
        },
        { threshold: 0.2 }
      );

      observer.observe(ref);
      return observer;
    });

    return () => {
      observers.forEach(observer => observer?.disconnect());
    };
  }, []);

  return (
    <motion.section 
      id="features" 
      className="relative z-10 py-32 px-6"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
    >
      <div className="container mx-auto max-w-6xl relative z-10">
        <motion.div 
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-500 to-blue-600 bg-clip-text text-transparent drop-shadow-2xl">
            Intelligent Features
          </h2>
          <p className="text-xl text-blue-200/80 max-w-3xl mx-auto leading-relaxed">
            Discover how Shree transforms the interview process with advanced AI capabilities 
            designed for modern recruitment needs.
          </p>
        </motion.div>

        <motion.div 
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          {features.map((feature, index) => {
            const Icon = feature.icon;
            const isVisible = visibleCards.includes(index);
            
            return (
              <motion.div
                key={feature.title}
                ref={el => cardRefs.current[index] = el}
                className="group relative"
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ 
                  duration: 0.6, 
                  delay: index * 0.1,
                  ease: [0.25, 0.1, 0.25, 1]
                }}
                whileHover={{ 
                  scale: 1.05, 
                  transition: { duration: 0.3 }
                }}
              >
                {/* Unified gradient card background */}
                <div className="relative h-full bg-gradient-to-br from-blue-600/10 via-purple-600/10 to-blue-800/10 backdrop-blur-xl rounded-3xl border border-blue-400/20 p-8 group-hover:border-blue-400/40 transition-all duration-500">
                  {/* Subtle glow effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-blue-600/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  <Card className="h-full bg-transparent border-none relative z-10">
                    <CardHeader className="space-y-6">
                      <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 via-purple-500 to-blue-600 flex items-center justify-center shadow-lg">
                        <Icon className="h-7 w-7 text-white" />
                      </div>
                      <CardTitle className="text-2xl text-white group-hover:text-blue-100 transition-colors duration-300">
                        {feature.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-blue-200/80 text-base leading-relaxed group-hover:text-blue-100/90 transition-colors duration-300">
                        {feature.description}
                      </CardDescription>
                    </CardContent>
                  </Card>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </motion.section>
  );
};

export default FeatureSection;