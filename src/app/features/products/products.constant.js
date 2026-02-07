//this is the product constant file for this web project only for product related constant
import { Navigation_Url, website_name, main_url, logoUrl, site_image } from '@/shared/constant/global-constant';

export const PRODUCT_CONSTANT = {
    DEFAULT_PAGE_SIZE: 12,
    DEFAULT_PAGE: 1,
}
//products page seo constant
export const SEO_CONSTANT = {
    title: `Shop for Personalized Gifts - T-Shirts, Mugs, and More! - ${website_name}`,
    description: `Buy custom t-shirts, mugs, and more from Tohfae. Design personalized gifts for any occasion. Choose from a variety of templates and customize with your own text and images.`,
    keywords: ['Tohfae', 'Personalized Gifts', 'Custom T-Shirts', 'Custom Mugs', 'Gift Design', 'Occasion Gifts', 'Custom Gifts', 'Online Gift Design', 'T-Shirt Design', 'Mug Design'],
    canonical: Navigation_Url.PRODUCTS,
    type: 'website',
    author: website_name,
    image: site_image,
    
}
//Json ld constant
export const JSON_LD_CONSTANT = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": SEO_CONSTANT.title,
    "description": SEO_CONSTANT.description,
    "url": `${main_url}${Navigation_Url.PRODUCTS}`,
    "image": site_image,
    "breadcrumb": {
        "@type": "BreadcrumbList",
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
                "name": "Products",
                "item": `${main_url}${Navigation_Url.PRODUCTS}`
            }
        ]
    },
    "mainEntity": {
        "@type": "ItemList",
        "name": "Personalized Gift Products",
        "description": "Browse our collection of custom t-shirts, mugs, frames, cushions and more personalized gifts",
        "numberOfItems": 4
    },
    "author": {
        "@type": "Organization",
        "name": website_name,
        "url": main_url
    },
    "publisher": {
        "@type": "Organization",
        "name": website_name,
        "logo": {
            "@type": "ImageObject",
            "url": logoUrl
        }
    }
}
//dropdown constant for products page - organized by category
export const SORT_OPTIONS = {
    PRICE: [
        { label: 'Price: Low to High', value: 'pricing.sellingPrice', direction: 'asc' },
        { label: 'Price: High to Low', value: 'pricing.sellingPrice', direction: 'desc' },
    ],
    RATING: [
        { label: 'Rating: High to Low', value: 'ratings.average', direction: 'desc' },
        { label: 'Rating: Low to High', value: 'ratings.average', direction: 'asc' },
    ],
    ARRIVAL: [
        { label: 'Newest First', value: 'createdAt', direction: 'desc' },
        { label: 'Oldest First', value: 'createdAt', direction: 'asc' },
    ],
};

// Legacy format (kept for backward compatibility)
export const SORT_BY_OPTIONS = [
    { label: 'Price: Low to High', value: 'price_low_to_high' },
    { label: 'Price: High to Low', value: 'price_high_to_low' },
    { label: 'Rating: High to Low', value: 'rating_high_to_low' },
    { label: 'Popularity: High to Low', value: 'popularity_high_to_low' },
    { label: 'Newest First', value: 'newest_first' },
    { label: 'Oldest First', value: 'oldest_first' },
]
//filter by rating
export const FILTER_BY_RATING = [
    { label: '4 Star & Up', value: 4 },
    { label: '3 Star & Up', value: 3 },
    { label: '2 Star & Up', value: 2 },
    { label: '1 Star & Up', value: 1 },
]
//filter chips constant (category quick filters)
export const FILTER_CHIPS = [
    { label: 'All Products', value: 'all' },
    { label: 'T-Shirts', value: 'tshirt' },
    { label: 'Mugs', value: 'mug' },
    { label: 'Frames', value: 'frame' },
    { label: 'Cushions', value: 'cushion' },
    { label: 'Clothing', value: 'clothing' },
    { label: 'Gifts', value: 'gifts' },
    { label: 'Keychains', value: 'keychain' },
    { label: 'Calendars', value: 'calendar' },
    { label: 'Posters', value: 'poster' },
    { label: 'Cards', value: 'card' },
]
//todo price range slider constant
export const PRICE_RANGE = {
    min: 0,
    max: 1000,
    step: 10,
}

// Helper function to get filter label from value
export const getFilterLabel = (value) => {
    const chip = FILTER_CHIPS.find(chip => chip.value === value);
    return chip?.label || value;
};