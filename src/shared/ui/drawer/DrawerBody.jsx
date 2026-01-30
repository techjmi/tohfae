/**
 * DrawerBody Component
 * Main content area of drawer with scrolling support
 *
 * Usage:
 * <DrawerBody>
 *   <p>Content here...</p>
 * </DrawerBody>
 */

"use client";
import React from 'react';
import { classNames } from '@/shared/utils/classNames';

const DrawerBody = ({
  children,
  scrollable = true,
  padding = true,
  className = "",
  ...props
}) => {
  return (
    <div
      className={classNames(
        "flex-1",
        scrollable && "overflow-y-auto",
        padding && "p-4",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export default DrawerBody;