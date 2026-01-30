/**
 * Drawer Constants
 * Configuration and constants for drawer components
 */

/**
 * Drawer position on screen
 */
export const DRAWER_POSITION = {
  left: "left",
  right: "right",
  top: "top",
  bottom: "bottom",
};

/**
 * Drawer sizes (width for left/right, height for top/bottom)
 */
export const DRAWER_SIZE = {
  sm: "w-72",    // 18rem (288px)
  md: "w-96",    // 24rem (384px)
  lg: "w-[28rem]", // 28rem (448px)
  xl: "w-[32rem]", // 32rem (512px)
  full: "w-screen",
};

/**
 * Drawer variants
 */
export const DRAWER_VARIANT = {
  temporary: "temporary",   // Overlay with backdrop, closes on outside click
  persistent: "persistent", // Pushes content, stays open
  permanent: "permanent",   // Always visible, part of layout
};

/**
 * Animation classes for open state
 */
export const DRAWER_ANIMATION = {
  left: "translate-x-0",
  right: "translate-x-0",
  top: "translate-y-0",
  bottom: "translate-y-0",
};

/**
 * Animation classes for closed state
 */
export const DRAWER_HIDDEN = {
  left: "-translate-x-full",
  right: "translate-x-full",
  top: "-translate-y-full",
  bottom: "translate-y-full",
};
