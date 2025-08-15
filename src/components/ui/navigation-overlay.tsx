import { motion, AnimatePresence } from 'framer-motion';

interface NavigationOverlayProps {
  isVisible: boolean;
}

export const NavigationOverlay = ({ isVisible }: NavigationOverlayProps) => {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ 
            duration: 0.15, 
            ease: [0.25, 0.1, 0.25, 1] 
          }}
          className="fixed inset-0 z-[9999] bg-black"
          style={{ pointerEvents: 'none' }}
        />
      )}
    </AnimatePresence>
  );
};
