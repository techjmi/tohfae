"use client";
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Drawer } from '@/shared/ui/drawer';
import { Modal } from '@/shared/ui/modal';
import { Divider } from '@/shared/ui/divider';
import Button from '@/shared/ui/button/Button';
import { Icon } from '@/shared/icons';
import { selectIsAuthenticated, selectUser, logout } from '@/redux/slice/authSlice';
import { AuthService } from '@/services/auth/auth.service';
import { MOBILE_MENU_DATA, HEADER_TEXT, HEADER_ROUTES } from './header.constant';

const MobileMenu = ({ isOpen, onClose }) => {
    const dispatch = useDispatch();
    const router = useRouter();
    const isLoggedIn = useSelector(selectIsAuthenticated);
    const user = useSelector(selectUser);
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

    // Ensure consistent header title for SSR/CSR
    const headerTitle = isLoggedIn && user?.firstName
        ? `${HEADER_TEXT.HELLO}, ${user.firstName}`
        : HEADER_TEXT.MENU_TITLE;

    return (
        <>
            <Drawer
                isOpen={isOpen}
                onClose={onClose}
                position="left"
                size="md"
                fullWidth={true}
                header={{ title: headerTitle }}
            >
                <nav className="flex flex-col gap-1 flex-1 overflow-y-auto p-4">
                    {MOBILE_MENU_DATA.map((item, index) => (
                        <Link
                            key={index}
                            href={item.href}
                            onClick={onClose}
                            className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                            <Icon name={item.icon} size={20} />
                            <span className="text-sm font-medium">{item.label}</span>
                        </Link>
                    ))}

                    <Divider className="my-2" />

                    {!isLoggedIn && (
                        <Link
                            href={HEADER_ROUTES.LOGIN}
                            onClick={onClose}
                            className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                            <Icon name="user" size={20} />
                            <span className="text-sm font-medium">{HEADER_TEXT.SIGN_IN}</span>
                        </Link>
                    )}

                    {isLoggedIn && (
                        <Button
                            onClick={handleSignOutClick}
                            variant="ghost"
                            className="flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors w-full justify-start"
                        >
                            <Icon name="close" size={20} />
                            <span className="text-sm font-medium">{HEADER_TEXT.SIGN_OUT}</span>
                        </Button>
                    )}
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

export default MobileMenu;

