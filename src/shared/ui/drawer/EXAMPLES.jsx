/**
 * Drawer Examples
 * Complete examples showing all drawer features and use cases
 */

"use client";
import React from 'react';
import { useToggle } from '@/shared/hooks/useToggle';
import {
    Drawer,
    DrawerHeader,
    DrawerBody,
    DrawerFooter,
    DRAWER_POSITION,
    DRAWER_VARIANT,
} from './index';

// ============================================
// Example 1: Simple Drawer
// ============================================
export function SimpleDrawerExample() {
    const [isOpen, toggleOpen] = useToggle();

    return (
        <div>
            <button
                onClick={() => toggleOpen(true)}
                className="px-4 py-2 bg-blue-600 text-white rounded"
            >
                Open Drawer
            </button>

            <Drawer isOpen={isOpen} onClose={() => toggleOpen(false)}>
                <DrawerHeader onClose={() => toggleOpen(false)}>
                    <h2 className="text-xl font-semibold">Simple Drawer</h2>
                </DrawerHeader>

                <DrawerBody>
                    <p>This is a simple drawer with default settings.</p>
                    <p>Click outside or press ESC to close.</p>
                </DrawerBody>

                <DrawerFooter>
                    <button
                        onClick={() => toggleOpen(false)}
                        className="px-4 py-2 bg-gray-200 rounded"
                    >
                        Close
                    </button>
                </DrawerFooter>
            </Drawer>
        </div>
    );
}

// ============================================
// Example 2: Navigation Menu (Left Drawer)
// ============================================
export function NavigationDrawerExample() {
    const [isOpen, toggleOpen] = useToggle();

    const menuItems = [
        { label: 'Home', href: '/' },
        { label: 'Products', href: '/products' },
        { label: 'About', href: '/about' },
        { label: 'Contact', href: '/contact' },
    ];

    return (
        <div>
            <button
                onClick={() => toggleOpen(true)}
                className="px-4 py-2 bg-blue-600 text-white rounded"
            >
                Open Menu
            </button>

            <Drawer
                isOpen={isOpen}
                onClose={() => toggleOpen(false)}
                position={DRAWER_POSITION.left}
                size="md"
            >
                <DrawerHeader onClose={() => toggleOpen(false)}>
                    <h2 className="text-xl font-semibold">Menu</h2>
                </DrawerHeader>

                <DrawerBody>
                    <nav className="flex flex-col gap-2">
                        {menuItems.map((item, index) => (
                            <a
                                key={index}
                                href={item.href}
                                className="px-4 py-2 hover:bg-gray-100 rounded transition-colors"
                            >
                                {item.label}
                            </a>
                        ))}
                    </nav>
                </DrawerBody>
            </Drawer>
        </div>
    );
}

// ============================================
// Example 3: Filter Panel (Right Drawer)
// ============================================
export function FilterDrawerExample() {
    const [isOpen, toggleOpen] = useToggle();
    const [filters, setFilters] = React.useState({
        category: '',
        priceRange: '',
        inStock: false,
    });

    const handleApply = () => {
        console.log('Applying filters:', filters);
        toggleOpen(false);
    };

    const handleClear = () => {
        setFilters({ category: '', priceRange: '', inStock: false });
    };

    return (
        <div>
            <button
                onClick={() => toggleOpen(true)}
                className="px-4 py-2 bg-blue-600 text-white rounded"
            >
                Open Filters
            </button>

            <Drawer
                isOpen={isOpen}
                onClose={() => toggleOpen(false)}
                position={DRAWER_POSITION.right}
                size="sm"
            >
                <DrawerHeader onClose={() => toggleOpen(false)}>
                    <h2 className="text-xl font-semibold">Filters</h2>
                </DrawerHeader>

                <DrawerBody>
                    <div className="flex flex-col gap-4">
                        <div>
                            <label className="block text-sm font-medium mb-1">
                                Category
                            </label>
                            <select
                                value={filters.category}
                                onChange={(e) => setFilters({ ...filters, category: e.target.value })}
                                className="w-full px-3 py-2 border rounded"
                            >
                                <option value="">All</option>
                                <option value="electronics">Electronics</option>
                                <option value="clothing">Clothing</option>
                            </select>
                        </div>

                        <div>
                            <label className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    checked={filters.inStock}
                                    onChange={(e) => setFilters({ ...filters, inStock: e.target.checked })}
                                />
                                <span>In Stock Only</span>
                            </label>
                        </div>
                    </div>
                </DrawerBody>

                <DrawerFooter align="between">
                    <button
                        onClick={handleClear}
                        className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded"
                    >
                        Clear All
                    </button>
                    <button
                        onClick={handleApply}
                        className="px-4 py-2 bg-blue-600 text-white rounded"
                    >
                        Apply Filters
                    </button>
                </DrawerFooter>
            </Drawer>
        </div>
    );
}

// ============================================
// Example 4: Shopping Cart (Right Drawer)
// ============================================
export function ShoppingCartDrawerExample() {
    const [isOpen, toggleOpen] = useToggle();
    const [cartItems] = React.useState([
        { id: 1, name: 'Product 1', price: 29.99, quantity: 2 },
        { id: 2, name: 'Product 2', price: 49.99, quantity: 1 },
        { id: 3, name: 'Product 3', price: 19.99, quantity: 3 },
    ]);

    const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

    return (
        <div>
            <button
                onClick={() => toggleOpen(true)}
                className="px-4 py-2 bg-blue-600 text-white rounded"
            >
                Cart ({cartItems.length})
            </button>

            <Drawer
                isOpen={isOpen}
                onClose={() => toggleOpen(false)}
                position={DRAWER_POSITION.right}
                size="lg"
            >
                <DrawerHeader onClose={() => toggleOpen(false)}>
                    <h2 className="text-xl font-semibold">
                        Shopping Cart ({cartItems.length} items)
                    </h2>
                </DrawerHeader>

                <DrawerBody>
                    <div className="flex flex-col gap-4">
                        {cartItems.map((item) => (
                            <div key={item.id} className="flex justify-between items-center p-3 border rounded">
                                <div>
                                    <h3 className="font-medium">{item.name}</h3>
                                    <p className="text-sm text-gray-600">
                                        ${item.price} × {item.quantity}
                                    </p>
                                </div>
                                <div className="font-semibold">
                                    ${(item.price * item.quantity).toFixed(2)}
                                </div>
                            </div>
                        ))}
                    </div>
                </DrawerBody>

                <DrawerFooter align="between">
                    <div className="text-lg font-semibold">
                        Total: ${total.toFixed(2)}
                    </div>
                    <button className="px-6 py-2 bg-blue-600 text-white rounded">
                        Checkout
                    </button>
                </DrawerFooter>
            </Drawer>
        </div>
    );
}

// ============================================
// Example 5: Bottom Drawer (Mobile Sheet)
// ============================================
export function BottomSheetExample() {
    const [isOpen, toggleOpen] = useToggle();

    return (
        <div>
            <button
                onClick={() => toggleOpen(true)}
                className="px-4 py-2 bg-blue-600 text-white rounded"
            >
                Open Bottom Sheet
            </button>

            <Drawer
                isOpen={isOpen}
                onClose={() => toggleOpen(false)}
                position={DRAWER_POSITION.bottom}
                size="50%"
            >
                <DrawerHeader onClose={() => toggleOpen(false)}>
                    <h2 className="text-xl font-semibold">Bottom Sheet</h2>
                </DrawerHeader>

                <DrawerBody>
                    <p>This drawer slides up from the bottom.</p>
                    <p>Perfect for mobile interfaces!</p>
                </DrawerBody>

                <DrawerFooter>
                    <button
                        onClick={() => toggleOpen(false)}
                        className="w-full px-4 py-2 bg-blue-600 text-white rounded"
                    >
                        Got it
                    </button>
                </DrawerFooter>
            </Drawer>
        </div>
    );
}

// ============================================
// Example 6: Different Sizes
// ============================================
export function DrawerSizesExample() {
    const [size, setSize] = React.useState('md');
    const [isOpen, toggleOpen] = useToggle();

    return (
        <div>
            <div className="flex gap-2 mb-4">
                {['sm', 'md', 'lg', 'xl', 'full'].map((s) => (
                    <button
                        key={s}
                        onClick={() => {
                            setSize(s);
                            toggleOpen(true);
                        }}
                        className="px-4 py-2 bg-blue-600 text-white rounded"
                    >
                        {s.toUpperCase()}
                    </button>
                ))}
            </div>

            <Drawer
                isOpen={isOpen}
                onClose={() => toggleOpen(false)}
                size={size}
            >
                <DrawerHeader onClose={() => toggleOpen(false)}>
                    <h2 className="text-xl font-semibold">Size: {size}</h2>
                </DrawerHeader>

                <DrawerBody>
                    <p>This drawer is using the "{size}" size.</p>
                </DrawerBody>
            </Drawer>
        </div>
    );
}

// ============================================
// Example 7: Persistent Drawer
// ============================================
export function PersistentDrawerExample() {
    const [isOpen, toggleOpen] = useToggle();

    return (
        <div className="flex">
            <Drawer
                isOpen={isOpen}
                onClose={() => toggleOpen(false)}
                variant={DRAWER_VARIANT.persistent}
                position={DRAWER_POSITION.left}
                size="md"
            >
                <DrawerHeader onClose={() => toggleOpen(false)}>
                    <h2 className="text-xl font-semibold">Persistent Drawer</h2>
                </DrawerHeader>

                <DrawerBody>
                    <p>This drawer pushes content aside.</p>
                    <p>No backdrop overlay.</p>
                </DrawerBody>
            </Drawer>

            <div className="flex-1 p-8">
                <button
                    onClick={() => toggleOpen(!isOpen)}
                    className="px-4 py-2 bg-blue-600 text-white rounded"
                >
                    Toggle Persistent Drawer
                </button>
                <p className="mt-4">Main content area</p>
            </div>
        </div>
    );
}


