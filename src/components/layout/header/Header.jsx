"use client";
import { useState } from 'react';
import { Logo } from "@/shared/ui/logo";
import MobileUserMenu from "./MobileUserMenu";
import CartIcon from "./CartIcon";
import SearchBar from "./SearchBar";
import Navbar from "./Navbar";
import MobileMenu from "./MobileMenu";
import Button from '@/shared/ui/button/Button';
import { Icon } from '@/shared/icons';

export default function Header() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isMobileUserMenuOpen, setIsMobileUserMenuOpen] = useState(false);

    return (
        <>
            <header className="sticky top-0 z-50 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 shadow-sm">
                <div className="container mx-auto px-4">
                    {/* Desktop Layout */}
                    <div className="hidden md:flex items-center gap-4 h-16">
                        <Logo size="md" />
                        <SearchBar className="flex-1 max-w-2xl" />
                        <Navbar />
                        <CartIcon itemCount={5} />
                    </div>

                    {/* Mobile Layout */}
                    <div className="flex md:hidden items-center gap-3 h-16">
                        {/* Hamburger Menu */}
                        <Button
                            onClick={() => setIsMobileMenuOpen(true)}
                            variant="ghost"
                            radius="full"
                            className="p-2"
                            aria-label="Open menu"
                        >
                            <Icon name="menu" size={24} />
                        </Button>

                        {/* Search Bar */}
                        <SearchBar className="flex-1" />

                        {/* Cart and Avatar */}
                        <div className="flex items-center gap-2">
                            {/* <CartIcon itemCount={5} size={22} /> */}
                            <MobileUserMenu
                                isOpen={isMobileUserMenuOpen}
                                onOpen={() => setIsMobileUserMenuOpen(true)}
                                onClose={() => setIsMobileUserMenuOpen(false)}
                            />
                        </div>
                    </div>
                </div>
            </header>

            {/* Mobile Left Menu Drawer (Hamburger) */}
            <MobileMenu
                isOpen={isMobileMenuOpen}
                onClose={() => setIsMobileMenuOpen(false)}
            />
        </>
    );
}