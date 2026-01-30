/**
 * Profile Constants
 *
 * Configuration and constants for profile components
 */

/**
 * Profile visibility types
 */
export const PROFILE_TYPE = {
    public: "public",
    private: "private",
};

/**
 * Avatar sizes
 */
export const AVATAR_SIZE = {
    xs: "xs",
    sm: "sm",
    md: "md",
    lg: "lg",
    xl: "xl",
};

/**
 * Avatar size classes mapping
 */
export const AVATAR_SIZE_CLASSES = {
    xs: "w-8 h-8 text-xs",
    sm: "w-10 h-10 text-sm",
    md: "w-14 h-14 text-base",
    lg: "w-20 h-20 text-lg",
    xl: "w-28 h-28 text-2xl",
};

/**
 * Profile orientation
 */
export const PROFILE_ORIENTATION = {
    horizontal: "horizontal",
    vertical: "vertical",
};

/**
 * User status types
 */
export const USER_STATUS = {
    online: "online",
    offline: "offline",
    away: "away",
    busy: "busy",
};

/**
 * User status colors
 */
export const USER_STATUS_COLORS = {
    online: "bg-green-500",
    offline: "bg-gray-400",
    away: "bg-yellow-500",
    busy: "bg-red-500",
};

/**
 * Default profile dropdown menu items
 */
export const DEFAULT_PROFILE_MENU = [
    {
        label: "My Profile",
        href: "/profile",
        icon: "user",
    },
    {
        label: "My Orders",
        href: "/orders",
        icon: "cart",
    },
    {
        label: "Wishlist",
        href: "/wishlist",
        icon: "heart",
    },
    {
        label: "Settings",
        href: "/settings",
        icon: "settings",
    },
    {
        type: "divider",
    },
    {
        label: "Logout",
        href: "/logout",
        icon: "logout",
        variant: "danger",
    },
];

/**
 * Helper function to get user initials from name
 */
export const getUserInitials = (name) => {
    if (!name) return "U";

    const parts = name.trim().split(" ");
    if (parts.length === 1) {
        return parts[0].charAt(0).toUpperCase();
    }

    return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
};

/**
 * Helper function to get avatar size class
 */
export const getAvatarSizeClass = (size) => {
    return AVATAR_SIZE_CLASSES[size] || AVATAR_SIZE_CLASSES.md;
};