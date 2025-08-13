import { FloatingNavDemo } from "@/components/FloatingNavDemo";
import AnimatedGradientBackground from "@/components/ui/animated-gradient-background";
import { GRADIENT_COLORS, ANIMATION_CONFIG } from "@/lib/gradient-constants";

const About = () => {
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
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-white mb-8 font-arimo">
            About Serin
          </h1>
          
          <div className="space-y-8 text-lg text-gray-300 font-arimo leading-relaxed">
            <p>
              Serin is a revolutionary AI interview agent that transforms the hiring process 
              through intelligent conversations and deep candidate insights. Built with 
              cutting-edge natural language processing and machine learning technologies.
            </p>
            
            <div className="grid md:grid-cols-2 gap-8 mt-12">
              <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6">
                <h3 className="text-2xl font-bold text-purple-400 mb-4">Our Mission</h3>
                <p>
                  To revolutionize recruitment by making interviews more insightful, 
                  consistent, and bias-free through advanced AI technology.
                </p>
              </div>
              
              <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6">
                <h3 className="text-2xl font-bold text-blue-400 mb-4">Our Vision</h3>
                <p>
                  Creating a future where every hiring decision is backed by comprehensive 
                  data and human potential is recognized fairly.
                </p>
              </div>
            </div>
            
            <div className="mt-12">
              <h3 className="text-3xl font-bold text-white mb-6">Key Features</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <span className="text-purple-400 mr-3">•</span>
                  Natural conversation flow with adaptive questioning
                </li>
                <li className="flex items-start">
                  <span className="text-blue-400 mr-3">•</span>
                  Real-time sentiment and competency analysis
                </li>
                <li className="flex items-start">
                  <span className="text-purple-400 mr-3">•</span>
                  Comprehensive candidate evaluation reports
                </li>
                <li className="flex items-start">
                  <span className="text-blue-400 mr-3">•</span>
                  Integration with existing HR systems
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
