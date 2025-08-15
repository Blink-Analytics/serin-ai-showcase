"use client"
import React from "react";
import { motion, MotionProps } from "motion/react";

import { cn } from "@/lib/utils";

interface GradientTextProps
  extends Omit<React.HTMLAttributes<HTMLElement>, keyof MotionProps> {
  className?: string;
  children: React.ReactNode;
  as?: React.ElementType;
}

function GradientText({
  className,
  children,
  as: Component = "span",
  ...props
}: GradientTextProps) {
  const MotionComponent = motion.create(Component);

  return (
    <MotionComponent
      className={cn(
        "relative inline-block bg-gradient-to-r from-red-500 via-pink-500 via-purple-500 via-violet-500 to-purple-600 bg-clip-text text-transparent animate-gradient-x",
        className,
      )}
      style={{
        backgroundSize: "400% 400%",
        animation: "gradient-x 6s ease infinite"
      }}
      {...props}
    >
      {children}
    </MotionComponent>
  );
}

export { GradientText }
