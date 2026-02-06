"use client";
import { UserProfile } from '@/shared/ui/profile';
import { AVATAR_SIZE } from '@/shared/ui/profile/profile.constant';
import {
    DropdownItem,
    DropdownDivider,
    DropdownHeader,
} from '@/shared/ui/dropdown';
import { USER_MENU_DATA, DUMMY_USER } from './header.data';

const UserProfileMenu = () => {
    const { isLoggedIn, name, email, avatar } = DUMMY_USER;

    // Don't show if not logged in (Navbar handles sign in link)
    if (!isLoggedIn) {
        return null;
    }

    // Create user object for UserProfile component
    const user = {
        name,
        email,
        avatar,
    };

    // Custom dropdown content with Amazon-style menu
    const dropdownContent = (
        <>
            {/* User Info Header */}
            <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                <p className="text-sm font-semibold text-gray-900 dark:text-white">
                    {name}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                    {email}
                </p>
            </div>

            {/* Your Lists Section */}
            <DropdownHeader>Your Lists</DropdownHeader>
            {USER_MENU_DATA.yourLists.map((item, index) => (
                <DropdownItem key={index} href={item.href}>
                    {item.label}
                </DropdownItem>
            ))}

            <DropdownDivider />

            {/* Your Account Section */}
            <DropdownHeader>Your Account</DropdownHeader>
            {USER_MENU_DATA.yourAccount.map((item, index) => (
                <DropdownItem key={index} href={item.href}>
                    {item.label}
                </DropdownItem>
            ))}

            <DropdownDivider />

            {/* Bottom Actions */}
            <DropdownItem href="/switch-accounts">
                Switch Accounts
            </DropdownItem>
            <DropdownItem onClick={() => console.log('Sign out')} danger>
                Sign Out
            </DropdownItem>
        </>
    );

    return (
        <UserProfile
            user={user}
            mode="compact"
            showDropdown={true}
            dropdownPosition="bottomRight"
            dropdownVariant="default"
            size={AVATAR_SIZE.sm}
            showStatus={false}
        >
            {dropdownContent}
        </UserProfile>
    );
};

export default UserProfileMenu;

