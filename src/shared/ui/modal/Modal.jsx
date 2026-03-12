/**
 * @component Modal
 * @description Main modal container with backdrop, positioning, and accessibility features
 */

"use client";
import React, { useEffect } from "react";
import { classNames } from "@/shared/utils/classNames";
import { MODAL_SIZE, MODAL_PLACEMENT, MODAL_BACKDROP } from "./modalConstant";
import ModalHeader from "./ModalHeader";
import ModalBody from "./ModalBody";
import ModalFooter from "./ModalFooter";

const Modal = ({
  children,
  isOpen,
  onClose,
  size = "md",
  placement = "center",
  backdrop = "default",
  closeOnEsc = true,
  closeOnBackdrop = true,
  lockBodyScroll = true,
  className = "",
  isShowHeader = true,
  isShowBody = true,
  isShowFooter = true,
  header,
  body,
  footer,
  footerAlign = "between",
  ...props
}) => {
  useEffect(() => {
    if (!isOpen || !lockBodyScroll) return;

    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = original;
    };
  }, [isOpen, lockBodyScroll]);

  useEffect(() => {
    if (!isOpen || !closeOnEsc) return;

    const handleEscape = (e) => {
      if (e.key === "Escape") onClose?.();
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
          "bg-white shadow-lg rounded-lg",
          sizeClass,
          currentPlacement.panel,
          className
        )}
        onClick={(e) => e.stopPropagation()}
        {...props}
      >
        {isShowHeader && header && <ModalHeader data={header} onClose={onClose} />}
        {isShowBody && body && <ModalBody data={body} />}
        {children}
        {isShowFooter && footer && <ModalFooter data={footer} align={footerAlign} />}
      </div>
      {children}
    </div>
  );
};

export default Modal;
