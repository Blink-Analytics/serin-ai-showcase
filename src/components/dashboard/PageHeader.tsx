import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { BarChart3 } from 'lucide-react';

interface PageHeaderProps {
  title: string;
  subtitle: string;
  buttonText?: string;
  buttonIcon?: React.ReactNode;
  onButtonClick?: () => void;
  organizationName?: string;
  userName?: string;
  keyInsight?: string;
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  subtitle,
  buttonText,
  buttonIcon,
  onButtonClick,
  organizationName = "TechCorp",
  userName = "Meet",
  keyInsight = "12 new interviews scheduled this week"
}) => {
  return (
    <motion.div 
      className="relative rounded-3xl bg-gradient-to-br from-blue-600/20 via-blue-800/10 to-black/40 backdrop-blur-xl border border-white/10 shadow-2xl overflow-hidden"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      {/* Enhanced gradient background */}
      <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/80 via-blue-900/60 to-black rounded-3xl" />
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent" />
      
      {/* Animated gradient overlay */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/5 to-transparent rounded-3xl"
        animate={{ 
          opacity: [0.3, 0.6, 0.3],
          scale: [1, 1.02, 1]
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Header Content */}
      <div className="relative z-10 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 lg:gap-16 p-8 lg:p-10">
        {/* Left side - Text content */}
        <motion.div 
          className="flex-1 mt-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
        >
          {/* Organization name and personalized greeting */}
          <motion.div 
            className="mb-4 flex items-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-lg">{organizationName.charAt(0)}</span>
            </div>
            <div>
              <span className="text-sm font-medium text-blue-400 bg-blue-400/10 px-3 py-1 rounded-full border border-blue-400/20">
                {organizationName}
              </span>
            </div>
          </motion.div>

          {/* Personalized greeting */}
          <motion.h1 
            className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent mb-4 leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            Welcome back, {userName}
          </motion.h1>

          {/* Subtitle */}
          <motion.p 
            className="text-lg text-gray-400 max-w-2xl leading-relaxed mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            {subtitle}
          </motion.p>

          {/* Key Insight */}
          <motion.div 
            className="bg-gradient-to-r from-green-500/10 to-blue-500/10 border border-green-500/20 rounded-lg p-4 max-w-md"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <div className="flex items-center gap-2 mb-1">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-green-400">Key Insight</span>
            </div>
            <p className="text-white font-semibold">{keyInsight}</p>
          </motion.div>
        </motion.div>

        {/* Right side - Action button */}
        {buttonText && (
          <motion.div
            className="flex items-start"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            <Button
              onClick={onButtonClick}
              className="bg-white/10 hover:bg-white/20 text-white border border-white/20 hover:border-white/40 px-8 py-3 rounded-full text-lg font-medium transition-all duration-300 backdrop-blur-sm shadow-xl hover:shadow-2xl flex items-center gap-3"
            >
              {buttonIcon}
              <span>{buttonText}</span>
            </Button>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};
