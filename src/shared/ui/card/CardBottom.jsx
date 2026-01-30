/**
 * CardFooter Component (also exported as CardBottom for backward compatibility)
 * Footer section of the card, typically for actions
 *
 * Usage:
 * <CardFooter>
 *   <Button>Action</Button>
 * </CardFooter>
 */

"use client";
import React from 'react';
import { classNames } from '@/shared/utils/classNames';

const CardFooter = ({
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
        padding && "p-4",
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

// Export as CardBottom for backward compatibility
export const CardBottom = CardFooter;
export default CardFooter;