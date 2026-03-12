/**
 * CardFooter Component
 * Footer section with CTA, price, actions, or custom content
 * Smart rendering based on variant and data
 */

"use client";
import React from 'react';
import { classNames } from '@/shared/utils/classNames';
import Button from '@/shared/ui/button';
import CardPrice from './CardPrice';
import CardActions from './CardActions';
import CardMeta from './CardMeta';
import { hasCardCTA, hasCardPrice, hasCardActions, buildCTAUrl } from '../Card.helpers';

const CardFooter = ({
  data,
  variant = 'default',
  children,
  className = '',
  ...props
}) => {
  // If custom children provided, render them
  if (children) {
    return (
      <div className={classNames('card-footer', className)} {...props}>
        {children}
      </div>
    );
  }

  // Smart rendering based on variant and data
  const renderContent = () => {
    // Banner variant - render CTA
    if (variant === 'banner' && hasCardCTA(data)) {
      return (
        <Button
          as="a"
          href={buildCTAUrl(data.cta)}
          variant={data.cta.variant || 'solid'}
          color={data.cta.color || 'neutral'}
          size={data.cta.size || 'md'}
          fullWidth={data.cta.fullWidth}
        >
          {data.cta.text || 'Learn More'}
        </Button>
      );
    }

    // Product variant - render price and actions
    if (variant === 'product') {
      return (
        <div className="flex flex-col gap-3">
          {/* Meta (rating, reviews) */}
          {(data?.rating || data?.reviews) && (
            <CardMeta
              rating={data.rating}
              reviews={data.reviews}
            />
          )}

          {/* Price */}
          {hasCardPrice(data) && (
            <CardPrice
              price={data.price}
              originalPrice={data.originalPrice}
              discount={data.discount}
              discountLabel={data.discountLabel}
              currency={data.currency || '₹'}
              priceSize={data.priceSize || 'xl'}
            />
          )}

          {/* Actions */}
          {hasCardActions(data) && (
            <CardActions
              actions={data.actions}
              onActionClick={data.onActionClick}
            />
          )}
        </div>
      );
    }

    // Blog variant - render meta and read more
    if (variant === 'blog') {
      return (
        <div className="flex flex-col gap-3">
          {/* Meta (date, readTime, author) */}
          <CardMeta
            date={data?.date}
            readTime={data?.readTime}
            author={data?.author}
          />

          {/* Read More CTA */}
          {data?.url && (
            <Button
              as="a"
              href={data.url}
              variant="outline"
              size="sm"
            >
              Read More
            </Button>
          )}
        </div>
      );
    }

    return null;
  };

  return (
    <div className={classNames('card-footer', className)} {...props}>
      {renderContent()}
    </div>
  );
};

export default CardFooter;

