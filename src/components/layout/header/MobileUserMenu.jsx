"use client";
import { UserAvatar } from '@/shared/ui/profile';
import { AVATAR_SIZE } from '@/shared/ui/profile/profile.constant';
import { Drawer, DrawerHeader, DrawerBody } from '@/shared/ui/drawer';
import { Divider } from '@/shared/ui/divider';
import Button from '@/shared/ui/button/Button';
import Link from 'next/link';
import { Icon } from '@/shared/icons';
import { USER_MENU_DATA, DUMMY_USER } from './header.data';

const MobileUserMenu = ({ isOpen, onOpen, onClose }) => {
    const { isLoggedIn, name, email, avatar } = DUMMY_USER;

    // Create user object for UserAvatar component
    const user = {
        name,
        email,
        avatar,
    };

    return (
        <>
            {/* Avatar Button - Only show when logged in */}
            {isLoggedIn && (
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
            )}

            {/* Right Side Drawer - Only show when logged in */}
            {isLoggedIn && (
                <Drawer
                    isOpen={isOpen}
                    onClose={onClose}
                    position="right"
                    size="md"
                >
                    <DrawerHeader onClose={onClose}>
                        <h2 className="text-xl font-semibold text-gray-900">
                            Account
                        </h2>
                    </DrawerHeader>

                    <DrawerBody>
                        {/* User Info Header */}
                        <div className="px-4 py-3 bg-gray-50 rounded-lg mb-4">
                            <div className="flex items-center gap-3">
                                <UserAvatar
                                    user={user}
                                    size={AVATAR_SIZE.md}
                                    showStatus={false}
                                />
                                <div>
                                    <p className="text-sm font-semibold text-gray-900">
                                        {name}
                                    </p>
                                    <p className="text-xs text-gray-500">
                                        {email}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <nav className="flex flex-col gap-1">
                            {/* Your Lists Section */}
                            <div className="px-4 py-2">
                                <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                                    Your Lists
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
                                    Your Account
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
                                href="/switch-accounts"
                                onClick={onClose}
                                className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                            >
                                <Icon name="user" size={20} />
                                <span className="text-sm font-medium">Switch Accounts</span>
                            </Link>

                            <button
                                onClick={() => {
                                    console.log('Sign out');
                                    onClose();
                                }}
                                className="flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors w-full text-left"
                            >
                                <Icon name="close" size={20} />
                                <span className="text-sm font-medium">Sign Out</span>
                            </button>
                        </nav>
                    </DrawerBody>
                </Drawer>
            )}
        </>
    );
};

export default MobileUserMenu;

