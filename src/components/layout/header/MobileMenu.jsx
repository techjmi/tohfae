"use client";
import Link from 'next/link';
import { Drawer, DrawerHeader, DrawerBody } from '@/shared/ui/drawer';
import { Divider } from '@/shared/ui/divider';
import { Icon } from '@/shared/icons';
import { MOBILE_MENU_DATA, DUMMY_USER } from './header.data';

const MobileMenu = ({ isOpen, onClose }) => {
    const { isLoggedIn, name } = DUMMY_USER;

    return (
        <Drawer
            isOpen={isOpen}
            onClose={onClose}
            position="left"
            size="md"
        >
            <DrawerHeader onClose={onClose}>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                    {isLoggedIn ? `Hello, ${name}` : 'Menu'}
                </h2>
            </DrawerHeader>

            <DrawerBody>
                <nav className="flex flex-col gap-1">
                    {MOBILE_MENU_DATA.map((item, index) => (
                        <Link
                            key={index}
                            href={item.href}
                            onClick={onClose}
                            className="flex items-center gap-3 px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                        >
                            <Icon name={item.icon} size={20} />
                            <span className="text-sm font-medium">{item.label}</span>
                        </Link>
                    ))}

                    <Divider className="my-2" />

                    {!isLoggedIn && (
                        <Link
                            href="/signin"
                            onClick={onClose}
                            className="flex items-center gap-3 px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                        >
                            <Icon name="user" size={20} />
                            <span className="text-sm font-medium">Sign In</span>
                        </Link>
                    )}

                    {isLoggedIn && (
                        <button
                            onClick={() => {
                                console.log('Sign out');
                                onClose();
                            }}
                            className="flex items-center gap-3 px-4 py-3 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors w-full text-left"
                        >
                            <Icon name="close" size={20} />
                            <span className="text-sm font-medium">Sign Out</span>
                        </button>
                    )}
                </nav>
            </DrawerBody>
        </Drawer>
    );
};

export default MobileMenu;

