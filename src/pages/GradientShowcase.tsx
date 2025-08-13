import { DemoVariant1 } from "@/components/demo";
import { 
  SubtleGradientHero, 
  StaticGradientSection, 
  IntenseGradientInteractive, 
  CustomPositionedGradient 
} from "@/components/GradientExamples";
import { GRADIENT_COLORS } from '@/lib/gradient-constants';

const GradientShowcase = () => {
  return (
    <div className="min-h-screen bg-black">
      {/* Main Demo */}
      <DemoVariant1 />
      
      {/* Example Variants */}
      <SubtleGradientHero />
      <StaticGradientSection />
      <IntenseGradientInteractive />
      <CustomPositionedGradient />
      
      {/* Footer */}
      <div className="relative bg-black py-12 text-center border-t border-gray-800/30">
        <div className="max-w-4xl mx-auto px-6">
          <h3 className="text-2xl font-bold text-white mb-4">
            AnimatedGradientBackground Component
          </h3>
          <p className="text-gray-400">
            Customizable animated radial gradients with breathing effects, 
            perfect for modern web applications with dark themes.
          </p>
          <div className="mt-8">
            <a 
              href="/" 
              className={`inline-block bg-gradient-to-r ${GRADIENT_COLORS.BUTTON_GRADIENT} hover:${GRADIENT_COLORS.BUTTON_GRADIENT_HOVER} text-white font-semibold px-6 py-3 rounded-full transition-all duration-300 transform hover:scale-105`}
            >
              Back to Main Site
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GradientShowcase;
