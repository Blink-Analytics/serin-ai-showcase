import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import { ReactNode } from 'react';

interface PageTransitionProps {
  children: ReactNode;
}

const pageVariants = {
  initial: {
    opacity: 0,
    scale: 0.95,
    filter: 'blur(8px)',
  },
  in: {
    opacity: 1,
    scale: 1,
    filter: 'blur(0px)',
  },
  out: {
    opacity: 0,
    scale: 1.05,
    filter: 'blur(4px)',
  }
};

const pageTransition = {
  type: 'tween' as const,
  ease: [0.25, 0.1, 0.25, 1] as const,
  duration: 0.4 // Smooth duration
};

const gradientVariants = {
  initial: {
    opacity: 0,
    scale: 0.98
  },
  in: {
    opacity: 1,
    scale: 1
  },
  out: {
    opacity: 0,
    scale: 1.02
  }
};

export const PageTransition = ({ children }: PageTransitionProps) => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={location.pathname}
        initial="initial"
        animate="in"
        exit="out"
        variants={pageVariants}
        transition={pageTransition}
        className="relative min-h-screen"
      >
        {/* Fast gradient overlay for smooth transitions */}
        <motion.div
          className="fixed inset-0 z-[-1]"
          variants={gradientVariants}
          initial="initial"
          animate="in"
          exit="out"
          transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
          style={{
            background: `linear-gradient(180deg, 
              hsl(220 50% 2%) 0%, 
              hsl(240 80% 8%) 20%, 
              hsl(260 90% 15%) 40%, 
              hsl(270 95% 20%) 60%, 
              hsl(240 80% 12%) 80%, 
              hsl(220 50% 4%) 100%)`
          }}
        />
        
        {/* Page content */}
        <div className="relative z-10">
          {children}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
