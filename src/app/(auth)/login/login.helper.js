/**
 * Login Form Helper
 * Configuration for login form fields
 */

import { INPUT_TYPE } from '@/shared/ui/from/form.constant';
import { main_url, website_name, site_image } from '@/shared/constant/global-constant';

/**
 * Login form fields configuration
 */
export const LOGIN_FORM_FIELDS = [
  {
    name: 'email',
    label: 'Email address',
    type: INPUT_TYPE.EMAIL,
    placeholder: 'Enter your email',
    required: true,
    autoFocus: true
  },
  {
    name: 'password',
    label: 'Password',
    type: INPUT_TYPE.PASSWORD,
    placeholder: 'Enter your password',
    required: true
  }
];

/**
 * Initial login form data
 */
export const INITIAL_LOGIN_FORM_DATA = {
  email: '',
  password: ''
};
/**
 Button labels
 */
export const LOGIN_BUTTON_LABELS = {
  LOGIN: 'Sign in',
  LOGIN_LOADING: 'Signing in...',
  Type: 'Submit',
  Variant: 'solid',
  Color: 'primary',
  FullWidth: true,
  Disabled: false,
};
/**
 * Login SEO Configuration
 * Enhanced with breadcrumbs, FAQ schema, and rich structured data
 * IMPORTANT: noindex=true because login pages should NOT be indexed by Google
 */
export const LOGIN_SEO = {
  title: `Login to Your Account | ${website_name} - Personalized Gift Store`,
  description: `Sign in to your ${website_name} account to access personalized gifts, manage your orders, track deliveries, save addresses, and enjoy exclusive member benefits. Secure login with email and password.`,
  keywords: [
    `${website_name} login`,
    'sign in',
    'user account',
    'member login',
    'customer portal',
    'account access',
    'secure login',
    'gift store login',
    'personalized gifts account',
    'order tracking',
    'manage orders',
    'saved addresses',
    'member benefits',
    `${website_name} account`
  ],
  canonical: `${main_url}/login`,
  type: 'website',
  author: website_name,
  image: site_image,
  schemaType: 'WebPage',
  ogType: 'website',
  noindex: true, // CRITICAL: Login pages should NOT be indexed
  jsonLd: {
    "@context": "https://schema.org",
    "@graph": [
      // WebPage Schema
      {
        "@type": "WebPage",
        "@id": `${main_url}/login#webpage`,
        "url": `${main_url}/login`,
        "name": `Login to Your Account | ${website_name}`,
        "description": `Sign in to your ${website_name} account to access personalized gifts, manage your orders, track deliveries, save addresses, and enjoy exclusive member benefits.`,
        "inLanguage": "en-US",
        "isPartOf": {
          "@id": `${main_url}#website`
        },
        "breadcrumb": {
          "@id": `${main_url}/login#breadcrumb`
        },
        "potentialAction": {
          "@type": "LoginAction",
          "target": {
            "@type": "EntryPoint",
            "urlTemplate": `${main_url}/login`,
            "actionPlatform": [
              "http://schema.org/DesktopWebPlatform",
              "http://schema.org/MobileWebPlatform"
            ]
          },
          "result": {
            "@type": "AuthenticateAction",
            "name": "User Authentication"
          }
        }
      },
      // BreadcrumbList Schema
      {
        "@type": "BreadcrumbList",
        "@id": `${main_url}/login#breadcrumb`,
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": main_url
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Login",
            "item": `${main_url}/login`
          }
        ]
      },
      // WebSite Schema
      {
        "@type": "WebSite",
        "@id": `${main_url}#website`,
        "url": main_url,
        "name": website_name,
        "description": "Personalized gift store offering unique and customized gifts for every occasion",
        "publisher": {
          "@id": `${main_url}#organization`
        },
        "potentialAction": {
          "@type": "SearchAction",
          "target": {
            "@type": "EntryPoint",
            "urlTemplate": `${main_url}/search?q={search_term_string}`
          },
          "query-input": "required name=search_term_string"
        }
      },
      // Organization Schema
      {
        "@type": "Organization",
        "@id": `${main_url}#organization`,
        "name": website_name,
        "url": main_url,
        "logo": {
          "@type": "ImageObject",
          "url": site_image,
          "width": 1200,
          "height": 630
        },
        "sameAs": [
          // Add social media links here if available
        ]
      },
      // FAQ Schema - Helps with "how to login" searches
      {
        "@type": "FAQPage",
        "@id": `${main_url}/login#faq`,
        "mainEntity": [
          {
            "@type": "Question",
            "name": `How do I login to my ${website_name} account?`,
            "acceptedAnswer": {
              "@type": "Answer",
              "text": `To login to your ${website_name} account, enter your registered email address and password on the login page, then click the 'Sign In' button. Make sure you're using the same email you used during registration.`
            }
          },
          {
            "@type": "Question",
            "name": "What if I forgot my password?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "If you forgot your password, click the 'Forgot Password' link on the login page. Enter your registered email address and we'll send you a password reset link. Follow the instructions in the email to create a new password."
            }
          },
          {
            "@type": "Question",
            "name": "Why can't I login to my account?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "If you're having trouble logging in, make sure you're using the correct email and password. Check that Caps Lock is off and try resetting your password. If the issue persists, contact our customer support team for assistance."
            }
          },
          {
            "@type": "Question",
            "name": "Is my login information secure?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, your login information is completely secure. We use industry-standard HTTPS encryption to protect your data during transmission. Your password is encrypted and stored securely in our database."
            }
          },
          {
            "@type": "Question",
            "name": "Can I login with social media accounts?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": `Yes, you can login to ${website_name} using your Google or Facebook account. Simply click on the respective social login button on the login page for quick and secure access.`
            }
          }
        ]
      }
    ]
  }
};

