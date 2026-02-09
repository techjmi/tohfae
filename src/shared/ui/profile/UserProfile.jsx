/**
 * UserProfile Component
 *
 * Main profile component that combines avatar with user info
 * Can be used in two modes:
 * 1. Compact mode (avatar only) - for navbar with dropdown
 * 2. Full mode (avatar + details) - for profile pages
 *
 * Features:
 * - Uses UserAvatar component
 * - Uses your existing Dropdown component
 * - Horizontal/Vertical layouts
 * - Customizable display options
 *
 * Usage:
 * // Navbar (compact with dropdown)
 * <UserProfile user={user} mode="compact" showDropdown={true}>
 *   {dropdownContent}
 * </UserProfile>
 *
 * // Profile page (full details)
 * <UserProfile user={user} mode="full" showEmail={true} showPhone={true} />
 */

"use client";

import React, { useState } from 'react';
import {
    PROFILE_TYPE,
    PROFILE_ORIENTATION,
    AVATAR_SIZE,
    DEFAULT_PROFILE_MENU
} from './profile.constant';
import UserAvatar from './UserAvatar';
import { useClickOutside } from '@/shared/hooks/useClickOutside';
import {
    Dropdown,
    DropdownContent,
    DropdownItem,
    DropdownDivider
} from '@/shared/ui/dropdown';


const UserProfile = ({
    user,
    type = PROFILE_TYPE.public,
    mode = "compact", // "compact" | "full"
    orientation = PROFILE_ORIENTATION.horizontal,
    size = AVATAR_SIZE.md,
    showStatus = false,
    showEmail = false,
    showPhone = false,
    showDropdown = false,
    dropdownPosition = "bottom",
    dropdownVariant = "default",
    dropdownSize = "md",
    dropdownMenu = DEFAULT_PROFILE_MENU,
    children, // Dropdown content
    className = "",
    dropdownClassName = "",
    onMenuItemClick,
    ...props
}) => {
    const isVertical = orientation === PROFILE_ORIENTATION.vertical;
    const layoutClass = isVertical
        ? 'flex-col items-center text-center gap-3'
        : 'flex items-center gap-4';

    // Default dropdown content if not provided via children
    const defaultDropdownContent = (
        <>
            {dropdownMenu.map((item, index) => {
                if (item.type === "divider") {
                    return <DropdownDivider key={index} />;
                }

                return (
                    <DropdownItem
                        key={index}
                        href={item.href}
                        onClick={(e) => {
                            if (onMenuItemClick) {
                                e.preventDefault();
                                onMenuItemClick(item);
                            }
                        }}
                        danger={item.variant === 'danger'}
                        icon={item.icon}
                    >
                        {item.label}
                    </DropdownItem>
                );
            })}
        </>
    );

    // State for dropdown
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useClickOutside(() => setIsOpen(false));

    // Handle avatar click
    const handleAvatarClick = (e) => {
        if (showDropdown) {
            e.stopPropagation();
            setIsOpen(!isOpen);
        }
    };

    // Compact mode - just avatar (for navbar with dropdown)
    if (mode === "compact") {
        if (showDropdown) {
            return (
                <div ref={dropdownRef} className={`relative ${className}`} {...props}>
                    {/* Avatar - clickable */}
                    <UserAvatar
                        user={user}
                        size={size}
                        showStatus={showStatus}
                        status={user?.status}
                        onClick={handleAvatarClick}
                        className="cursor-pointer"
                    />

                    {/* Open the dropdown */}
                    {isOpen && (
                        <Dropdown position={dropdownPosition} variant={dropdownVariant} size={dropdownSize} className={dropdownClassName}>
                          <DropdownContent>{children || defaultDropdownContent}</DropdownContent>
                        </Dropdown>
                    )}
                </div>
            );
        }

        // Compact without dropdown - just avatar
        return (
            <div className={className} {...props}>
                <UserAvatar
                    user={user}
                    size={size}
                    showStatus={showStatus}
                    status={user?.status}
                />
            </div>
        );
    }

    // Full mode - avatar + user details
    return (
        <div className={`${layoutClass} ${className}`} {...props}>
            <UserAvatar
                user={user}
                size={size}
                showStatus={showStatus}
                status={user?.status}
            />

            <div className={isVertical ? 'text-center' : ''}>
                {/* Name */}
                <h3 className="font-semibold text-gray-900">
                    {user?.name || user?.username || "Guest User"}
                </h3>

                {/* Email */}
                {showEmail && user?.email && (
                    <p className="text-sm text-gray-600">
                        {user.email}
                    </p>
                )}

                {/* Phone */}
                {showPhone && user?.phone && (
                    <p className="text-sm text-gray-600">
                        {user.phone}
                    </p>
                )}

                {/* Role/Bio (if available) */}
                {user?.role && (
                    <p className="text-xs text-gray-500 mt-1">
                        {user.role}
                    </p>
                )}
            </div>
        </div>
    );
};

export default UserProfile;
