/**
 * CardBody Component
 * Main content area of the card
 *
 * Usage:
 * <CardBody>
 *   <p>Card content here...</p>
 * </CardBody>
 */

"use client";
import React from 'react';
import { classNames } from '@/shared/utils/classNames';

const CardBody = ({
  children,
  padding = true,
  className = "",
  ...props
}) => {
  return (
    <div
      className={classNames(
        padding && "p-4",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export default CardBody;