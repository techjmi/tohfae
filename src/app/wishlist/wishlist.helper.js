/**
 * Wishlist Page Helper
 * 
 * Contains all configuration, constants, and helper functions for wishlist page
 */

import { Navigation_Url, website_name, main_url, site_image } from '@/shared/constant/global-constant';

/**
 * Wishlist Page Text Constants
 */
export const WISHLIST_TEXT = {
  PAGE_TITLE: 'My Wishlist',
  PAGE_SUBTITLE: 'Save your favorite items',
  CLEAR_ALL: 'Clear All',
  CLEAR_CONFIRM: 'Are you sure you want to clear all items from your wishlist?',
  EMPTY_TITLE: 'Your wishlist is empty',
  EMPTY_DESCRIPTION: 'Start adding products you love to your wishlist',
  BROWSE_PRODUCTS: 'Browse Products',
  ADD_TO_CART: 'Add to Cart',
  REMOVE: 'Remove',
  ADDED_AT: 'Added',
};

/**
 * Wishlist Page SEO Configuration
 */
export const WISHLIST_SEO = {
  title: `My Wishlist | ${website_name}`,
  description: `View and manage your wishlist of personalized gifts at ${website_name}. Save your favorite custom products and shop later.`,
  keywords: [
    `${website_name}`,
    'wishlist',
    'saved items',
    'favorite products',
    'personalized gifts',
  ],
  canonical: `${main_url}${Navigation_Url.WISHLIST}`,
  type: 'website',
  author: website_name,
  image: site_image,
  noindex: true, // Wishlist is user-specific, should not be indexed
};

