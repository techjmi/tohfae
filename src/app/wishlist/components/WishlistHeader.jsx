"use client";

import React from 'react';
import Button from '@/shared/ui/button';
import { Icon } from '@/shared/icons';
import { WISHLIST_PAGE_STYLES } from '../wishlist.style';
import { WISHLIST_TEXT } from '../wishlist.helper';

const WishlistHeader = ({ itemCount, onClearClick }) => {
  return (
    <div className={WISHLIST_PAGE_STYLES.HEADER}>
      <div>
        <h1 className="text-h1">
          {WISHLIST_TEXT.PAGE_TITLE}
        </h1>
        <p className="text-sm text-gray-600 mt-1">
          {itemCount} {itemCount === 1 ? 'item' : 'items'}
        </p>
      </div>

      {itemCount > 0 && (
        <Button
          variant="outline"
          color="danger"
          size="sm"
          onClick={onClearClick}
        >
          <Icon name="trash" size={16} className="mr-2" />
          {WISHLIST_TEXT.CLEAR_ALL}
        </Button>
      )}
    </div>
  );
};

export default WishlistHeader;

