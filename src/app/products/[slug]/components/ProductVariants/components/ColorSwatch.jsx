"use client";

import React from 'react';
import Tooltip from '@/shared/ui/tooltip/Tooltip';
import { getColorHex, needsColorBorder } from '@/shared/constant';

const ColorSwatch = ({ 
  color, 
  isSelected, 
  isAvailable, 
  onClick 
}) => {
  const colorHex = getColorHex(color);
  const hasBorder = needsColorBorder(color);

  const tooltipContent = `${color}${!isAvailable ? ' (Out of stock)' : ''}`;

  return (
    <Tooltip content={tooltipContent} position="top">
      <button
        onClick={onClick}
        disabled={!isAvailable}
        className={`
          w-12 h-12 rounded-full cursor-pointer transition-all
          ${isSelected ? 'ring-[3px] ring-blue-500 ring-offset-0' : ''}
          ${hasBorder ? 'border border-gray-300' : ''}
          ${!isAvailable ? 'opacity-30 cursor-not-allowed' : 'hover:scale-105'}
        `}
        style={{ backgroundColor: colorHex }}
        aria-label={color}
      />
    </Tooltip>
  );
};

export default ColorSwatch;

