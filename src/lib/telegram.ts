import { init, themeParams, mainButton, backButton, hapticFeedback } from '@telegram-apps/sdk';

/**
 * Initialize the Telegram Mini Apps SDK
 * This should be called as early as possible in the application lifecycle
 */
export function initializeTelegramSDK() {
  try {
    // Initialize the SDK
    init();
    
    // Mount theme parameters
    if (themeParams.mountSync.isAvailable()) {
      themeParams.mountSync();
      
      // Bind CSS variables for theming
      if (themeParams.bindCssVars.isAvailable()) {
        themeParams.bindCssVars();
      }
    }
    
    // Setup back button handling
    if (backButton.mount.isAvailable()) {
      backButton.mount();
    }
    
    console.log('Telegram SDK initialized successfully');
    return true;
  } catch (error) {
    console.error('Failed to initialize Telegram SDK:', error);
    return false;
  }
}

/**
 * Show the main button with the given text and color
 */
export function showMainButton(text: string, onClick: () => void) {
  if (!mainButton.setParams.isAvailable()) {
    console.warn('Main button is not available');
    return null;
  }
  
  // Configure and show the main button
  mainButton.setParams({
    text,
    isVisible: true,
    isEnabled: true,
    isLoaderVisible: false,
  });
  
  // Mount the button if not already mounted
  if (!mainButton.isMounted() && mainButton.mount.isAvailable()) {
    mainButton.mount();
  }
  
  // Add click handler
  if (mainButton.onClick.isAvailable()) {
    const offClick = mainButton.onClick(onClick);
    return offClick;
  }
  
  return null;
}

/**
 * Hide the main button
 */
export function hideMainButton() {
  if (mainButton.setParams.isAvailable()) {
    mainButton.setParams({
      isVisible: false,
    });
  }
}

/**
 * Show a loading indicator on the main button
 */
export function showMainButtonLoader() {
  if (mainButton.setParams.isAvailable()) {
    mainButton.setParams({
      isLoaderVisible: true,
      isEnabled: false,
    });
  }
}

/**
 * Hide the loading indicator on the main button
 */
export function hideMainButtonLoader() {
  if (mainButton.setParams.isAvailable()) {
    mainButton.setParams({
      isLoaderVisible: false,
      isEnabled: true,
    });
  }
}

/**
 * Trigger haptic feedback
 * @param type - The type of haptic feedback to trigger
 */
export function triggerHapticFeedback(
  type: 'impact' | 'notification' | 'selection' = 'impact'
) {
  if (!hapticFeedback.trigger.isAvailable()) {
    return;
  }
  
  switch (type) {
    case 'impact':
      hapticFeedback.trigger('impact');
      break;
    case 'notification':
      hapticFeedback.trigger('notification');
      break;
    case 'selection':
      hapticFeedback.trigger('selection');
      break;
  }
}

/**
 * Check if the app is running in Telegram
 */
export function isRunningInTelegram(): boolean {
  return window.Telegram?.WebApp !== undefined;
}

/**
 * Get the current theme (dark or light)
 */
export function getCurrentTheme(): 'dark' | 'light' {
  if (window.Telegram?.WebApp?.colorScheme) {
    return window.Telegram.WebApp.colorScheme as 'dark' | 'light';
  }
  
  // Fallback to system preference
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}
