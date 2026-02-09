/**
 * Badge Examples
 * Complete examples showing all badge features and use cases
 */

"use client";
import React from 'react';
import Badge from './Badge';
import { Icon } from '@/shared/icons';
import { PRODUCT_DATA } from '@/contract/product.contract';

// ============================================
// Example 1: Basic Badges
// ============================================
export function BasicBadgesExample() {
    return (
        <div className="space-y-4">
            <h3 className="text-lg font-semibold">Basic Badges</h3>
            <div className="flex flex-wrap gap-3">
                <Badge>Default Badge</Badge>
                <Badge color="primary">Primary</Badge>
                <Badge color="success">Success</Badge>
                <Badge color="warning">Warning</Badge>
                <Badge color="danger">Danger</Badge>
                <Badge color="info">Info</Badge>
            </div>
        </div>
    );
}

// ============================================
// Example 2: Badge Sizes
// ============================================
export function BadgeSizesExample() {
    return (
        <div className="space-y-4">
            <h3 className="text-lg font-semibold">Badge Sizes</h3>
            <div className="flex flex-wrap items-center gap-3">
                <Badge size="xs" color="primary">Extra Small</Badge>
                <Badge size="sm" color="primary">Small</Badge>
                <Badge size="md" color="primary">Medium</Badge>
                <Badge size="lg" color="primary">Large</Badge>
            </div>
        </div>
    );
}

// ============================================
// Example 3: Badge Radius
// ============================================
export function BadgeRadiusExample() {
    return (
        <div className="space-y-4">
            <h3 className="text-lg font-semibold">Badge Radius</h3>
            <div className="flex flex-wrap gap-3">
                <Badge radius="xs" color="success">Extra Small Radius</Badge>
                <Badge radius="sm" color="success">Small Radius</Badge>
                <Badge radius="md" color="success">Medium Radius</Badge>
                <Badge radius="lg" color="success">Large Radius</Badge>
                <Badge radius="full" color="success">Full Radius (Pill)</Badge>
            </div>
        </div>
    );
}

// ============================================
// Example 4: Badges with Icons
// ============================================
export function BadgesWithIconsExample() {
    return (
        <div className="space-y-4">
            <h3 className="text-lg font-semibold">Badges with Icons</h3>
            <div className="flex flex-wrap gap-3">
                <Badge color="success" className="flex items-center gap-1.5">
                    <Icon name="check" size={14} />
                    <span>Verified</span>
                </Badge>
                <Badge color="danger" className="flex items-center gap-1.5">
                    <Icon name="close" size={14} />
                    <span>Rejected</span>
                </Badge>
                <Badge color="warning" className="flex items-center gap-1.5">
                    <Icon name="warning" size={14} />
                    <span>Pending</span>
                </Badge>
                <Badge color="info" className="flex items-center gap-1.5">
                    <Icon name="info" size={14} />
                    <span>Information</span>
                </Badge>
                <Badge color="primary" className="flex items-center gap-1.5">
                    <Icon name="star" size={14} />
                    <span>Featured</span>
                </Badge>
            </div>
        </div>
    );
}

// ============================================
// Example 5: Status Badges
// ============================================
export function StatusBadgesExample() {
    return (
        <div className="space-y-4">
            <h3 className="text-lg font-semibold">Status Badges</h3>
            <div className="space-y-3">
                <div className="flex items-center gap-3">
                    <span className="text-gray-700 w-32">Order Status:</span>
                    <Badge color="success" size="sm" radius="full">Delivered</Badge>
                </div>
                <div className="flex items-center gap-3">
                    <span className="text-gray-700 w-32">Payment:</span>
                    <Badge color="warning" size="sm" radius="full">Pending</Badge>
                </div>
                <div className="flex items-center gap-3">
                    <span className="text-gray-700 w-32">Account:</span>
                    <Badge color="success" size="sm" radius="full">Active</Badge>
                </div>
                <div className="flex items-center gap-3">
                    <span className="text-gray-700 w-32">Subscription:</span>
                    <Badge color="danger" size="sm" radius="full">Expired</Badge>
                </div>
                <div className="flex items-center gap-3">
                    <span className="text-gray-700 w-32">Verification:</span>
                    <Badge color="info" size="sm" radius="full">In Progress</Badge>
                </div>
            </div>
        </div>
    );
}

// ============================================
// Example 6: Count Badges
// ============================================
export function CountBadgesExample() {
    return (
        <div className="space-y-4">
            <h3 className="text-lg font-semibold">Count Badges</h3>
            <div className="flex flex-wrap gap-6">
                <div className="relative inline-block">
                    <Icon name="cart" size={24} className="text-gray-700" />
                    <Badge
                        size="xs"
                        color="danger"
                        radius="full"
                        className="absolute -top-2 -right-2 min-w-[20px] h-5 flex items-center justify-center"
                    >
                        3
                    </Badge>
                </div>

                <div className="relative inline-block">
                    <Icon name="bell" size={24} className="text-gray-700" />
                    <Badge
                        size="xs"
                        color="primary"
                        radius="full"
                        className="absolute -top-2 -right-2 min-w-[20px] h-5 flex items-center justify-center"
                    >
                        12
                    </Badge>
                </div>

                <div className="relative inline-block">
                    <Icon name="mail" size={24} className="text-gray-700" />
                    <Badge
                        size="xs"
                        color="success"
                        radius="full"
                        className="absolute -top-2 -right-2 min-w-[20px] h-5 flex items-center justify-center"
                    >
                        5
                    </Badge>
                </div>

                <div className="relative inline-block">
                    <Icon name="heart" size={24} className="text-gray-700" />
                    <Badge
                        size="xs"
                        color="danger"
                        radius="full"
                        className="absolute -top-2 -right-2 min-w-[20px] h-5 flex items-center justify-center"
                    >
                        99+
                    </Badge>
                </div>
            </div>
        </div>
    );
}

// ============================================
// Example 7: Product Badges (Real Contract Data)
// ============================================
export function ProductBadgesExample() {
    const product = PRODUCT_DATA[0]; // T-Shirt

    return (
        <div className="space-y-4">
            <h3 className="text-lg font-semibold">Product Badges (Real Contract Data)</h3>

            <div className="border border-gray-200 rounded-lg p-4 max-w-sm">
                <div className="relative">
                    <img
                        src={product.media.images[0]}
                        alt={product.basic.name}
                        className="w-full h-48 object-cover rounded-lg"
                    />
                    {/* Discount Badge */}
                    <Badge
                        color="danger"
                        size="sm"
                        radius="md"
                        className="absolute top-2 right-2"
                    >
                        {product.pricing.discount.label}
                    </Badge>

                    {/* Stock Badge */}
                    {product.inventory.inStock && (
                        <Badge
                            color="success"
                            size="xs"
                            radius="full"
                            className="absolute top-2 left-2 flex items-center gap-1"
                        >
                            <Icon name="check" size={12} />
                            <span>In Stock</span>
                        </Badge>
                    )}
                </div>

                <div className="mt-3 space-y-2">
                    <h4 className="font-semibold text-gray-900">{product.basic.name}</h4>

                    <div className="flex items-center gap-2">
                        <span className="text-xl font-bold">₹{product.pricing.sellingPrice}</span>
                        <span className="text-gray-400 line-through">₹{product.pricing.mrp}</span>
                    </div>

                    {/* Category Badge */}
                    <div className="flex gap-2">
                        <Badge color="info" size="xs" radius="full">
                            {product.category}
                        </Badge>
                        <Badge color="primary" size="xs" radius="full">
                            Customizable
                        </Badge>
                    </div>
                </div>
            </div>
        </div>
    );
}

// ============================================
// Example 8: Multiple Products with Badges
// ============================================
export function MultipleProductBadgesExample() {
    return (
        <div className="space-y-4">
            <h3 className="text-lg font-semibold">Multiple Products with Badges</h3>

            <div className="grid grid-cols-2 gap-4">
                {PRODUCT_DATA.slice(0, 4).map((product) => (
                    <div key={product.id} className="border border-gray-200 rounded-lg p-3">
                        <div className="relative">
                            <img
                                src={product.media.thumbnail}
                                alt={product.basic.name}
                                className="w-full h-32 object-cover rounded"
                            />

                            {/* Discount Badge */}
                            {product.pricing.discount.percentage > 0 && (
                                <Badge
                                    color="danger"
                                    size="xs"
                                    radius="sm"
                                    className="absolute top-1 right-1"
                                >
                                    -{product.pricing.discount.percentage}%
                                </Badge>
                            )}

                            {/* Stock Status */}
                            <Badge
                                color={product.inventory.inStock ? "success" : "danger"}
                                size="xs"
                                radius="full"
                                className="absolute bottom-1 left-1"
                            >
                                {product.inventory.inStock ? "Available" : "Out of Stock"}
                            </Badge>
                        </div>

                        <div className="mt-2">
                            <h5 className="text-sm font-medium truncate">{product.basic.name}</h5>
                            <p className="text-sm font-bold text-gray-900">₹{product.pricing.sellingPrice}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

// ============================================
// Example 9: Notification Badges
// ============================================
export function NotificationBadgesExample() {
    return (
        <div className="space-y-4">
            <h3 className="text-lg font-semibold">Notification Badges</h3>

            <div className="space-y-3 max-w-md">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                        <Icon name="mail" size={20} className="text-gray-600" />
                        <span className="text-gray-700">Messages</span>
                    </div>
                    <Badge color="primary" size="xs" radius="full">24</Badge>
                </div>

                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                        <Icon name="bell" size={20} className="text-gray-600" />
                        <span className="text-gray-700">Notifications</span>
                    </div>
                    <Badge color="danger" size="xs" radius="full">5</Badge>
                </div>

                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                        <Icon name="user" size={20} className="text-gray-600" />
                        <span className="text-gray-700">Friend Requests</span>
                    </div>
                    <Badge color="success" size="xs" radius="full">3</Badge>
                </div>

                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                        <Icon name="cart" size={20} className="text-gray-600" />
                        <span className="text-gray-700">Cart Items</span>
                    </div>
                    <Badge color="warning" size="xs" radius="full">8</Badge>
                </div>
            </div>
        </div>
    );
}

// ============================================
// All Badge Examples Combined
// ============================================
export function AllBadgeExamples() {
    return (
        <div className="space-y-12 p-8">
            <h1 className="text-3xl font-bold mb-8">Badge Component Examples</h1>

            <BasicBadgesExample />
            <hr className="my-8" />

            <BadgeSizesExample />
            <hr className="my-8" />

            <BadgeRadiusExample />
            <hr className="my-8" />

            <BadgesWithIconsExample />
            <hr className="my-8" />

            <StatusBadgesExample />
            <hr className="my-8" />

            <CountBadgesExample />
            <hr className="my-8" />

            <ProductBadgesExample />
            <hr className="my-8" />

            <MultipleProductBadgesExample />
            <hr className="my-8" />

            <NotificationBadgesExample />
        </div>
    );
}

