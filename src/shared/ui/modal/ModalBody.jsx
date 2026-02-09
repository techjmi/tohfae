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
  children,
  padding = true,
  scrollable = true,
  className = "",
  ...props
}) => {
  return (
    <div
      className={classNames(
        padding && "px-6 py-4",
        scrollable && "overflow-y-auto max-h-[60vh]",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export default ModalBody;