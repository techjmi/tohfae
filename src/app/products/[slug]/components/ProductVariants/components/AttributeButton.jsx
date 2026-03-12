/**
 * AttributeButton Component
 * Displays a button for non-color variant attributes (size, material, etc.)
 */
"use client";

import React from 'react';
import Button from '@/shared/ui/button/Button';

const AttributeButton = ({ 
  value, 
  isSelected, 
  isAvailable, 
  onClick 
}) => {
  return (
    <Button
      onClick={onClick}
      disabled={!isAvailable}
      variant={isSelected ? 'solid' : 'outline'}
      color={isSelected ? 'primary' : 'neutral'}
      size="sm"
    >
      {value}
    </Button>
  );
};

export default AttributeButton;

