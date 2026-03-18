# Section Components

Components for displaying product sections on the home page, including New Arrivals, Trending, Best Sellers, Featured Products, and Deals.

## Overview

This module provides a reusable ProductsSection component that can be configured to display different types of product collections. All section configurations are centralized in a single constant file.

## Directory Structure

```
section/
├── section.constant.js          All section configurations
├── Section.jsx                  Main section wrapper component
├── components/
│   ├── ProductsSection.jsx      Reusable section component
│   ├── SectionHeader.jsx        Section header component
│   ├── productsSection.style.css Custom responsive styles
│   └── index.js                 Component exports
└── README.md                    Documentation
```

## Usage Examples

### Basic Usage

```jsx
import { ProductsSection, SECTION_CONFIG, SECTION_TYPES } from './components';

<ProductsSection 
  products={newArrivals}
  sectionConfig={SECTION_CONFIG[SECTION_TYPES.NEW_ARRIVAL]}
/>
```

### Available Section Types

```js
SECTION_TYPES.NEW_ARRIVAL
SECTION_TYPES.TRENDING
SECTION_TYPES.BEST_SELLER
SECTION_TYPES.FEATURED
SECTION_TYPES.DEALS
SECTION_TYPES.PERSONALIZED
```

### Custom Configuration

```jsx
<ProductsSection 
  products={products}
  sectionConfig={{
    header: 'Custom Title',
    subHeader: 'Custom subtitle',
    viewAllLink: '/custom-link',
    layout: 'grid',
    bgColor: 'bg-blue-50',
  }}
/>
```

### Layout Options

- **auto** - Grid on desktop, horizontal scroll on mobile (default)
- **grid** - Grid layout on all devices
- **scroll** - Horizontal scroll on all devices

## Configuration

All configurations are in `section.constant.js`:

- **SECTION_TYPES** - Section type constants
- **SECTION_API_PARAMS** - API parameters for fetching products
- **SECTION_CONFIG** - UI configuration (headers, links, styling)
- **SECTION_DEFAULTS** - Default values for all sections

## Responsive Design

- **Mobile (under 640px)** - Horizontal scroll with enhanced View All button
- **Tablet (641px to 1024px)** - 2-3 column grid
- **Desktop (over 1024px)** - 4 column grid

## Adding a New Section

1. Add new type to `SECTION_TYPES` in section.constant.js
2. Add API parameters to `SECTION_API_PARAMS`
3. Add UI configuration to `SECTION_CONFIG`
4. Use in your page:

```jsx
<ProductsSection 
  products={data}
  sectionConfig={SECTION_CONFIG[SECTION_TYPES.YOUR_NEW_SECTION]}
/>
```

## Component Properties

### ProductsSection Component

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| products | Array | [] | Array of product objects to display |
| sectionConfig | Object | {} | Configuration object for the section |
| layout | String | from config | Layout mode: auto, grid, or scroll |
| showHeader | Boolean | true | Whether to display the section header |
| className | String | '' | Additional CSS classes to apply |

### SectionHeader Component

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| title | String | required | Main heading text for the section |
| subtitle | String | optional | Subheading text displayed below the title |
| viewAllLink | String | required | URL for the View All button |
| viewAllLabel | String | 'View All' | Text label for the View All button |
| showViewAll | Boolean | true | Whether to display the View All button |

