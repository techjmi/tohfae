"use client"; // for modal to work on client side
import React, { useEffect } from "react";

const sizeClasses = {
  sm: "max-w-sm",
  md: "max-w-lg",
  lg: "max-w-2xl",
};

const placementClasses = {
  center: {
    wrapper: "items-center justify-center",
    panel: "rounded-xl",
  },
  bottom: {
    wrapper: "items-end justify-center",
    panel: "rounded-t-xl w-full",
  },
};

const Modal = ({
  children,
  isOpen,
  onClose,
  size = "md",
  placement = "center", // center | bottom
  closeOnEsc = true,
  closeOnBackdrop = true,
  lockBodyScroll = true,
  className = "",
  modalProps = {},
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

  const currentPlacement = placementClasses[placement];

  return (
    <div
      className={`fixed inset-0 z-50 flex bg-black/40 ${currentPlacement.wrapper}`}
      onClick={closeOnBackdrop ? onClose : undefined}
    >
      <div
        className={`bg-white ${sizeClasses[size]} ${currentPlacement.panel} ${className}`}
        onClick={(e) => e.stopPropagation()}
        {...modalProps}
      >
        {children}
      </div>
    </div>
  );
};

export default Modal;
