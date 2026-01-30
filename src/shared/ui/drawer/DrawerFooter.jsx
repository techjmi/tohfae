/**
 * DrawerFooter Component
 * Footer section for drawer, typically for action buttons
 *
 * Usage:
 * <DrawerFooter>
 *   <Button onClick={handleSave}>Save</Button>
 *   <Button onClick={handleCancel}>Cancel</Button>
 * </DrawerFooter>
 */

"use client";
import React from 'react';
import { classNames } from '@/shared/utils/classNames';

const DrawerFooter = ({
  children,
  align = "right", // "left" | "center" | "right" | "between"
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
        "flex items-center gap-2 p-4 border-t border-gray-200",
        alignmentClass,
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export default DrawerFooter;