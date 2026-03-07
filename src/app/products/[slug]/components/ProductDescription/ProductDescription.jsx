/**
 * ProductDescription Component (Molecule)
 *
 * Product description section with tabs:
 * - Description tab
 * - Specifications tab
 * - Shipping & Returns tab
 * - Reviews tab
 *
 * Props:
 * @param {Object} product - Product data object
 * @param {string} className - Additional CSS classes
 *
 * Usage:
 * <ProductDescription product={product} />
 */
"use client";

import React, { useState } from 'react';
import { TABS, DEFAULT_TAB, TAB_STYLES, MESSAGES, LABELS } from './ProductDescription.constants';
import './ProductDescription.css';

const ProductDescription = ({ product, className = '', ...props }) => {
  const [activeTab, setActiveTab] = useState(DEFAULT_TAB);

  return (
    <div className={`description-container ${className}`} {...props}>
      {/* Tab Navigation */}
      <div className="tab-navigation">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`tab-button ${activeTab === tab.id ? 'tab-button-active' : 'tab-button-inactive'}`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="tab-content">
        {/* Description Tab */}
        {activeTab === 'description' && (
          <div>
            <p className="description-text">
              {product?.basic?.description || MESSAGES.NO_DESCRIPTION}
            </p>
          </div>
        )}

        {/* Specifications Tab */}
        {activeTab === 'specifications' && (
          <div className="specifications-list">
            {product?.specifications && product.specifications.length > 0 ? (
              product.specifications.map((spec, index) => (
                <div key={index} className="specification-item">
                  <span className="specification-key">{spec.key}:</span>
                  <span className="specification-value">{spec.value}</span>
                </div>
              ))
            ) : (
              <p className="no-data-message">{MESSAGES.NO_SPECIFICATIONS}</p>
            )}
          </div>
        )}

        {/* Shipping & Returns Tab */}
        {activeTab === 'shipping' && (
          <div className="shipping-section">
            {/* Shipping Info */}
            {product?.shipping && (
              <div className="shipping-group">
                <h4 className="shipping-title">{MESSAGES.SHIPPING_INFO_TITLE}</h4>
                <ul className="shipping-list">
                  {product.shipping.weight && (
                    <li>• {LABELS.WEIGHT}: {product.shipping.weight} {LABELS.GRAMS}</li>
                  )}
                  {product.shipping.deliveryTime && (
                    <li>
                      • {LABELS.DELIVERY_TIME}: {product.shipping.deliveryTime.min}-{product.shipping.deliveryTime.max} {product.shipping.deliveryTime.unit}
                    </li>
                  )}
                  {product.shipping.shippingClass && (
                    <li>• {LABELS.SHIPPING_CLASS}: {product.shipping.shippingClass}</li>
                  )}
                </ul>
              </div>
            )}

            {/* Return Policy */}
            {product?.policies && (
              <div className="shipping-group">
                <h4 className="shipping-title">{MESSAGES.RETURN_POLICY_TITLE}</h4>
                <ul className="shipping-list">
                  {product.policies.returnWindow && (
                    <li>• {LABELS.RETURN_WINDOW}: {product.policies.returnWindow} {LABELS.DAYS}</li>
                  )}
                  {product.policies.replacementWindow && (
                    <li>• {LABELS.REPLACEMENT_WINDOW}: {product.policies.replacementWindow} {LABELS.DAYS}</li>
                  )}
                  {product.policies.cancellationWindow && (
                    <li>• {LABELS.CANCELLATION_WINDOW}: {product.policies.cancellationWindow} {LABELS.DAYS}</li>
                  )}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDescription;

