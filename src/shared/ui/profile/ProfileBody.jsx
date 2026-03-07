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
            className={`bg-white rounded-lg shadow-sm border border-gray-100 p-4 md:p-6 ${className}`}
            {...props}
        >
            {/* Header Section - Responsive Layout */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
                <div className="flex items-center gap-3 md:gap-4">
                    <UserAvatar
                        user={user}
                        size={AVATAR_SIZE.xl}
                        showStatus={true}
                        status={user?.status}
                    />

                    <div>
                        <h2 className="text-xl md:text-2xl font-semibold text-gray-900">
                            {user?.name || "Guest User"}
                        </h2>
                        {user?.username && (
                            <p className="text-sm text-gray-600">@{user.username}</p>
                        )}
                        {user?.role && (
                            <span className="inline-block mt-1.5 px-2.5 py-0.5 bg-blue-50 text-blue-700 text-xs font-medium rounded-md border border-blue-200">
                                {user.role}
                            </span>
                        )}
                    </div>
                </div>

                {editable && (
                    <button
                        onClick={onEdit}
                        className="w-full sm:w-auto px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 active:bg-blue-800 transition-colors shadow-sm"
                    >
                        Edit Profile
                    </button>
                )}
            </div>

            {/* Bio Section */}
            {showBio && user?.bio && (
                <div className="mb-5">
                    <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">About</h3>
                    <p className="text-sm text-gray-700">{user.bio}</p>
                </div>
            )}

            {/* Contact Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
                {showEmail && user?.email && (
                    <div>
                        <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Email</h3>
                        <p className="text-sm text-gray-700">{user.email}</p>
                    </div>
                )}

                {showPhone && user?.phone && (
                    <div>
                        <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Phone</h3>
                        <p className="text-sm text-gray-700">{user.phone}</p>
                    </div>
                )}
            </div>

            {/* Address Section */}
            {showAddress && user?.address && (
                <div className="mb-5">
                    <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Address</h3>
                    <p className="text-sm text-gray-700">
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