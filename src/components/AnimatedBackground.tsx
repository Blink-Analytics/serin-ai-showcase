import { useEffect, useState } from 'react';

const AnimatedBackground = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="gradient-bg">
      {/* Additional floating elements for enhanced visual effect */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-primary rounded-full opacity-60 float-animation" 
             style={{ animationDelay: '0s' }} />
        <div className="absolute top-3/4 right-1/4 w-1 h-1 bg-accent-violet rounded-full opacity-40 float-animation" 
             style={{ animationDelay: '2s' }} />
        <div className="absolute bottom-1/4 left-3/4 w-1.5 h-1.5 bg-primary-glow rounded-full opacity-50 float-animation" 
             style={{ animationDelay: '4s' }} />
        <div className="absolute top-1/2 right-1/2 w-0.5 h-0.5 bg-accent rounded-full opacity-70 float-animation" 
             style={{ animationDelay: '1s' }} />
      </div>
    </div>
  );
};

export default AnimatedBackground;