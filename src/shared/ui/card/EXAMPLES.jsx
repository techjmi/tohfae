/**
 * Card Examples
 * Complete examples showing all card features and use cases
 */

"use client";
import React from 'react';
import { Card, CardHeader, CardBody, CardFooter } from './index';
import Button from '@/shared/ui/button/Button';
import { Icon } from '@/shared/icons';
import { PRODUCT_DATA } from '@/contract/product.contract';

// ============================================
// Example 1: Simple Card
// ============================================
export function SimpleCardExample() {
    return (
        <div className="space-y-4">
            <h3 className="text-lg font-semibold">Simple Card</h3>
            
            <Card>
                <CardBody>
                    <p>This is a simple card with just body content.</p>
                </CardBody>
            </Card>
        </div>
    );
}

// ============================================
// Example 2: Card with Header and Footer
// ============================================
export function CompleteCardExample() {
    return (
        <div className="space-y-4">
            <h3 className="text-lg font-semibold">Complete Card</h3>
            
            <Card shadow="md">
                <CardHeader title="User Profile" subtitle="View and edit your details" />
                <CardBody>
                    <p>User information and settings go here...</p>
                    <p className="mt-2 text-sm text-gray-600">
                        This card has a header, body, and footer.
                    </p>
                </CardBody>
                <CardFooter>
                    <Button variant="outline" color="neutral">Cancel</Button>
                    <Button variant="solid" color="primary">Save Changes</Button>
                </CardFooter>
            </Card>
        </div>
    );
}

// ============================================
// Example 3: Hoverable Cards
// ============================================
export function HoverableCardsExample() {
    return (
        <div className="space-y-4">
            <h3 className="text-lg font-semibold">Hoverable Cards</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card hoverable shadow="sm">
                    <CardBody>
                        <h4 className="font-semibold mb-2">Feature 1</h4>
                        <p className="text-sm text-gray-600">Hover to see shadow effect</p>
                    </CardBody>
                </Card>
                
                <Card hoverable shadow="sm">
                    <CardBody>
                        <h4 className="font-semibold mb-2">Feature 2</h4>
                        <p className="text-sm text-gray-600">Hover to see shadow effect</p>
                    </CardBody>
                </Card>
                
                <Card hoverable shadow="sm">
                    <CardBody>
                        <h4 className="font-semibold mb-2">Feature 3</h4>
                        <p className="text-sm text-gray-600">Hover to see shadow effect</p>
                    </CardBody>
                </Card>
            </div>
        </div>
    );
}

// ============================================
// Example 4: Clickable Card
// ============================================
export function ClickableCardExample() {
    const handleClick = () => {
        alert('Card clicked!');
    };

    return (
        <div className="space-y-4">
            <h3 className="text-lg font-semibold">Clickable Card</h3>
            
            <Card clickable onClick={handleClick} shadow="md">
                <CardHeader title="Click Me" subtitle="This entire card is clickable" />
                <CardBody>
                    <p>Click anywhere on this card to trigger an action.</p>
                    <p className="mt-2 text-sm text-gray-600">
                        Perfect for navigation or selection.
                    </p>
                </CardBody>
            </Card>
        </div>
    );
}

// ============================================
// Example 5: Card with Actions
// ============================================
export function CardWithActionsExample() {
    const handleClose = () => {
        alert('Close clicked!');
    };

    const handleEdit = () => {
        alert('Edit clicked!');
    };

    return (
        <div className="space-y-4">
            <h3 className="text-lg font-semibold">Card with Actions</h3>
            
            <Card>
                <CardHeader
                    title="Settings"
                    subtitle="Manage your preferences"
                    actions={
                        <Button variant="ghost" size="sm" onClick={handleEdit}>
                            <Icon name="menu" size={18} />
                        </Button>
                    }
                    onClose={handleClose}
                />
                <CardBody>
                    <p>Settings content goes here...</p>
                </CardBody>
            </Card>
        </div>
    );
}

// ============================================
// Example 6: Different Shadows
// ============================================
export function ShadowsExample() {
    return (
        <div className="space-y-4">
            <h3 className="text-lg font-semibold">Shadow Options</h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card shadow="sm">
                    <CardBody>
                        <p className="font-semibold">Small Shadow</p>
                        <p className="text-sm text-gray-600">shadow="sm"</p>
                    </CardBody>
                </Card>

                <Card shadow="md">
                    <CardBody>
                        <p className="font-semibold">Medium Shadow</p>
                        <p className="text-sm text-gray-600">shadow="md"</p>
                    </CardBody>
                </Card>

                <Card shadow="lg">
                    <CardBody>
                        <p className="font-semibold">Large Shadow</p>
                        <p className="text-sm text-gray-600">shadow="lg"</p>
                    </CardBody>
                </Card>
            </div>
        </div>
    );
}

// ============================================
// Example 7: Product Card (Different Data Shape)
// Using REAL contract data from product.contract.js
// ============================================
export function ProductCardExample() {
    // Using real product data from contract - T-Shirt product
    const product = PRODUCT_DATA[0];

    return (
        <div className="space-y-4">
            <h3 className="text-lg font-semibold">Product Card (Real Contract Data)</h3>
            <p className="text-sm text-gray-600">
                Using PRODUCT_DATA[0] from product.contract.js (T-Shirt)
            </p>

            <div className="max-w-sm">
                <Card hoverable shadow="md">
                    <CardBody padding={false}>
                        <img
                            src={product.media.images[0]}
                            alt={product.basic.name}
                            className="w-full h-48 object-cover rounded-t-md"
                        />
                        <div className="p-4">
                            <p className="text-xs text-gray-500 uppercase">{product.category}</p>
                            <h3 className="font-semibold text-lg mt-1">{product.basic.name}</h3>
                            <p className="text-sm text-gray-600 mt-1">{product.basic.shortDescription}</p>
                            <div className="flex items-center gap-2 mt-3">
                                <span className="text-2xl font-bold text-blue-600">
                                    ₹{product.pricing.sellingPrice}
                                </span>
                                <span className="text-sm text-gray-400 line-through">
                                    ₹{product.pricing.mrp}
                                </span>
                                <span className="text-xs text-green-600 font-semibold">
                                    {product.pricing.discount.label}
                                </span>
                            </div>
                            {product.inventory.inStock && (
                                <p className="text-xs text-green-600 mt-2">
                                    In Stock ({product.inventory.quantity} available)
                                </p>
                            )}
                        </div>
                    </CardBody>
                    <CardFooter>
                        <Button fullWidth variant="solid" color="primary">
                            <Icon name="cart" size={18} />
                            <span className="ml-2">Add to Cart</span>
                        </Button>
                    </CardFooter>
                </Card>
            </div>
        </div>
    );
}

// ============================================
// Example 8: Multiple Product Cards Grid
// Using different products from contract (Mug, Frame, Cushion)
// ============================================
export function MultipleProductCardsExample() {
    // Using products 1, 2, 3 from contract (Mug, Frame, Cushion)
    const products = [PRODUCT_DATA[1], PRODUCT_DATA[2], PRODUCT_DATA[3]];

    return (
        <div className="space-y-4">
            <h3 className="text-lg font-semibold">Multiple Product Cards (Real Contract Data)</h3>
            <p className="text-sm text-gray-600">
                Using PRODUCT_DATA[1-3] from product.contract.js (Mug, Frame, Cushion)
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {products.map((product) => (
                    <Card key={product.id} hoverable shadow="sm">
                        <CardBody padding={false}>
                            <img
                                src={product.media.thumbnail}
                                alt={product.basic.name}
                                className="w-full h-40 object-cover"
                            />
                            <div className="p-3">
                                <p className="text-xs text-gray-500 uppercase">{product.category}</p>
                                <h4 className="font-semibold text-sm mt-1">{product.basic.name}</h4>
                                <div className="flex items-center gap-2 mt-2">
                                    <span className="text-lg font-bold text-blue-600">
                                        ₹{product.pricing.sellingPrice}
                                    </span>
                                    <span className="text-xs text-gray-400 line-through">
                                        ₹{product.pricing.mrp}
                                    </span>
                                </div>
                            </div>
                        </CardBody>
                        <CardFooter className="p-3">
                            <Button fullWidth variant="outline" color="primary" size="sm">
                                View Details
                            </Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
    );
}

// ============================================
// Example 9: User Card (Different Data Shape)
// ============================================
export function UserCardExample() {
    const user = {
        id: 1,
        name: "John Doe",
        role: "Software Engineer",
        email: "john.doe@example.com",
        phone: "+1 234 567 8900",
        avatar: "https://i.pravatar.cc/150?img=12",
    };

    return (
        <div className="space-y-4">
            <h3 className="text-lg font-semibold">User Card (Different Data Shape)</h3>

            <div className="max-w-md">
                <Card border="default">
                    <CardHeader title={user.name} subtitle={user.role} />
                    <CardBody className="flex items-center gap-4">
                        <img
                            src={user.avatar}
                            alt={user.name}
                            className="w-16 h-16 rounded-full"
                        />
                        <div className="flex-1">
                            <p className="text-sm text-gray-600 flex items-center gap-2">
                                <Icon name="mail" size={16} />
                                {user.email}
                            </p>
                            <p className="text-sm text-gray-600 flex items-center gap-2 mt-1">
                                <Icon name="location" size={16} />
                                {user.phone}
                            </p>
                        </div>
                    </CardBody>
                    <CardFooter>
                        <Button variant="outline" color="neutral">Message</Button>
                        <Button variant="solid" color="primary">View Profile</Button>
                    </CardFooter>
                </Card>
            </div>
        </div>
    );
}

// ============================================
// Example 10: Blog Post Card (Different Data Shape)
// ============================================
export function BlogCardExample() {
    const post = {
        id: 1,
        title: "Getting Started with React",
        excerpt: "Learn the fundamentals of React and build your first component. This comprehensive guide covers everything you need to know.",
        author: "Jane Smith",
        date: "Dec 15, 2024",
        readTime: "5 min",
        image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=200&fit=crop",
    };

    return (
        <div className="space-y-4">
            <h3 className="text-lg font-semibold">Blog Post Card (Different Data Shape)</h3>

            <div className="max-w-md">
                <Card clickable onClick={() => alert('Navigate to post')} hoverable>
                    <CardBody padding={false}>
                        <img
                            src={post.image}
                            alt={post.title}
                            className="w-full h-40 object-cover"
                        />
                        <div className="p-4">
                            <h3 className="font-bold text-lg">{post.title}</h3>
                            <p className="text-sm text-gray-600 mt-2 line-clamp-2">
                                {post.excerpt}
                            </p>
                        </div>
                    </CardBody>
                    <CardFooter align="between" className="text-sm text-gray-500">
                        <span>{post.author} • {post.date}</span>
                        <span>{post.readTime} read</span>
                    </CardFooter>
                </Card>
            </div>
        </div>
    );
}

// ============================================
// Example 11: Stat Card
// ============================================
export function StatCardExample() {
    const stats = [
        { label: "Total Users", value: "12,345", change: "+12%", trend: "up" },
        { label: "Revenue", value: "$45,678", change: "+8%", trend: "up" },
        { label: "Orders", value: "1,234", change: "-3%", trend: "down" },
    ];

    return (
        <div className="space-y-4">
            <h3 className="text-lg font-semibold">Stat Cards</h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {stats.map((stat, index) => (
                    <Card key={index} shadow="sm" border="default">
                        <CardBody>
                            <p className="text-sm text-gray-600">{stat.label}</p>
                            <p className="text-3xl font-bold mt-2">{stat.value}</p>
                            <p className={`text-sm mt-2 ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                                {stat.change} from last month
                            </p>
                        </CardBody>
                    </Card>
                ))}
            </div>
        </div>
    );
}

// ============================================
// Example 12: Footer Alignment
// ============================================
export function FooterAlignmentExample() {
    return (
        <div className="space-y-4">
            <h3 className="text-lg font-semibold">Footer Alignment Options</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                    <CardHeader title="Left Aligned" />
                    <CardBody>
                        <p className="text-sm">Footer buttons aligned to the left</p>
                    </CardBody>
                    <CardFooter align="left">
                        <Button variant="solid" color="primary">Action</Button>
                    </CardFooter>
                </Card>

                <Card>
                    <CardHeader title="Center Aligned" />
                    <CardBody>
                        <p className="text-sm">Footer buttons centered</p>
                    </CardBody>
                    <CardFooter align="center">
                        <Button variant="solid" color="primary">Action</Button>
                    </CardFooter>
                </Card>

                <Card>
                    <CardHeader title="Right Aligned" />
                    <CardBody>
                        <p className="text-sm">Footer buttons aligned to the right (default)</p>
                    </CardBody>
                    <CardFooter align="right">
                        <Button variant="outline">Cancel</Button>
                        <Button variant="solid" color="primary">Save</Button>
                    </CardFooter>
                </Card>

                <Card>
                    <CardHeader title="Space Between" />
                    <CardBody>
                        <p className="text-sm">Footer buttons with space between</p>
                    </CardBody>
                    <CardFooter align="between">
                        <Button variant="ghost" color="danger">Delete</Button>
                        <Button variant="solid" color="primary">Save</Button>
                    </CardFooter>
                </Card>
            </div>
        </div>
    );
}

// ============================================
// Example 13: All Examples Combined
// ============================================
export function AllCardExamples() {
    return (
        <div className="p-8 space-y-12 max-w-6xl mx-auto">
            <h1 className="text-3xl font-bold mb-8">Card Component Examples</h1>
            <p className="text-gray-600 mb-8">
                Comprehensive examples showing all card features including real contract data integration
            </p>

            <SimpleCardExample />
            <CompleteCardExample />
            <HoverableCardsExample />
            <ClickableCardExample />
            <CardWithActionsExample />
            <ShadowsExample />
            <ProductCardExample />
            <MultipleProductCardsExample />
            <UserCardExample />
            <BlogCardExample />
            <StatCardExample />
            <FooterAlignmentExample />
        </div>
    );
}

