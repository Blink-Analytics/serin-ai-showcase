"use client";
import React, { useState, useEffect } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import { cn } from "@/lib/utils";
import { Link, useLocation } from "react-router-dom";

export const FloatingNav = ({
  navItems,
  className,
  waitForIntro = false,
  alwaysVisible = false,
}: {
  navItems: {
    name: string;
    link: string;
    icon?: JSX.Element;
  }[];
  className?: string;
  waitForIntro?: boolean;
  alwaysVisible?: boolean;
}) => {
  const { scrollYProgress } = useScroll();
  const location = useLocation();

  const [visible, setVisible] = useState(!waitForIntro || alwaysVisible);
  const [introComplete, setIntroComplete] = useState(!waitForIntro || alwaysVisible);

  // Show navbar after intro text animation completes (2.5 seconds) - only if waitForIntro is true
  useEffect(() => {
    if (waitForIntro) {
      const introTimer = setTimeout(() => {
        setIntroComplete(true);
        setVisible(true);
      }, 2500);

      return () => clearTimeout(introTimer);
    }
  }, [waitForIntro]);

  useMotionValueEvent(scrollYProgress, "change", (current) => {
    // Check if current is not undefined and is a number
    if (typeof current === "number") {
      // If alwaysVisible is true, keep navbar visible
      if (alwaysVisible) {
        setVisible(true);
        return;
      }
      
      // Only apply scroll-based visibility logic after intro is complete (or immediately if not waiting)
      if (waitForIntro && !introComplete) return;

      let direction = current! - scrollYProgress.getPrevious()!;

      // More user-friendly scroll behavior
      if (scrollYProgress.get() < 0.01) {
        // At the very top of the page, always show
        setVisible(true);
      } else {
        // Scrolling up - show navbar
        if (direction < -0.0005) {
          setVisible(true);
        } 
        // Scrolling down significantly - hide navbar (less sensitive)
        else if (direction > 0.008) {
          setVisible(false);
        }
        // Small movements or pauses - maintain current state for stability
      }
    }
  });

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{
          opacity: 0,
          y: -100,
        }}
        animate={{
          y: visible ? 0 : -100,
          opacity: visible ? 1 : 0,
        }}
        transition={{
          duration: 0.4,
          ease: "easeInOut",
        }}
        className={cn(
          "flex max-w-fit fixed top-10 inset-x-0 mx-auto border border-white/10 rounded-full bg-black/40 backdrop-blur-xl shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.3),0px_1px_0px_0px_rgba(25,28,33,0.1),0px_0px_0px_1px_rgba(25,28,33,0.2)] z-[5000] pr-2 pl-8 py-2 items-center justify-center space-x-4",
          className
        )}
      >
        {navItems.map((navItem: any, idx: number) => {
          const isActive = location.pathname === navItem.link;
          
          return (
            <Link
              key={`link=${idx}`}
              to={navItem.link}
              className={cn(
                "relative items-center flex space-x-1 transition-all duration-300 px-3 py-2 rounded-full",
                isActive 
                  ? "text-white bg-white/10 shadow-lg" 
                  : "text-gray-300 hover:text-white hover:bg-white/5"
              )}
            >
              <span className="block sm:hidden">{navItem.icon}</span>
              <span className="hidden sm:block text-sm font-arimo font-medium">{navItem.name}</span>
              
              {/* Active indicator */}
              {isActive && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-blue-500/20 rounded-full border border-purple-400/30"
                  initial={false}
                  transition={{
                    type: "spring",
                    stiffness: 500,
                    damping: 30
                  }}
                />
              )}
              
              {/* Hover glow effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-blue-500/10 rounded-full opacity-0"
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.2 }}
              />
            </Link>
          );
        })}
        <motion.button 
          className="border text-sm font-medium relative border-white/20 text-white px-4 py-2 rounded-full hover:bg-white/10 transition-all duration-300 font-arimo"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <span>Login</span>
          <span className="absolute inset-x-0 w-1/2 mx-auto -bottom-px bg-gradient-to-r from-transparent via-purple-500 to-transparent h-px" />
        </motion.button>
      </motion.div>
    </AnimatePresence>
  );
};