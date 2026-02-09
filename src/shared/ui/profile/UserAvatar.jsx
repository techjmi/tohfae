/**
 * UserAvatar Component
 * 
 * Reusable avatar component that can be used anywhere in the app
 * Shows user profile picture or initials fallback
 * 
 * Features:
 * - Profile picture with fallback to initials
 * - Multiple sizes (xs, sm, md, lg, xl)
 * - Online status indicator
 * - Custom styling support
 * - Accessible with proper alt text
 * 
 * Usage:
 * <UserAvatar user={user} size="md" showStatus={true} />
 */

"use client";

import React from 'react';
import { 
    AVATAR_SIZE, 
    getAvatarSizeClass, 
    getUserInitials,
    USER_STATUS_COLORS 
} from './profile.constant';

const UserAvatar = ({
    user,
    size = AVATAR_SIZE.md,
    showStatus = false,
    status = "offline",
    className = "",
    onClick,
    ...props
}) => {
    const sizeClass = getAvatarSizeClass(size);
    const initials = getUserInitials(user?.name || user?.username);
    const avatarUrl = user?.avatar || user?.profilePicture || user?.image;
    const statusColor = USER_STATUS_COLORS[status] || USER_STATUS_COLORS.offline;

    return (
        <div 
            className={`relative inline-block ${className}`}
            onClick={onClick}
            {...props}
        >
            {/* Avatar */}
            <div 
                className={`
                    ${sizeClass} 
                    rounded-full 
                    overflow-hidden 
                    bg-linear-to-br from-blue-500 to-purple-600
                    flex items-center justify-center
                    text-white font-semibold
                    border-2 border-white shadow-md
                    ${onClick ? 'cursor-pointer hover:opacity-90 transition-opacity' : ''}
                `}
            >
                {avatarUrl ? (
                    <img 
                        src={avatarUrl} 
                        alt={user?.name || "User avatar"}
                        className="w-full h-full object-cover"
                    />
                ) : (
                    <span>{initials}</span>
                )}
            </div>

            {/* Status Indicator */}
            {showStatus && (
                <span 
                    className={`
                        absolute bottom-0 right-0 
                        ${size === AVATAR_SIZE.xs ? 'w-2 h-2' : ''}
                        ${size === AVATAR_SIZE.sm ? 'w-2.5 h-2.5' : ''}
                        ${size === AVATAR_SIZE.md ? 'w-3 h-3' : ''}
                        ${size === AVATAR_SIZE.lg ? 'w-4 h-4' : ''}
                        ${size === AVATAR_SIZE.xl ? 'w-5 h-5' : ''}
                        ${statusColor}
                        rounded-full 
                        border-2 border-white
                    `}
                    aria-label={`User is ${status}`}
                />
            )}
        </div>
    );
};

export default UserAvatar;

