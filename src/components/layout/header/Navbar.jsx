"use client";
import Link from 'next/link';
import Button from '@/shared/ui/button/Button';
import { useToggle } from '@/shared/hooks/useToggle';
import { useClickOutside } from '@/shared/hooks/useClickOutside';
import {
    Dropdown,
    DropdownContent,
    DropdownItem,
    DropdownDivider,
    DropdownHeader,
} from '@/shared/ui/dropdown';
import { USER_MENU_DATA, DUMMY_USER } from './header.data';
import UserProfileMenu from './UserProfileMenu';

const Navbar = () => {
    const { isLoggedIn } = DUMMY_USER;
    const [isOpen, toggleOpen] = useToggle();
    const ref = useClickOutside(() => toggleOpen(false));

    return (
        <nav className="hidden md:flex items-center gap-4">
            {/* When logged in - show UserProfileMenu (avatar with dropdown) */}
            {isLoggedIn ? (
                <UserProfileMenu />
            ) : (
                /* When NOT logged in - show "Hello, sign in" with dropdown */
                <div ref={ref} className="relative">
                    <Button
                        onClick={() => toggleOpen(!isOpen)}
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
                            <DropdownContent scrollable={true}>
                                {/* Sign In Button */}
                                <div className="px-4 py-4 text-center">
                                    <Link
                                        href="/signin"
                                        className="block w-full px-4 py-2 bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-medium rounded-lg transition-colors"
                                    >
                                        Sign in
                                    </Link>
                                    <p className="text-xs text-gray-600 dark:text-gray-400 mt-2">
                                        New customer?{' '}
                                        <Link href="/signup" className="text-blue-600 hover:text-blue-700 hover:underline">
                                            Start here.
                                        </Link>
                                    </p>
                                </div>

                                <DropdownDivider />

                                {/* Two Column Layout */}
                                <div className="grid grid-cols-2 gap-4 px-4 py-2">
                                    {/* Your Lists */}
                                    <div>
                                        <DropdownHeader>Your Lists</DropdownHeader>
                                        {USER_MENU_DATA.yourLists.slice(0, 5).map((item, index) => (
                                            <DropdownItem key={index} href={item.href}>
                                                {item.label}
                                            </DropdownItem>
                                        ))}
                                    </div>

                                    {/* Your Account */}
                                    <div>
                                        <DropdownHeader>Your Account</DropdownHeader>
                                        {USER_MENU_DATA.yourAccount.slice(0, 10).map((item, index) => (
                                            <DropdownItem key={index} href={item.href}>
                                                {item.label}
                                            </DropdownItem>
                                        ))}
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

