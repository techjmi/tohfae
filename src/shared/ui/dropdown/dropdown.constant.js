/**
 * Dropdown Constants
 *
 * Configuration and constants for dropdown components
 */

/**
 * Dropdown position relative to trigger element
 */
export const DROPDOWN_POSITION = {
    top: "top",
    topLeft: "top-left",
    topRight: "top-right",
    bottom: "bottom",
    bottomLeft: "bottom-left",
    bottomRight: "bottom-right",
    left: "left",
    leftTop: "left-top",
    leftBottom: "left-bottom",
    right: "right",
    rightTop: "right-top",
    rightBottom: "right-bottom",
};

/**
 * Dropdown visual variants
 */
export const DROPDOWN_VARIANT = {
    default: "default",
    transparent: "transparent",
    dark: "dark",
    light: "light",
    bordered: "bordered",
};

/**
 * Dropdown sizes
 */
export const DROPDOWN_SIZE = {
    xs: "xs",
    sm: "sm",
    md: "md",
    lg: "lg",
    xl: "xl",
    full: "full",
};

/**
 * Position class mappings
 */
export const POSITION_CLASSES = {
    top: "bottom-full left-1/2 -translate-x-1/2 mb-2",
    topLeft: "bottom-full left-0 mb-2",
    topRight: "bottom-full right-0 mb-2",
    bottom: "top-full left-1/2 -translate-x-1/2 mt-2",
    bottomLeft: "top-full left-0 mt-2",
    bottomRight: "top-full right-0 mt-2",
    left: "right-full top-1/2 -translate-y-1/2 mr-2",
    leftTop: "right-full top-0 mr-2",
    leftBottom: "right-full bottom-0 mr-2",
    right: "left-full top-1/2 -translate-y-1/2 ml-2",
    rightTop: "left-full top-0 ml-2",
    rightBottom: "left-full bottom-0 ml-2",
};

/**
 * Variant class mappings
 */
export const VARIANT_CLASSES = {
    default: "bg-white border border-gray-200 shadow-lg",
    transparent: "bg-white/95 backdrop-blur-sm border border-gray-200/50 shadow-lg",
    dark: "bg-gray-900 border border-gray-700 shadow-lg text-white",
    light: "bg-gray-50 border border-gray-300 shadow-md",
    bordered: "bg-white border border-gray-300 shadow-md",
};

/**
 * Size class mappings
 */
export const SIZE_CLASSES = {
    xs: "min-w-[120px] max-w-[200px]",
    sm: "min-w-[160px] max-w-[240px]",
    md: "min-w-[200px] max-w-[320px]",
    lg: "min-w-[280px] max-w-[400px]",
    xl: "min-w-[360px] max-w-[480px]",
    full: "w-full",
};

/**
 * Animation classes
 */
export const ANIMATION_CLASSES = {
    enter: "transition-all duration-200 ease-out",
    enterFrom: "opacity-0 scale-95",
    enterTo: "opacity-100 scale-100",
    leave: "transition-all duration-150 ease-in",
    leaveFrom: "opacity-100 scale-100",
    leaveTo: "opacity-0 scale-95",
};

/**
 * Helper function to get position classes
 */
export const getPositionClass = (position) => {
    return POSITION_CLASSES[position] || POSITION_CLASSES.bottom;
};

/**
 * Helper function to get variant classes
 */
export const getVariantClass = (variant) => {
    return VARIANT_CLASSES[variant] || VARIANT_CLASSES.default;
};

/**
 * Helper function to get size classes
 */
export const getSizeClass = (size) => {
    return SIZE_CLASSES[size] || SIZE_CLASSES.md;
};