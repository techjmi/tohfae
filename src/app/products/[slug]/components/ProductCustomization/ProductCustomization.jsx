/**
 * ProductCustomization Component (Molecule)
 *
 * Product customization options with authentication check:
 * - Text input fields (using shared Input component)
 * - Textarea fields (using shared Textarea component)
 * - Image upload
 * - Select dropdowns (using shared Select component)
 * - Price modifiers display
 * - Login prompt for unauthenticated users
 *
 * Props:
 * @param {Object} customization - Product customization object
 * @param {Function} onCustomizationChange - Callback when customization changes
 * @param {Object} customizationData - Current customization data
 * @param {string} className - Additional CSS classes
 *
 * Usage:
 * <ProductCustomization
 *   customization={product.customization}
 *   onCustomizationChange={handleCustomizationChange}
 *   customizationData={customData}
 * />
 */
"use client";

import React from 'react';
import { useSelector } from 'react-redux';
import { selectIsAuthenticated } from '@/redux/slice/authSlice';
import { Input, Select, Textarea } from '@/shared/ui/from';
import { CUSTOMIZATION_TYPES, MESSAGES, CURRENCY_SYMBOL, FILE_UPLOAD_LIMITS } from './ProductCustomization.constants';
import { LoginPrompt } from './components';
import './ProductCustomization.css';

const ProductCustomization = ({
  customization,
  onCustomizationChange,
  customizationData = {},
  className = '',
  ...props
}) => {
  const isAuthenticated = useSelector(selectIsAuthenticated);

  // Don't render if customization is not enabled or no options
  if (!customization?.enabled || !customization?.options) return null;

  // Show login prompt if user is not authenticated
  if (!isAuthenticated) {
    return <LoginPrompt className={className} />;
  }

  const handleChange = (optionKey, value) => {
    const newData = { ...customizationData, [optionKey]: value };
    onCustomizationChange(newData);
  };

  const renderOption = (option) => {
    const value = customizationData[option.key] || '';

    // Helper to format price modifier
    const formatPriceModifier = (modifier) => {
      if (!modifier || modifier === 0) return '';
      return modifier > 0
        ? ` (+${CURRENCY_SYMBOL}${modifier})`
        : ` (${CURRENCY_SYMBOL}${modifier})`;
    };

    // Helper to render label with price modifier
    const renderLabel = (label, required, priceModifier) => (
      <>
        {label}
        {required && <span className="required-indicator">*</span>}
        {priceModifier > 0 && (
          <span className="price-modifier price-modifier-positive">
            (+{CURRENCY_SYMBOL}{priceModifier})
          </span>
        )}
      </>
    );

    switch (option.type) {
      case CUSTOMIZATION_TYPES.SELECT:
        return (
          <Select
            key={option.id}
            id={option.key}
            name={option.key}
            value={value}
            onChange={(e) => handleChange(option.key, e.target.value)}
            label={option.label}
            required={option.required}
            placeholder={`Select ${option.label}`}
          >
            <option value="">Select {option.label}</option>
            {option.values?.map((val) => (
              <option key={val.value} value={val.value}>
                {val.label}{formatPriceModifier(val.priceModifier)}
              </option>
            ))}
          </Select>
        );

      case CUSTOMIZATION_TYPES.TEXT:
        return (
          <Input
            key={option.id}
            id={option.key}
            name={option.key}
            type="text"
            value={value}
            onChange={(e) => handleChange(option.key, e.target.value)}
            label={renderLabel(option.label, option.required, option.priceModifier)}
            placeholder={`Enter ${option.label.toLowerCase()}`}
            maxLength={option.maxLength}
            required={option.required}
            helperText={option.maxLength ? `${value.length}/${option.maxLength} characters` : undefined}
          />
        );

      case CUSTOMIZATION_TYPES.TEXTAREA:
        return (
          <Textarea
            key={option.id}
            id={option.key}
            name={option.key}
            value={value}
            onChange={(e) => handleChange(option.key, e.target.value)}
            label={renderLabel(option.label, option.required, option.priceModifier)}
            placeholder={`Enter ${option.label.toLowerCase()}`}
            maxLength={option.maxLength}
            required={option.required}
            rows={4}
            helperText={option.maxLength ? `${value.length}/${option.maxLength} characters` : undefined}
          />
        );

      case CUSTOMIZATION_TYPES.IMAGE:
        const allowedFormats = option.allowedFormats || FILE_UPLOAD_LIMITS.ALLOWED_IMAGE_FORMATS;
        const maxSize = option.maxSize || FILE_UPLOAD_LIMITS.MAX_SIZE_MB;

        const handleFileChange = (e) => {
          const file = e.target.files[0];
          if (file) {
            const maxSizeBytes = maxSize * 1024 * 1024;
            if (file.size > maxSizeBytes) {
              alert(`File size exceeds maximum limit of ${maxSize}MB`);
              e.target.value = '';
              return;
            }
            handleChange(option.key, file);
          }
        };

        return (
          <div key={option.id} className="option-wrapper">
            <label htmlFor={option.key} className="option-label">
              {renderLabel(option.label, option.required, option.priceModifier)}
            </label>
            <input
              id={option.key}
              type="file"
              accept={allowedFormats.map(f => `.${f}`).join(',')}
              onChange={handleFileChange}
              required={option.required}
              className="file-input"
              aria-label={option.label}
            />
            <div className="file-info">
              <p>Max size: {maxSize}MB</p>
              <p>Allowed formats: {allowedFormats.join(', ').toUpperCase()}</p>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className={`customization-container ${className}`} {...props}>
      <h3 className="customization-title">{MESSAGES.CUSTOMIZATION_TITLE}</h3>
      <div className="options-container">
        {customization.options.map(option => renderOption(option))}
      </div>
    </div>
  );
};

export default ProductCustomization;

