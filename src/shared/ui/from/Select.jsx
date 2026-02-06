/**
 * Select Component
 * 
 * A comprehensive, production-ready select dropdown component
 * 
 * Features:
 * - Multiple variants (solid, outline, ghost)
 * - Multiple sizes (sm, md, lg, xl)
 * - Multiple states (default, error, success, warning, disabled)
 * - Label support (optional)
 * - Helper text support (optional)
 * - Error message support (optional)
 * - Icon support (prefix/suffix)
 * - Full accessibility (aria-labels, aria-describedby)
 * - Controlled and uncontrolled modes
 * 
 * @param {string} id - Select ID
 * @param {string} name - Select name
 * @param {string} value - Select value (controlled)
 * @param {string} defaultValue - Default value (uncontrolled)
 * @param {function} onChange - Change handler
 * @param {function} onBlur - Blur handler
 * @param {function} onFocus - Focus handler
 * @param {string} placeholder - Placeholder text
 * @param {string} variant - Select variant (solid, outline, ghost)
 * @param {string} size - Select size (sm, md, lg, xl)
 * @param {string} state - Select state (default, error, success, warning, disabled)
 * @param {string} radius - Border radius (none, sm, md, lg, full)
 * @param {string} label - Label text
 * @param {boolean} required - Required field
 * @param {string} helperText - Helper text below select
 * @param {string} errorMessage - Error message (overrides helperText when state is error)
 * @param {string|ReactNode} prefixIcon - Icon before select
 * @param {string|ReactNode} suffixIcon - Icon after select
 * @param {boolean} disabled - Disabled state
 * @param {boolean} autoFocus - Auto focus (default: false)
 * @param {string} className - Additional CSS classes
 */
"use client";
import React from 'react';
import { classNames } from '@/shared/utils/classNames';
import ShowIcons from '@/shared/components/ShowIcons';
import {
    SELECT_VARIANT,
    SELECT_SIZE,
    SELECT_STATE,
    SELECT_RADIUS,
} from './form.constant';
import {
    getSelectClasses,
    getSelectSizeClasses,
    getSelectRadiusClasses,
    getLabelClasses,
    getHelperTextClasses,
    getIconPaddingClasses,
} from './form.style';

const Select = ({
    children,
    id,
    name,
    value,
    defaultValue,
    onChange,
    onBlur,
    onFocus,
    placeholder,

    variant = SELECT_VARIANT.OUTLINE,
    size = SELECT_SIZE.MD,
    state = SELECT_STATE.DEFAULT,
    radius = SELECT_RADIUS.MD,

    label,
    required = false,
    helperText,
    errorMessage,

    prefixIcon,
    suffixIcon,

    disabled = false,
    autoFocus = false, // Default: false
    className = "",
    ...props
}) => {
    // Determine actual state
    const actualState = disabled
        ? SELECT_STATE.DISABLED
        : state;

    // Generate unique ID if not provided
    const selectId = id || `select-${name || Math.random().toString(36).substring(2, 11)}`;
    const helperTextId = `${selectId}-helper`;
    const errorMessageId = `${selectId}-error`;

    // Get classes using generic helper functions (DRY principle)
    const selectClasses = getSelectClasses(variant, actualState);
    const sizeClasses = getSelectSizeClasses(size);
    const radiusClasses = getSelectRadiusClasses(radius);
    const iconPaddingClasses = getIconPaddingClasses(prefixIcon, suffixIcon, size);

    return (
        <div className="w-full">
            {/* Label */}
            {label && (
                <label
                    htmlFor={selectId}
                    className={getLabelClasses(size, actualState)}
                >
                    {label}
                    {required && <span className="text-red-500 ml-1">*</span>}
                </label>
            )}

            {/* Select Wrapper (for icons) */}
            <div className="relative">
                {/* Prefix Icon */}
                <ShowIcons
                    icon={prefixIcon}
                    position="prefix"
                    size={size}
                    state={actualState}
                />

                {/* Select Field */}
                <select
                    id={selectId}
                    name={name}
                    value={value}
                    defaultValue={defaultValue}
                    onChange={onChange}
                    onFocus={onFocus}
                    onBlur={onBlur}
                    placeholder={placeholder}
                    disabled={disabled}
                    required={required}
                    autoFocus={autoFocus}
                    aria-label={label || placeholder}
                    aria-describedby={
                        actualState === SELECT_STATE.ERROR && errorMessage
                            ? errorMessageId
                            : helperText
                            ? helperTextId
                            : undefined
                    }
                    aria-invalid={actualState === SELECT_STATE.ERROR}
                    aria-required={required}
                    className={classNames(
                        selectClasses,
                        sizeClasses,
                        radiusClasses,
                        iconPaddingClasses,
                        className
                    )}
                    {...props}
                >
                    {children}
                </select>

                {/* Suffix Icon */}
                <ShowIcons
                    icon={suffixIcon}
                    position="suffix"
                    size={size}
                    state={actualState}
                />
            </div>

            {/* Helper Text or Error Message */}
            {(helperText || (actualState === SELECT_STATE.ERROR && errorMessage)) && (
                <p
                    id={actualState === SELECT_STATE.ERROR && errorMessage ? errorMessageId : helperTextId}
                    className={getHelperTextClasses(actualState)}
                >
                    {actualState === SELECT_STATE.ERROR && errorMessage ? errorMessage : helperText}
                </p>
            )}
        </div>
    );
};

export default Select;