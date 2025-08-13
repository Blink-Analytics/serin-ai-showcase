import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import AnimatedGradientBackground from '@/components/ui/animated-gradient-background';
import { GRADIENT_COLORS, ANIMATION_CONFIG } from '@/lib/gradient-constants';

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-black">
      {/* Animated Gradient Background */}
      <AnimatedGradientBackground 
        Breathing={true}
        startingGap={ANIMATION_CONFIG.SUBTLE.startingGap}
        breathingRange={ANIMATION_CONFIG.SUBTLE.breathingRange}
        animationSpeed={ANIMATION_CONFIG.SUBTLE.animationSpeed}
        topOffset={ANIMATION_CONFIG.SUBTLE.topOffset}
        gradientColors={GRADIENT_COLORS.BACKGROUND}
        gradientStops={GRADIENT_COLORS.STOPS}
      />
      
      <div className="text-center relative z-10">
        <h1 className="text-8xl md:text-9xl font-black text-white mb-8 drop-shadow-2xl">404</h1>
        <p className="text-2xl md:text-3xl text-gray-300 mb-8 font-semibold">Oops! Page not found</p>
        <p className="text-lg text-gray-400 mb-12 max-w-md mx-auto">
          The page you're looking for seems to have vanished into the digital void.
        </p>
        <a 
          href="/" 
          className={`inline-block bg-gradient-to-r ${GRADIENT_COLORS.BUTTON_GRADIENT} hover:${GRADIENT_COLORS.BUTTON_GRADIENT_HOVER} text-white font-semibold px-8 py-4 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl`}
        >
          Return to Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
