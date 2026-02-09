/**
 * ModalFooter Component
 * Footer section of the modal, typically for action buttons
 *
 * Usage:
 * <ModalFooter>
 *   <Button>Cancel</Button>
 *   <Button>Save</Button>
 * </ModalFooter>
 */

"use client";
import React from 'react';
import { classNames } from '@/shared/utils/classNames';

const ModalFooter = ({
  children,
  align = "right", // "left" | "center" | "right" | "between"
  padding = true,
  border = true,
  className = "",
  ...props
}) => {
  const alignmentClass = {
    left: "justify-start",
    center: "justify-center",
    right: "justify-end",
    between: "justify-between",
  }[align] || "justify-end";

  return (
    <div
      className={classNames(
        "flex items-center gap-2",
        padding && "px-6 py-4",
        border && "border-t border-gray-200",
        alignmentClass,
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export default ModalFooter;
