/**
 * Signup Form Helper
 * Configuration for signup form fields
 */

import { INPUT_TYPE } from '@/shared/ui/from/form.constant';
import { main_url, website_name, site_image } from '@/shared/constant/global-constant';

/**
 * Signup form single column fields
 */
export const SIGNUP_FORM_FIELDS = [
  {
    name: 'email',
    label: 'Email address',
    type: INPUT_TYPE.EMAIL,
    placeholder: 'Enter your email',
    required: true
  },
  {
    name: 'phone',
    label: 'Phone number',
    type: INPUT_TYPE.TEL,
    placeholder: '+1234567890',
    required: false
  },
  {
    name: 'password',
    label: 'Password',
    type: INPUT_TYPE.PASSWORD,
    placeholder: 'Enter your password',
    required: true
  },
  {
    name: 'confirmPassword',
    label: 'Confirm password',
    type: INPUT_TYPE.PASSWORD,
    placeholder: 'Confirm your password',
    required: true
  }
];

/**
 * Signup form grid fields (firstName/lastName in 2 columns)
 */
export const SIGNUP_GRID_FIELDS = [
  {
    row: 1,
    fields: [
      {
        name: 'firstName',
        label: 'First name',
        type: INPUT_TYPE.TEXT,
        placeholder: 'Enter first name',
        required: true,
        autoFocus: true
      },
      {
        name: 'lastName',
        label: 'Last name',
        type: INPUT_TYPE.TEXT,
        placeholder: 'Enter last name',
        required: false
      }
    ]
  }
];

/**
 * Initial signup form data
 */
export const INITIAL_SIGNUP_FORM_DATA = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  password: '',
  confirmPassword: ''
};

/**
 * Signup SEO Configuration
 * Enhanced with breadcrumbs, HowTo schema, FAQ schema, and rich structured data
 * IMPORTANT: noindex=true because signup pages should NOT be indexed by Google
 */
export const SIGNUP_SEO = {
  title: `Create Your Account | ${website_name} - Join Our Personalized Gift Community`,
  description: `Sign up for a free ${website_name} account and unlock access to personalized gifts, exclusive deals, order tracking, wishlist management, and fast checkout. Join thousands of happy customers today!`,
  keywords: [
    `${website_name} signup`,
    'create account',
    'register',
    'new account',
    `join ${website_name}`,
    'free registration',
    'member registration',
    'gift store signup',
    'personalized gifts account',
    'customer registration',
    'new member',
    'account benefits',
    'exclusive deals',
    'wishlist',
    'fast checkout',
    'order tracking',
    `${website_name} membership`
  ],
  canonical: `${main_url}/signup`,
  type: 'website',
  author: website_name,
  image: site_image,
  schemaType: 'WebPage',
  ogType: 'website',
  noindex: true, // CRITICAL: Signup pages should NOT be indexed
  jsonLd: {
    "@context": "https://schema.org",
    "@graph": [
      // WebPage Schema
      {
        "@type": "WebPage",
        "@id": `${main_url}/signup#webpage`,
        "url": `${main_url}/signup`,
        "name": `Create Your Account | ${website_name}`,
        "description": `Sign up for a free ${website_name} account and unlock access to personalized gifts, exclusive deals, order tracking, wishlist management, and fast checkout.`,
        "inLanguage": "en-US",
        "isPartOf": {
          "@id": `${main_url}#website`
        },
        "breadcrumb": {
          "@id": `${main_url}/signup#breadcrumb`
        },
        "potentialAction": {
          "@type": "RegisterAction",
          "target": {
            "@type": "EntryPoint",
            "urlTemplate": `${main_url}/signup`,
            "actionPlatform": [
              "http://schema.org/DesktopWebPlatform",
              "http://schema.org/MobileWebPlatform"
            ]
          },
          "result": {
            "@type": "CreateAction",
            "name": "User Account Creation"
          }
        }
      },
      // BreadcrumbList Schema
      {
        "@type": "BreadcrumbList",
        "@id": `${main_url}/signup#breadcrumb`,
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
            "name": "Sign Up",
            "item": `${main_url}/signup`
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
      // Offer Schema - Membership Benefits
      {
        "@type": "Offer",
        "name": `Free ${website_name} Membership`,
        "description": `Join ${website_name} for free and enjoy exclusive member benefits`,
        "price": "0",
        "priceCurrency": "USD",
        "availability": "https://schema.org/InStock",
        "itemOffered": {
          "@type": "Service",
          "name": `${website_name} Membership`,
          "description": `Access to personalized gifts, exclusive deals, order tracking, and wishlist management`
        }
      },
      // HowTo Schema - Step-by-step signup guide
      {
        "@type": "HowTo",
        "@id": `${main_url}/signup#howto`,
        "name": `How to Create a ${website_name} Account`,
        "description": `Step-by-step guide to creating your free ${website_name} account and accessing exclusive member benefits`,
        "image": site_image,
        "totalTime": "PT2M",
        "estimatedCost": {
          "@type": "MonetaryAmount",
          "currency": "USD",
          "value": "0"
        },
        "step": [
          {
            "@type": "HowToStep",
            "position": 1,
            "name": "Enter Your Personal Details",
            "text": "Fill in your first name and last name in the registration form. This helps us personalize your experience.",
            "url": `${main_url}/signup#step1`
          },
          {
            "@type": "HowToStep",
            "position": 2,
            "name": "Provide Contact Information",
            "text": "Enter your email address and phone number. Your email will be used for login and order notifications.",
            "url": `${main_url}/signup#step2`
          },
          {
            "@type": "HowToStep",
            "position": 3,
            "name": "Create a Secure Password",
            "text": "Choose a strong password with at least 8 characters. Confirm your password by entering it again to ensure accuracy.",
            "url": `${main_url}/signup#step3`
          },
          {
            "@type": "HowToStep",
            "position": 4,
            "name": "Complete Registration",
            "text": "Click the 'Sign Up' button to create your account. You'll receive a verification email to activate your account.",
            "url": `${main_url}/signup#step4`
          },
          {
            "@type": "HowToStep",
            "position": 5,
            "name": "Verify Your Email",
            "text": "Check your email inbox for a verification link. Click the link to verify your email address and activate your account.",
            "url": `${main_url}/signup#step5`
          }
        ]
      },
      // FAQ Schema - Common signup questions
      {
        "@type": "FAQPage",
        "@id": `${main_url}/signup#faq`,
        "mainEntity": [
          {
            "@type": "Question",
            "name": `Is it free to create a ${website_name} account?`,
            "acceptedAnswer": {
              "@type": "Answer",
              "text": `Yes, creating a ${website_name} account is completely free. There are no hidden charges or subscription fees. You only pay when you make a purchase.`
            }
          },
          {
            "@type": "Question",
            "name": "What information do I need to sign up?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": `To create a ${website_name} account, you need to provide your first name, last name, email address, and create a password. Phone number is optional but recommended for order updates.`
            }
          },
          {
            "@type": "Question",
            "name": "How long does it take to create an account?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": `Creating a ${website_name} account takes less than 2 minutes. Simply fill in the registration form, verify your email, and you're ready to start shopping for personalized gifts.`
            }
          },
          {
            "@type": "Question",
            "name": "What are the benefits of creating an account?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": `With a ${website_name} account, you get access to exclusive deals, order tracking, wishlist management, saved addresses for faster checkout, personalized recommendations, and member-only promotions.`
            }
          },
          {
            "@type": "Question",
            "name": "Can I sign up with my social media account?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": `Yes, you can quickly sign up using your Google or Facebook account. This saves time and allows you to get started with ${website_name} instantly without creating a new password.`
            }
          },
          {
            "@type": "Question",
            "name": "Is my personal information secure?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Absolutely. We use industry-standard HTTPS encryption to protect your data. Your personal information is stored securely and never shared with third parties without your consent."
            }
          }
        ]
      }
    ]
  }
};
