export const MODAL_SIZE = {
  sm: "w-full max-w-sm mx-4",
  md: "w-full max-w-lg mx-4",
  lg: "w-full max-w-2xl mx-4",
  xl: "w-full max-w-4xl mx-4",
  full: "w-full max-w-full mx-4",
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
