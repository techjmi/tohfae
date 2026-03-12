/**
 * CardMeta Component
 * Metadata display (rating, reviews, date, etc.)
 */

"use client";
import React from 'react';
import { classNames } from '@/shared/utils/classNames';
import { Icon } from '@/shared/icons';

const CardMeta = ({
  rating,
  reviews,
  date,
  readTime,
  author,
  className = '',
  ...props
}) => {
  return (
    <div className={classNames('card-meta flex items-center gap-3 text-sm text-gray-600', className)} {...props}>
      {/* Rating */}
      {rating !== undefined && (
        <div className="flex items-center gap-1">
          <Icon name="star" size={14} className="text-yellow-500 fill-yellow-500" />
          <span className="font-medium">{rating}</span>
          {reviews && <span className="text-gray-400">({reviews})</span>}
        </div>
      )}

      {/* Date */}
      {date && (
        <div className="flex items-center gap-1">
          <Icon name="calendar" size={14} />
          <span>{date}</span>
        </div>
      )}

      {/* Read Time */}
      {readTime && (
        <div className="flex items-center gap-1">
          <Icon name="clock" size={14} />
          <span>{readTime}</span>
        </div>
      )}

      {/* Author */}
      {author && (
        <div className="flex items-center gap-1">
          <Icon name="user" size={14} />
          <span>{author}</span>
        </div>
      )}
    </div>
  );
};

export default CardMeta;

