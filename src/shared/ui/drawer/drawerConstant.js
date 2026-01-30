//this is the drawer constant file which will be used to handle the drawer constant of the drawer component
export const DRAWER_POSITION = {
  left: "left",
  right: "right",
  bottom: "bottom",
  top: "top",
};

export const DRAWER_SIZE = {
  sm: "w-72",
  md: "w-90",
  lg: "w-96",
  xl: "w-[28rem]",
  full: "w-screen",
};

export const DRAWER_VARIANT = {
  temporary: "temporary",   // overlay + backdrop
  persistent: "persistent", // pushes content
  permanent: "permanent",   // always visible
};

export const DRAWER_ANIMATION = {
  left: "translate-x-0",
  right: "translate-x-0",
  bottom: "translate-y-0",
};

export const DRAWER_HIDDEN = {
  left: "-translate-x-full",
  right: "translate-x-full",
  bottom: "translate-y-full",
};
