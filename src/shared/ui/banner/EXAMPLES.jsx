/**
 * Banner Component Examples
 * 
 * Complete examples showing banner integration with product lists
 * Uses real banner and product contract data
 */

"use client";
import React from 'react';
import Banner from './Banner';
import { Card, CardBody } from '@/shared/ui/card';
import { 
    BANNER_DATA, 
    BANNER_TYPE,
    getBannersByType 
} from '@/contract/banner.contract';
import { PRODUCT_DATA } from '@/contract/product.contract';
import { insertBannersIntoList } from './banner.helper';

// ============================================
// Example 1: Simple Banner (CardBody only)
// ============================================
export function SimpleBannerExample() {
    const promoBanner = BANNER_DATA.find(b => b.type === BANNER_TYPE.PROMOTIONAL);

    return (
        <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Simple Banner (CardBody only)</h3>
            <p className="text-sm text-gray-600">Uses Card composition - CardBody for content, CardFooter for CTA</p>
            <Banner banner={promoBanner} />
        </div>
    );
}

// ============================================
// Example 2: Banner with Header (Full Card Composition)
// ============================================
export function BannerWithHeaderExample() {
    const promoBanner = BANNER_DATA.find(b => b.type === BANNER_TYPE.PROMOTIONAL);

    return (
        <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Banner with Header (Full Card Composition)</h3>
            <p className="text-sm text-gray-600">Uses CardHeader + CardBody + CardFooter</p>
            <Banner
                banner={promoBanner}
                showHeader={true}
                closeable={true}
                onClose={() => console.log('Banner closed')}
            />
        </div>
    );
}

// ============================================
// Example 3: Banner Without Image
// ============================================
export function BannerWithoutImageExample() {
    const promoBanner = BANNER_DATA.find(b => b.type === BANNER_TYPE.PROMOTIONAL);

    return (
        <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Banner Without Image</h3>
            <p className="text-sm text-gray-600">Text-only banner using CardBody + CardFooter</p>
            <Banner banner={promoBanner} showImage={false} />
        </div>
    );
}

// ============================================
// Example 4: Closeable Banner with Header
// ============================================
export function CloseableBannerExample() {
    const inlineBanner = BANNER_DATA.find(b => b.type === BANNER_TYPE.INLINE);

    return (
        <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Closeable Banner with CardHeader</h3>
            <p className="text-sm text-gray-600">Close button in CardHeader</p>
            <Banner
                banner={inlineBanner}
                showHeader={true}
                closeable={true}
                onClose={() => console.log('Banner closed')}
            />
        </div>
    );
}

// ============================================
// Example 4: Product Grid with Inline Banners
// ============================================
export function ProductGridWithBannersExample() {
    // Get inline banners
    const inlineBanners = getBannersByType(BANNER_TYPE.INLINE);
    
    // Get first 12 products
    const products = PRODUCT_DATA.slice(0, 12);
    
    // Insert banners into product list based on contract rules
    const items = insertBannersIntoList(products, inlineBanners);

    return (
        <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Product Grid with Inline Banners</h3>
            <p className="text-sm text-gray-600">
                Banners automatically inserted based on contract rules (interval, startPosition, etc.)
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {items.map((item) => {
                    if (item.type === 'banner') {
                        return (
                            <div key={item.id} className="md:col-span-2 lg:col-span-3">
                                <Banner banner={item.data} />
                            </div>
                        );
                    }
                    
                    // Product card
                    const product = item.data;
                    return (
                        <Card key={item.id} hoverable shadow="sm">
                            <CardBody padding={false}>
                                <img
                                    src={product.images[0]}
                                    alt={product.name}
                                    className="w-full h-48 object-cover"
                                />
                                <div className="p-4">
                                    <h4 className="font-semibold text-gray-900">{product.name}</h4>
                                    <p className="text-sm text-gray-600 mt-1">{product.description}</p>
                                    <div className="mt-2 flex items-center justify-between">
                                        <span className="text-lg font-bold text-primary-600">
                                            ₹{product.price.base}
                                        </span>
                                        {product.discount && (
                                            <span className="text-sm text-gray-500 line-through">
                                                ₹{product.price.original}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </CardBody>
                        </Card>
                    );
                })}
            </div>
        </div>
    );
}

// ============================================
// Example 6: All Banner Types with Different Card Compositions
// ============================================
export function AllBannerTypesExample() {
    const promotionalBanner = BANNER_DATA.find(b => b.type === BANNER_TYPE.PROMOTIONAL);
    const inlineBanner = BANNER_DATA.find(b => b.type === BANNER_TYPE.INLINE);
    const categoryBanner = BANNER_DATA.find(b => b.type === BANNER_TYPE.CATEGORY);

    return (
        <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900">All Banner Types with Card Composition</h3>
            <p className="text-sm text-gray-600">Different ways to compose banners using Card components</p>

            <div className="space-y-6">
                <div>
                    <p className="text-sm font-medium text-gray-700 mb-2">
                        Promotional Banner - CardBody + CardFooter
                    </p>
                    <Banner banner={promotionalBanner} />
                </div>

                <div>
                    <p className="text-sm font-medium text-gray-700 mb-2">
                        Inline Banner - CardHeader + CardBody + CardFooter (with close)
                    </p>
                    <Banner
                        banner={inlineBanner}
                        showHeader={true}
                        closeable={true}
                    />
                </div>

                <div>
                    <p className="text-sm font-medium text-gray-700 mb-2">
                        Category Banner - CardBody only (no image, no footer)
                    </p>
                    <Banner
                        banner={{
                            ...categoryBanner,
                            cta: { ...categoryBanner.cta, enabled: false }
                        }}
                        showImage={false}
                    />
                </div>
            </div>
        </div>
    );
}

