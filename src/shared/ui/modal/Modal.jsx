/**
 * Modal Component
 * A flexible modal/dialog component with backdrop, animations, and accessibility
 *
 * Features:
 * - Multiple sizes (sm, md, lg, xl, full)
 * - Multiple placements (center, top, bottom)
 * - Backdrop variants (default, dark, light, blur)
 * - ESC key to close
 * - Click outside to close
 * - Body scroll lock
 * - Accessible with ARIA attributes
 */

"use client";
import React, { useEffect } from "react";
import { classNames } from "@/shared/utils/classNames";
import { MODAL_SIZE, MODAL_PLACEMENT, MODAL_BACKDROP } from "./modalConstant";

const Modal = ({
  children,
  isOpen,
  onClose,
  size = "md",
  placement = "center", // "center" | "top" | "bottom"
  backdrop = "default", // "default" | "dark" | "light" | "blur"
  closeOnEsc = true,
  closeOnBackdrop = true,
  lockBodyScroll = true,
  className = "",
  ...props
}) => {
  // body scroll lock
  useEffect(() => {
    if (!isOpen || !lockBodyScroll) return;

    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = original;
    };
  }, [isOpen, lockBodyScroll]);

  // esc key close
  useEffect(() => {
    if (!isOpen || !closeOnEsc) return;

    const handleEscape = (e) => {
      if (e.key === "Escape") {
        onClose?.();
      }
    };

    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [isOpen, closeOnEsc, onClose]);

  if (!isOpen) return null;

  const currentPlacement = MODAL_PLACEMENT[placement] || MODAL_PLACEMENT.center;
  const backdropClass = MODAL_BACKDROP[backdrop] || MODAL_BACKDROP.default;
  const sizeClass = MODAL_SIZE[size] || MODAL_SIZE.md;

  return (
    <div
      className={classNames(
        "fixed inset-0 z-50 flex",
        backdropClass,
        currentPlacement.wrapper
      )}
      onClick={closeOnBackdrop ? onClose : undefined}
      role="dialog"
      aria-modal="true"
    >
      <div
        className={classNames(
          "bg-white shadow-xl",
          sizeClass,
          currentPlacement.panel,
          className
        )}
        onClick={(e) => e.stopPropagation()}
        {...props}
      >
        {children}
      </div>
    </div>
  );
};

export default Modal;
