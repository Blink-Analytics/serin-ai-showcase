import { useNavigate } from 'react-router-dom';
import { useState, useCallback } from 'react';

let globalTransitionState = {
  isNavigating: false,
  showBlackOverlay: false,
  listeners: new Set<() => void>()
};

export const useNavTransition = () => {
  const [, forceUpdate] = useState({});
  const navigate = useNavigate();

  const updateListeners = () => {
    globalTransitionState.listeners.forEach(listener => listener());
  };

  const triggerUpdate = useCallback(() => {
    forceUpdate({});
  }, []);

  // Subscribe to global state changes
  globalTransitionState.listeners.add(triggerUpdate);

  const navigateWithTransition = useCallback((path: string) => {
    // Immediately show black overlay with smooth fade
    globalTransitionState.isNavigating = true;
    globalTransitionState.showBlackOverlay = true;
    updateListeners();
    
    // Quick delay for smooth fade to black, then navigate
    setTimeout(() => {
      navigate(path);
      // Keep overlay during route change for smooth transition
      setTimeout(() => {
        globalTransitionState.isNavigating = false;
        globalTransitionState.showBlackOverlay = false;
        updateListeners();
      }, 100);
    }, 150);
  }, [navigate]);

  return {
    isNavigating: globalTransitionState.isNavigating,
    showBlackOverlay: globalTransitionState.showBlackOverlay,
    navigateWithTransition
  };
};
