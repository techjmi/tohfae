/**
 * Form Style Helper Functions
 *
 * Generic, reusable functions for form component styling
 * Following DRY principles - Don't Repeat Yourself
 */

import {
    INPUT_VARIANT,
    INPUT_SIZE,
    INPUT_STATE,
    INPUT_RADIUS,
    SELECT_VARIANT,
    SELECT_SIZE,
    SELECT_STATE,
    SELECT_RADIUS,
    TEXTAREA_VARIANT,
    TEXTAREA_SIZE,
    TEXTAREA_STATE,
    TEXTAREA_RADIUS,
    TEXTAREA_RESIZE,
    CHECKBOX_SIZE,
    CHECKBOX_STATE,
    CHECKBOX_VARIANT,
    RADIO_SIZE,
    RADIO_STATE,
    RADIO_VARIANT,
} from './form.constant';

// ============================================
// INPUT STYLE HELPERS (Generic Functions)
// ============================================

/**
 * Get base input classes (variant + state)
 * Generic function to avoid repetition
 */
export function getInputClasses(variant, state) {
    const baseClasses = "w-full transition-all duration-200 outline-none";

    // Variant styles
    const variantClasses = {
        [INPUT_VARIANT.SOLID]: {
            [INPUT_STATE.DEFAULT]: "bg-gray-100 border border-transparent text-gray-900 placeholder-gray-500 hover:bg-gray-200 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100",
            [INPUT_STATE.ERROR]: "bg-red-50 border border-red-500 text-red-900 placeholder-red-400 focus:border-red-600 focus:ring-2 focus:ring-red-100",
            [INPUT_STATE.SUCCESS]: "bg-green-50 border border-green-500 text-green-900 placeholder-green-400 focus:border-green-600 focus:ring-2 focus:ring-green-100",
            [INPUT_STATE.WARNING]: "bg-yellow-50 border border-yellow-500 text-yellow-900 placeholder-yellow-400 focus:border-yellow-600 focus:ring-2 focus:ring-yellow-100",
            [INPUT_STATE.DISABLED]: "bg-gray-100 border border-gray-200 text-gray-400 placeholder-gray-300 cursor-not-allowed",
            [INPUT_STATE.READONLY]: "bg-gray-50 border border-gray-200 text-gray-700 placeholder-gray-400 cursor-default",
        },
        [INPUT_VARIANT.OUTLINE]: {
            [INPUT_STATE.DEFAULT]: "bg-white border border-gray-300 text-gray-900 placeholder-gray-500 hover:border-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100",
            [INPUT_STATE.ERROR]: "bg-white border border-red-500 text-red-900 placeholder-red-400 focus:border-red-600 focus:ring-2 focus:ring-red-100",
            [INPUT_STATE.SUCCESS]: "bg-white border border-green-500 text-green-900 placeholder-green-400 focus:border-green-600 focus:ring-2 focus:ring-green-100",
            [INPUT_STATE.WARNING]: "bg-white border border-yellow-500 text-yellow-900 placeholder-yellow-400 focus:border-yellow-600 focus:ring-2 focus:ring-yellow-100",
            [INPUT_STATE.DISABLED]: "bg-gray-50 border border-gray-200 text-gray-400 placeholder-gray-300 cursor-not-allowed",
            [INPUT_STATE.READONLY]: "bg-gray-50 border border-gray-300 text-gray-700 placeholder-gray-400 cursor-default",
        },
        [INPUT_VARIANT.GHOST]: {
            [INPUT_STATE.DEFAULT]: "bg-transparent border border-transparent text-gray-900 placeholder-gray-500 hover:bg-gray-50 focus:bg-gray-50 focus:border-gray-300",
            [INPUT_STATE.ERROR]: "bg-transparent border border-transparent text-red-900 placeholder-red-400 hover:bg-red-50 focus:bg-red-50 focus:border-red-300",
            [INPUT_STATE.SUCCESS]: "bg-transparent border border-transparent text-green-900 placeholder-green-400 hover:bg-green-50 focus:bg-green-50 focus:border-green-300",
            [INPUT_STATE.WARNING]: "bg-transparent border border-transparent text-yellow-900 placeholder-yellow-400 hover:bg-yellow-50 focus:bg-yellow-50 focus:border-yellow-300",
            [INPUT_STATE.DISABLED]: "bg-transparent border border-transparent text-gray-400 placeholder-gray-300 cursor-not-allowed",
            [INPUT_STATE.READONLY]: "bg-transparent border border-transparent text-gray-700 placeholder-gray-400 cursor-default",
        },
        [INPUT_VARIANT.UNDERLINE]: {
            [INPUT_STATE.DEFAULT]: "bg-transparent border-0 border-b-2 border-gray-300 text-gray-900 placeholder-gray-500 rounded-none hover:border-gray-400 focus:border-blue-500",
            [INPUT_STATE.ERROR]: "bg-transparent border-0 border-b-2 border-red-500 text-red-900 placeholder-red-400 rounded-none focus:border-red-600",
            [INPUT_STATE.SUCCESS]: "bg-transparent border-0 border-b-2 border-green-500 text-green-900 placeholder-green-400 rounded-none focus:border-green-600",
            [INPUT_STATE.WARNING]: "bg-transparent border-0 border-b-2 border-yellow-500 text-yellow-900 placeholder-yellow-400 rounded-none focus:border-yellow-600",
            [INPUT_STATE.DISABLED]: "bg-transparent border-0 border-b-2 border-gray-200 text-gray-400 placeholder-gray-300 rounded-none cursor-not-allowed",
            [INPUT_STATE.READONLY]: "bg-transparent border-0 border-b-2 border-gray-300 text-gray-700 placeholder-gray-400 rounded-none cursor-default",
        },
    };

    const stateClass = variantClasses[variant]?.[state] || variantClasses[variant]?.[INPUT_STATE.DEFAULT] || "";

    return `${baseClasses} ${stateClass}`;
}

/**
 * Get input size classes
 * Generic function for consistent sizing
 */
export function getInputSizeClasses(size) {
    const sizeClasses = {
        [INPUT_SIZE.SM]: "px-3 py-1.5 text-sm",
        [INPUT_SIZE.MD]: "px-4 py-2 text-base",
        [INPUT_SIZE.LG]: "px-4 py-3 text-base",
        [INPUT_SIZE.XL]: "px-5 py-4 text-lg",
    };

    return sizeClasses[size] || sizeClasses[INPUT_SIZE.MD];
}

/**
 * Get input radius classes
 * Generic function for border radius
 */
export function getInputRadiusClasses(radius, variant) {
    // Underline variant doesn't use radius
    if (variant === INPUT_VARIANT.UNDERLINE) {
        return "rounded-none";
    }

    const radiusClasses = {
        [INPUT_RADIUS.NONE]: "rounded-none",
        [INPUT_RADIUS.SM]: "rounded-sm",
        [INPUT_RADIUS.MD]: "rounded-md",
        [INPUT_RADIUS.LG]: "rounded-lg",
        [INPUT_RADIUS.FULL]: "rounded-full",
    };

    return radiusClasses[radius] || radiusClasses[INPUT_RADIUS.MD];
}

/**
 * Get label classes based on size and state
 * Generic function for label styling
 */
export function getLabelClasses(size, state) {
    const baseClasses = "block font-medium mb-1.5";

    const sizeClasses = {
        [INPUT_SIZE.SM]: "text-sm",
        [INPUT_SIZE.MD]: "text-sm",
        [INPUT_SIZE.LG]: "text-base",
        [INPUT_SIZE.XL]: "text-base",
    };

    const stateClasses = {
        [INPUT_STATE.DEFAULT]: "text-gray-700",
        [INPUT_STATE.ERROR]: "text-red-700",
        [INPUT_STATE.SUCCESS]: "text-green-700",
        [INPUT_STATE.WARNING]: "text-yellow-700",
        [INPUT_STATE.DISABLED]: "text-gray-400",
        [INPUT_STATE.READONLY]: "text-gray-600",
    };

    const sizeClass = sizeClasses[size] || sizeClasses[INPUT_SIZE.MD];
    const stateClass = stateClasses[state] || stateClasses[INPUT_STATE.DEFAULT];

    return `${baseClasses} ${sizeClass} ${stateClass}`;
}

/**
 * Get helper text classes based on state
 * Generic function for helper/error text
 */
export function getHelperTextClasses(state) {
    const baseClasses = "mt-1.5 text-sm";

    const stateClasses = {
        [INPUT_STATE.DEFAULT]: "text-gray-600",
        [INPUT_STATE.ERROR]: "text-red-600",
        [INPUT_STATE.SUCCESS]: "text-green-600",
        [INPUT_STATE.WARNING]: "text-yellow-600",
        [INPUT_STATE.DISABLED]: "text-gray-400",
        [INPUT_STATE.READONLY]: "text-gray-500",
    };

    const stateClass = stateClasses[state] || stateClasses[INPUT_STATE.DEFAULT];

    return `${baseClasses} ${stateClass}`;
}

/**
 * Get icon wrapper classes based on position and size
 * Generic function for icon positioning
 */
export function getIconWrapperClasses(position, size) {
    // Removed pointer-events-none to allow interactive suffix icons (like clear buttons)
    const baseClasses = "absolute top-1/2 -translate-y-1/2 flex items-center justify-center";

    const positionClasses = {
        prefix: "left-0",
        suffix: "right-0",
    };

    const sizeClasses = {
        [INPUT_SIZE.SM]: position === "prefix" ? "pl-3" : "pr-3",
        [INPUT_SIZE.MD]: position === "prefix" ? "pl-4" : "pr-4",
        [INPUT_SIZE.LG]: position === "prefix" ? "pl-4" : "pr-4",
        [INPUT_SIZE.XL]: position === "prefix" ? "pl-5" : "pr-5",
    };

    const positionClass = positionClasses[position] || "";
    const sizeClass = sizeClasses[size] || sizeClasses[INPUT_SIZE.MD];

    return `${baseClasses} ${positionClass} ${sizeClass}`;
}

/**
 * Get icon padding classes for input when icon is present
 * Generic function to add padding when icons are used
 */
export function getIconPaddingClasses(prefixIcon, suffixIcon, size) {
    const paddingClasses = {
        [INPUT_SIZE.SM]: {
            prefix: "pl-9",
            suffix: "pr-9",
        },
        [INPUT_SIZE.MD]: {
            prefix: "pl-10",
            suffix: "pr-10",
        },
        [INPUT_SIZE.LG]: {
            prefix: "pl-11",
            suffix: "pr-11",
        },
        [INPUT_SIZE.XL]: {
            prefix: "pl-12",
            suffix: "pr-12",
        },
    };

    const sizePadding = paddingClasses[size] || paddingClasses[INPUT_SIZE.MD];

    let classes = "";
    if (prefixIcon) classes += sizePadding.prefix + " ";
    if (suffixIcon) classes += sizePadding.suffix;

    return classes.trim();
}

// ============================================
// SELECT STYLE HELPERS (Generic Functions)
// ============================================

/**
 * Get base select classes (variant + state)
 * Reuses INPUT styling logic for consistency
 */
export function getSelectClasses(variant, state) {
    const baseClasses = "w-full transition-all duration-200 outline-none appearance-none cursor-pointer";

    // Enhanced variant styles with better shadows and focus states
    const variantClasses = {
        [SELECT_VARIANT.SOLID]: {
            [SELECT_STATE.DEFAULT]: "bg-gray-100 border border-transparent text-gray-900 hover:bg-gray-200 hover:shadow-sm focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 focus:shadow-md",
            [SELECT_STATE.ERROR]: "bg-red-50 border border-red-500 text-red-900 focus:border-red-600 focus:ring-2 focus:ring-red-100 focus:shadow-md",
            [SELECT_STATE.SUCCESS]: "bg-green-50 border border-green-500 text-green-900 focus:border-green-600 focus:ring-2 focus:ring-green-100 focus:shadow-md",
            [SELECT_STATE.WARNING]: "bg-yellow-50 border border-yellow-500 text-yellow-900 focus:border-yellow-600 focus:ring-2 focus:ring-yellow-100 focus:shadow-md",
            [SELECT_STATE.DISABLED]: "bg-gray-100 border border-gray-200 text-gray-400 cursor-not-allowed opacity-60",
        },
        [SELECT_VARIANT.OUTLINE]: {
            [SELECT_STATE.DEFAULT]: "bg-white border-2 border-gray-300 text-gray-900 hover:border-gray-400 hover:shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-100 focus:shadow-md",
            [SELECT_STATE.ERROR]: "bg-white border-2 border-red-500 text-red-900 focus:border-red-600 focus:ring-2 focus:ring-red-100 focus:shadow-md",
            [SELECT_STATE.SUCCESS]: "bg-white border-2 border-green-500 text-green-900 focus:border-green-600 focus:ring-2 focus:ring-green-100 focus:shadow-md",
            [SELECT_STATE.WARNING]: "bg-white border-2 border-yellow-500 text-yellow-900 focus:border-yellow-600 focus:ring-2 focus:ring-yellow-100 focus:shadow-md",
            [SELECT_STATE.DISABLED]: "bg-gray-50 border-2 border-gray-200 text-gray-400 cursor-not-allowed opacity-60",
        },
        [SELECT_VARIANT.GHOST]: {
            [SELECT_STATE.DEFAULT]: "bg-transparent border border-transparent text-gray-900 hover:bg-gray-50 hover:shadow-sm focus:bg-gray-50 focus:border-gray-300 focus:shadow-md",
            [SELECT_STATE.ERROR]: "bg-transparent border border-transparent text-red-900 hover:bg-red-50 focus:bg-red-50 focus:border-red-300 focus:shadow-md",
            [SELECT_STATE.SUCCESS]: "bg-transparent border border-transparent text-green-900 hover:bg-green-50 focus:bg-green-50 focus:border-green-300 focus:shadow-md",
            [SELECT_STATE.WARNING]: "bg-transparent border border-transparent text-yellow-900 hover:bg-yellow-50 focus:bg-yellow-50 focus:border-yellow-300 focus:shadow-md",
            [SELECT_STATE.DISABLED]: "bg-transparent border border-transparent text-gray-400 cursor-not-allowed opacity-60",
        },
    };

    const stateClass = variantClasses[variant]?.[state] || variantClasses[variant]?.[SELECT_STATE.DEFAULT] || "";

    return `${baseClasses} ${stateClass}`;
}

/**
 * Get select size classes
 * Enhanced with better padding and spacing for dropdown arrow
 */
export function getSelectSizeClasses(size) {
    const sizeClasses = {
        [SELECT_SIZE.SM]: "px-3 py-2 text-sm leading-tight",
        [SELECT_SIZE.MD]: "px-4 py-2.5 text-base leading-normal",
        [SELECT_SIZE.LG]: "px-4 py-3 text-base leading-relaxed",
        [SELECT_SIZE.XL]: "px-5 py-4 text-lg leading-relaxed",
    };

    return sizeClasses[size] || sizeClasses[SELECT_SIZE.MD];
}

/**
 * Get select radius classes
 * Reuses INPUT radius for consistency
 */
export function getSelectRadiusClasses(radius) {
    const radiusClasses = {
        [SELECT_RADIUS.NONE]: "rounded-none",
        [SELECT_RADIUS.SM]: "rounded-sm",
        [SELECT_RADIUS.MD]: "rounded-md",
        [SELECT_RADIUS.LG]: "rounded-lg",
        [SELECT_RADIUS.FULL]: "rounded-full",
    };

    return radiusClasses[radius] || radiusClasses[SELECT_RADIUS.MD];
}

// ============================================
// TEXTAREA STYLE HELPERS
// ============================================

export function getTextareaClasses(variant, state) {
    const baseClasses = "w-full transition-all duration-200 outline-none";

    const variantClasses = {
        [TEXTAREA_VARIANT.SOLID]: {
            [TEXTAREA_STATE.DEFAULT]: "bg-gray-100 border border-transparent text-gray-900 hover:bg-gray-200 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100",
            [TEXTAREA_STATE.ERROR]: "bg-red-50 border border-red-500 text-red-900 focus:border-red-600 focus:ring-2 focus:ring-red-100",
            [TEXTAREA_STATE.SUCCESS]: "bg-green-50 border border-green-500 text-green-900 focus:border-green-600 focus:ring-2 focus:ring-green-100",
            [TEXTAREA_STATE.WARNING]: "bg-yellow-50 border border-yellow-500 text-yellow-900 focus:border-yellow-600 focus:ring-2 focus:ring-yellow-100",
            [TEXTAREA_STATE.DISABLED]: "bg-gray-100 border border-gray-200 text-gray-400 cursor-not-allowed",
            [TEXTAREA_STATE.READONLY]: "bg-gray-50 border border-gray-200 text-gray-700 cursor-default",
        },
        [TEXTAREA_VARIANT.OUTLINE]: {
            [TEXTAREA_STATE.DEFAULT]: "bg-white border border-gray-300 text-gray-900 hover:border-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100",
            [TEXTAREA_STATE.ERROR]: "bg-white border border-red-500 text-red-900 focus:border-red-600 focus:ring-2 focus:ring-red-100",
            [TEXTAREA_STATE.SUCCESS]: "bg-white border border-green-500 text-green-900 focus:border-green-600 focus:ring-2 focus:ring-green-100",
            [TEXTAREA_STATE.WARNING]: "bg-white border border-yellow-500 text-yellow-900 focus:border-yellow-600 focus:ring-2 focus:ring-yellow-100",
            [TEXTAREA_STATE.DISABLED]: "bg-gray-50 border border-gray-200 text-gray-400 cursor-not-allowed",
            [TEXTAREA_STATE.READONLY]: "bg-gray-50 border border-gray-200 text-gray-700 cursor-default",
        },
        [TEXTAREA_VARIANT.GHOST]: {
            [TEXTAREA_STATE.DEFAULT]: "bg-transparent border border-transparent text-gray-900 hover:bg-gray-50 focus:bg-gray-50 focus:border-gray-300",
            [TEXTAREA_STATE.ERROR]: "bg-transparent border border-transparent text-red-900 hover:bg-red-50 focus:bg-red-50 focus:border-red-300",
            [TEXTAREA_STATE.SUCCESS]: "bg-transparent border border-transparent text-green-900 hover:bg-green-50 focus:bg-green-50 focus:border-green-300",
            [TEXTAREA_STATE.WARNING]: "bg-transparent border border-transparent text-yellow-900 hover:bg-yellow-50 focus:bg-yellow-50 focus:border-yellow-300",
            [TEXTAREA_STATE.DISABLED]: "bg-transparent border border-transparent text-gray-400 cursor-not-allowed",
            [TEXTAREA_STATE.READONLY]: "bg-transparent border border-transparent text-gray-700 cursor-default",
        },
    };

    const stateClass = variantClasses[variant]?.[state] || variantClasses[variant]?.[TEXTAREA_STATE.DEFAULT] || "";
    return `${baseClasses} ${stateClass}`;
}

export function getTextareaSizeClasses(size) {
    const sizeClasses = {
        [TEXTAREA_SIZE.SM]: "px-3 py-1.5 text-sm",
        [TEXTAREA_SIZE.MD]: "px-4 py-2 text-base",
        [TEXTAREA_SIZE.LG]: "px-4 py-3 text-base",
        [TEXTAREA_SIZE.XL]: "px-5 py-4 text-lg",
    };
    return sizeClasses[size] || sizeClasses[TEXTAREA_SIZE.MD];
}

export function getTextareaRadiusClasses(radius) {
    const radiusClasses = {
        [TEXTAREA_RADIUS.NONE]: "rounded-none",
        [TEXTAREA_RADIUS.SM]: "rounded-sm",
        [TEXTAREA_RADIUS.MD]: "rounded-md",
        [TEXTAREA_RADIUS.LG]: "rounded-lg",
    };
    return radiusClasses[radius] || radiusClasses[TEXTAREA_RADIUS.MD];
}

export function getTextareaResizeClasses(resize) {
    const resizeClasses = {
        [TEXTAREA_RESIZE.NONE]: "resize-none",
        [TEXTAREA_RESIZE.VERTICAL]: "resize-y",
        [TEXTAREA_RESIZE.HORIZONTAL]: "resize-x",
        [TEXTAREA_RESIZE.BOTH]: "resize",
    };
    return resizeClasses[resize] || resizeClasses[TEXTAREA_RESIZE.VERTICAL];
}

// ============================================
// CHECKBOX STYLE HELPERS
// ============================================

export function getCheckboxClasses(variant, state) {
    const baseClasses = "cursor-pointer transition-all duration-200";

    const variantClasses = {
        [CHECKBOX_VARIANT.SOLID]: {
            [CHECKBOX_STATE.DEFAULT]: "accent-blue-600 hover:accent-blue-700",
            [CHECKBOX_STATE.ERROR]: "accent-red-600 hover:accent-red-700",
            [CHECKBOX_STATE.SUCCESS]: "accent-green-600 hover:accent-green-700",
            [CHECKBOX_STATE.DISABLED]: "accent-gray-400 cursor-not-allowed",
        },
        [CHECKBOX_VARIANT.OUTLINE]: {
            [CHECKBOX_STATE.DEFAULT]: "border-gray-300 text-blue-600 focus:ring-blue-500",
            [CHECKBOX_STATE.ERROR]: "border-red-500 text-red-600 focus:ring-red-500",
            [CHECKBOX_STATE.SUCCESS]: "border-green-500 text-green-600 focus:ring-green-500",
            [CHECKBOX_STATE.DISABLED]: "border-gray-200 text-gray-400 cursor-not-allowed",
        },
    };

    const stateClass = variantClasses[variant]?.[state] || variantClasses[variant]?.[CHECKBOX_STATE.DEFAULT] || "";
    return `${baseClasses} ${stateClass}`;
}

export function getCheckboxSizeClasses(size) {
    const sizeClasses = {
        [CHECKBOX_SIZE.SM]: "w-4 h-4",
        [CHECKBOX_SIZE.MD]: "w-5 h-5",
        [CHECKBOX_SIZE.LG]: "w-6 h-6",
        [CHECKBOX_SIZE.XL]: "w-7 h-7",
    };
    return sizeClasses[size] || sizeClasses[CHECKBOX_SIZE.MD];
}

// ============================================
// RADIO STYLE HELPERS
// ============================================

export function getRadioClasses(variant, state) {
    const baseClasses = "cursor-pointer transition-all duration-200";

    const variantClasses = {
        [RADIO_VARIANT.SOLID]: {
            [RADIO_STATE.DEFAULT]: "accent-blue-600 hover:accent-blue-700",
            [RADIO_STATE.ERROR]: "accent-red-600 hover:accent-red-700",
            [RADIO_STATE.SUCCESS]: "accent-green-600 hover:accent-green-700",
            [RADIO_STATE.DISABLED]: "accent-gray-400 cursor-not-allowed",
        },
        [RADIO_VARIANT.OUTLINE]: {
            [RADIO_STATE.DEFAULT]: "border-gray-300 text-blue-600 focus:ring-blue-500",
            [RADIO_STATE.ERROR]: "border-red-500 text-red-600 focus:ring-red-500",
            [RADIO_STATE.SUCCESS]: "border-green-500 text-green-600 focus:ring-green-500",
            [RADIO_STATE.DISABLED]: "border-gray-200 text-gray-400 cursor-not-allowed",
        },
    };

    const stateClass = variantClasses[variant]?.[state] || variantClasses[variant]?.[RADIO_STATE.DEFAULT] || "";
    return `${baseClasses} ${stateClass}`;
}

export function getRadioSizeClasses(size) {
    const sizeClasses = {
        [RADIO_SIZE.SM]: "w-4 h-4",
        [RADIO_SIZE.MD]: "w-5 h-5",
        [RADIO_SIZE.LG]: "w-6 h-6",
        [RADIO_SIZE.XL]: "w-7 h-7",
    };
    return sizeClasses[size] || sizeClasses[RADIO_SIZE.MD];
}
