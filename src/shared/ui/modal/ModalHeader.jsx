/**
 * ModalHeader Component
 * Header section of the modal with title, subtitle, and close button
 *
 * Usage:
 * <ModalHeader title="Modal Title" onClose={handleClose} />
 */

"use client";
import React from 'react';
import { classNames } from '@/shared/utils/classNames';
import Button from '@/shared/ui/button/Button';
import { Icon } from '@/shared/icons';

const ModalHeader = ({
  title,
  subtitle,
  onClose,
  icon = "close",
  children,
  padding = true,
  border = true,
  className = "",
  ...props
}) => {
  // If children are provided → full custom header
  if (children) {
    return (
      <div
        className={classNames(
          "flex items-center justify-between",
          padding && "px-6 py-4",
          border && "border-b border-gray-200",
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }

  return (
    <div
      className={classNames(
        "flex items-start justify-between gap-3",
        padding && "px-6 py-4",
        border && "border-b border-gray-200",
        className
      )}
      {...props}
    >
      {/* Left: Title + Subtitle */}
      <div className="min-w-0 flex-1">
        {title && (
          <h2 className="text-lg font-semibold text-gray-900">
            {title}
          </h2>
        )}

        {subtitle && (
          <p className="mt-1 text-sm text-gray-600">
            {subtitle}
          </p>
        )}
      </div>

      {/* Right: Close Button */}
      {onClose && (
        <Button
          onClick={onClose}
          variant="ghost"
          size="sm"
          className="!p-2 min-w-0 shrink-0"
          aria-label="Close modal"
        >
          <Icon name={icon} size={20} />
        </Button>
      )}
    </div>
  );
};

export default ModalHeader;