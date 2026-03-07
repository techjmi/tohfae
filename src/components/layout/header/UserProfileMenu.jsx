"use client";
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import { UserAvatar } from '@/shared/ui/profile';
import { AVATAR_SIZE } from '@/shared/ui/profile/profile.constant';
import { Dropdown, DropdownItem, DropdownDivider, DropdownHeader } from '@/shared/ui/dropdown';
import { Modal } from '@/shared/ui/modal';
import { useClickOutside } from '@/shared/hooks/useClickOutside';
import { selectUser, selectIsAuthenticated, logout } from '@/redux/slice/authSlice';
import { AuthService } from '@/services/auth/auth.service';
import { USER_MENU_DATA, HEADER_TEXT, HEADER_ROUTES } from './header.constant';

const MenuSection = ({ title, items }) => (
    <div className="px-6 py-5">
        <DropdownHeader className="text-base font-bold text-gray-900 mb-3">
            {title}
        </DropdownHeader>
        <div className="space-y-2">
            {items.map((item, index) => (
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
);

const UserProfileMenu = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const user = useSelector(selectUser);
    const isLoggedIn = useSelector(selectIsAuthenticated);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isSignOutModalOpen, setIsSignOutModalOpen] = useState(false);
    const dropdownRef = useClickOutside(() => setIsDropdownOpen(false));

    if (!isLoggedIn || !user) {
        return null;
    }

    const handleSignOutClick = () => {
        setIsDropdownOpen(false);
        setIsSignOutModalOpen(true);
    };

    const handleSignOutConfirm = async () => {
        try {
            await AuthService.signout();
            dispatch(logout());
            setIsSignOutModalOpen(false);
            router.push(HEADER_ROUTES.HOME);
        } catch (error) {
            console.error('Signout error:', error);
            setIsSignOutModalOpen(false);
        }
    };

    const handleSignOutCancel = () => {
        setIsSignOutModalOpen(false);
    };

    return (
        <>
            <div ref={dropdownRef} className="relative">
                <UserAvatar
                    user={user}
                    size={AVATAR_SIZE.sm}
                    showStatus={false}
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="cursor-pointer"
                />

                <Dropdown
                    isOpen={isDropdownOpen}
                    onClose={() => setIsDropdownOpen(false)}
                    position="bottomRight"
                    variant="default"
                    size="lg"
                    className="w-120"
                >
                    <div className="px-8 py-4 border-b border-gray-200 bg-gray-50">
                        <p className="text-sm font-semibold text-gray-900">
                            {user.firstName} {user.lastName}
                        </p>
                        <p className="text-xs text-gray-500 mt-0.5">
                            {user.email}
                        </p>
                    </div>

                    <div className="grid grid-cols-2 divide-x divide-gray-200">
                        <MenuSection title={HEADER_TEXT.YOUR_LISTS} items={USER_MENU_DATA.yourLists} />
                        <MenuSection title={HEADER_TEXT.YOUR_ACCOUNT} items={USER_MENU_DATA.yourAccount} />
                    </div>

                    <DropdownDivider />

                    <div className="px-8 py-4 space-y-2">
                        <DropdownItem
                            href={HEADER_ROUTES.SWITCH_ACCOUNTS}
                            className="text-sm text-gray-700 hover:text-orange-600 py-0.5 px-0 block"
                        >
                            {HEADER_TEXT.SWITCH_ACCOUNTS}
                        </DropdownItem>
                        <DropdownItem
                            onClick={handleSignOutClick}
                            danger
                            className="text-sm text-red-600 hover:text-red-700 py-0.5 px-0 block"
                        >
                            {HEADER_TEXT.SIGN_OUT}
                        </DropdownItem>
                    </div>
                </Dropdown>
            </div>

            <Modal
                isOpen={isSignOutModalOpen}
                onClose={handleSignOutCancel}
                size="sm"
                placement="center"
                backdrop="blur"
                header={{ title: HEADER_TEXT.SIGN_OUT_CONFIRM_TITLE }}
                body={{
                    message: HEADER_TEXT.SIGN_OUT_CONFIRM_MESSAGE,
                    subtitle: HEADER_TEXT.SIGN_OUT_CONFIRM_SUBTITLE
                }}
                footer={[
                    {
                        label: HEADER_TEXT.SIGN_OUT_CANCEL_BUTTON,
                        onClick: handleSignOutCancel,
                        variant: "outline",
                        color: "neutral"
                    },
                    {
                        label: HEADER_TEXT.SIGN_OUT_CONFIRM_BUTTON,
                        onClick: handleSignOutConfirm,
                        variant: "solid",
                        color: "primary"
                    }
                ]}
            />
        </>
    );
};

export default UserProfileMenu;

