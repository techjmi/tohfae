"use client";
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import { UserProfile } from '@/shared/ui/profile';
import { AVATAR_SIZE } from '@/shared/ui/profile/profile.constant';
import {
    DropdownItem,
    DropdownDivider,
    DropdownHeader,
} from '@/shared/ui/dropdown';
import { Modal, ModalHeader, ModalBody, ModalFooter } from '@/shared/ui/modal';
import Button from '@/shared/ui/button/Button';
import { selectUser, selectIsAuthenticated, logout } from '@/redux/slice/authSlice';
import { AuthService } from '@/services/auth/auth.service';
import { USER_MENU_DATA, HEADER_TEXT, HEADER_ROUTES } from './header.constant';

const UserProfileMenu = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const user = useSelector(selectUser);
    const isLoggedIn = useSelector(selectIsAuthenticated);
    const [isSignOutModalOpen, setIsSignOutModalOpen] = useState(false);

    // Don't show if not logged in (Navbar handles sign in link)
    if (!isLoggedIn || !user) {
        return null;
    }

    const handleSignOutClick = () => {
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

    // Custom dropdown content with Amazon-style menu
    const dropdownContent = (
        <>
            {/* User Info Header */}
            <div className="px-8 py-4 border-b border-gray-200 bg-gray-50">
                <p className="text-sm font-semibold text-gray-900">
                    {user.firstName} {user.lastName}
                </p>
                <p className="text-xs text-gray-500 mt-0.5">
                    {user.email}
                </p>
            </div>

            {/* Two Column Layout with Divider */}
            <div className="grid grid-cols-2 divide-x divide-gray-200">
                {/* Your Lists Section */}
                <div className="px-6 py-5">
                    <DropdownHeader className="text-base font-bold text-gray-900 mb-3">
                        {HEADER_TEXT.YOUR_LISTS}
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
                        {HEADER_TEXT.YOUR_ACCOUNT}
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
                    href={HEADER_ROUTES.SWITCH_ACCOUNTS}
                    className="text-sm text-gray-700 hover:text-orange-600 hover:underline py-0.5 px-0 block"
                >
                    {HEADER_TEXT.SWITCH_ACCOUNTS}
                </DropdownItem>
                <DropdownItem
                    onClick={handleSignOutClick}
                    danger
                    className="text-sm text-red-600 hover:text-red-700 hover:underline py-0.5 px-0 block"
                >
                    {HEADER_TEXT.SIGN_OUT}
                </DropdownItem>
            </div>
        </>
    );

    return (
        <>
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

            {/* Sign Out Confirmation Modal */}
            <Modal
                isOpen={isSignOutModalOpen}
                onClose={handleSignOutCancel}
            >
                <ModalHeader onClose={handleSignOutCancel}>
                    {HEADER_TEXT.SIGN_OUT_CONFIRM_TITLE}
                </ModalHeader>

                <ModalBody>
                    <p className="text-gray-700">{HEADER_TEXT.SIGN_OUT_CONFIRM_MESSAGE}</p>
                </ModalBody>

                <ModalFooter>
                    <Button
                        onClick={handleSignOutCancel}
                        variant="outline"
                    >
                        {HEADER_TEXT.SIGN_OUT_CANCEL_BUTTON}
                    </Button>
                    <Button
                        onClick={handleSignOutConfirm}
                        variant="danger"
                    >
                        {HEADER_TEXT.SIGN_OUT_CONFIRM_BUTTON}
                    </Button>
                </ModalFooter>
            </Modal>
        </>
    );
};

export default UserProfileMenu;

