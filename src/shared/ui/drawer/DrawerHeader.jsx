/**
 * DrawerHeader Component
 * Header section for drawer with optional close button
 *
 * Usage:
 * <DrawerHeader onClose={handleClose}>
 *   <h2>Title</h2>
 * </DrawerHeader>
 */

"use client";
import React from 'react';
import { classNames } from '@/shared/utils/classNames';
import Button from '@/shared/ui/button/Button';
import { Icon } from '@/shared/icons';

const DrawerHeader = ({
  data,
  children,
  onClose,
  showCloseButton = true,
  className = "",
  ...props
}) => {
  // Determine what content to render
  let content = null;

  if (children) {
    content = children;
  } else if (data) {
    if (typeof data === 'string') {
      // Simple string title
      content = <h2 className="text-xl font-semibold text-gray-900">{data}</h2>;
    } else if (React.isValidElement(data)) {
      // JSX element
      content = data;
    } else if (typeof data === 'object') {
      // Object with title, subtitle, etc.
      content = (
        <div>
          {data.title && (
            <h2 className="text-xl font-semibold text-gray-900">{data.title}</h2>
          )}
          {data.subtitle && (
            <p className="text-sm text-gray-500 mt-1">{data.subtitle}</p>
          )}
        </div>
      );
    }
  }

  if (!content) return null;

  return (
    <div
      className={classNames(
        "flex items-center justify-between p-4 border-b border-gray-200",
        className
      )}
      {...props}
    >
      <div className="flex-1">{content}</div>

      {showCloseButton && onClose && (
        <Button
          onClick={onClose}
          variant="ghost"
          size="sm"
          className="ml-4 p-2! min-w-0"
          aria-label="Close drawer"
        >
          <Icon name="close" size={20} />
        </Button>
      )}
      {children}
    </div>
  );
};

export default DrawerHeader;