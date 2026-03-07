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
import Button from '@/shared/ui/button/Button';

const DrawerFooter = ({
  data,
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

  // Determine what content to render
  let content = null;

  if (children) {
    content = children;
  } else if (data) {
    if (Array.isArray(data)) {
      // Render button configs as Button components
      content = data.map((button, index) => (
        <Button
          key={index}
          onClick={button.onClick}
          variant={button.variant || "solid"}
          color={button.color || "primary"}
          disabled={button.disabled}
          className={classNames("flex-1", button.className)}
          {...button.props}
        >
          {button.label}
        </Button>
      ));
    } else if (React.isValidElement(data)) {
      // Render JSX element directly
      content = data;
    } else {
      // Render object or string
      content = data.content || data;
    }
  }

  if (!content) return null;

  return (
    <div
      className={classNames(
        "flex items-center gap-3",
        padding && "p-4",
        border && "border-t border-gray-200",
        alignmentClass,
        className
      )}
      {...props}
    >
      {content}
      {children}
    </div>
  );
};

export default DrawerFooter;