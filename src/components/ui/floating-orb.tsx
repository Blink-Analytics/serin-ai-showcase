import React from 'react';
import { Component as OrbComponent } from '@/components/ui/orb';

interface FloatingOrbProps {
  className?: string;
  size?: 'small' | 'medium' | 'large';
  hue?: number;
  intensity?: number;
  opacity?: number;
}

const FloatingOrb: React.FC<FloatingOrbProps> = ({
  className = '',
  size = 'medium',
  hue = 270,
  intensity = 0.4,
  opacity = 0.3
}) => {
  const sizeClasses = {
    small: 'w-32 h-32',
    medium: 'w-48 h-48',
    large: 'w-64 h-64'
  };

  return (
    <div 
      className={`absolute pointer-events-none ${sizeClasses[size]} ${className}`}
      style={{ opacity }}
    >
      <OrbComponent
        hue={hue}
        hoverIntensity={intensity}
        rotateOnHover={false}
        forceHoverState={true}
      />
    </div>
  );
};

export default FloatingOrb;
