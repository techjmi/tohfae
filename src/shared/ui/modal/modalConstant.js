export const MODAL_SIZE = {
  sm: "w-[calc(100%-2rem)] sm:w-full max-w-sm",
  md: "w-[calc(100%-2rem)] sm:w-full max-w-lg",
  lg: "w-[calc(100%-2rem)] sm:w-full max-w-2xl",
  xl: "w-[calc(100%-2rem)] sm:w-full max-w-4xl",
  full: "w-[calc(100%-2rem)] sm:w-full max-w-full",
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
