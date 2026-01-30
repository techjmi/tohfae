/**
 * ProfileBody Component
 *
 * Full profile details section component
 * Shows comprehensive user information in a card/section layout
 *
 * Features:
 * - User avatar and basic info
 * - Contact details
 * - Account information
 * - Custom sections support
 * - Editable mode support
 *
 * Usage:
 * <ProfileBody user={user} editable={true} onEdit={handleEdit} />
 */

"use client";

import React from 'react';
import UserAvatar from './UserAvatar';
import { AVATAR_SIZE } from './profile.constant';

const ProfileBody = ({
    user,
    editable = false,
    showEmail = true,
    showPhone = true,
    showAddress = true,
    showBio = true,
    children,
    className = "",
    onEdit,
    ...props
}) => {
    return (
        <div
            className={`bg-white rounded-lg shadow-md p-6 ${className}`}
            {...props}
        >
            {/* Header Section */}
            <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-4">
                    <UserAvatar
                        user={user}
                        size={AVATAR_SIZE.xl}
                        showStatus={true}
                        status={user?.status}
                    />

                    <div>
                        <h2 className="text-2xl font-bold text-gray-900">
                            {user?.name || "Guest User"}
                        </h2>
                        {user?.username && (
                            <p className="text-gray-600">@{user.username}</p>
                        )}
                        {user?.role && (
                            <span className="inline-block mt-1 px-3 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                                {user.role}
                            </span>
                        )}
                    </div>
                </div>

                {editable && (
                    <button
                        onClick={onEdit}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        Edit Profile
                    </button>
                )}
            </div>

            {/* Bio Section */}
            {showBio && user?.bio && (
                <div className="mb-6">
                    <h3 className="text-sm font-semibold text-gray-700 mb-2">About</h3>
                    <p className="text-gray-600">{user.bio}</p>
                </div>
            )}

            {/* Contact Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                {showEmail && user?.email && (
                    <div>
                        <h3 className="text-sm font-semibold text-gray-700 mb-1">Email</h3>
                        <p className="text-gray-600">{user.email}</p>
                    </div>
                )}

                {showPhone && user?.phone && (
                    <div>
                        <h3 className="text-sm font-semibold text-gray-700 mb-1">Phone</h3>
                        <p className="text-gray-600">{user.phone}</p>
                    </div>
                )}
            </div>

            {/* Address Section */}
            {showAddress && user?.address && (
                <div className="mb-6">
                    <h3 className="text-sm font-semibold text-gray-700 mb-2">Address</h3>
                    <p className="text-gray-600">
                        {user.address.street && `${user.address.street}, `}
                        {user.address.city && `${user.address.city}, `}
                        {user.address.state && `${user.address.state} `}
                        {user.address.pincode && user.address.pincode}
                    </p>
                </div>
            )}

            {/* Custom Content */}
            {children && (
                <div className="border-t border-gray-200 pt-6">
                    {children}
                </div>
            )}
        </div>
    );
};

export default ProfileBody;