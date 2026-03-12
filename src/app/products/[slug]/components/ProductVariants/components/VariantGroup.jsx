/**
 * VariantGroup Component
 * Displays a group of variant options (colors, sizes, etc.)
 */
"use client";

import React from 'react';
import ColorSwatch from './ColorSwatch';
import AttributeButton from './AttributeButton';
import {
  isColorAttribute,
  findBestMatchingVariant,
  isVariantAvailable
} from '../ProductVariants.helpers';

const VariantGroup = ({ 
  attributeKey, 
  values, 
  selectedAttributes, 
  onAttributeSelect 
}) => {
  const isColor = isColorAttribute(attributeKey);

  return (
    <div className="variant-group">
      <label className="variant-label capitalize">
        {attributeKey}
      </label>
      
      <div className="variant-options flex gap-2 flex-wrap">
        {values.map(({ value, variants: variantsForValue }) => {
          const isSelected = selectedAttributes[attributeKey] === value;
          
          // Find matching variant for this value
          const matchingVariant = findBestMatchingVariant(
            variantsForValue, 
            selectedAttributes, 
            attributeKey
          );
          
          const isAvailable = isVariantAvailable(matchingVariant);

          // Render color swatch or attribute button
          if (isColor) {
            return (
              <ColorSwatch
                key={value}
                color={value}
                isSelected={isSelected}
                isAvailable={isAvailable}
                onClick={() => onAttributeSelect(attributeKey, value)}
              />
            );
          }

          return (
            <AttributeButton
              key={value}
              value={value}
              isSelected={isSelected}
              isAvailable={isAvailable}
              onClick={() => onAttributeSelect(attributeKey, value)}
            />
          );
        })}
      </div>
    </div>
  );
};

export default VariantGroup;

