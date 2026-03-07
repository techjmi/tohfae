/**
 * Modal Examples
 * Complete examples showing all modal features and use cases
 */

"use client";
import React, { useState } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter } from './index';
import Button from '@/shared/ui/button/Button';
import { Icon } from '@/shared/icons';
import { PRODUCT_DATA } from '@/contract/product.contract';

// ============================================
// Example 1: Simple Modal
// ============================================
export function SimpleModalExample() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="space-y-4">
            <h3 className="text-lg font-semibold">Simple Modal</h3>
            <Button onClick={() => setIsOpen(true)}>Open Simple Modal</Button>

            <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
                <ModalBody>
                    <p>This is a simple modal with just body content.</p>
                    <p className="mt-2 text-sm text-gray-600">
                        Click outside or press ESC to close.
                    </p>
                </ModalBody>
            </Modal>
        </div>
    );
}

// ============================================
// Example 2: Complete Modal
// ============================================
export function CompleteModalExample() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="space-y-4">
            <h3 className="text-lg font-semibold">Complete Modal</h3>
            <Button onClick={() => setIsOpen(true)}>Open Complete Modal</Button>

            <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} size="lg">
                <ModalHeader
                    title="Edit Profile"
                    subtitle="Update your personal information"
                    onClose={() => setIsOpen(false)}
                />
                <ModalBody>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Full Name
                            </label>
                            <input
                                type="text"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                placeholder="John Doe"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Email
                            </label>
                            <input
                                type="email"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                placeholder="john@example.com"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Bio
                            </label>
                            <textarea
                                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                rows={4}
                                placeholder="Tell us about yourself..."
                            />
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button variant="outline" onClick={() => setIsOpen(false)}>
                        Cancel
                    </Button>
                    <Button variant="solid" color="primary" onClick={() => setIsOpen(false)}>
                        Save Changes
                    </Button>
                </ModalFooter>
            </Modal>
        </div>
    );
}

// ============================================
// Example 3: Confirmation Modal
// ============================================
export function ConfirmationModalExample() {
    const [isOpen, setIsOpen] = useState(false);

    const handleConfirm = () => {
        alert('Item deleted!');
        setIsOpen(false);
    };

    return (
        <div className="space-y-4">
            <h3 className="text-lg font-semibold">Confirmation Modal</h3>
            <Button color="danger" onClick={() => setIsOpen(true)}>
                Delete Item
            </Button>

            <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} size="sm">
                <ModalHeader title="Confirm Delete" onClose={() => setIsOpen(false)} />
                <ModalBody>
                    <p>Are you sure you want to delete this item?</p>
                    <p className="mt-2 text-sm text-gray-600">
                        This action cannot be undone.
                    </p>
                </ModalBody>
                <ModalFooter align="between">
                    <Button variant="ghost" onClick={() => setIsOpen(false)}>
                        Cancel
                    </Button>
                    <Button variant="solid" color="danger" onClick={handleConfirm}>
                        Delete
                    </Button>
                </ModalFooter>
            </Modal>
        </div>
    );
}

// ============================================
// Example 4: Alert Modal
// ============================================
export function AlertModalExample() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="space-y-4">
            <h3 className="text-lg font-semibold">Alert Modal</h3>
            <Button color="success" onClick={() => setIsOpen(true)}>
                Show Success
            </Button>

            <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} size="sm">
                <ModalHeader title="Success!" onClose={() => setIsOpen(false)} />
                <ModalBody>
                    <div className="flex items-start gap-3">
                        <Icon name="check" size={24} className="text-green-600 shrink-0" />
                        <div>
                            <p className="font-medium">Changes saved successfully</p>
                            <p className="mt-1 text-sm text-gray-600">
                                Your profile has been updated.
                            </p>
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button variant="solid" color="primary" onClick={() => setIsOpen(false)}>
                        OK
                    </Button>
                </ModalFooter>
            </Modal>
        </div>
    );
}

// ============================================
// Example 5: Different Sizes
// ============================================
export function SizesModalExample() {
    const [openModal, setOpenModal] = useState(null);

    const sizes = [
        { key: 'sm', label: 'Small', description: 'max-w-sm (384px)' },
        { key: 'md', label: 'Medium', description: 'max-w-lg (512px) - Default' },
        { key: 'lg', label: 'Large', description: 'max-w-2xl (672px)' },
        { key: 'xl', label: 'Extra Large', description: 'max-w-4xl (896px)' },
        { key: 'full', label: 'Full Width', description: 'max-w-full' },
    ];

    return (
        <div className="space-y-4">
            <h3 className="text-lg font-semibold">Different Sizes</h3>
            <div className="flex flex-wrap gap-2">
                {sizes.map(size => (
                    <Button
                        key={size.key}
                        variant="outline"
                        onClick={() => setOpenModal(size.key)}
                    >
                        {size.label}
                    </Button>
                ))}
            </div>

            {sizes.map(size => (
                <Modal
                    key={size.key}
                    isOpen={openModal === size.key}
                    onClose={() => setOpenModal(null)}
                    size={size.key}
                >
                    <ModalHeader
                        title={`${size.label} Modal`}
                        subtitle={size.description}
                        onClose={() => setOpenModal(null)}
                    />
                    <ModalBody>
                        <p>This is a {size.label.toLowerCase()} modal.</p>
                        <p className="mt-2 text-sm text-gray-600">
                            Size: <code className="bg-gray-100 px-2 py-1 rounded">{size.key}</code>
                        </p>
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={() => setOpenModal(null)}>Close</Button>
                    </ModalFooter>
                </Modal>
            ))}
        </div>
    );
}

// ============================================
// Example 6: Different Placements
// ============================================
export function PlacementsModalExample() {
    const [openModal, setOpenModal] = useState(null);

    const placements = [
        { key: 'center', label: 'Center', description: 'Centered (default)' },
        { key: 'top', label: 'Top', description: 'Top with padding' },
        { key: 'bottom', label: 'Bottom', description: 'Bottom sheet' },
    ];

    return (
        <div className="space-y-4">
            <h3 className="text-lg font-semibold">Different Placements</h3>
            <div className="flex flex-wrap gap-2">
                {placements.map(placement => (
                    <Button
                        key={placement.key}
                        variant="outline"
                        onClick={() => setOpenModal(placement.key)}
                    >
                        {placement.label}
                    </Button>
                ))}
            </div>

            {placements.map(placement => (
                <Modal
                    key={placement.key}
                    isOpen={openModal === placement.key}
                    onClose={() => setOpenModal(null)}
                    placement={placement.key}
                >
                    <ModalHeader
                        title={`${placement.label} Placement`}
                        subtitle={placement.description}
                        onClose={() => setOpenModal(null)}
                    />
                    <ModalBody>
                        <p>This modal is positioned at the {placement.label.toLowerCase()}.</p>
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={() => setOpenModal(null)}>Close</Button>
                    </ModalFooter>
                </Modal>
            ))}
        </div>
    );
}

// ============================================
// Example 7: Different Backdrops
// ============================================
export function BackdropsModalExample() {
    const [openModal, setOpenModal] = useState(null);

    const backdrops = [
        { key: 'default', label: 'Default', description: 'bg-black/40' },
        { key: 'dark', label: 'Dark', description: 'bg-black/60' },
        { key: 'light', label: 'Light', description: 'bg-black/20' },
        { key: 'blur', label: 'Blur', description: 'bg-black/40 + backdrop-blur' },
    ];

    return (
        <div className="space-y-4">
            <h3 className="text-lg font-semibold">Different Backdrops</h3>
            <div className="flex flex-wrap gap-2">
                {backdrops.map(backdrop => (
                    <Button
                        key={backdrop.key}
                        variant="outline"
                        onClick={() => setOpenModal(backdrop.key)}
                    >
                        {backdrop.label}
                    </Button>
                ))}
            </div>

            {backdrops.map(backdrop => (
                <Modal
                    key={backdrop.key}
                    isOpen={openModal === backdrop.key}
                    onClose={() => setOpenModal(null)}
                    backdrop={backdrop.key}
                >
                    <ModalHeader
                        title={`${backdrop.label} Backdrop`}
                        subtitle={backdrop.description}
                        onClose={() => setOpenModal(null)}
                    />
                    <ModalBody>
                        <p>This modal uses the {backdrop.label.toLowerCase()} backdrop style.</p>
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={() => setOpenModal(null)}>Close</Button>
                    </ModalFooter>
                </Modal>
            ))}
        </div>
    );
}

// ============================================
// Example 8: Product Details Modal (Real Contract Data)
// ============================================
export function ProductDetailsModalExample() {
    const [isOpen, setIsOpen] = useState(false);
    const product = PRODUCT_DATA[0]; // T-Shirt

    return (
        <div className="space-y-4">
            <h3 className="text-lg font-semibold">Product Details Modal (Real Contract Data)</h3>
            <Button onClick={() => setIsOpen(true)}>View Product Details</Button>

            <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} size="lg">
                <ModalHeader
                    title={product.basic.name}
                    subtitle={product.basic.shortDescription}
                    onClose={() => setIsOpen(false)}
                />
                <ModalBody>
                    <div className="space-y-4">
                        {/* Product Image */}
                        <img
                            src={product.media.images[0]}
                            alt={product.basic.name}
                            className="w-full h-64 object-cover rounded-lg"
                        />

                        {/* Product Description */}
                        <div>
                            <h4 className="font-semibold text-gray-900 mb-2">Description</h4>
                            <p className="text-gray-600">{product.basic.description}</p>
                        </div>

                        {/* Pricing */}
                        <div>
                            <h4 className="font-semibold text-gray-900 mb-2">Pricing</h4>
                            <div className="flex items-center gap-3">
                                <span className="text-2xl font-bold text-gray-900">
                                    ₹{product.pricing.sellingPrice}
                                </span>
                                <span className="text-lg text-gray-400 line-through">
                                    ₹{product.pricing.mrp}
                                </span>
                                <span className="px-2 py-1 bg-green-100 text-green-700 text-sm font-medium rounded">
                                    {product.pricing.discount.label}
                                </span>
                            </div>
                        </div>

                        {/* Inventory */}
                        <div>
                            <h4 className="font-semibold text-gray-900 mb-2">Availability</h4>
                            <p className="text-gray-600">
                                {product.inventory.inStock ? (
                                    <span className="text-green-600">
                                        In Stock ({product.inventory.quantity} available)
                                    </span>
                                ) : (
                                    <span className="text-red-600">Out of Stock</span>
                                )}
                            </p>
                        </div>

                        {/* Category */}
                        <div>
                            <h4 className="font-semibold text-gray-900 mb-2">Category</h4>
                            <span className="inline-block px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                                {product.category}
                            </span>
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button variant="outline" onClick={() => setIsOpen(false)}>
                        Close
                    </Button>
                    <Button variant="solid" color="primary">
                        Add to Cart
                    </Button>
                </ModalFooter>
            </Modal>
        </div>
    );
}

// ============================================
// Example 9: Product Quick View Modal (Real Contract Data)
// ============================================
export function ProductQuickViewModalExample() {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);

    const handleOpenModal = (product) => {
        setSelectedProduct(product);
        setIsOpen(true);
    };

    return (
        <div className="space-y-4">
            <h3 className="text-lg font-semibold">Product Quick View (Multiple Products)</h3>
            <div className="grid grid-cols-2 gap-4">
                {PRODUCT_DATA.slice(0, 4).map((product) => (
                    <div
                        key={product.id}
                        className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
                        onClick={() => handleOpenModal(product)}
                    >
                        <img
                            src={product.media.thumbnail}
                            alt={product.basic.name}
                            className="w-full h-32 object-cover rounded mb-2"
                        />
                        <h4 className="font-medium text-sm">{product.basic.name}</h4>
                        <p className="text-sm text-gray-600">₹{product.pricing.sellingPrice}</p>
                    </div>
                ))}
            </div>

            {selectedProduct && (
                <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} size="xl">
                    <ModalHeader
                        title="Quick View"
                        onClose={() => setIsOpen(false)}
                    />
                    <ModalBody>
                        <div className="grid grid-cols-2 gap-6">
                            {/* Left: Images */}
                            <div className="space-y-2">
                                <img
                                    src={selectedProduct.media.images[0]}
                                    alt={selectedProduct.basic.name}
                                    className="w-full h-80 object-cover rounded-lg"
                                />
                                <div className="grid grid-cols-3 gap-2">
                                    {selectedProduct.media.images.slice(0, 3).map((img, idx) => (
                                        <img
                                            key={idx}
                                            src={img}
                                            alt={`${selectedProduct.basic.name} ${idx + 1}`}
                                            className="w-full h-20 object-cover rounded cursor-pointer hover:opacity-75"
                                        />
                                    ))}
                                </div>
                            </div>

                            {/* Right: Details */}
                            <div className="space-y-4">
                                <div>
                                    <h2 className="text-2xl font-bold text-gray-900">
                                        {selectedProduct.basic.name}
                                    </h2>
                                    <p className="text-gray-600 mt-1">
                                        {selectedProduct.basic.shortDescription}
                                    </p>
                                </div>

                                <div className="flex items-center gap-3">
                                    <span className="text-3xl font-bold text-gray-900">
                                        ₹{selectedProduct.pricing.sellingPrice}
                                    </span>
                                    <span className="text-xl text-gray-400 line-through">
                                        ₹{selectedProduct.pricing.mrp}
                                    </span>
                                    <span className="px-2 py-1 bg-green-100 text-green-700 text-sm font-medium rounded">
                                        {selectedProduct.pricing.discount.label}
                                    </span>
                                </div>

                                <div>
                                    <p className="text-gray-700">{selectedProduct.basic.description}</p>
                                </div>

                                <div>
                                    {selectedProduct.inventory.inStock ? (
                                        <span className="text-green-600 font-medium">
                                            ✓ In Stock ({selectedProduct.inventory.quantity} available)
                                        </span>
                                    ) : (
                                        <span className="text-red-600 font-medium">✗ Out of Stock</span>
                                    )}
                                </div>

                                <div className="pt-4">
                                    <Button variant="solid" color="primary" className="w-full">
                                        Add to Cart
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </ModalBody>
                </Modal>
            )}
        </div>
    );
}

// ============================================
// Example 10: Account Actions Modal (Logout, Delete, etc.)
// ============================================
export function AccountActionsModalExample() {
    const [logoutOpen, setLogoutOpen] = useState(false);
    const [deleteOpen, setDeleteOpen] = useState(false);
    const [deactivateOpen, setDeactivateOpen] = useState(false);

    const handleLogout = () => {
        alert('Logged out successfully!');
        setLogoutOpen(false);
    };

    const handleDelete = () => {
        alert('Account deleted!');
        setDeleteOpen(false);
    };

    const handleDeactivate = () => {
        alert('Account deactivated!');
        setDeactivateOpen(false);
    };

    return (
        <div className="space-y-4">
            <h3 className="text-lg font-semibold">Account Actions Modal (Full Width Footer with CTA)</h3>
            <p className="text-sm text-gray-600">
                Common pattern: Cancel on left, Danger action on right, full width footer
            </p>

            <div className="flex gap-3">
                <Button variant="outline" onClick={() => setLogoutOpen(true)}>
                    Logout
                </Button>
                <Button variant="outline" color="warning" onClick={() => setDeactivateOpen(true)}>
                    Deactivate Account
                </Button>
                <Button variant="outline" color="danger" onClick={() => setDeleteOpen(true)}>
                    Delete Account
                </Button>
            </div>

            {/* Logout Modal */}
            <Modal isOpen={logoutOpen} onClose={() => setLogoutOpen(false)} size="sm">
                <ModalHeader title="Logout" onClose={() => setLogoutOpen(false)} />
                <ModalBody>
                    <p>Are you sure you want to logout?</p>
                    <p className="mt-2 text-sm text-gray-600">
                        You'll need to login again to access your account.
                    </p>
                </ModalBody>
                <ModalFooter align="between">
                    <Button variant="outline" onClick={() => setLogoutOpen(false)}>
                        Cancel
                    </Button>
                    <Button variant="solid" color="primary" onClick={handleLogout}>
                        Logout
                    </Button>
                </ModalFooter>
            </Modal>

            {/* Delete Account Modal */}
            <Modal isOpen={deleteOpen} onClose={() => setDeleteOpen(false)} size="sm">
                <ModalHeader title="Delete Account" onClose={() => setDeleteOpen(false)} />
                <ModalBody>
                    <div className="space-y-3">
                        <div className="flex items-start gap-3 p-3 bg-red-50 border border-red-200 rounded-lg">
                            <Icon name="warning" size={20} className="text-red-600 shrink-0 mt-0.5" />
                            <div>
                                <p className="font-medium text-red-900">Warning: This action is permanent!</p>
                                <p className="text-sm text-red-700 mt-1">
                                    All your data will be permanently deleted and cannot be recovered.
                                </p>
                            </div>
                        </div>
                        <p className="text-gray-700">
                            Are you absolutely sure you want to delete your account?
                        </p>
                    </div>
                </ModalBody>
                <ModalFooter align="between">
                    <Button variant="outline" onClick={() => setDeleteOpen(false)}>
                        Cancel
                    </Button>
                    <Button variant="solid" color="danger" onClick={handleDelete}>
                        Delete Account
                    </Button>
                </ModalFooter>
            </Modal>

            {/* Deactivate Account Modal */}
            <Modal isOpen={deactivateOpen} onClose={() => setDeactivateOpen(false)} size="md">
                <ModalHeader
                    title="Deactivate Account"
                    subtitle="Temporarily disable your account"
                    onClose={() => setDeactivateOpen(false)}
                />
                <ModalBody>
                    <div className="space-y-3">
                        <p className="text-gray-700">
                            Deactivating your account will:
                        </p>
                        <ul className="list-disc list-inside space-y-2 text-gray-600 ml-2">
                            <li>Hide your profile from other users</li>
                            <li>Disable notifications</li>
                            <li>Preserve your data for reactivation</li>
                            <li>Allow you to reactivate anytime</li>
                        </ul>
                        <p className="text-sm text-gray-600 mt-4">
                            You can reactivate your account by logging in again.
                        </p>
                    </div>
                </ModalBody>
                <ModalFooter align="between">
                    <Button variant="outline" onClick={() => setDeactivateOpen(false)}>
                        Cancel
                    </Button>
                    <Button variant="solid" color="warning" onClick={handleDeactivate}>
                        Deactivate Account
                    </Button>
                </ModalFooter>
            </Modal>
        </div>
    );
}

// ============================================
// All Modal Examples Combined
// ============================================
export function AllModalExamples() {
    return (
        <div className="space-y-12 p-8">
            <h1 className="text-3xl font-bold mb-8">Modal Component Examples</h1>

            <SimpleModalExample />
            <hr className="my-8" />

            <CompleteModalExample />
            <hr className="my-8" />

            <ConfirmationModalExample />
            <hr className="my-8" />

            <AlertModalExample />
            <hr className="my-8" />

            <SizesModalExample />
            <hr className="my-8" />

            <PlacementsModalExample />
            <hr className="my-8" />

            <BackdropsModalExample />
            <hr className="my-8" />

            <ProductDetailsModalExample />
            <hr className="my-8" />

            <ProductQuickViewModalExample />
            <hr className="my-8" />

            <AccountActionsModalExample />
        </div>
    );
}

