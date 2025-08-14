import React from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, RotateCcw, Volume2, VolumeX } from 'lucide-react';

interface AudioControlsProps {
  isPlaying: boolean;
  audioLoaded: boolean;
  audioError: boolean;
  isFallbackMode: boolean;
  onPlay: () => void;
  onPause: () => void;
  onStop: () => void;
  className?: string;
}

export const AudioControls: React.FC<AudioControlsProps> = ({
  isPlaying,
  audioLoaded,
  audioError,
  isFallbackMode,
  onPlay,
  onPause,
  onStop,
  className = ""
}) => {
  const handlePlayPause = () => {
    if (isPlaying) {
      onPause();
    } else {
      onPlay();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 3, duration: 0.5 }}
      className={`flex items-center gap-3 ${className}`}
    >
      {/* Audio Status Indicator */}
      <div className="flex items-center gap-2 text-sm text-gray-400">
        {audioError ? (
          <VolumeX className="w-4 h-4 text-yellow-500" />
        ) : (
          <Volume2 className="w-4 h-4 text-blue-400" />
        )}
        <span className="font-arimo">
          {audioError 
            ? 'Silent Mode' 
            : isFallbackMode 
            ? 'Timer Mode' 
            : audioLoaded 
            ? 'Audio Ready' 
            : 'Loading...'
          }
        </span>
      </div>

      {/* Play/Pause Button */}
      <motion.button
        onClick={handlePlayPause}
        className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg hover:shadow-xl transition-all duration-200"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        disabled={!audioLoaded && !isFallbackMode && !audioError}
      >
        {isPlaying ? (
          <Pause className="w-5 h-5" />
        ) : (
          <Play className="w-5 h-5 ml-0.5" />
        )}
      </motion.button>

      {/* Replay Button */}
      <motion.button
        onClick={onStop}
        className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-700 text-gray-300 hover:bg-gray-600 hover:text-white transition-all duration-200"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        title="Replay Animation"
      >
        <RotateCcw className="w-4 h-4" />
      </motion.button>
    </motion.div>
  );
};
