/**
 * ModalBody Component
 * Main content area of the modal
 *
 * Usage:
 * <ModalBody>
 *   <p>Modal content here...</p>
 * </ModalBody>
 */

"use client";
import React from 'react';
import { classNames } from '@/shared/utils/classNames';

const ModalBody = ({
  data,
  children,
  padding = true,
  scrollable = true,
  className = "",
  ...props
}) => {
  // Determine what content to render
  let content = null;

  if (children) {
    content = children;
  } else if (data) {
    if (typeof data === 'string') {
      // Render string as paragraph
      content = <p className="text-sm text-gray-600">{data}</p>;
    } else if (React.isValidElement(data)) {
      // Render JSX element directly
      content = data;
    } else if (typeof data === 'object') {
      // Render object - flexible for any fields
      content = (
        <div className="space-y-2">
          {data.message && <p className="text-sm text-gray-600">{data.message}</p>}
          {data.subtitle && <p className="text-xs text-gray-500">{data.subtitle}</p>}
          {data.description && <p className="text-sm text-gray-600">{data.description}</p>}
          {data.content && <div className="text-sm text-gray-600">{data.content}</div>}
        </div>
      );
    }
  }

  if (!content) return null;

  return (
    <div
      className={classNames(
        padding && "px-4 py-3",
        scrollable && "overflow-y-auto max-h-[50vh]",
        className
      )}
      {...props}
    >
      {content}
      {children}
    </div>
  );
};

export default ModalBody;