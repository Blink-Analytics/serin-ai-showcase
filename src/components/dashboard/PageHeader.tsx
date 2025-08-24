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
      <div className="relative z-10 flex flex-row items-center justify-between gap-6 p-4">
        {/* Left side - Text content */}
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">{organizationName.charAt(0)}</span>
            </div>
            <span className="text-xs font-medium text-blue-400 bg-blue-400/10 px-2 py-1 rounded-full border border-blue-400/20">
              {organizationName}
            </span>
          </div>

          <h1 className="text-xl font-bold bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent mb-1">
            Welcome back, {userName}
          </h1>

          <p className="text-sm text-gray-400 mb-3">
            {subtitle}
          </p>

          <div className="bg-gradient-to-r from-green-500/10 to-blue-500/10 border border-green-500/20 rounded-lg p-2 max-w-sm">
            <div className="flex items-center gap-2 mb-1">
              <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-xs font-medium text-green-400">Key Insight</span>
            </div>
            <p className="text-white text-sm font-semibold">{keyInsight}</p>
          </div>
        </div>

        {/* Right side - Action button */}
        {buttonText && (
          <Button
            onClick={onButtonClick}
            className="bg-white/10 hover:bg-white/20 text-white border border-white/20 hover:border-white/40 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 backdrop-blur-sm shadow-lg hover:shadow-xl flex items-center gap-2"
          >
            {buttonIcon}
            <span>{buttonText}</span>
          </Button>
        )}
      </div>
    </motion.div>
  );
};
