/**
 * BannerCta Component
 * 
 * Handles CTA button rendering for banners
 * Supports multiple CTA types: URL, drawer, modal, custom action
 * 
 * Props:
 * @param {Object} cta - CTA configuration from banner contract
 * @param {function} onClick - Custom click handler
 * @param {string} className - Additional CSS classes
 * 
 * Usage:
 * <BannerCta cta={banner.cta} onClick={handleCtaClick} />
 */

"use client";
import React from 'react';
import Button from '@/shared/ui/button';
import { buildBannerCTAUrl, BANNER_CTA_TYPE } from '@/contract/banner.contract';

const BannerCta = ({ cta, onClick, className = '' }) => {
  if (!cta?.enabled || !cta?.text) return null;

  // Build URL for link types
  const ctaUrl = (cta.type === BANNER_CTA_TYPE.INTERNAL_LINK ||
                  cta.type === BANNER_CTA_TYPE.EXTERNAL_LINK ||
                  cta.type === BANNER_CTA_TYPE.PRODUCT_PAGE ||
                  cta.type === BANNER_CTA_TYPE.CATEGORY_PAGE)
    ? buildBannerCTAUrl(cta)
    : null;

  // Determine if CTA should be a button or link
  const asButton = cta.type === BANNER_CTA_TYPE.CUSTOM_ACTION || 
                   cta.type === BANNER_CTA_TYPE.MODAL ||
                   !ctaUrl;

  return (
    <Button
      as={asButton ? 'button' : 'a'}
      href={!asButton ? ctaUrl : undefined}
      onClick={onClick}
      variant={cta.variant || 'solid'}
      color={cta.color || 'primary'}
      size={cta.size || 'md'}
      target={cta.openInNewTab ? '_blank' : undefined}
      rel={cta.openInNewTab ? 'noopener noreferrer' : undefined}
      className={className}
    >
      {cta.text}
    </Button>
  );
};

export default BannerCta;

