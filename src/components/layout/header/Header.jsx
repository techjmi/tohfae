"use client";
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { Logo } from "@/shared/ui/logo";
import MobileUserMenu from "./MobileUserMenu";
import CartIcon from "./CartIcon";
import SearchBar from "./SearchBar";
import Navbar from "./Navbar";
import MobileMenu from "./MobileMenu";
import Button from '@/shared/ui/button/Button';
import { Icon } from '@/shared/icons';
import { selectIsAuthenticated, selectUser } from '@/redux/slice/authSlice';
import { HEADER_ROUTES } from './header.constant';
import "./header.style.css";
import { HeaderIcons } from '@/shared/ui/badge/header';

export default function Header() {
    const router = useRouter();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isMobileUserMenuOpen, setIsMobileUserMenuOpen] = useState(false);
    const isLoggedIn = useSelector(selectIsAuthenticated);
    const user = useSelector(selectUser);

    return (
        <>
            <header className="header-navbar">
                <div className="header-container">
                    {/* Desktop Layout */}
                    <div className="header-desktop">
                        <Logo size="md" className="header-logo-wrapper" />
                        <SearchBar className="header-search" />
                        <div className="header-actions">
                            <Navbar />
                            <HeaderIcons name="cart" count={5} onClick={() => router.push(HEADER_ROUTES.CART)} label="Cart" />
                            <HeaderIcons name="heart" count={3} onClick={() => router.push(HEADER_ROUTES.WISHLIST)} label="Wishlist" />
                        </div>
                    </div>

                    {/* Mobile Layout */}
                    <div className="header-mobile">
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

                        {/* User Menu or Sign In */}
                        <div className="flex items-center gap-2">
                            {isLoggedIn && user ? (
                                <MobileUserMenu
                                    user={user}
                                    isOpen={isMobileUserMenuOpen}
                                    onOpen={() => setIsMobileUserMenuOpen(true)}
                                    onClose={() => setIsMobileUserMenuOpen(false)}
                                />
                            ) : (
                                <Button
                                    onClick={() => router.push(HEADER_ROUTES.LOGIN)}
                                    variant="outline"
                                    color="primary"
                                    size="md"
                                    radius="full"
                                    className="text-sm"
                                >
                                    Sign In
                                </Button>
                            )}
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