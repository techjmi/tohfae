/**
 * Drawer Component
 * A flexible drawer/sidebar component with multiple positions and variants
 *
 * Features:
 * - Multiple positions (left, right, top, bottom)
 * - Multiple variants (temporary, persistent, permanent)
 * - Multiple sizes (sm, md, lg, xl, full, custom %)
 * - Backdrop overlay (temporary variant)
 * - ESC key to close
 * - Click outside to close
 * - Body scroll lock
 * - Smooth animations
 *
 * Usage:
 * <Drawer isOpen={isOpen} onClose={handleClose} position="right">
 *   <DrawerHeader onClose={handleClose}>Title</DrawerHeader>
 *   <DrawerBody>Content</DrawerBody>
 *   <DrawerFooter>Actions</DrawerFooter>
 * </Drawer>
 */

"use client";
import React, { useEffect } from "react";
import {
  DRAWER_POSITION,
  DRAWER_SIZE,
  DRAWER_VARIANT,
  DRAWER_HIDDEN,
  DRAWER_ANIMATION,
} from "./drawerConstant";
import { classNames } from "@/shared/utils/classNames";
import DrawerHeader from "./DrawerHeader";
import DrawerBody from "./DrawerBody";
import DrawerFooter from "./DrawerFooter";

const Drawer = ({
  children,
  isOpen,
  onClose,
  position = DRAWER_POSITION.right,
  size = "90%",
  variant = DRAWER_VARIANT.temporary,
  closeOnEsc = true,
  closeOnBackdrop = true,
  lockBodyScroll = true,
  fullWidth = false,
  className = "",
  // Data-driven props
  isShowHeader = true,
  isShowBody = true,
  isShowFooter = true,
  header,
  body,
  footer,
  footerAlign = "between",
  ...drawerProps
}) => {
  // body scroll lock (only for temporary drawer)
  useEffect(() => {
    if (!isOpen || !lockBodyScroll || variant !== "temporary") return;

    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = original;
    };
  }, [isOpen, lockBodyScroll, variant]);

  // ESC close
  useEffect(() => {
    if (!isOpen || !closeOnEsc || variant !== "temporary") return;

    const handleEsc = (e) => {
      if (e.key === "Escape") onClose?.();
    };

    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [isOpen, closeOnEsc, onClose, variant]);

  if (!isOpen && variant !== "permanent") return null;

  const positionClass = {
    left: "left-0 top-0 h-full",
    right: "right-0 top-0 h-full",
    top: "top-0 left-0 w-full",
    bottom: "bottom-0 left-0 w-full",
  }[position];

  // Handle size based on position
  const getSizeClass = () => {
    // If fullWidth is true, make it full width on mobile and use size on larger screens
    if (fullWidth && (position === "left" || position === "right")) {
      const desktopSize = DRAWER_SIZE[size] || DRAWER_SIZE.md;
      return `w-full sm:${desktopSize.replace('w-', 'w-')}`;
    }

    if (position === "top" || position === "bottom") {
      // For horizontal drawers, size is height
      if (typeof size === "string" && size.includes("%")) {
        return `h-[${size}]`;
      }
      return DRAWER_SIZE[size] || "h-1/2";
    } else {
      // For vertical drawers, size is width
      if (typeof size === "string" && size.includes("%")) {
        return `w-[${size}]`;
      }
      return DRAWER_SIZE[size] || DRAWER_SIZE.md;
    }
  };

  const sizeClass = getSizeClass();

  const translateClass = isOpen
    ? DRAWER_ANIMATION[position]
    : DRAWER_HIDDEN[position];

  return (
    <>
      {/* Backdrop (temporary only) */}
      {variant === "temporary" && isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40"
          onClick={closeOnBackdrop ? onClose : undefined}
        />
      )}

      {/* Drawer panel */}
      <div
        className={classNames(
          "fixed z-50 bg-white shadow-xl transition-transform duration-300 ease-in-out flex flex-col",
          positionClass,
          sizeClass,
          translateClass,
          variant === "permanent" && "relative z-auto",
          className
        )}
        role="dialog"
        aria-modal={variant === "temporary"}
        {...drawerProps}
      >
        {isShowHeader && header && <DrawerHeader data={header} onClose={onClose} />}
        {isShowBody && body && <DrawerBody data={body} />}
        {children}
        {isShowFooter && footer && <DrawerFooter data={footer} align={footerAlign} />}
      </div>
    </>
  );
};

export default Drawer;
