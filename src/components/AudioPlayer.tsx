import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';

const AudioPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  // For demo purposes, we'll use the Web Speech API to generate the greeting
  // In production, you would replace this with actual audio files
  const speakGreeting = () => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance("Hello! I'm Shree, your intelligent AI interview agent.");
      utterance.rate = 0.9;
      utterance.pitch = 1.1;
      utterance.volume = isMuted ? 0 : 1;
      
      utterance.onstart = () => setIsPlaying(true);
      utterance.onend = () => setIsPlaying(false);
      
      if (isPlaying) {
        speechSynthesis.cancel();
        setIsPlaying(false);
      } else {
        speechSynthesis.speak(utterance);
      }
    }
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    if (isPlaying) {
      speechSynthesis.cancel();
      setIsPlaying(false);
    }
  };

  return (
    <div className="flex items-center justify-center gap-4">
      <Button
        variant="outline"
        size="icon"
        onClick={speakGreeting}
        className="electric-glow bg-secondary/20 border-primary/30 hover:bg-primary/20 w-16 h-16 rounded-full"
        disabled={isMuted}
      >
        {isPlaying ? (
          <Pause className="h-6 w-6 text-primary" />
        ) : (
          <Play className="h-6 w-6 text-primary ml-1" />
        )}
      </Button>
      
      <Button
        variant="ghost"
        size="icon"
        onClick={toggleMute}
        className="text-muted-foreground hover:text-primary transition-colors w-10 h-10"
      >
        {isMuted ? (
          <VolumeX className="h-5 w-5" />
        ) : (
          <Volume2 className="h-5 w-5" />
        )}
      </Button>
      
      {isPlaying && (
        <div className="flex items-center gap-1">
          <div className="w-1 h-4 bg-primary rounded-full animate-pulse" style={{ animationDelay: '0s' }} />
          <div className="w-1 h-6 bg-primary rounded-full animate-pulse" style={{ animationDelay: '0.2s' }} />
          <div className="w-1 h-3 bg-primary rounded-full animate-pulse" style={{ animationDelay: '0.4s' }} />
          <div className="w-1 h-5 bg-primary rounded-full animate-pulse" style={{ animationDelay: '0.6s' }} />
        </div>
      )}
    </div>
  );
};

export default AudioPlayer;