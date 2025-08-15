import { useEffect, useState, useRef, useCallback } from 'react';

interface AudioSyncOptions {
  audioUrl: string;
  animationTimings: {
    hello: {
      start: number; // in milliseconds
      duration: number;
    };
    im: {
      start: number;
      duration: number;
    };
    shree: {
      start: number;
      duration: number;
    };
  };
  fallbackMode?: boolean; // Auto-play without audio if file not found
  onAnimationStart?: (section: 'hello' | 'im' | 'shree') => void;
  onAnimationComplete?: () => void;
}

export const useAudioSync = (options: AudioSyncOptions) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [showHello, setShowHello] = useState(false);
  const [showIm, setShowIm] = useState(false);
  const [showShree, setShowShree] = useState(false);
  const [audioLoaded, setAudioLoaded] = useState(false);
  const [audioError, setAudioError] = useState(false);
  const [isFallbackMode, setIsFallbackMode] = useState(false);
  
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const animationFrameRef = useRef<number>();
  const timersRef = useRef<NodeJS.Timeout[]>([]);

  // Initialize audio
  useEffect(() => {
    const audio = new Audio(options.audioUrl);
    audioRef.current = audio;

    const handleCanPlayThrough = () => {
      setAudioLoaded(true);
      setAudioError(false);
    };

    const handleError = () => {
      console.warn('Audio file not found, falling back to timer-based animation');
      setAudioError(true);
      setAudioLoaded(false);
      if (options.fallbackMode) {
        setIsFallbackMode(true);
      }
    };

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime * 1000); // Convert to milliseconds
    };

    const handleEnded = () => {
      setIsPlaying(false);
      options.onAnimationComplete?.();
    };

    audio.addEventListener('canplaythrough', handleCanPlayThrough);
    audio.addEventListener('error', handleError);
    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('canplaythrough', handleCanPlayThrough);
      audio.removeEventListener('error', handleError);
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('ended', handleEnded);
      audio.pause();
    };
  }, [options.audioUrl, options.fallbackMode, options.onAnimationComplete]);

  // Clear all timers
  const clearTimers = useCallback(() => {
    timersRef.current.forEach(timer => clearTimeout(timer));
    timersRef.current = [];
  }, []);

  // Fallback animation without audio
  const playFallback = useCallback(() => {
    setShowHello(false);
    setShowIm(false);
    setShowShree(false);
    clearTimers();
    setIsPlaying(true);

    const { hello, im, shree } = options.animationTimings;

    // Hello animation
    const helloTimer = setTimeout(() => {
      setShowHello(true);
      options.onAnimationStart?.('hello');
    }, hello.start);
    timersRef.current.push(helloTimer);

    // I'm animation
    const imTimer = setTimeout(() => {
      setShowIm(true);
      options.onAnimationStart?.('im');
    }, im.start);
    timersRef.current.push(imTimer);

    // Shree animation
    const shreeTimer = setTimeout(() => {
      setShowShree(true);
      options.onAnimationStart?.('shree');
    }, shree.start);
    timersRef.current.push(shreeTimer);

    // Complete animation
    const completeTimer = setTimeout(() => {
      setIsPlaying(false);
      options.onAnimationComplete?.();
    }, Math.max(hello.start + hello.duration, im.start + im.duration, shree.start + shree.duration));
    timersRef.current.push(completeTimer);
  }, [options, clearTimers]);

  // Start audio and animations
  const play = useCallback(async () => {
    // Use fallback mode if audio error or fallback enabled
    if (audioError || isFallbackMode || !audioRef.current) {
      playFallback();
      return;
    }

    if (!audioLoaded) return;

    try {
      // Reset states
      setShowHello(false);
      setShowIm(false);
      setShowShree(false);
      clearTimers();

      // Start audio
      audioRef.current.currentTime = 0;
      await audioRef.current.play();
      setIsPlaying(true);

      // Schedule animations based on audio timings
      const { hello, im, shree } = options.animationTimings;

      // Hello animation
      const helloTimer = setTimeout(() => {
        setShowHello(true);
        options.onAnimationStart?.('hello');
      }, hello.start);
      timersRef.current.push(helloTimer);

      // I'm animation
      const imTimer = setTimeout(() => {
        setShowIm(true);
        options.onAnimationStart?.('im');
      }, im.start);
      timersRef.current.push(imTimer);

      // Shree animation
      const shreeTimer = setTimeout(() => {
        setShowShree(true);
        options.onAnimationStart?.('shree');
      }, shree.start);
      timersRef.current.push(shreeTimer);

    } catch (error) {
      console.error('Error playing audio:', error);
      // Fallback to timer-based animation
      playFallback();
    }
  }, [audioLoaded, audioError, isFallbackMode, options, clearTimers, playFallback]);

  // Stop audio and animations
  const stop = useCallback(() => {
    if (audioRef.current && !audioError) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    setIsPlaying(false);
    setShowHello(false);
    setShowIm(false);
    setShowShree(false);
    clearTimers();
  }, [clearTimers, audioError]);

  // Pause audio
  const pause = useCallback(() => {
    if (audioRef.current && !audioError) {
      audioRef.current.pause();
    }
    setIsPlaying(false);
  }, [audioError]);

  // Resume audio
  const resume = useCallback(async () => {
    if (audioError || isFallbackMode) {
      // Can't resume in fallback mode, restart instead
      play();
      return;
    }

    if (audioRef.current && audioLoaded) {
      try {
        await audioRef.current.play();
        setIsPlaying(true);
      } catch (error) {
        console.error('Error resuming audio:', error);
      }
    }
  }, [audioLoaded, audioError, isFallbackMode, play]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      clearTimers();
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [clearTimers]);

  return {
    // State
    isPlaying,
    currentTime,
    audioLoaded,
    audioError,
    isFallbackMode,
    showHello,
    showIm,
    showShree,
    
    // Controls
    play,
    stop,
    pause,
    resume,
    
    // Audio element ref
    audioRef
  };
};
