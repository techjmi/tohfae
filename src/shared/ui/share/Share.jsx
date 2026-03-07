/**
 * Share Component (Molecule)
 *
 * Reusable social sharing component with multiple platforms.
 * Supports copy link, Twitter, LinkedIn, Facebook, WhatsApp, and custom platforms.
 *
 * Features:
 * - Horizontal and vertical layouts
 * - Custom message support
 * - Extensible platform configuration
 * - Button component integration
 * - Responsive design
 *
 * Props:
 * @param {string} url - URL to share (defaults to current page)
 * @param {string} title - Title/message to share
 * @param {string} text - Additional text for sharing
 * @param {string} layout - 'horizontal' | 'vertical' (default: 'horizontal')
 * @param {boolean} showLabels - Show platform labels (default: false)
 * @param {Array|Object} platforms - Array of platform keys or object with custom configs
 * @param {Object} customPlatforms - Custom platform configurations to add
 * @param {Function} onCopySuccess - Callback when link is copied
 * @param {Function} onCopyError - Callback when copy fails
 * @param {string} className - Additional CSS classes
 *
 * Usage:
 * <Share
 *   url="https://example.com/product"
 *   title="Check out this product!"
 *   layout="horizontal"
 *   platforms={['copy', 'twitter', 'facebook']}
 * />
 *
 * Custom Platform Example:
 * <Share
 *   customPlatforms={{
 *     custom: {
 *       label: 'Custom',
 *       icon: 'share',
 *       color: 'text-purple-600',
 *       onClick: (url, title) => console.log('Custom share', url)
 *     }
 *   }}
 *   platforms={['copy', 'custom']}
 * />
 */
"use client";

import React, { useState } from 'react';
import { Icon } from '@/shared/icons';
import Button from '@/shared/ui/button/Button';
import { copyToClipboard } from '@/shared/utils/copyToClipBoard';
import { getShareUrl, getPlatformConfig } from './share.config';

const Share = ({
  url,
  title = '',
  text = '',
  layout = 'horizontal',
  showLabels = false,
  platforms = ['copy', 'twitter', 'linkedin', 'facebook', 'whatsapp'],
  customPlatforms = {},
  onCopySuccess,
  onCopyError,
  className = '',
  ...props
}) => {
  const [copied, setCopied] = useState(false);

  // Get share URL (default to current page if in browser)
  const shareUrl = typeof window !== 'undefined' ? (url || window.location.href) : url;

  // Open share URL in new window
  const openShareWindow = (url) => {
    if (typeof window !== 'undefined') {
      window.open(url, '_blank', 'noopener,noreferrer,width=600,height=400');
    }
  };

  // Handle copy to clipboard
  const handleCopy = async () => {
    const success = copyToClipboard(shareUrl);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      if (onCopySuccess) onCopySuccess();
    } else {
      if (onCopyError) onCopyError();
    }
  };

  // Handle platform click
  const handlePlatformClick = (platformKey, customConfig) => {
    // If custom onClick is provided, use it
    if (customConfig?.onClick) {
      customConfig.onClick(shareUrl, title, text);
      return;
    }

    // Handle copy
    if (platformKey === 'copy') {
      handleCopy();
      return;
    }

    // Handle share platforms
    const shareUrlForPlatform = getShareUrl(platformKey, shareUrl, title, text);
    if (shareUrlForPlatform) {
      openShareWindow(shareUrlForPlatform);
    }
  };

  // Layout classes
  const containerClasses = layout === 'vertical'
    ? 'flex flex-col gap-2'
    : 'flex flex-row flex-wrap gap-2';

  // Get platform list (support both array and object)
  const platformList = Array.isArray(platforms) ? platforms : Object.keys(platforms);

  return (
    <div className={`${containerClasses} ${className}`} {...props}>
      {platformList.map((platformKey) => {
        // Get custom config if provided
        const customConfig = customPlatforms[platformKey] || (typeof platforms === 'object' ? platforms[platformKey] : null);

        // Get platform configuration
        const config = getPlatformConfig(platformKey, customConfig);

        if (!config.label) return null;

        // Handle copy button special state
        const isCopyButton = platformKey === 'copy';
        const displayLabel = isCopyButton && copied ? 'Copied!' : config.label;
        const displayIcon = isCopyButton && copied ? 'checkCircle' : config.icon;
        const displayColor = isCopyButton && copied ? 'text-green-600' : config.color;

        return (
          <Button
            key={platformKey}
            onClick={() => handlePlatformClick(platformKey, customConfig)}
            variant="outline"
            color="neutral"
            size="md"
            aria-label={displayLabel}
            className={`
              ${showLabels ? '' : '!p-2 !min-w-0'}
              rounded-full
              border-gray-200
              hover:border-gray-300
            `}
          >
            <Icon
              name={displayIcon}
              size={20}
              className={`${displayColor} ${config.hoverColor || ''}`}
            />
            {showLabels && (
              <span className="ml-2 text-sm font-medium">{displayLabel}</span>
            )}
          </Button>
        );
      })}
    </div>
  );
};

export default Share;

