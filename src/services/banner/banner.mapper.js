/**
 * Banner Data Mapper
 *
 * Transform API response to contract format and vice versa
 *
 * Features:
 * - Map API response to banner contract format
 * - Handle missing/optional fields
 * - Support for single banner and array of banners
 */

/**
 * Map single banner from API response to contract format
 * @param {Object} apiBanner - Banner object from API
 * @returns {Object} Banner in contract format
 */
export const mapBannerFromAPI = (apiBanner) => {
  if (!apiBanner) return null;

  return {
    id: apiBanner._id || apiBanner.id,
    title: apiBanner.title,
    type: apiBanner.type,
    status: apiBanner.status,

    content: {
      heading: apiBanner.content?.heading || '',
      subheading: apiBanner.content?.subheading || '',
      description: apiBanner.content?.description || '',
      image: {
        desktop: apiBanner.content?.image?.desktop || '',
        tablet: apiBanner.content?.image?.tablet || apiBanner.content?.image?.desktop || '',
        mobile: apiBanner.content?.image?.mobile || apiBanner.content?.image?.desktop || '',
        alt: apiBanner.content?.image?.alt || apiBanner.title || '',
      },
      backgroundColor: apiBanner.content?.backgroundColor || null,
      textColor: apiBanner.content?.textColor || null,
    },

    cta: {
      enabled: apiBanner.cta?.enabled || false,
      type: apiBanner.cta?.type || 'none',
      text: apiBanner.cta?.text || apiBanner.cta?.CtaText || '',
      url: apiBanner.cta?.url || apiBanner.cta?.CtaUrl || '',
      params: apiBanner.cta?.params || {},
      openInNewTab: apiBanner.cta?.openInNewTab || false,
      variant: apiBanner.cta?.variant || 'solid',
      color: apiBanner.cta?.color || 'primary',
      size: apiBanner.cta?.size || 'md',
      fullWidth: apiBanner.cta?.fullWidth || false,
    },

    display: {
      position: apiBanner.display?.position || 'top',
      rule: apiBanner.display?.rule || 'always',
      interval: apiBanner.display?.interval || null,
      startPosition: apiBanner.display?.startPosition || null,
      endPosition: apiBanner.display?.endPosition || null,
      repeat: apiBanner.display?.repeat || false,
      priority: apiBanner.display?.priority || 0,
      animation: apiBanner.display?.animation || 'none',
      animationDuration: apiBanner.display?.animationDuration || 300,
    },

    targeting: {
      pages: apiBanner.targeting?.pages || [],
      categories: apiBanner.targeting?.categories || [],
      device: apiBanner.targeting?.device || 'all',
      userSegments: apiBanner.targeting?.userSegments || [],
    },

    scheduling: {
      startDate: apiBanner.scheduling?.startDate || null,
      endDate: apiBanner.scheduling?.endDate || null,
      daysOfWeek: apiBanner.scheduling?.daysOfWeek || [],
      timeRange: apiBanner.scheduling?.timeRange || null,
    },

    analytics: {
      trackImpressions: apiBanner.analytics?.trackImpressions || false,
      trackClicks: apiBanner.analytics?.trackClicks || false,
      campaignId: apiBanner.analytics?.campaignId || '',
      utmSource: apiBanner.analytics?.utmSource || '',
      utmMedium: apiBanner.analytics?.utmMedium || '',
      utmCampaign: apiBanner.analytics?.utmCampaign || '',
    },

    metadata: {
      createdAt: apiBanner.createdAt || apiBanner.metadata?.createdAt || null,
      updatedAt: apiBanner.updatedAt || apiBanner.metadata?.updatedAt || null,
      createdBy: apiBanner.metadata?.createdBy || null,
      version: apiBanner.metadata?.version || 1,
      notes: apiBanner.metadata?.notes || '',
    },
  };
};

/**
 * Map array of banners from API response to contract format
 * @param {Array} apiBanners - Array of banner objects from API
 * @returns {Array} Array of banners in contract format
 */
export const mapBannersFromAPI = (apiBanners) => {
  if (!Array.isArray(apiBanners)) return [];
  return apiBanners.map(mapBannerFromAPI).filter(Boolean);
};