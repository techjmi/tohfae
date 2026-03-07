/**
 * ProductPricing Component (Molecule)
 *
 * Product pricing section:
 * - Selling price
 * - MRP (strikethrough)
 * - Discount badge
 * - Offers/Deals
 * - Payment options (COD, EMI, etc.)
 * - Delivery charges info
 *
 * Props:
 * @param {Object} pricing - Product pricing object
 * @param {Array} offers - Product offers array
 * @param {string} className - Additional CSS classes
 *
 * Usage:
 * <ProductPricing pricing={product.pricing} offers={product.offers} />
 */
"use client";

import React from 'react';
import { Badge } from '@/shared/ui/badge';
import { Icon } from '@/shared/icons';
import { CURRENCY_CONFIG, DISCOUNT_BADGE, ICONS, LABELS, MIN_DISCOUNT_TO_SHOW } from './ProductPricing.constants';
import './ProductPricing.css';

const ProductPricing = ({ pricing, offers = [], className = '' }) => {
  if (!pricing) return null;

  const formatPrice = (price) => {
    return new Intl.NumberFormat(CURRENCY_CONFIG.LOCALE, {
      style: 'currency',
      currency: pricing.currency || CURRENCY_CONFIG.DEFAULT,
      maximumFractionDigits: CURRENCY_CONFIG.MAX_FRACTION_DIGITS,
    }).format(price);
  };

  const hasDiscount = pricing.discount?.value > MIN_DISCOUNT_TO_SHOW;
  const discountPercentage = pricing.discount?.value || 0;

  return (
    <div className={`pricing-container ${className}`}>
      {/* Price Section */}
      <div className="price-section">
        <span className="selling-price">
          {formatPrice(pricing.sellingPrice)}
        </span>

        {hasDiscount && pricing.mrp && (
          <>
            <span className="mrp-price">
              {formatPrice(pricing.mrp)}
            </span>
            <Badge {...DISCOUNT_BADGE}>
              {discountPercentage}% {LABELS.OFF}
            </Badge>
          </>
        )}
      </div>

      {/* Offers */}
      {offers.length > 0 && (
        <div className="offers-section">
          <p className="offers-title">{LABELS.AVAILABLE_OFFERS}</p>
          <div className="offers-list">
            {offers.map((offer, index) => (
              <div key={index} className="offer-item">
                <Icon {...ICONS.OFFER} />
                <span>
                  <strong>{offer.label}</strong> - {offer.tag || LABELS.SPECIAL_OFFER}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Payment Options */}
      <div className="payment-options">
        {pricing.cod?.available && (
          <div className="payment-option">
            <Icon {...ICONS.COD} />
            <span>{LABELS.COD_AVAILABLE}</span>
            {pricing.cod.extraCharges > 0 && (
              <span className="extra-charges">(+{formatPrice(pricing.cod.extraCharges)})</span>
            )}
          </div>
        )}

        {pricing.paymentOptions?.emi?.enabled && (
          <div className="payment-option">
            <Icon {...ICONS.EMI} />
            <span>{LABELS.EMI_AVAILABLE}</span>
          </div>
        )}

        {/* Delivery Info */}
        {pricing.delivery && (
          <div className="payment-option">
            <Icon {...ICONS.DELIVERY} />
            <span>
              {pricing.delivery.freeAbove && pricing.sellingPrice >= pricing.delivery.freeAbove
                ? LABELS.FREE_DELIVERY
                : `${LABELS.DELIVERY}: ${formatPrice(pricing.delivery.charges)}`}
            </span>
            {pricing.delivery.freeAbove && pricing.sellingPrice < pricing.delivery.freeAbove && (
              <span className="delivery-info">
                ({LABELS.FREE_ABOVE} {formatPrice(pricing.delivery.freeAbove)})
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductPricing;

