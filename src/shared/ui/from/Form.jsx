/**
 * Form Component
 * A reusable form component that renders fields based on configuration
 *
 * Features:
 * - Renders any type of field (input, select, textarea, checkbox, radio)
 * - Handles form state and validation errors
 * - Supports grid layouts for responsive forms
 * - Automatic error display from backend
 *
 * Usage:
 * <Form
 *   fields={FORM_FIELDS_CONFIG}
 *   formData={formData}
 *   errors={errors}
 *   onChange={handleChange}
 *   onSubmit={handleSubmit}
 * />
 */

"use client";

import React from 'react';
import Input from './Input';
import Select from './Select';
import Textarea from './Textarea';
import Checkbox from './Checkbox';
import Radio from './Radio';
import { INPUT_STATE } from './form.constant';

/**
 * Render a single form field based on its type
 */
const renderField = (field, formData, errors, onChange) => {
  const commonProps = {
    key: field.name,
    label: field.label,
    name: field.name,
    value: formData[field.name] || '',
    onChange: onChange,
    placeholder: field.placeholder,
    required: field.required,
    disabled: field.disabled,
    readonly: field.readonly,
    state: errors[field.name] ? INPUT_STATE.ERROR : INPUT_STATE.DEFAULT,
    errorMessage: errors[field.name],
    helperText: field.helperText,
  };

  switch (field.type) {
    case 'select':
      return (
        <Select {...commonProps}>
          {field.placeholder && !field.required && (
            <option value="">{field.placeholder}</option>
          )}
          {field.options?.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </Select>
      );

    case 'textarea':
      return (
        <Textarea
          {...commonProps}
          rows={field.rows}
          resize={field.resize}
        />
      );

    case 'checkbox':
      return (
        <Checkbox
          key={field.name}
          label={field.label}
          name={field.name}
          checked={formData[field.name] || false}
          onChange={onChange}
          disabled={field.disabled}
        />
      );

    case 'radio':
      return (
        <div key={field.name} className="space-y-2">
          {field.label && (
            <label className="block text-sm font-medium text-gray-700">
              {field.label}
              {field.required && <span className="text-red-500 ml-1">*</span>}
            </label>
          )}
          <div className="space-y-2">
            {field.options?.map((option) => (
              <Radio
                key={option.value}
                label={option.label}
                name={field.name}
                value={option.value}
                checked={formData[field.name] === option.value}
                onChange={onChange}
                disabled={field.disabled}
              />
            ))}
          </div>
          {errors[field.name] && (
            <p className="text-sm text-red-600">{errors[field.name]}</p>
          )}
        </div>
      );

    default:
      // Input field (text, email, password, tel, number, etc.)
      return (
        <Input
          {...commonProps}
          type={field.type}
          prefixIcon={field.prefixIcon}
          suffixIcon={field.suffixIcon}
          autoFocus={field.autoFocus}
        />
      );
  }
};

/**
 * Main Form Component
 */
export default function Form({
  fields = [],
  gridFields = [],
  formData = {},
  errors = {},
  onChange,
  onSubmit,
  children,
  className = '',
  ...props
}) {
  return (
    <form onSubmit={onSubmit} className={className} {...props}>
      <div className="space-y-4">
        {/* Render single column fields */}
        {fields.map((field) => renderField(field, formData, errors, onChange))}

        {/* Render grid fields (responsive 2-column layout) */}
        {gridFields.map((gridRow, index) => (
          <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {gridRow.fields?.map((field) => renderField(field, formData, errors, onChange))}
          </div>
        ))}

        {/* Custom children (buttons, additional content) */}
        {children}
      </div>
    </form>
  );
}