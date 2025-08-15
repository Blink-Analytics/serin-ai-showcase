import { useEffect, useState } from 'react';

const AnimatedBackground = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="gradient-bg">
      {/* Enhanced floating elements for seamless visual continuity */}
      <div className="absolute inset-0">
        {/* Top section particles */}
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-primary rounded-full opacity-60 float-animation" 
             style={{ animationDelay: '0s' }} />
        <div className="absolute top-1/6 right-1/3 w-1.5 h-1.5 bg-accent-violet rounded-full opacity-50 float-animation" 
             style={{ animationDelay: '1.5s' }} />
        
        {/* Middle section particles */}
        <div className="absolute top-1/2 left-1/6 w-1 h-1 bg-primary-glow rounded-full opacity-40 float-animation" 
             style={{ animationDelay: '3s' }} />
        <div className="absolute top-3/5 right-1/4 w-1.5 h-1.5 bg-accent rounded-full opacity-55 float-animation" 
             style={{ animationDelay: '2.5s' }} />
        
        {/* Bottom section particles */}
        <div className="absolute bottom-1/4 left-3/4 w-1.5 h-1.5 bg-primary-glow rounded-full opacity-50 float-animation" 
             style={{ animationDelay: '4s' }} />
        <div className="absolute bottom-1/3 right-1/2 w-0.5 h-0.5 bg-accent-violet rounded-full opacity-70 float-animation" 
             style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-1/6 left-1/5 w-1 h-1 bg-primary rounded-full opacity-45 float-animation" 
             style={{ animationDelay: '5s' }} />
      </div>
    </div>
  );
};

export default AnimatedBackground;