/**
 * Button Examples
 * Complete examples showing all button features and use cases
 */

"use client";
import React from 'react';
import Button from './Button';
import { Icon } from '@/shared/icons';

// ============================================
// Example 1: All Variants
// ============================================
export function VariantsExample() {
    return (
        <div className="space-y-4">
            <h3 className="text-lg font-semibold">Variants</h3>
            
            <div className="flex gap-3 flex-wrap">
                <Button variant="solid" color="primary">Solid</Button>
                <Button variant="outline" color="primary">Outline</Button>
                <Button variant="ghost" color="primary">Ghost</Button>
            </div>
        </div>
    );
}

// ============================================
// Example 2: All Sizes
// ============================================
export function SizesExample() {
    return (
        <div className="space-y-4">
            <h3 className="text-lg font-semibold">Sizes</h3>
            
            <div className="flex gap-3 items-center flex-wrap">
                <Button size="xs" variant="solid" color="primary">Extra Small</Button>
                <Button size="sm" variant="solid" color="primary">Small</Button>
                <Button size="md" variant="solid" color="primary">Medium</Button>
                <Button size="lg" variant="solid" color="primary">Large</Button>
            </div>
        </div>
    );
}

// ============================================
// Example 3: All Colors
// ============================================
export function ColorsExample() {
    return (
        <div className="space-y-4">
            <h3 className="text-lg font-semibold">Colors</h3>
            
            {/* Solid Variant */}
            <div>
                <p className="text-sm text-gray-600 mb-2">Solid</p>
                <div className="flex gap-3 flex-wrap">
                    <Button variant="solid" color="neutral">Neutral</Button>
                    <Button variant="solid" color="primary">Primary</Button>
                    <Button variant="solid" color="info">Info</Button>
                    <Button variant="solid" color="success">Success</Button>
                    <Button variant="solid" color="warning">Warning</Button>
                    <Button variant="solid" color="danger">Danger</Button>
                </div>
            </div>

            {/* Outline Variant */}
            <div>
                <p className="text-sm text-gray-600 mb-2">Outline</p>
                <div className="flex gap-3 flex-wrap">
                    <Button variant="outline" color="neutral">Neutral</Button>
                    <Button variant="outline" color="primary">Primary</Button>
                    <Button variant="outline" color="info">Info</Button>
                    <Button variant="outline" color="success">Success</Button>
                    <Button variant="outline" color="warning">Warning</Button>
                    <Button variant="outline" color="danger">Danger</Button>
                </div>
            </div>

            {/* Ghost Variant */}
            <div>
                <p className="text-sm text-gray-600 mb-2">Ghost</p>
                <div className="flex gap-3 flex-wrap">
                    <Button variant="ghost" color="neutral">Neutral</Button>
                    <Button variant="ghost" color="primary">Primary</Button>
                    <Button variant="ghost" color="info">Info</Button>
                    <Button variant="ghost" color="success">Success</Button>
                    <Button variant="ghost" color="warning">Warning</Button>
                    <Button variant="ghost" color="danger">Danger</Button>
                </div>
            </div>
        </div>
    );
}

// ============================================
// Example 4: Border Radius
// ============================================
export function RadiusExample() {
    return (
        <div className="space-y-4">
            <h3 className="text-lg font-semibold">Border Radius</h3>
            
            <div className="flex gap-3 flex-wrap">
                <Button radius="xs" variant="solid" color="primary">XS Radius</Button>
                <Button radius="sm" variant="solid" color="primary">SM Radius</Button>
                <Button radius="md" variant="solid" color="primary">MD Radius</Button>
                <Button radius="lg" variant="solid" color="primary">LG Radius</Button>
                <Button radius="full" variant="solid" color="primary">Pill Button</Button>
            </div>
        </div>
    );
}

// ============================================
// Example 5: With Icons
// ============================================
export function IconsExample() {
    return (
        <div className="space-y-4">
            <h3 className="text-lg font-semibold">With Icons</h3>
            
            <div className="flex gap-3 flex-wrap">
                {/* Icon on left */}
                <Button variant="solid" color="primary">
                    <Icon name="add" size={18} />
                    <span className="ml-2">Add Item</span>
                </Button>

                {/* Icon on right */}
                <Button variant="outline" color="primary">
                    <span className="mr-2">Download</span>
                    <Icon name="download" size={18} />
                </Button>

                {/* Icon only */}
                <Button variant="ghost" color="neutral" className="!p-2">
                    <Icon name="close" size={20} />
                </Button>

                {/* Multiple icons */}
                <Button variant="solid" color="success">
                    <Icon name="cart" size={18} />
                    <span className="mx-2">Add to Cart</span>
                    <Icon name="arrowRight" size={18} />
                </Button>
            </div>
        </div>
    );
}

// ============================================
// Example 6: States
// ============================================
export function StatesExample() {
    return (
        <div className="space-y-4">
            <h3 className="text-lg font-semibold">States</h3>

            <div className="flex gap-3 flex-wrap">
                <Button variant="solid" color="primary">Normal</Button>
                <Button variant="solid" color="primary" disabled>Disabled</Button>
            </div>
        </div>
    );
}

// ============================================
// Example 7: Full Width
// ============================================
export function FullWidthExample() {
    return (
        <div className="space-y-4">
            <h3 className="text-lg font-semibold">Full Width</h3>

            <div className="space-y-3">
                <Button fullWidth variant="solid" color="primary">
                    Full Width Solid
                </Button>
                <Button fullWidth variant="outline" color="primary">
                    Full Width Outline
                </Button>
                <Button fullWidth variant="ghost" color="primary">
                    Full Width Ghost
                </Button>
            </div>
        </div>
    );
}

// ============================================
// Example 8: As Anchor Tag
// ============================================
export function AnchorExample() {
    return (
        <div className="space-y-4">
            <h3 className="text-lg font-semibold">As Anchor Tag</h3>

            <div className="flex gap-3 flex-wrap">
                <Button as="a" href="#section" variant="solid" color="primary">
                    Internal Link
                </Button>
                <Button as="a" href="https://example.com" target="_blank" variant="outline" color="primary">
                    External Link
                </Button>
            </div>
        </div>
    );
}

// ============================================
// Example 9: Form Actions
// ============================================
export function FormActionsExample() {
    const handleSubmit = (e) => {
        e.preventDefault();
        alert('Form submitted!');
    };

    const handleCancel = () => {
        alert('Cancelled!');
    };

    return (
        <div className="space-y-4">
            <h3 className="text-lg font-semibold">Form Actions</h3>

            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="text"
                    placeholder="Enter your name"
                    className="w-full px-4 py-2 border rounded-md"
                />

                <div className="flex gap-3">
                    <Button type="submit" variant="solid" color="primary">
                        Submit
                    </Button>
                    <Button type="button" variant="outline" color="neutral" onClick={handleCancel}>
                        Cancel
                    </Button>
                </div>
            </form>
        </div>
    );
}

// ============================================
// Example 10: Action Buttons
// ============================================
export function ActionButtonsExample() {
    const handleSave = () => alert('Saved!');
    const handleDelete = () => {
        if (confirm('Are you sure you want to delete?')) {
            alert('Deleted!');
        }
    };
    const handleEdit = () => alert('Editing...');

    return (
        <div className="space-y-4">
            <h3 className="text-lg font-semibold">Action Buttons</h3>

            <div className="flex gap-3 flex-wrap">
                <Button variant="solid" color="success" onClick={handleSave}>
                    <Icon name="add" size={18} />
                    <span className="ml-2">Save</span>
                </Button>

                <Button variant="outline" color="primary" onClick={handleEdit}>
                    Edit
                </Button>

                <Button variant="solid" color="danger" onClick={handleDelete}>
                    Delete
                </Button>
            </div>
        </div>
    );
}

// ============================================
// Example 11: Loading State (Custom)
// ============================================
export function LoadingExample() {
    const [loading, setLoading] = React.useState(false);

    const handleClick = () => {
        setLoading(true);
        setTimeout(() => setLoading(false), 2000);
    };

    return (
        <div className="space-y-4">
            <h3 className="text-lg font-semibold">Loading State</h3>

            <div className="flex gap-3 flex-wrap">
                <Button
                    variant="solid"
                    color="primary"
                    disabled={loading}
                    onClick={handleClick}
                >
                    {loading ? 'Loading...' : 'Click Me'}
                </Button>
            </div>
        </div>
    );
}

// ============================================
// Example 12: Button Group
// ============================================
export function ButtonGroupExample() {
    const [selected, setSelected] = React.useState('option1');

    return (
        <div className="space-y-4">
            <h3 className="text-lg font-semibold">Button Group</h3>

            <div className="inline-flex rounded-md shadow-sm" role="group">
                <Button
                    variant={selected === 'option1' ? 'solid' : 'outline'}
                    color="primary"
                    radius="xs"
                    className="rounded-r-none"
                    onClick={() => setSelected('option1')}
                >
                    Option 1
                </Button>
                <Button
                    variant={selected === 'option2' ? 'solid' : 'outline'}
                    color="primary"
                    radius="xs"
                    className="rounded-none border-l-0"
                    onClick={() => setSelected('option2')}
                >
                    Option 2
                </Button>
                <Button
                    variant={selected === 'option3' ? 'solid' : 'outline'}
                    color="primary"
                    radius="xs"
                    className="rounded-l-none border-l-0"
                    onClick={() => setSelected('option3')}
                >
                    Option 3
                </Button>
            </div>
        </div>
    );
}

// ============================================
// Example 13: All Examples Combined
// ============================================
export function AllButtonExamples() {
    return (
        <div className="p-8 space-y-8 max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-8">Button Component Examples</h1>

            <VariantsExample />
            <SizesExample />
            <ColorsExample />
            <RadiusExample />
            <IconsExample />
            <StatesExample />
            <FullWidthExample />
            <AnchorExample />
            <FormActionsExample />
            <ActionButtonsExample />
            <LoadingExample />
            <ButtonGroupExample />
        </div>
    );
}

