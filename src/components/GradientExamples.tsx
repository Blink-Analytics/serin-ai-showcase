import AnimatedGradientBackground from "@/components/ui/animated-gradient-background";

/**
 * Example components showcasing different AnimatedGradientBackground configurations
 */

// Variant 1: Subtle breathing effect for landing pages
export const SubtleGradientHero = () => {
  return (
    <div className="relative h-screen flex items-center justify-center overflow-hidden">
      <AnimatedGradientBackground 
        Breathing={true}
        startingGap={140}
        breathingRange={6}
        animationSpeed={0.008}
        topOffset={30}
      />
      <div className="relative z-10 text-center">
        <h1 className="text-6xl font-bold text-white mb-4">
          Welcome to the Future
        </h1>
        <p className="text-xl text-gray-300">
          Experience the power of animated gradients
        </p>
      </div>
    </div>
  );
};

// Variant 2: Static gradient for sections
export const StaticGradientSection = () => {
  return (
    <div className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
      <AnimatedGradientBackground 
        Breathing={false}
        startingGap={110}
        topOffset={0}
        gradientColors={[
          "#000000", 
          "#1A1A2E", 
          "#16213E", 
          "#0F3460",
          "#533483"
        ]}
        gradientStops={[40, 60, 75, 90, 100]}
      />
      <div className="relative z-10 text-center max-w-4xl px-6">
        <h2 className="text-4xl font-bold text-white mb-6">
          Static Gradient Background
        </h2>
        <p className="text-lg text-gray-300 leading-relaxed">
          Perfect for content sections where you want a beautiful gradient 
          without the distraction of animation.
        </p>
      </div>
    </div>
  );
};

// Variant 3: Intense breathing for interactive sections
export const IntenseGradientInteractive = () => {
  return (
    <div className="relative h-[80vh] flex items-center justify-center overflow-hidden">
      <AnimatedGradientBackground 
        Breathing={true}
        startingGap={100}
        breathingRange={15}
        animationSpeed={0.025}
        topOffset={10}
        gradientColors={[
          "#000000",
          "#0F0F23", 
          "#1A237E",
          "#3F51B5",
          "#9C27B0",
          "#E91E63"
        ]}
        gradientStops={[30, 45, 60, 75, 90, 100]}
      />
      <div className="relative z-10 text-center">
        <h2 className="text-5xl font-bold text-white mb-4">
          Interactive Zone
        </h2>
        <p className="text-xl text-gray-300 mb-8">
          More intense breathing effect for engaging interactions
        </p>
        <button className="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full font-semibold hover:scale-105 transition-transform">
          Interact Now
        </button>
      </div>
    </div>
  );
};

// Variant 4: Custom positioned gradient
export const CustomPositionedGradient = () => {
  return (
    <div className="relative h-screen flex items-start justify-start overflow-hidden">
      <AnimatedGradientBackground 
        Breathing={true}
        startingGap={80}
        breathingRange={5}
        animationSpeed={0.01}
        topOffset={-20}
        containerClassName="opacity-70"
        gradientColors={[
          "#000000",
          "#0D1B2A", 
          "#415A77",
          "#778DA9",
          "#E0E1DD"
        ]}
        gradientStops={[20, 40, 60, 80, 100]}
      />
      <div className="relative z-10 p-12">
        <h3 className="text-3xl font-bold text-white mb-4">
          Custom Positioned
        </h3>
        <p className="text-gray-300 max-w-md">
          This gradient is positioned differently and has custom opacity.
          Perfect for asymmetrical layouts.
        </p>
      </div>
    </div>
  );
};
