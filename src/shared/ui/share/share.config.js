/**
 * Share Platform Configurations
 * 
 * Centralized configuration for social sharing platforms.
 * Each platform defines its share URL pattern and styling.
 */

/**
 * Generate share URL for a platform
 * @param {string} platform - Platform name
 * @param {string} url - URL to share
 * @param {string} title - Title/text to share
 * @param {string} text - Additional text
 * @returns {string} Share URL
 */
export const getShareUrl = (platform, url, title, text) => {
  const encodedUrl = encodeURIComponent(url || '');
  const encodedTitle = encodeURIComponent(title || '');
  const encodedText = encodeURIComponent(text || title || '');

  const shareUrls = {
    twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedText}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    whatsapp: `https://api.whatsapp.com/send?text=${encodedText}%20${encodedUrl}`,
    telegram: `https://t.me/share/url?url=${encodedUrl}&text=${encodedText}`,
    reddit: `https://reddit.com/submit?url=${encodedUrl}&title=${encodedTitle}`,
    pinterest: `https://pinterest.com/pin/create/button/?url=${encodedUrl}&description=${encodedText}`,
    email: `mailto:?subject=${encodedTitle}&body=${encodedText}%20${encodedUrl}`,
    sms: `sms:?body=${encodedText}%20${encodedUrl}`,
  };

  return shareUrls[platform] || '';
};

/**
 * Default platform configurations
 * Users can override or extend these
 */
export const DEFAULT_PLATFORMS = {
  copy: {
    label: 'Copy Link',
    icon: 'link',
    color: 'text-gray-700',
    hoverColor: 'hover:text-gray-900',
    type: 'copy',
  },
  twitter: {
    label: 'Twitter',
    icon: 'twitter',
    color: 'text-blue-400',
    hoverColor: 'hover:text-blue-500',
    type: 'share',
  },
  linkedin: {
    label: 'LinkedIn',
    icon: 'linkedin',
    color: 'text-blue-700',
    hoverColor: 'hover:text-blue-800',
    type: 'share',
  },
  facebook: {
    label: 'Facebook',
    icon: 'facebook',
    color: 'text-blue-600',
    hoverColor: 'hover:text-blue-700',
    type: 'share',
  },
  whatsapp: {
    label: 'WhatsApp',
    icon: 'whatsapp',
    color: 'text-green-500',
    hoverColor: 'hover:text-green-600',
    type: 'share',
  },
  telegram: {
    label: 'Telegram',
    icon: 'send',
    color: 'text-blue-500',
    hoverColor: 'hover:text-blue-600',
    type: 'share',
  },
  reddit: {
    label: 'Reddit',
    icon: 'messageCircle',
    color: 'text-orange-600',
    hoverColor: 'hover:text-orange-700',
    type: 'share',
  },
  pinterest: {
    label: 'Pinterest',
    icon: 'image',
    color: 'text-red-600',
    hoverColor: 'hover:text-red-700',
    type: 'share',
  },
  email: {
    label: 'Email',
    icon: 'mail',
    color: 'text-gray-600',
    hoverColor: 'hover:text-gray-700',
    type: 'share',
  },
  sms: {
    label: 'SMS',
    icon: 'messageSquare',
    color: 'text-green-600',
    hoverColor: 'hover:text-green-700',
    type: 'share',
  },
};

/**
 * Get platform configuration
 * Merges default config with custom config
 * @param {string} platformKey - Platform key
 * @param {Object} customConfig - Custom platform configuration
 * @returns {Object} Platform configuration
 */
export const getPlatformConfig = (platformKey, customConfig = {}) => {
  const defaultConfig = DEFAULT_PLATFORMS[platformKey] || {};
  return { ...defaultConfig, ...customConfig };
};

