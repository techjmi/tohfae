// Window utility functions
export const isBrowser = typeof window !== 'undefined';
export const isServer = typeof window === 'undefined';

// Get current window URL
export const getWindowUrl = () => isBrowser ? window.location.href : '';

// Navigate to external URL
export const navigateToExternal = (url, target = '_self') => {
  if (!isBrowser || !url) return;
  
  if (target === '_blank') {
    window.open(url, '_blank', 'noopener,noreferrer');
  } else {
    window.location.href = url;
  }
};

// Reload current page
export const reloadPage = () => {
  if (isBrowser) window.location.reload();
};

// Scroll to top
export const scrollToTop = (behavior = 'smooth') => {
  if (isBrowser) {
    window.scrollTo({ top: 0, behavior });
  }
};

// Scroll to element
export const scrollToElement = (elementId, behavior = 'smooth') => {
  if (!isBrowser) return;
  
  const element = document.getElementById(elementId);
  if (element) {
    element.scrollIntoView({ behavior, block: 'start' });
  }
};

