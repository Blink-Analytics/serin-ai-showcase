import { FloatingNavDemo } from "@/components/FloatingNavDemo";
import AnimatedGradientBackground from "@/components/ui/animated-gradient-background";
import { GRADIENT_COLORS, ANIMATION_CONFIG } from "@/lib/gradient-constants";
import { Brain, MessageCircle, BarChart3, Shield, Zap, Users } from "lucide-react";

const Features = () => {
  const features = [
    {
      icon: <Brain className="w-8 h-8" />,
      title: "AI-Powered Conversations",
      description: "Natural, dynamic interviews that adapt to candidate responses in real-time.",
      color: "text-purple-400"
    },
    {
      icon: <MessageCircle className="w-8 h-8" />,
      title: "Intelligent Questioning",
      description: "Context-aware follow-up questions based on candidate's experience and role requirements.",
      color: "text-blue-400"
    },
    {
      icon: <BarChart3 className="w-8 h-8" />,
      title: "Real-time Analytics",
      description: "Live sentiment analysis, skill assessment, and competency scoring during interviews.",
      color: "text-purple-400"
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Bias-Free Evaluation",
      description: "Objective assessment framework that eliminates unconscious bias in hiring decisions.",
      color: "text-blue-400"
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Instant Reports",
      description: "Comprehensive candidate evaluation reports generated immediately after interviews.",
      color: "text-purple-400"
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Team Collaboration",
      description: "Share insights and collaborate with hiring teams through integrated workflows.",
      color: "text-blue-400"
    }
  ];

  return (
    <div className="min-h-screen relative">
      <FloatingNavDemo />
      
      {/* Background */}
      <AnimatedGradientBackground 
        Breathing={true}
        startingGap={ANIMATION_CONFIG.SUBTLE.startingGap}
        breathingRange={ANIMATION_CONFIG.SUBTLE.breathingRange}
        animationSpeed={ANIMATION_CONFIG.SUBTLE.animationSpeed}
        topOffset={ANIMATION_CONFIG.SUBTLE.topOffset}
        gradientColors={GRADIENT_COLORS.BACKGROUND}
        gradientStops={GRADIENT_COLORS.STOPS}
      />
      
      <div className="relative z-10 pt-32 pb-20 px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-white mb-6 font-arimo">
              Features
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto font-arimo">
              Discover the powerful capabilities that make Serin the most advanced 
              AI interview agent in the market.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="bg-white/5 backdrop-blur-sm rounded-xl p-8 hover:bg-white/10 transition-all duration-300"
              >
                <div className={`${feature.color} mb-4`}>
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-bold text-white mb-4 font-arimo">
                  {feature.title}
                </h3>
                <p className="text-gray-300 leading-relaxed font-arimo">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
          
          <div className="mt-20 text-center">
            <div className="bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-2xl p-12 backdrop-blur-sm">
              <h2 className="text-4xl font-bold text-white mb-6 font-arimo">
                Ready to Transform Your Hiring?
              </h2>
              <p className="text-xl text-gray-300 mb-8 font-arimo">
                Join thousands of companies already using Serin to make better hiring decisions.
              </p>
              <button className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:from-purple-700 hover:to-blue-700 transition-all duration-200 font-arimo">
                Get Started Today
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features;
