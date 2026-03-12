"use client";

import React from 'react';
import './ProductVariants.css';
import VariantGroup from './components/VariantGroup';
import StockStatus from './components/StockStatus';
import { buildVariantGroups, findMatchingVariant } from './ProductVariants.helpers';

const ProductVariants = ({
  variants = [],
  onVariantChange,
  selectedVariantId,
  product,
  className = ''
}) => {
  if (!variants || variants.length === 0) return null;

  const selectedVariant = variants.find(v => v.id === selectedVariantId);
  const selectedAttributes = selectedVariant?.attributes || {};

  const variantGroups = buildVariantGroups(variants, selectedAttributes);

  const handleAttributeSelect = (attributeKey, attributeValue) => {
    const matchingVariant = findMatchingVariant(
      variants,
      selectedAttributes,
      attributeKey,
      attributeValue
    );

    if (matchingVariant) {
      onVariantChange(matchingVariant.id);
    }
  };

  return (
    <div className={`variants-container ${className}`}>
      {Object.entries(variantGroups).map(([attributeKey, values]) => (
        <VariantGroup
          key={attributeKey}
          attributeKey={attributeKey}
          values={values}
          selectedAttributes={selectedAttributes}
          onAttributeSelect={handleAttributeSelect}
        />
      ))}

      <StockStatus
        selectedVariant={selectedVariant}
        product={product}
      />
    </div>
  );
};

export default ProductVariants;

