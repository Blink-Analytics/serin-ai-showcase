"use client"
import AnimatedGradientBackground from "@/components/ui/animated-gradient-background";
import { Footer } from '@/components/ui/footer-section-new';
import { motion } from "framer-motion";

const DemoVariant1 = () => {
  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Gradient Background with breathing animation */}
      <AnimatedGradientBackground 
        Breathing={true}
        startingGap={120}
        breathingRange={8}
        animationSpeed={0.015}
        topOffset={10}
      />

      <div className="relative z-10 flex flex-col items-center justify-center h-full px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.9 }}
          className="max-w-4xl"
        >
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6">
            Animated Gradient
            <span className="block bg-gradient-to-r from-blue-400 via-purple-500 to-blue-600 bg-clip-text text-transparent">
              Background
            </span>
          </h1>
          <p className="mt-4 text-lg text-gray-300 md:text-xl max-w-lg mx-auto">
            A customizable animated radial gradient background with a subtle
            breathing effect using dark blue, electric blue, and purple highlights.
          </p>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="mt-8"
          >
            <button className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105">
              Get Started
            </button>
          </motion.div>
        </motion.div>
      </div>
      
      {/* Footer */}
      <Footer />
    </div>
  );
};

// Demo for Footer component
export function DemoOne() {
	return (
		<div className="relative flex min-h-svh flex-col bg-black">
			<div className="min-h-screen flex items-center justify-center">
				<h1 className='font-mono text-2xl font-bold text-white'>Scroll Down!</h1>
			</div>
			<Footer />
		</div>
	);
}

export { DemoVariant1 };
