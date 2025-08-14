import React, { useEffect, useState } from 'react';

interface PerformanceMonitorProps {
  enabled?: boolean;
}

export const PerformanceMonitor: React.FC<PerformanceMonitorProps> = ({ 
  enabled = process.env.NODE_ENV === 'development' 
}) => {
  const [fps, setFps] = useState(0);
  const [deviceInfo, setDeviceInfo] = useState<string>('');

  useEffect(() => {
    if (!enabled) return;

    // Get device information
    const getDeviceInfo = () => {
      const isMobile = window.innerWidth < 768;
      const cores = navigator.hardwareConcurrency || 'unknown';
      const memory = (navigator as any).deviceMemory || 'unknown';
      const pixelRatio = window.devicePixelRatio || 1;
      
      return `${isMobile ? 'Mobile' : 'Desktop'} | Cores: ${cores} | Memory: ${memory}GB | DPR: ${pixelRatio}`;
    };

    setDeviceInfo(getDeviceInfo());

    // FPS monitoring
    let frames = 0;
    let lastTime = performance.now();
    
    const measureFPS = () => {
      frames++;
      const currentTime = performance.now();
      
      if (currentTime >= lastTime + 1000) {
        setFps(Math.round((frames * 1000) / (currentTime - lastTime)));
        frames = 0;
        lastTime = currentTime;
      }
      
      requestAnimationFrame(measureFPS);
    };

    measureFPS();
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div className="fixed top-4 right-4 bg-black/80 text-white p-2 rounded text-xs font-mono z-50">
      <div>FPS: {fps}</div>
      <div className="text-xs opacity-70">{deviceInfo}</div>
    </div>
  );
};
