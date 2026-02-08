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
            <div className="px-8 py-4 border-b border-gray-200 bg-gray-50">
                <p className="text-sm font-semibold text-gray-900">
                    {name}
                </p>
                <p className="text-xs text-gray-500 mt-0.5">
                    {email}
                </p>
            </div>

            {/* Two Column Layout with Divider */}
            <div className="grid grid-cols-2 divide-x divide-gray-200">
                {/* Your Lists Section */}
                <div className="px-6 py-5">
                    <DropdownHeader className="text-base font-bold text-gray-900 mb-3">
                        Your Lists
                    </DropdownHeader>
                    <div className="space-y-2">
                        {USER_MENU_DATA.yourLists.map((item, index) => (
                            <DropdownItem
                                key={index}
                                href={item.href}
                                className="text-sm text-gray-700 hover:text-orange-600 hover:underline py-0.5 px-0 block"
                            >
                                {item.label}
                            </DropdownItem>
                        ))}
                    </div>
                </div>

                {/* Your Account Section */}
                <div className="px-6 py-5">
                    <DropdownHeader className="text-base font-bold text-gray-900 mb-3">
                        Your Account
                    </DropdownHeader>
                    <div className="space-y-2">
                        {USER_MENU_DATA.yourAccount.map((item, index) => (
                            <DropdownItem
                                key={index}
                                href={item.href}
                                className="text-sm text-gray-700 hover:text-orange-600 hover:underline py-0.5 px-0 block"
                            >
                                {item.label}
                            </DropdownItem>
                        ))}
                    </div>
                </div>
            </div>

            <DropdownDivider />

            {/* Bottom Actions */}
            <div className="px-8 py-4 border-t border-gray-200 space-y-2">
                <DropdownItem
                    href="/switch-accounts"
                    className="text-sm text-gray-700 hover:text-orange-600 hover:underline py-0.5 px-0 block"
                >
                    Switch Accounts
                </DropdownItem>
                <DropdownItem
                    onClick={() => console.log('Sign out')}
                    danger
                    className="text-sm text-red-600 hover:text-red-700 hover:underline py-0.5 px-0 block"
                >
                    Sign Out
                </DropdownItem>
            </div>
        </>
    );

    return (
        <UserProfile
            user={user}
            mode="compact"
            showDropdown={true}
            dropdownPosition="bottomRight"
            dropdownVariant="default"
            dropdownSize="lg"
            size={AVATAR_SIZE.sm}
            showStatus={false}
            dropdownClassName="w-[480px]"
        >
            {dropdownContent}
        </UserProfile>
    );
};

export default UserProfileMenu;

