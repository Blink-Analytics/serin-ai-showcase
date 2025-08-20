import React from 'react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { LucideIcon } from "lucide-react";

interface ChoiceButtonProps {
  onClick: () => void;
  icon: LucideIcon;
  title: string;
  description: string;
  className?: string;
}

export function ChoiceButton({ 
  onClick, 
  icon: Icon, 
  title, 
  description, 
  className = "" 
}: ChoiceButtonProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <Button
        onClick={onClick}
        className={`w-full bg-black/30 backdrop-blur-sm border border-white/10 hover:bg-black/40 text-white font-medium rounded-xl sm:rounded-2xl h-16 sm:h-20 text-sm sm:text-base transition-all duration-300 transform hover:shadow-lg active:scale-[0.98] flex items-center justify-start gap-3 sm:gap-4 px-4 sm:px-6 ${className}`}
      >
        <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-white flex-shrink-0" />
        <div className="text-left flex-1 min-w-0">
          <div className="font-medium text-white text-sm sm:text-base truncate">{title}</div>
          <div className="text-xs sm:text-sm text-white/60 truncate">{description}</div>
        </div>
      </Button>
    </motion.div>
  );
}
