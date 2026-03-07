# Internationalization (i18n) Implementation

## Overview

This module provides internationalization support for the application using i18next and react-i18next. It enables multi-language support with a focus on Indian languages.

## File Structure

```
src/i18n/
├── config.js                 # i18n configuration and initialization
├── locales/
│   ├── en/
│   │   ├── common.json       # Common translations (English)
│   │   └── legal.json        # Legal page translations (English)
│   └── hi/
│       ├── common.json       # Common translations (Hindi)
│       └── legal.json        # Legal page translations (Hindi)
└── README.md                 # This file
```

## Supported Languages

- English (en) - Default
- Hindi (hi)

## Configuration

### Dependencies

```json
{
  "i18next": "^23.x.x",
  "react-i18next": "^14.x.x"
}
```

### i18n Setup

The configuration is defined in `config.js`:

- Default language: English (en)
- Fallback language: English (en)
- Default namespace: common
- Available namespaces: common, legal
- SSR compatible: useSuspense disabled

### Language Persistence

Language preference is stored in localStorage with key `language`.

## Usage

### In Client Components

```javascript
"use client";
import { useTranslation } from "react-i18next";
import "@/i18n/config";

export default function MyComponent() {
    const { t } = useTranslation('common');
    
    return (
        <div>
            <h1>{t('navigation.home')}</h1>
            <p>{t('footer.all_rights_reserved')}</p>
        </div>
    );
}
```

### Accessing Nested Keys

```javascript
const { t } = useTranslation('legal');
const title = t('privacy_policy.sections.introduction.title');
```

### Switching Languages

```javascript
import { useTranslation } from "react-i18next";

const { i18n } = useTranslation();

// Change language
i18n.changeLanguage('hi');

// Get current language
const currentLang = i18n.language;
```

## Namespaces

### common
Contains general UI translations:
- Navigation menu items
- Footer content
- Language names
- Common UI elements

### legal
Contains legal page translations:
- Privacy Policy
- Terms and Conditions
- Cookie Policy

## Adding New Languages

### Step 1: Create Translation Files

Create new JSON files in `src/i18n/locales/{language_code}/`:

```
src/i18n/locales/
├── bn/                    # Bengali
│   ├── common.json
│   └── legal.json
├── ta/                    # Tamil
│   ├── common.json
│   └── legal.json
```

### Step 2: Update Configuration

Edit `src/i18n/config.js`:

```javascript
import commonBN from './locales/bn/common.json';
import legalBN from './locales/bn/legal.json';

const resources = {
    en: { common: commonEN, legal: legalEN },
    hi: { common: commonHI, legal: legalHI },
    bn: { common: commonBN, legal: legalBN },
};

export const LANGUAGES = [
    { code: 'en', name: 'English', nativeName: 'English' },
    { code: 'hi', name: 'Hindi', nativeName: 'हिंदी' },
    { code: 'bn', name: 'Bengali', nativeName: 'বাংলা' },
];
```

### Step 3: Test

The new language will automatically appear in the language selector.

## Translation File Structure

### common.json

```json
{
  "language": {
    "english": "English",
    "hindi": "हिंदी"
  },
  "navigation": {
    "home": "Home",
    "products": "Products"
  },
  "footer": {
    "all_rights_reserved": "All rights reserved"
  }
}
```

### legal.json

```json
{
  "privacy_policy": {
    "title": "Privacy Policy",
    "sections": {
      "introduction": {
        "title": "Introduction",
        "content": "..."
      }
    }
  }
}
```

## Components

### LanguageSelector

Dropdown component for switching between languages.

**Location:** `src/components/common/LanguageSelector.jsx`

**Usage:**
```javascript
import LanguageSelector from "@/components/common/LanguageSelector";

<LanguageSelector />
```

**Features:**
- Displays available languages with native names
- Saves preference to localStorage
- Updates UI immediately on language change

### LegalPageHeader

Header component for legal pages with language selector.

**Location:** `src/components/common/LegalPageHeader.jsx`

**Usage:**
```javascript
import LegalPageHeader from "@/components/common/LegalPageHeader";

<LegalPageHeader title="Privacy Policy" icon="shield" />
```

**Available Icons:**
- shield - Privacy Policy
- document - Terms and Conditions
- info - General information pages

## SSR Compatibility

The i18n configuration is designed to work with Next.js Server-Side Rendering:

- Main page components use SSR
- Client components use "use client" directive
- useSuspense is disabled for SSR compatibility
- Translations are loaded synchronously

## Best Practices

1. Always use translation keys instead of hardcoded text
2. Keep keys organized using nested structure
3. Use descriptive key names for context
4. Test UI with all supported languages
5. Ensure UI doesn't break with longer translations
6. Add new namespaces for different sections (e.g., product, checkout)
7. Keep translation files synchronized across languages
8. Use consistent naming conventions for keys

## Translation Guidelines

### Key Naming

- Use lowercase with underscores: `privacy_policy`
- Use nested structure for related content
- Be descriptive: `footer.all_rights_reserved` instead of `footer.text1`

### Content Organization

- Group related translations together
- Use namespaces to separate concerns
- Keep common UI elements in common namespace
- Use specific namespaces for feature-specific content

### Translation Quality

- Ensure translations are culturally appropriate
- Maintain consistent tone across languages
- Test with native speakers when possible
- Keep translations up to date with source content

## Troubleshooting

### Translations Not Loading

- Verify JSON files are properly formatted
- Check import statements in config.js
- Ensure namespace is specified correctly in useTranslation
- Clear browser cache and localStorage

### Language Not Persisting

- Check localStorage is enabled in browser
- Verify language code matches LANGUAGES array
- Ensure changeLanguage is called correctly

### SSR Hydration Errors

- Verify useSuspense is set to false
- Check that translations are loaded before rendering
- Ensure server and client use same language initially

## Future Enhancements

- Add more Indian languages (Bengali, Tamil, Telugu, Marathi)
- Implement RTL support for Arabic/Urdu
- Add browser language detection
- Create translation management UI for admins
- Integrate with translation services
- Add pluralization support
- Implement date/time localization
- Add number formatting per locale

## Related Files

### Components
- `src/components/common/LanguageSelector.jsx`
- `src/components/common/LegalPageHeader.jsx`

### Pages
- `src/app/(legal)/privacy-policy/`
- `src/app/(legal)/terms-conditions/`
- `src/app/(legal)/cookie-policy/`

### Styles
- `src/components/common/language-selector.style.css`
- `src/components/common/legal-page-header.style.css`
- `src/app/(legal)/legal.style.css`

