import { images } from "@/contract/testing.image";

//this is the global constant file for this web project
export const website_name = 'Tohfae';
export const main_url = 'https://tohfae.com';
export const local_url = 'http://localhost:3000';
export const logoUrl = images.image_1;
export const alt_text = 'Tohfae';

//navigation url constant
export const Navigation_Url = {
  HOME: '/',
  ABOUT: '/about',
  CONTACT: '/contact',
  BLOG: '/blog',
  PRIVACY: '/privacy',
  TERMS: '/terms',
  COOKIE: '/cookie',
  LOGIN: '/login',
  REGISTER: '/register',
  NEWSLETTER: '/newsletter',
  HELP_CENTER: '/help-center',
  FAQ: '/faq',
};
//dynamic navigation url constant
export const Dynamic_Navigation_Url = {
  PRODUCT_DETAILS: '/product/:slug',
  PRODUCT_LIST: '/products',
  PRODUCT_CATEGORY: '/products/:category',
  CART: '/cart',
  CHECKOUT: '/checkout',
  ORDER: '/order',
  ORDER_DETAILS: '/order/:id',
  USER: '/user',
  USER_PROFILE: '/user/profile',
  USER_ORDERS: '/user/orders',
  USER_WISHLIST: '/user/wishlist'
};

//social media handles
export const site_facebook_handle = 'https://www.facebook.com';
export const site_twitter_handle = 'https://www.twitter.com';
export const site_instagram_handle = 'https://www.instagram.com';
export const site_linkedin_handle = 'https://www.linkedin.com';