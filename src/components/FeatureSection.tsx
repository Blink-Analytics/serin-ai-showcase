import { useEffect, useRef, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Brain, MessageSquare, BarChart3, Shield, Zap, Users } from 'lucide-react';

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
    <section id="features" className="scroll-section py-20 px-6">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary via-accent-violet to-primary bg-clip-text text-transparent">
            Intelligent Features
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Discover how Serin transforms the interview process with advanced AI capabilities 
            designed for modern recruitment needs.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            const isVisible = visibleCards.includes(index);
            
            return (
              <div
                key={feature.title}
                ref={el => cardRefs.current[index] = el}
                className={`feature-card transition-all duration-700 transform ${
                  isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                }`}
                style={{ transitionDelay: `${index * 0.1}s` }}
              >
                <Card className="h-full bg-transparent border-none">
                  <CardHeader className="space-y-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-accent-violet flex items-center justify-center">
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    <CardTitle className="text-2xl text-foreground">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-muted-foreground text-base leading-relaxed">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;