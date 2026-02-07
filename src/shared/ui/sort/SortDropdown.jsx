/**
 * SortDropdown Component
 * 
 * Reusable dropdown for sorting with selected state
 * 
 * Props:
 * @param {string} label - Button label (e.g., "Price", "Rating")
 * @param {array} options - Sort options [{ label, value, direction }]
 * @param {string} currentValue - Currently selected value
 * @param {string} currentDirection - Currently selected direction
 * @param {function} onSelect - Callback when option selected (value, direction)
 * @param {string} className - Additional CSS classes
 * 
 * Usage:
 * <SortDropdown
 *   label="Price"
 *   options={SORT_OPTIONS.PRICE}
 *   currentValue={sortBy}
 *   currentDirection={sortDirection}
 *   onSelect={(value, direction) => applySort(value, direction)}
 * />
 */
"use client";

import React from 'react';
import {
  Dropdown,
  DropdownContent,
  DropdownItem
} from '@/shared/ui/dropdown';
import Button from '@/shared/ui/button';
import { Icon } from '@/shared/icons';
import { useToggle } from '@/shared/hooks/useToggle';
import { useClickOutside } from '@/shared/hooks/useClickOutside';

const SortDropdown = ({
  label,
  options = [],
  currentValue = '',
  currentDirection = 'asc',
  onSelect,
  className = "",
  ...props
}) => {
  const [isOpen, toggleOpen] = useToggle();
  const ref = useClickOutside(() => toggleOpen(false));
  
  // Get current selection label
  const getCurrentLabel = () => {
    const current = options.find(
      opt => opt.value === currentValue && opt.direction === currentDirection
    );
    return current?.label || label;
  };
  
  // Handle option selection
  const handleSelect = (value, direction) => {
    if (onSelect) {
      onSelect(value, direction);
    }
    toggleOpen(false);
  };
  
  return (
    <div ref={ref} className={`relative ${className}`}>
      <Button
        variant="outline"
        size="sm"
        onClick={() => toggleOpen(!isOpen)}
        className="min-w-40 justify-between"
      >
        <span className="truncate">{getCurrentLabel()}</span>
        <Icon 
          name="arrowRight" 
          size={16} 
          className={`ml-2 transition-transform flex-shrink-0 ${isOpen ? 'rotate-90' : ''}`}
        />
      </Button>

      {isOpen && (
        <Dropdown position="bottomLeft" size="md">
          <DropdownContent>
            {options.map((option) => (
              <DropdownItem
                key={`${option.value}-${option.direction}`}
                onClick={() => handleSelect(option.value, option.direction)}
                selected={currentValue === option.value && currentDirection === option.direction}
              >
                {option.label}
              </DropdownItem>
            ))}
          </DropdownContent>
        </Dropdown>
      )}
    </div>
  );
};

export default SortDropdown;

