/**
 * Banner Service Constants
 *
 * Constants used by banner service and hooks
 */

// Re-export banner constants from contract for convenience
export {
  BANNER_TYPE,
  BANNER_STATUS,
  BANNER_POSITION,
  BANNER_DISPLAY_RULE,
  BANNER_CTA_TYPE,
  BANNER_TARGET_PAGE,
  BANNER_DEVICE_TARGET,
  BANNER_ANIMATION,
} from '@/contract/banner.contract';

// Default query params
export const DEFAULT_BANNER_PARAMS = {
  page: 'all',
  category: null,
  type: null,
  position: null,
};

// Hook options defaults
export const DEFAULT_HOOK_OPTIONS = {
  enabled: true,
  autoFetch: true,
  onSuccess: null,
  onError: null,
};
