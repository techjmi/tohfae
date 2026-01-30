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
  children,
  onClose,
  showCloseButton = true,
  className = "",
  ...props
}) => {
  return (
    <div
      className={classNames(
        "flex items-center justify-between p-4 border-b border-gray-200",
        className
      )}
      {...props}
    >
      <div className="flex-1">{children}</div>

      {showCloseButton && onClose && (
        <Button
          onClick={onClose}
          variant="ghost"
          size="sm"
          className="ml-4 !p-2 min-w-0"
          aria-label="Close drawer"
        >
          <Icon name="close" size={20} />
        </Button>
      )}
    </div>
  );
};

export default DrawerHeader;