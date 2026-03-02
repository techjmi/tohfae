"use client";
import { useState } from 'react';
import { useSelector } from 'react-redux';
import Link from 'next/link';
import Button from '@/shared/ui/button/Button';
import { useClickOutside } from '@/shared/hooks/useClickOutside';
import {
    Dropdown,
    DropdownContent,
    DropdownItem,
    DropdownHeader,
} from '@/shared/ui/dropdown';
import { selectIsAuthenticated } from '@/redux/slice/authSlice';
import { USER_MENU_DATA, HEADER_TEXT, HEADER_ROUTES } from './header.constant';
import UserProfileMenu from './UserProfileMenu';

const Navbar = () => {
    const isLoggedIn = useSelector(selectIsAuthenticated);
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
                        className="text-sm hover:border hover:border-gray-300"
                    >
                        <div className="flex flex-col items-start">
                            <span className="text-xs text-gray-600">{HEADER_TEXT.GREETING}</span>
                            <span className="text-sm font-semibold text-gray-900">
                                {HEADER_TEXT.ACCOUNT_LISTS}
                            </span>
                        </div>
                    </Button>

                    {/* Dropdown for non-logged in users */}
                    {isOpen && (
                        <Dropdown position="bottomRight" variant="default" size="lg">
                            <DropdownContent scrollable={true} className="w-[480px]">
                                {/* Sign In Button */}
                                <div className="px-8 py-6 text-center border-b border-gray-200">
                                    <Link
                                        href={HEADER_ROUTES.LOGIN}
                                        className="block w-full px-6 py-3 bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold rounded-lg transition-colors text-base"
                                    >
                                        {HEADER_TEXT.SIGN_IN}
                                    </Link>
                                    <p className="text-sm text-gray-700 mt-3">
                                        {HEADER_TEXT.NEW_CUSTOMER}{' '}
                                        <Link href={HEADER_ROUTES.REGISTER} className="text-blue-600 hover:text-blue-700 hover:underline">
                                            {HEADER_TEXT.START_HERE}
                                        </Link>
                                    </p>
                                </div>

                                {/* Two Column Layout with Divider */}
                                <div className="grid grid-cols-2 divide-x divide-gray-200">
                                    {/* Your Lists */}
                                    <div className="px-6 py-5">
                                        <DropdownHeader className="text-base font-bold text-gray-900 mb-3">
                                            {HEADER_TEXT.YOUR_LISTS}
                                        </DropdownHeader>
                                        <div className="space-y-2">
                                            {USER_MENU_DATA.yourLists.slice(0, 5).map((item, index) => (
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

                                    {/* Your Account */}
                                    <div className="px-6 py-5">
                                        <DropdownHeader className="text-base font-bold text-gray-900 mb-3">
                                            {HEADER_TEXT.YOUR_ACCOUNT}
                                        </DropdownHeader>
                                        <div className="space-y-2">
                                            {USER_MENU_DATA.yourAccount.slice(0, 12).map((item, index) => (
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
                            </DropdownContent>
                        </Dropdown>
                    )}
                </div>
            )}

            {/* Returns & Orders - always visible */}
            <Link
                href={HEADER_ROUTES.ORDERS}
                className="text-sm text-gray-700 hover:text-primary-600 transition-colors whitespace-nowrap"
            >
                <div className="flex flex-col items-start">
                    <span className="text-xs text-gray-600">{HEADER_TEXT.RETURNS}</span>
                    <span className="text-sm font-semibold text-gray-900">{HEADER_TEXT.ORDERS}</span>
                </div>
            </Link>
        </nav>
    );
};

export default Navbar;

