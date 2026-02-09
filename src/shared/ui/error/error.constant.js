import { Navigation_Url, Dynamic_Navigation_Url } from '@/shared/constant/global-constant';

//this is the error constant file for this web project
export const ERROR_MSG = {
    DEFAULT_ERROR_MSG: 'Something went wrong!',
    DEFAULT_ERROR_DESCRIPTION: 'Please try again later.',
};
export const ERROR_CTA = {
    DEFAULT_ERROR_CTA: 'Back to Home',
    DEFAULT_ERROR_CTA_HREF: Navigation_Url.HOME,
};

// 404 Not Found Constants
export const NOT_FOUND_MSG = {
    TITLE: '404',
    HEADING: 'Page Not Found',
    DESCRIPTION: "Oops! The page you're looking for doesn't exist. It might have been moved or deleted.",
};

export const NOT_FOUND_CTA = {
    PRIMARY: 'Back to Home',
    PRIMARY_HREF: Navigation_Url.HOME,
    SECONDARY: 'Shop Products',
    SECONDARY_HREF: Dynamic_Navigation_Url.PRODUCT_LIST,
};

export const NOT_FOUND_SUGGESTIONS = [
    { label: 'Home', href: Navigation_Url.HOME, icon: 'home' },
    { label: 'Shop Products', href: Dynamic_Navigation_Url.PRODUCT_LIST, icon: 'cart' },
    { label: 'Contact Us', href: Navigation_Url.CONTACT, icon: 'mail' },
    { label: 'Help Center', href: Navigation_Url.HELP_CENTER, icon: 'info' },
];