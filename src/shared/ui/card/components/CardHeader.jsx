/**
 * CardHeader Component
 * Header section with title, subtitle, and optional badge
 */

"use client";
import React from 'react';
import { classNames } from '@/shared/utils/classNames';
import { Badge } from '@/shared/ui/badge';

const CardHeader = ({
  title,
  subtitle,
  badge,
  titleClassName = '',
  subtitleClassName = '',
  className = '',
  ...props
}) => {
  return (
    <div className={classNames('card-header', className)} {...props}>
      {/* Subtitle */}
      {subtitle && (
        <p className={classNames('text-sm text-gray-500 mb-1', subtitleClassName)}>
          {subtitle}
        </p>
      )}

      {/* Title with optional badge */}
      <div className="flex items-start justify-between gap-2">
        <h3 className={classNames('text-lg font-semibold text-gray-900 flex-1', titleClassName)}>
          {title}
        </h3>
        
        {/* Badge */}
        {badge && (
          <Badge
            color={typeof badge === 'object' ? badge.color : 'neutral'}
            size={typeof badge === 'object' ? badge.size : 'sm'}
            radius="md"
          >
            {typeof badge === 'string' ? badge : badge.label}
          </Badge>
        )}
      </div>
    </div>
  );
};

export default CardHeader;

