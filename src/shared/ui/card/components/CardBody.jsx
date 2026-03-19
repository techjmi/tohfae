/**
 * CardBody Component
 * Main content area of the card
 */

"use client";
import React from 'react';
import { classNames } from '@/shared/utils/classNames';

const CardBody = ({
  description,
  children,
  className = '',
  ...props
}) => {
  return (
    <div className={classNames('card-body', className)} {...props}>
      {description && (
        <p className="text-sm text-gray-600 line-clamp-3 leading-relaxed">
          {description}
        </p>
      )}
      {children}
    </div>
  );
};

export default CardBody;

