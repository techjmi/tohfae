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
  data,
  children,
  scrollable = true,
  padding = true,
  className = "",
  ...props
}) => {
  // Determine what content to render
  let content = null;

  if (children) {
    content = children;
  } else if (data) {
    if (typeof data === 'string') {
      // Simple string content
      content = <p className="text-gray-700">{data}</p>;
    } else if (React.isValidElement(data)) {
      // JSX element
      content = data;
    } else if (typeof data === 'object') {
      // Object with message, subtitle, etc.
      content = (
        <div>
          {data.message && (
            <p className="text-gray-700">{data.message}</p>
          )}
          {data.subtitle && (
            <p className="text-sm text-gray-500 mt-2">{data.subtitle}</p>
          )}
        </div>
      );
    }
  }

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
      {content}
      {children}
    </div>
  );
};

export default DrawerBody;