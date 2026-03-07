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
  data,
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

  if (!data && !title) return null;

  if (React.isValidElement(data)) {
    return data;
  }

  const headerData = data || { title, subtitle };

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
      <div className="min-w-0 flex-1">
        {headerData.title && (
          <h2 className="text-base font-semibold text-gray-900">
            {headerData.title}
          </h2>
        )}
        {headerData.subtitle && (
          <p className="mt-1 text-sm text-gray-600">
            {headerData.subtitle}
          </p>
        )}
      </div>

      {onClose && (
        <Button
          onClick={onClose}
          variant="ghost"
          size="sm"
          aria-label="Close modal"
        >
          <Icon name={icon} size={20} />
        </Button>
      )}
      {children}
    </div>
  );
};

export default ModalHeader;