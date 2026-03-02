"use client";
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Drawer, DrawerHeader, DrawerBody } from '@/shared/ui/drawer';
import { Modal, ModalHeader, ModalBody, ModalFooter } from '@/shared/ui/modal';
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

    return (
        <Drawer
            isOpen={isOpen}
            onClose={onClose}
            position="left"
            size="md"
        >
            <DrawerHeader onClose={onClose}>
                <h2 className="text-xl font-semibold text-gray-900">
                    {isLoggedIn && user ? `${HEADER_TEXT.HELLO}, ${user.firstName}` : HEADER_TEXT.MENU_TITLE}
                </h2>
            </DrawerHeader>

            <DrawerBody>
                <nav className="flex flex-col gap-1">
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
            </DrawerBody>

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
        </Drawer>
    );
};

export default MobileMenu;

