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
import Button from '@/shared/ui/button/Button';

const ModalFooter = ({
  data,
  children,
  align = "right",
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
        padding && "px-6 py-4",
        border && "border-t border-gray-100",
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

export default ModalFooter;
