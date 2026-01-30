"use client"; // for useEffect to work on the client side
import React, { useEffect } from "react";
import {
  DRAWER_POSITION,
  DRAWER_SIZE,
  DRAWER_VARIANT,
  DRAWER_HIDDEN,
  DRAWER_ANIMATION,
} from "./drawerConstant";
import { classNames } from "@/shared/utils/classNames";

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
  className = "",
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
    bottom: "bottom-0 left-0 w-full",
  }[position];

  const sizeClass =
    position === "bottom" ? "h-1/2" : DRAWER_SIZE[size];

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
          "fixed z-50 bg-white transition-transform duration-300 ease-in-out",
          positionClass,
          sizeClass,
          translateClass,
          variant === "permanent" && "relative z-auto",
          className
        )}
        {...drawerProps}
      >
        {children}
      </div>
    </>
  );
};

export default Drawer;
