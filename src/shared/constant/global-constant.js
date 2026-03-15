import { images } from "@/contract/testing.image";

//this is the global constant file for this web project
export const website_name = 'Tohfae';
export const main_url = 'https://tohfae.com';
export const local_url = 'http://localhost:3000';
export const local_api_url = 'http://localhost:8000';
export const logoUrl = images[0]?.image_1 || '/brand/logo.png';
export const alt_text = 'Tohfae';
export const site_type = 'website';
export const site_image = '/brand/home.png';
export const site_author = 'Md Shamim Akhter';
export const site_author_url = 'https://intervieworbit.site';
export const site_publisher = 'Tohfae';


//navigation url constant
export const Navigation_Url = {
  HOME: '/',
  ABOUT: '/about',
  CONTACT: '/contact',
  BLOG: '/blog',
  PRIVACY: '/privacy-policy',
  TERMS: '/terms-and-conditions',
  COOKIE: '/cookie-policy',
  LOGIN: '/login',
  REGISTER: '/register',
  NEWSLETTER: '/newsletter',
  HELP_CENTER: '/help-center',
  FAQ: '/faq',
  PRODUCTS: '/products',
  CART: '/cart',
  WISHLIST: '/wishlist',
  PROFILE: '/profile',
  PROFILE_EDIT: '/profile/edit',
};
//dynamic navigation url constant
export const Dynamic_Navigation_Url = {
  PRODUCT_DETAILS: '/product/:slug',
  PRODUCT_LIST: '/products',
  PRODUCT_CATEGORY: '/products/:category',
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