/**
 * Centralized gradient colors for consistent theming throughout the application
 */

export const GRADIENT_COLORS = {
  // Core gradient colors for the animated background
  BACKGROUND: [
    "#000000", // Pure black background
    "#0D1117", // Very dark gray
    "#1A1B35", // Dark blue-gray  
    "#2A2F5A", // Deeper blue
    "#1E3A8A", // Dark blue
    "#3B82F6", // Electric blue
    "#6366F1", // Indigo
    "#8B5CF6", // Purple
    "#A855F7"  // Purple highlight
  ],
  
  // Gradient stops for smooth transitions
  STOPS: [20, 25, 35, 45, 55, 65, 75, 85, 100],
  
  // Individual colors for reuse
  PURE_BLACK: "#000000",
  DARK_GRAY: "#0D1117",
  DARK_BLUE_GRAY: "#1A1B35",
  DEEPER_BLUE: "#2A2F5A",
  DARK_BLUE: "#1E3A8A",
  ELECTRIC_BLUE: "#3B82F6",
  INDIGO: "#6366F1",
  PURPLE: "#8B5CF6",
  PURPLE_HIGHLIGHT: "#A855F7",
  
  // Text gradient colors
  TEXT_GRADIENT: "from-blue-400 via-purple-500 to-blue-600",
  
  // Glow effect colors
  GLOW: {
    BLUE: "from-blue-400/40 via-purple-500/50 to-blue-600/40",
    SUBTLE: "from-blue-500/20 via-purple-500/30 to-blue-600/20",
    ENHANCED: "from-blue-500/30 via-purple-500/40 to-blue-600/30"
  },
  
  // Button and UI element colors
  BUTTON_GRADIENT: "from-blue-600 to-purple-600",
  BUTTON_GRADIENT_HOVER: "from-blue-700 to-purple-700",
  
  // Border colors
  BORDER: "border-blue-500/20",
  BORDER_HOVER: "border-blue-400",
  
  // Background overlays
  OVERLAY: "from-blue-500/10 to-purple-500/10"
};

export const ANIMATION_CONFIG = {
  // Default animation settings for consistency
  BREATHING: {
    startingGap: 100,
    breathingRange: 20,
    animationSpeed: 0.02,
    topOffset: 20
  },
  
  // Subtle animation for sections
  SUBTLE: {
    startingGap: 110,
    breathingRange: 8,
    animationSpeed: 0.015,
    topOffset: 10
  },
  
  // Static gradient for non-animated sections
  STATIC: {
    startingGap: 120,
    breathingRange: 0,
    animationSpeed: 0,
    topOffset: 0
  }
};
