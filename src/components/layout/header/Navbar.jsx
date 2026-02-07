"use client";
import { useState } from 'react';
import Link from 'next/link';
import Button from '@/shared/ui/button/Button';
import { useClickOutside } from '@/shared/hooks/useClickOutside';
import {
    Dropdown,
    DropdownContent,
    DropdownItem,
    DropdownHeader,
} from '@/shared/ui/dropdown';
import { USER_MENU_DATA, DUMMY_USER } from './header.data';
import UserProfileMenu from './UserProfileMenu';

const Navbar = () => {
    const { isLoggedIn } = DUMMY_USER;
    const [isOpen, setIsOpen] = useState(false);
    const ref = useClickOutside(() => setIsOpen(false));

    return (
        <nav className="hidden md:flex items-center gap-4">
            {/* When logged in - show UserProfileMenu (avatar with dropdown) */}
            {isLoggedIn ? (
                <UserProfileMenu />
            ) : (
                /* When NOT logged in - show "Hello, sign in" with dropdown */
                <div ref={ref} className="relative">
                    <Button
                        onClick={(e) => {
                            e.stopPropagation();
                            setIsOpen(!isOpen);
                        }}
                        variant="ghost"
                        className="text-sm hover:border hover:border-gray-300 dark:hover:border-gray-600"
                    >
                        <div className="flex flex-col items-start">
                            <span className="text-xs text-gray-600 dark:text-gray-400">Hello, sign in</span>
                            <span className="text-sm font-semibold text-gray-900 dark:text-white">
                                Account & Lists
                            </span>
                        </div>
                    </Button>

                    {/* Dropdown for non-logged in users */}
                    {isOpen && (
                        <Dropdown position="bottomRight" variant="default" size="lg">
                            <DropdownContent scrollable={true} className="w-[480px]">
                                {/* Sign In Button */}
                                <div className="px-8 py-6 text-center border-b border-gray-200 dark:border-gray-700">
                                    <Link
                                        href="/signin"
                                        className="block w-full px-6 py-3 bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold rounded-lg transition-colors text-base"
                                    >
                                        Sign in
                                    </Link>
                                    <p className="text-sm text-gray-700 dark:text-gray-300 mt-3">
                                        New customer?{' '}
                                        <Link href="/signup" className="text-blue-600 hover:text-blue-700 hover:underline">
                                            Start here.
                                        </Link>
                                    </p>
                                </div>

                                {/* Two Column Layout with Divider */}
                                <div className="grid grid-cols-2 divide-x divide-gray-200 dark:divide-gray-700">
                                    {/* Your Lists */}
                                    <div className="px-6 py-5">
                                        <DropdownHeader className="text-base font-bold text-gray-900 dark:text-white mb-3">
                                            Your Lists
                                        </DropdownHeader>
                                        <div className="space-y-2">
                                            {USER_MENU_DATA.yourLists.slice(0, 5).map((item, index) => (
                                                <DropdownItem
                                                    key={index}
                                                    href={item.href}
                                                    className="text-sm text-gray-700 dark:text-gray-300 hover:text-orange-600 dark:hover:text-orange-400 hover:underline py-0.5 px-0 block"
                                                >
                                                    {item.label}
                                                </DropdownItem>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Your Account */}
                                    <div className="px-6 py-5">
                                        <DropdownHeader className="text-base font-bold text-gray-900 dark:text-white mb-3">
                                            Your Account
                                        </DropdownHeader>
                                        <div className="space-y-2">
                                            {USER_MENU_DATA.yourAccount.slice(0, 12).map((item, index) => (
                                                <DropdownItem
                                                    key={index}
                                                    href={item.href}
                                                    className="text-sm text-gray-700 dark:text-gray-300 hover:text-orange-600 dark:hover:text-orange-400 hover:underline py-0.5 px-0 block"
                                                >
                                                    {item.label}
                                                </DropdownItem>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </DropdownContent>
                        </Dropdown>
                    )}
                </div>
            )}

            {/* Returns & Orders - always visible */}
            <Link
                href="/orders"
                className="text-sm text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors whitespace-nowrap"
            >
                <div className="flex flex-col items-start">
                    <span className="text-xs text-gray-600 dark:text-gray-400">Returns</span>
                    <span className="text-sm font-semibold text-gray-900 dark:text-white">& Orders</span>
                </div>
            </Link>
        </nav>
    );
};

export default Navbar;

