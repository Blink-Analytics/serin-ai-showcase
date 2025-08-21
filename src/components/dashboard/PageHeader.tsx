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
}

export const PageHeader = ({ 
  title, 
  subtitle, 
  buttonText, 
  buttonIcon, 
  onButtonClick,
  organizationName = "TechCorp Inc."
}: PageHeaderProps) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="mb-12 relative overflow-hidden"
    >
      <div className="relative rounded-3xl p-12 lg:p-16 text-white shadow-2xl border border-white/10 overflow-hidden min-h-[280px] lg:min-h-[320px]">
        {/* Blue gradient from bottom left extending right and upward */}
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-blue-600 via-blue-900/80 to-black">
          {/* Subtle animated overlay for depth */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-transparent animate-pulse" 
               style={{ animationDuration: '4s' }} />
        </div>

        <div className="relative z-10 flex items-end justify-between h-full">
          <div className="flex-1 flex items-center justify-between">
            <div className="flex items-center gap-6">
              <div className="w-16 h-16 bg-white/20 rounded-3xl flex items-center justify-center backdrop-blur-sm border border-white/20 shadow-lg">
                <BarChart3 className="w-8 h-8 text-white" />
              </div>
              <div>
                <motion.h1 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                  className="text-xs text-white/90 font-semibold tracking-wide uppercase mb-2"
                >
                  {organizationName}
                </motion.h1>
                <motion.h2 
                  key={title}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                  className="text-4xl lg:text-5xl font-bold text-white drop-shadow-sm"
                >
                  {title}
                </motion.h2>
                <motion.p 
                  key={subtitle}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                  className="text-white/90 text-lg lg:text-xl max-w-3xl font-medium leading-relaxed drop-shadow-sm mt-3"
                >
                  {subtitle}
                </motion.p>
              </div>
            </div>
            
            {buttonText && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5, duration: 0.3 }}
              >
                <Button 
                  onClick={onButtonClick}
                  className="bg-white/20 hover:bg-white/30 text-white border border-white/30 backdrop-blur-sm px-8 py-4 rounded-3xl font-semibold transition-all duration-200 flex items-center gap-3 shadow-lg hover:shadow-xl text-base"
                >
                  {buttonIcon}
                  {buttonText}
                </Button>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};
