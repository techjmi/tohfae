/**
 * Profile Page Constants
 */

import { main_url, website_name } from '@/shared/constant/global-constant';

/**
 * SEO Configuration for Profile Page
 */
export const PROFILE_SEO = {
  title: `My Profile | ${website_name}`,
  description: `View and manage your ${website_name} profile. Update your personal information, view account details, and manage your settings.`,
  keywords: [
    'user profile',
    'account settings',
    'profile management',
    `${website_name} account`,
    'user dashboard',
    'account information',
    'profile settings',
    'my account',
    'user information',
    'account details'
  ],
  canonical: `${main_url}/profile`,
  type: 'profile',
  author: website_name,
  image: `${main_url}/images/profile-og.jpg`,
  noindex: true,
  jsonLd: {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ProfilePage",
        "@id": `${main_url}/profile#webpage`,
        "url": `${main_url}/profile`,
        "name": `My Profile | ${website_name}`,
        "description": `View and manage your ${website_name} profile. Update your personal information, view account details, and manage your settings.`,
        "inLanguage": "en-US",
        "isPartOf": {
          "@id": `${main_url}#website`
        },
        "breadcrumb": {
          "@id": `${main_url}/profile#breadcrumb`
        }
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${main_url}/profile#breadcrumb`,
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
            "name": "Profile",
            "item": `${main_url}/profile`
          }
        ]
      },
      {
        "@type": "WebSite",
        "@id": `${main_url}#website`,
        "url": main_url,
        "name": website_name,
        "description": "Personalized gift store offering unique and customized gifts for every occasion",
        "publisher": {
          "@id": `${main_url}#organization`
        }
      },
      {
        "@type": "Organization",
        "@id": `${main_url}#organization`,
        "name": website_name,
        "url": main_url,
        "logo": {
          "@type": "ImageObject",
          "url": `${main_url}/images/logo.png`
        }
      }
    ]
  }
};

/**
 * UI Text Constants
 */
export const PROFILE_TEXT = {
  ACCOUNT_INFO: {
    TITLE: 'Account Information',
    STATUS: {
      LABEL: 'Account Status',
      DEFAULT: 'Active'
    },
    EMAIL_VERIFIED: {
      LABEL: 'Email Verified',
      VERIFIED: 'Verified',
      NOT_VERIFIED: 'Not Verified'
    },
    MEMBER_SINCE: {
      LABEL: 'Member Since',
      DEFAULT: 'N/A'
    },
    ROLE: {
      LABEL: 'Role',
      DEFAULT: 'Customer'
    }
  },
  LOADING: {
    TITLE: 'Loading Profile...'
  },
  ERROR: {
    TITLE: 'Failed to Load Profile',
    RETRY_BUTTON: 'Retry'
  }
};

/**
 * Date Format Options
 */
export const DATE_FORMAT_OPTIONS = {
  year: 'numeric',
  month: 'long',
  day: 'numeric'
};

