/**
 * CardActions Component
 * Action buttons for cards (Add to Cart, Wishlist, etc.)
 */

"use client";
import React from 'react';
import { classNames } from '@/shared/utils/classNames';
import Button from '@/shared/ui/button';
import { Icon } from '@/shared/icons';

const ACTION_ICONS = {
  cart: 'shopping-cart',
  wishlist: 'heart',
  compare: 'git-compare',
  view: 'eye',
  share: 'share-2',
};

const CardActions = ({
  actions = [],
  customActions,
  onActionClick,
  className = '',
  ...props
}) => {
  // If custom actions provided, use them
  if (customActions) {
    return (
      <div className={classNames('card-actions flex items-center gap-2', className)} {...props}>
        {customActions}
      </div>
    );
  }

  // Render predefined actions
  return (
    <div className={classNames('card-actions flex items-center gap-2', className)} {...props}>
      {actions.map((action, index) => {
        const iconName = ACTION_ICONS[action] || action;
        
        return (
          <Button
            key={index}
            variant="outline"
            size="sm"
            onClick={() => onActionClick?.(action)}
            className="flex items-center gap-1"
          >
            <Icon name={iconName} size={16} />
            <span className="capitalize">{action}</span>
          </Button>
        );
      })}
    </div>
  );
};

export default CardActions;

