/**
 * Dropdown Examples
 * 
 * Complete examples showing all dropdown features and use cases
 */
"use client";
import React from 'react';
import { useToggle } from '@/shared/hooks/useToggle';
import { useClickOutside } from '@/shared/hooks/useClickOutside';
import {
    Dropdown,
    DropdownContent,
    DropdownItem,
    DropdownDivider,
    DropdownHeader,
} from './index';

// ============================================
// Example 1: Simple Dropdown
// ============================================
export function SimpleDropdownExample() {
    const [isOpen, toggleOpen] = useToggle();
    const ref = useClickOutside(() => toggleOpen(false));

    return (
        <div ref={ref} className="relative">
            <button onClick={(e) => {
                e.stopPropagation();
                toggleOpen(!isOpen);
            }}>
                Open Menu
            </button>

            {isOpen && (
                <Dropdown position="bottomRight" variant="default" size="md">
                    <DropdownContent>
                        <DropdownItem onClick={() => console.log('Profile')}>
                            My Profile
                        </DropdownItem>
                        <DropdownItem onClick={() => console.log('Settings')}>
                            Settings
                        </DropdownItem>
                        <DropdownDivider />
                        <DropdownItem onClick={() => console.log('Logout')} danger>
                            Logout
                        </DropdownItem>
                    </DropdownContent>
                </Dropdown>
            )}
        </div>
    );
}
// ============================================
// Example 2: Profile Menu with Sections
// ============================================
export function ProfileMenuExample({ user }) {
    const [isOpen, toggleOpen] = useToggle();
    const ref = useClickOutside(() => toggleOpen(false));
    return (
        <div ref={ref} className="relative">
            <button onClick={(e) => {
                e.stopPropagation();
                toggleOpen(!isOpen);
            }}>
                <img src={user.avatar} alt="Profile" className="w-10 h-10 rounded-full" />
            </button>

            {isOpen && (
                <Dropdown position="bottomRight" variant="default" size="md">
                    <DropdownContent scrollable={true}>
                        <DropdownHeader>Account</DropdownHeader>

                        <DropdownItem href="/profile">
                            My Profile
                        </DropdownItem>
                        <DropdownItem href="/orders">
                            My Orders
                        </DropdownItem>
                        <DropdownItem href="/wishlist">
                            Wishlist
                        </DropdownItem>

                        <DropdownDivider />

                        <DropdownHeader>Settings</DropdownHeader>

                        <DropdownItem href="/settings">
                            Account Settings
                        </DropdownItem>
                        <DropdownItem href="/preferences">
                            Preferences
                        </DropdownItem>

                        <DropdownDivider />

                        <DropdownItem onClick={() => console.log('Logout')} danger>
                            Logout
                        </DropdownItem>
                    </DropdownContent>
                </Dropdown>
            )}
        </div>
    );
}
// ============================================
// Example 3: Different Positions
// ============================================
export function PositionExamples() {
    const [position, setPosition] = React.useState('bottomRight');
    const [isOpen, toggleOpen] = useToggle();
    const ref = useClickOutside(() => toggleOpen(false));

    return (
        <div ref={ref} className="relative">
            <button onClick={(e) => {
                e.stopPropagation();
                toggleOpen(!isOpen);
            }}>
                Position: {position}
            </button>

            {isOpen && (
                <Dropdown position={position} variant="default" size="sm">
                    <DropdownContent>
                        <DropdownItem onClick={() => setPosition('top')}>Top</DropdownItem>
                        <DropdownItem onClick={() => setPosition('bottom')}>Bottom</DropdownItem>
                        <DropdownItem onClick={() => setPosition('left')}>Left</DropdownItem>
                        <DropdownItem onClick={() => setPosition('right')}>Right</DropdownItem>
                    </DropdownContent>
                </Dropdown>
            )}
        </div>
    );
}

// ============================================
// Example 4: Different Variants
// ============================================
export function VariantExamples() {
    const [isOpen, toggleOpen] = useToggle();
    const ref = useClickOutside(() => toggleOpen(false));

    return (
        <div ref={ref} className="relative">
            <button onClick={(e) => {
                e.stopPropagation();
                toggleOpen(!isOpen);
            }}>
                Variants
            </button>

            {isOpen && (
                <Dropdown position="bottomRight" variant="dark" size="md">
                    <DropdownContent>
                        <DropdownItem>Default Variant</DropdownItem>
                        <DropdownItem>Dark Variant (current)</DropdownItem>
                        <DropdownItem>Light Variant</DropdownItem>
                        <DropdownItem>Transparent Variant</DropdownItem>
                    </DropdownContent>
                </Dropdown>
            )}
        </div>
    );
}

// ============================================
// Example 5: Scrollable Long List
// ============================================
export function ScrollableDropdownExample() {
    const [isOpen, toggleOpen] = useToggle();
    const ref = useClickOutside(() => toggleOpen(false));

    const items = Array.from({ length: 20 }, (_, i) => `Item ${i + 1}`);

    return (
        <div ref={ref} className="relative">
            <button onClick={(e) => {
                e.stopPropagation();
                toggleOpen(!isOpen);
            }}>
                Long List
            </button>

            {isOpen && (
                <Dropdown position="bottomRight" variant="default" size="md">
                    <DropdownContent scrollable={true} maxHeight="300px">
                        {items.map((item, index) => (
                            <DropdownItem key={index} onClick={() => console.log(item)}>
                                {item}
                            </DropdownItem>
                        ))}
                    </DropdownContent>
                </Dropdown>
            )}
        </div>
    );
}

