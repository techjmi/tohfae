/**
 * Form Component Constants
 *
 * Centralized constants for all form components
 * Following the same pattern as Button component
 */

// ============================================
// FORM CONSTANTS
// ============================================
export const FORM_TYPE = {
    HORIZONTAL: "horizontal",
    VERTICAL: "vertical",
};

export const FORM_SIZE = {
    SM: "sm",
    MD: "md",
    LG: "lg",
    XL: "xl",
};

// ============================================
// INPUT CONSTANTS
// ============================================
export const INPUT_TYPE = {
    TEXT: "text",
    PASSWORD: "password",
    EMAIL: "email",
    NUMBER: "number",
    TEL: "tel",
    URL: "url",
    SEARCH: "search",
    DATE: "date",
    TIME: "time",
    DATETIME_LOCAL: "datetime-local",
    MONTH: "month",
    WEEK: "week",
    COLOR: "color",
    FILE: "file",
};

export const INPUT_VARIANT = {
    SOLID: "solid",
    OUTLINE: "outline",
    GHOST: "ghost",
    UNDERLINE: "underline",
};

export const INPUT_SIZE = {
    SM: "sm",
    MD: "md",
    LG: "lg",
    XL: "xl",
};

export const INPUT_STATE = {
    DEFAULT: "default",
    ERROR: "error",
    SUCCESS: "success",
    WARNING: "warning",
    DISABLED: "disabled",
    READONLY: "readonly",
};

export const INPUT_RADIUS = {
    NONE: "none",
    SM: "sm",
    MD: "md",
    LG: "lg",
    FULL: "full",
};

// ============================================
// SELECT CONSTANTS
// ============================================
export const SELECT_VARIANT = {
    SOLID: "solid",
    OUTLINE: "outline",
    GHOST: "ghost",
};

export const SELECT_SIZE = {
    SM: "sm",
    MD: "md",
    LG: "lg",
    XL: "xl",
};

export const SELECT_STATE = {
    DEFAULT: "default",
    ERROR: "error",
    SUCCESS: "success",
    WARNING: "warning",
    DISABLED: "disabled",
};

export const SELECT_RADIUS = {
    NONE: "none",
    SM: "sm",
    MD: "md",
    LG: "lg",
    FULL: "full",
};

// ============================================
// TEXTAREA CONSTANTS
// ============================================
export const TEXTAREA_VARIANT = {
    SOLID: "solid",
    OUTLINE: "outline",
    GHOST: "ghost",
};

export const TEXTAREA_SIZE = {
    SM: "sm",
    MD: "md",
    LG: "lg",
    XL: "xl",
};

export const TEXTAREA_STATE = {
    DEFAULT: "default",
    ERROR: "error",
    SUCCESS: "success",
    WARNING: "warning",
    DISABLED: "disabled",
    READONLY: "readonly",
};

export const TEXTAREA_RADIUS = {
    NONE: "none",
    SM: "sm",
    MD: "md",
    LG: "lg",
};

export const TEXTAREA_RESIZE = {
    NONE: "none",
    VERTICAL: "vertical",
    HORIZONTAL: "horizontal",
    BOTH: "both",
};

// ============================================
// CHECKBOX CONSTANTS
// ============================================
export const CHECKBOX_SIZE = {
    SM: "sm",
    MD: "md",
    LG: "lg",
    XL: "xl",
};

export const CHECKBOX_STATE = {
    DEFAULT: "default",
    ERROR: "error",
    SUCCESS: "success",
    DISABLED: "disabled",
};

export const CHECKBOX_VARIANT = {
    SOLID: "solid",
    OUTLINE: "outline",
};

// ============================================
// RADIO CONSTANTS
// ============================================
export const RADIO_SIZE = {
    SM: "sm",
    MD: "md",
    LG: "lg",
    XL: "xl",
};

export const RADIO_STATE = {
    DEFAULT: "default",
    ERROR: "error",
    SUCCESS: "success",
    DISABLED: "disabled",
};

export const RADIO_VARIANT = {
    SOLID: "solid",
    OUTLINE: "outline",
};

// ============================================
// ERROR MESSAGES
// ============================================
export const REQUIRED_ERROR_MSG = "This field is required";

export const ERROR_MSG = {
    REQUIRED: "This field is required",
    INVALID_EMAIL: "Please enter a valid email address",
    INVALID_URL: "Please enter a valid URL",
    INVALID_PHONE: "Please enter a valid phone number",
    MIN_LENGTH: (min) => `Minimum ${min} characters required`,
    MAX_LENGTH: (max) => `Maximum ${max} characters allowed`,
    MIN_VALUE: (min) => `Minimum value is ${min}`,
    MAX_VALUE: (max) => `Maximum value is ${max}`,
    PATTERN_MISMATCH: "Please match the requested format",
};

// ============================================
// LABEL CONSTANTS
// ============================================
export const LABEL_POSITION = {
    TOP: "top",
    LEFT: "left",
    INLINE: "inline",
};

// ============================================
// ICON POSITION
// ============================================
export const ICON_POSITION = {
    PREFIX: "prefix",
    SUFFIX: "suffix",
};
