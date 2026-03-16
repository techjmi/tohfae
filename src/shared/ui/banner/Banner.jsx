/**
 * Banner Component (Refactored)
 *
 * Generic banner component using Card composition
 * Same size as Card - works in product grids, category pages, etc.
 *
 * Features:
 * - Uses Card with CardImage, CardHeader, CardBody sub-components
 * - Supports multiple CTA types (URL, drawer, modal, custom action)
 * - Responsive images via OptimizedImage
 * - Custom background and text colors
 * - Closeable banners
 * - Flexible layouts (horizontal, vertical, image-only)
 *
 * Props:
 * @param {Object} banner - Banner data from banner contract
 * @param {string} layout - Layout type: 'horizontal' | 'vertical' | 'image-only' (default: 'horizontal')
 * @param {boolean} showImage - Show/hide image (default: true)
 * @param {boolean} closeable - Show close button (default: false)
 * @param {function} onClose - Close handler
 * @param {function} onCtaClick - Custom CTA click handler (for drawer/modal)
 * @param {string} className - Additional CSS classes
 *
 * Usage:
 * <Banner banner={bannerData} />
 * <Banner banner={bannerData} layout="vertical" />
 * <Banner banner={bannerData} onCtaClick={handleDrawerOpen} />
 */

"use client";
import React, { useState } from 'react';
import { Card, CardImage } from '@/shared/ui/card';
import Button from '@/shared/ui/button';
import { Icon } from '@/shared/icons';
import { buildBannerCTAUrl, BANNER_CTA_TYPE } from '@/contract/banner.contract';
import { classNames } from '@/shared/utils/classNames';

const Banner = ({
  banner,
  layout = 'horizontal',
  showImage = true,
  closeable = false,
  onClose,
  onCtaClick,
  className = '',
}) => {
  const [isVisible, setIsVisible] = useState(true);

  if (!banner || !isVisible) return null;

  const { content, cta } = banner;

  // Handle close
  const handleClose = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsVisible(false);
    if (onClose) onClose();
  };

  // Handle CTA click
  const handleCtaClick = (e) => {
    // For custom actions, modal, or drawer - prevent default and call custom handler
    if (cta?.type === BANNER_CTA_TYPE.CUSTOM_ACTION ||
        cta?.type === BANNER_CTA_TYPE.MODAL ||
        onCtaClick) {
      e.preventDefault();
      if (onCtaClick) {
        onCtaClick(banner, cta);
      }
    }
    // For links, let the default behavior happen (handled by Button component)
  };

  // Build CTA URL for link types
  const ctaUrl = cta?.enabled &&
    (cta.type === BANNER_CTA_TYPE.INTERNAL_LINK ||
     cta.type === BANNER_CTA_TYPE.EXTERNAL_LINK ||
     cta.type === BANNER_CTA_TYPE.PRODUCT_PAGE ||
     cta.type === BANNER_CTA_TYPE.CATEGORY_PAGE)
    ? buildBannerCTAUrl(cta)
    : null;

  // Determine if CTA should be a button or link
  const ctaAsButton = cta?.type === BANNER_CTA_TYPE.CUSTOM_ACTION ||
                      cta?.type === BANNER_CTA_TYPE.MODAL ||
                      !ctaUrl;

  return (
    <Card
      hoverable={!!cta?.enabled}
      shadow="sm"
      padding="none"
      className={classNames('group overflow-hidden transition-all duration-300 flex flex-col h-full', className)}
      style={{
        backgroundColor: content?.backgroundColor || undefined,
      }}
    >
      {/* Image with Heading Overlay (Mobile only) */}
      {showImage && content?.image && (
        <div className="relative">
          <CardImage
            images={content.image}
            alt={content.image.alt || content.heading || 'Banner'}
            aspectRatio="16/9"
            overlay={!!content.heading}
            overlayOpacity={0.3}
          />
          {/* Heading overlaid on image - MOBILE ONLY */}
          {content?.heading && (
            <div className="absolute inset-0 flex items-center justify-center p-4 md:hidden">
              <h3
                className="text-lg font-bold text-center text-white drop-shadow-lg"
                style={{ color: content.textColor || 'white' }}
              >
                {content.heading}
              </h3>
            </div>
          )}
        </div>
      )}

      {/* Content Section */}
      {layout !== 'image-only' && (
        <div className="flex flex-col grow p-4">
          {/* Close Button */}
          {closeable && (
            <button
              onClick={handleClose}
              className="absolute top-2 right-2 p-1.5 rounded-full hover:bg-gray-100 transition-colors z-10"
              aria-label="Close banner"
            >
              <Icon name="close" size={18} className="text-gray-600" />
            </button>
          )}

          {/* Text Content */}
          <div className="grow space-y-2 mb-3">
            {/* Heading - DESKTOP ONLY */}
            {content?.heading && (
              <h3
                className="hidden md:block text-xl font-bold"
                style={{ color: content.textColor || undefined }}
              >
                {content.heading}
              </h3>
            )}

            {/* Subheading */}
            {content?.subheading && (
              <p
                className="text-sm font-medium"
                style={{ color: content.textColor || content.backgroundColor ? 'inherit' : undefined }}
              >
                {content.subheading}
              </p>
            )}

            {/* Description */}
            {content?.description && (
              <p
                className="text-xs md:text-sm opacity-80"
                style={{ color: content.textColor || content.backgroundColor ? 'inherit' : undefined }}
              >
                {content.description}
              </p>
            )}
          </div>

          {/* CTA Button - Full width at bottom */}
          {cta?.enabled && cta?.text && (
            <Button
              as={ctaAsButton ? 'button' : 'a'}
              href={!ctaAsButton ? ctaUrl : undefined}
              onClick={handleCtaClick}
              variant={cta.variant}
              color='primary'
              size="md"
              target={cta.openInNewTab ? '_blank' : undefined}
              rel={cta.openInNewTab ? 'noopener noreferrer' : undefined}
              className="w-full"
            >
              {cta.text}
            </Button>
          )}
        </div>
      )}
    </Card>
  );
};

export default Banner;

