import { useEffect, useState } from 'react';
import { 
  initializeTelegramSDK, 
  showMainButton, 
  hideMainButton,
  showMainButtonLoader,
  hideMainButtonLoader,
  triggerHapticFeedback,
  isRunningInTelegram,
  getCurrentTheme
} from '@/lib/telegram';

export interface UseTelegramOptions {
  onBackButton?: () => void;
}

export function useTelegram(options: UseTelegramOptions = {}) {
  const [isInitialized, setIsInitialized] = useState(false);
  const [theme, setTheme] = useState<'dark' | 'light'>(getCurrentTheme());
  const [isInTelegram, setIsInTelegram] = useState(isRunningInTelegram());

  // Initialize the SDK on mount
  useEffect(() => {
    const success = initializeTelegramSDK();
    setIsInitialized(success);
    
    // Setup back button handler if provided
    if (success && options.onBackButton && window.Telegram?.WebApp) {
      window.Telegram.WebApp.onEvent('backButtonClicked', options.onBackButton);
      
      // Enable back button if we have a handler
      if (window.Telegram.WebApp.BackButton) {
        window.Telegram.WebApp.BackButton.show();
      }
      
      return () => {
        // Clean up event listener
        window.Telegram.WebApp.offEvent('backButtonClicked', options.onBackButton);
        
        // Hide back button
        if (window.Telegram.WebApp.BackButton) {
          window.Telegram.WebApp.BackButton.hide();
        }
      };
    }
  }, [options.onBackButton]);

  // Listen for theme changes
  useEffect(() => {
    const handleThemeChange = () => {
      setTheme(getCurrentTheme());
    };
    
    if (window.Telegram?.WebApp) {
      window.Telegram.WebApp.onEvent('themeChanged', handleThemeChange);
      
      return () => {
        window.Telegram.WebApp.offEvent('themeChanged', handleThemeChange);
      };
    }
  }, []);

  return {
    isInitialized,
    isInTelegram,
    theme,
    showMainButton: (text: string, onClick: () => void) => showMainButton(text, onClick),
    hideMainButton,
    showMainButtonLoader,
    hideMainButtonLoader,
    triggerHapticFeedback,
    // Expose the WebApp object for advanced usage
    webApp: window.Telegram?.WebApp
  };
}

// Add type definitions for the Telegram WebApp
declare global {
  interface Window {
    Telegram?: {
      WebApp?: {
        colorScheme: string;
        BackButton?: {
          show: () => void;
          hide: () => void;
          isVisible: boolean;
        };
        MainButton?: {
          show: () => void;
          hide: () => void;
          setText: (text: string) => void;
          onClick: (callback: () => void) => void;
          offClick: (callback: () => void) => void;
          showProgress: (leaveActive?: boolean) => void;
          hideProgress: () => void;
          isActive: boolean;
          isVisible: boolean;
          isProgressVisible: boolean;
        };
        onEvent: (eventType: string, callback: () => void) => void;
        offEvent: (eventType: string, callback: () => void) => void;
        ready: () => void;
        expand: () => void;
        close: () => void;
      };
    };
  }
}
