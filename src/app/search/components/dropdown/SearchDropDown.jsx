/**
 * Search Dropdown Component
 *
 * Custom dropdown component for search filters
 */
import React from 'react';
import { classNames } from '@/shared/utils/classNames';

const SearchDropDown = ({
    label,
    options = [],
    currentValue = '',
    onSelect,
    className = "",
    ...props
}) => {
    const finalClassName = classNames(
        'border border-gray-300 rounded-md bg-white py-1',
        className
    );

  return (
    <div className={finalClassName}>
      {
        options.map((option) => (
            <div
                key={option.value}
                onClick={() => onSelect(option.value)}
                className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
            >
                {option.label}
            </div>
        ))
      }
    </div>
  )
}

export default SearchDropDown