/**
 * Modal Constants
 * Styling constants for modal components
 */

export const MODAL_SIZE = {
  sm: "max-w-sm",
  md: "max-w-lg",
  lg: "max-w-2xl",
  xl: "max-w-4xl",
  full: "max-w-full mx-4",
};

export const MODAL_PLACEMENT = {
  center: {
    wrapper: "items-center justify-center",
    panel: "rounded-xl",
  },
  top: {
    wrapper: "items-start justify-center pt-20",
    panel: "rounded-xl",
  },
  bottom: {
    wrapper: "items-end justify-center",
    panel: "rounded-t-xl w-full",
  },
};

export const MODAL_BACKDROP = {
  default: "bg-black/40",
  dark: "bg-black/60",
  light: "bg-black/20",
  blur: "bg-black/40 backdrop-blur-sm",
};
