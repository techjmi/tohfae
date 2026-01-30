/**
 * UserProfileMenu Component
 * 
 * Profile menu for navbar/header
 * Uses UserProfile component in compact mode with dropdown
 * 
 * Usage:
 * import UserProfileMenu from './UserProfileMenu';
 * <UserProfileMenu user={user} />
 */

"use client";

import React from 'react';
import { UserProfile } from '@/shared/ui/profile';
import { useRouter } from 'next/navigation';

const UserProfileMenu = ({ user, className = "" }) => {
    const router = useRouter();

    const handleMenuItemClick = (item) => {
        if (item.href === '/logout') {
            // Handle logout logic here
            console.log('Logging out...');
            // Example: signOut(), clear session, redirect, etc.
        } else {
            router.push(item.href);
        }
    };

    return (
        <UserProfile 
            user={user}
            mode="compact"
            showDropdown={true}
            showStatus={true}
            size="md"
            onMenuItemClick={handleMenuItemClick}
            className={className}
        />
    );
};

export default UserProfileMenu;

