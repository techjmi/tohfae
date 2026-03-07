"use client";
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import { UserAvatar } from '@/shared/ui/profile';
import { AVATAR_SIZE } from '@/shared/ui/profile/profile.constant';
import { Drawer } from '@/shared/ui/drawer';
import { Modal } from '@/shared/ui/modal';
import { Divider } from '@/shared/ui/divider';
import Button from '@/shared/ui/button/Button';
import Link from 'next/link';
import { Icon } from '@/shared/icons';
import { logout } from '@/redux/slice/authSlice';
import { AuthService } from '@/services/auth/auth.service';
import { USER_MENU_DATA, HEADER_TEXT, HEADER_ROUTES } from './header.constant';

const MobileUserMenu = ({ user, isOpen, onOpen, onClose }) => {
    const dispatch = useDispatch();
    const router = useRouter();
    const [isSignOutModalOpen, setIsSignOutModalOpen] = useState(false);

    const handleSignOutClick = () => {
        setIsSignOutModalOpen(true);
    };

    const handleSignOutConfirm = async () => {
        try {
            await AuthService.signout();
            dispatch(logout());
            setIsSignOutModalOpen(false);
            router.push(HEADER_ROUTES.HOME);
            onClose();
        } catch (error) {
            console.error('Signout error:', error);
            setIsSignOutModalOpen(false);
            onClose();
        }
    };

    const handleSignOutCancel = () => {
        setIsSignOutModalOpen(false);
    };

    return (
        <>
            {/* Avatar Button - Only show when logged in */}
            <Button
                onClick={onOpen}
                variant="ghost"
                radius="full"
                className="p-1"
                aria-label="User menu"
            >
                <UserAvatar
                    user={user}
                    size={AVATAR_SIZE.sm}
                    showStatus={false}
                />
            </Button>

            {/* Right Side Drawer */}
            <Drawer
                isOpen={isOpen}
                onClose={onClose}
                position="right"
                size="md"
                fullWidth={true}
                header={{ title: HEADER_TEXT.ACCOUNT_TITLE }}
            >
                {/* User Info Header */}
                <div className="px-4 py-3 bg-gray-50 rounded-lg mb-4 mx-4 mt-4">
                    <div className="flex items-center gap-3">
                        <UserAvatar
                            user={user}
                            size={AVATAR_SIZE.md}
                            showStatus={false}
                        />
                        <div>
                            <p className="text-sm font-semibold text-gray-900">
                                {user.firstName} {user.lastName}
                            </p>
                            <p className="text-xs text-gray-500">
                                {user.email}
                            </p>
                        </div>
                    </div>
                </div>

                <nav className="flex flex-col gap-1 flex-1 overflow-y-auto px-4 pb-4">
                    {/* Your Lists Section */}
                    <div className="px-4 py-2">
                        <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                            {HEADER_TEXT.YOUR_LISTS}
                        </h3>
                    </div>
                    {USER_MENU_DATA.yourLists.map((item, index) => (
                        <Link
                            key={index}
                            href={item.href}
                            onClick={onClose}
                            className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                            <span className="text-sm font-medium">{item.label}</span>
                        </Link>
                    ))}

                    <Divider className="my-2" />

                    {/* Your Account Section */}
                    <div className="px-4 py-2">
                        <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                            {HEADER_TEXT.YOUR_ACCOUNT}
                        </h3>
                    </div>
                    {USER_MENU_DATA.yourAccount.map((item, index) => (
                        <Link
                            key={index}
                            href={item.href}
                            onClick={onClose}
                            className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                            <span className="text-sm font-medium">{item.label}</span>
                        </Link>
                    ))}

                    <Divider className="my-2" />

                    {/* Bottom Actions */}
                    <Link
                        href={HEADER_ROUTES.SWITCH_ACCOUNTS}
                        onClick={onClose}
                        className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                        <Icon name="user" size={20} />
                        <span className="text-sm font-medium">{HEADER_TEXT.SWITCH_ACCOUNTS}</span>
                    </Link>

                    <Button
                        onClick={handleSignOutClick}
                        variant="ghost"
                        className="flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors w-full justify-start"
                    >
                        <Icon name="close" size={20} />
                        <span className="text-sm font-medium">{HEADER_TEXT.SIGN_OUT}</span>
                    </Button>
                </nav>
            </Drawer>

            {/* Sign Out Confirmation Modal */}
            <Modal
                isOpen={isSignOutModalOpen}
                onClose={handleSignOutCancel}
                size="sm"
                placement="bottom"
                backdrop="blur"
                header={{ title: HEADER_TEXT.SIGN_OUT_CONFIRM_TITLE }}
                body={{ message: HEADER_TEXT.SIGN_OUT_CONFIRM_MESSAGE }}
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

export default MobileUserMenu;

