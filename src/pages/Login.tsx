import React from 'react';
import { motion } from 'framer-motion';
import { AuthCard } from '@/components/auth-card';
import AnimatedGradientBackground from '@/components/ui/animated-gradient-background';
import { FloatingNavDemo } from '@/components/FloatingNavDemo';

const Login = () => {
  const handleForgotPassword = () => {
    console.log('Forgot password clicked');
    // Implement forgot password logic
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated Background - same as other pages */}
      <AnimatedGradientBackground />
      
      {/* Navigation - always visible on login page */}
      <FloatingNavDemo alwaysVisible={true} />
      
      {/* Content with responsive spacing */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-20 pb-12">
        {/* Auth Card */}
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
          className="w-full max-w-md"
        >
          <AuthCard 
            onForgotPassword={handleForgotPassword}
          />
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
