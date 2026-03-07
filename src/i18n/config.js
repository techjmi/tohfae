/**
 * i18n Configuration
 * Internationalization setup for the application
 */

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Import translation files
import commonEN from './locales/en/common.json';
import commonHI from './locales/hi/common.json';
import legalEN from './locales/en/legal.json';
import legalHI from './locales/hi/legal.json';

// Language resources
const resources = {
    en: {
        common: commonEN,
        legal: legalEN,
    },
    hi: {
        common: commonHI,
        legal: legalHI,
    },
};

// Initialize i18next
i18n
    .use(initReactI18next)
    .init({
        resources,
        lng: 'en', // Default language
        fallbackLng: 'en', // Fallback language
        defaultNS: 'common', // Default namespace
        ns: ['common', 'legal'], // Available namespaces
        
        interpolation: {
            escapeValue: false, // React already escapes values
        },
        
        react: {
            useSuspense: false, // Disable suspense for SSR compatibility
        },
    });

export default i18n;

// Available languages
export const LANGUAGES = [
    { code: 'en', name: 'English', nativeName: 'English' },
    { code: 'hi', name: 'Hindi', nativeName: 'हिंदी' },
];

