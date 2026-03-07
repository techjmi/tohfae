/**
 * Header Component Constants
 *
 * All text, menu data, and configuration for header components
 */

import { Navigation_Url } from '@/shared/constant/global-constant';

/**
 * Header Text Constants
 */
export const HEADER_TEXT = {
  // Desktop Navbar
  GREETING: 'Hello, sign in',
  ACCOUNT_LISTS: 'Account & Lists',
  RETURNS: 'Returns',
  ORDERS: '& Orders',

  // Sign In Section
  SIGN_IN: 'Sign in',
  SIGN_OUT: 'Sign Out',
  NEW_CUSTOMER: 'New customer?',
  START_HERE: 'Start here.',

  // Mobile Menu
  MENU_TITLE: 'Menu',
  ACCOUNT_TITLE: 'Account',
  HELLO: 'Hello',

  // Actions
  SWITCH_ACCOUNTS: 'Switch Accounts',

  // Section Headers
  YOUR_LISTS: 'Your Lists',
  YOUR_ACCOUNT: 'Your Account',

  // Sign Out Confirmation Modal
  SIGN_OUT_CONFIRM_TITLE: 'Confirm Sign Out',
  SIGN_OUT_CONFIRM_MESSAGE: 'Are you sure you want to sign out?',
  SIGN_OUT_CONFIRM_SUBTITLE: 'You will be signed out of your session.',
  SIGN_OUT_CONFIRM_BUTTON: 'Yes, Sign Out',
  SIGN_OUT_CANCEL_BUTTON: 'Cancel',
};

/**
 * User Menu Data
 * Dropdown menu items for logged-in and non-logged-in users
 */
export const USER_MENU_DATA = {
  yourLists: [
    { label: 'Shopping List', href: '/lists/shopping' },
    { label: 'Create a Wish List', href: '/lists/create' },
    { label: 'Wish from Any Website', href: '/lists/wish' },
    { label: 'Baby Wishlist', href: '/lists/baby' },
    { label: 'Discover Your Style', href: '/lists/style' },
    { label: 'Explore Showroom', href: '/lists/showroom' },
  ],
  yourAccount: [
    { label: 'Your Account', href: '/account' },
    { label: 'Your Orders', href: '/orders' },
    { label: 'Your Wish List', href: '/wishlist' },
    { label: 'Keep shopping for', href: '/recommendations' },
    { label: 'Your Recommendations', href: '/recommendations' },
    { label: 'Recalls and Product Safety Alerts', href: '/recalls' },
  ],
};

/**
 * Mobile Menu Navigation Items
 */
export const MOBILE_MENU_DATA = [
  { label: 'Home', href: Navigation_Url.HOME, icon: 'home' },
  { label: 'Your Account', href: '/account', icon: 'user' },
  { label: 'Your Orders', href: '/orders', icon: 'check' },
  { label: 'Your Wish List', href: '/wishlist', icon: 'heart' },
  { label: 'Cart', href: Navigation_Url.CART, icon: 'cart' },
  { label: 'Settings', href: '/settings', icon: 'settings' },
];

/**
 * Navigation Routes
 * Using centralized Navigation_Url constants
 */
export const HEADER_ROUTES = {
  HOME: Navigation_Url.HOME,
  LOGIN: Navigation_Url.LOGIN,
  REGISTER: Navigation_Url.REGISTER,
  ORDERS: '/orders',
  CART: Navigation_Url.CART,
  PROFILE: Navigation_Url.PROFILE,
  SWITCH_ACCOUNTS: '/switch-accounts',
};