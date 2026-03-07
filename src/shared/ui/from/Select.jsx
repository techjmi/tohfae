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
import React, { useId, useState } from 'react';
import { classNames } from '@/shared/utils/classNames';
import ShowIcons from '@/shared/components/ShowIcons';
import { Icon } from '@/shared/icons';
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
    readOnly = false, // Fix: Changed from readonly to readOnly
    autoFocus = false, // Default: false
    className = "",
    ...props
}) => {
    const [isOpen, setIsOpen] = useState(false);

    // Determine actual state
    const actualState = disabled
        ? SELECT_STATE.DISABLED
        : state;

    // Generate unique ID if not provided (using React's useId for SSR compatibility)
    const reactId = useId();
    const selectId = id || `select-${name || reactId}`;
    const helperTextId = `${selectId}-helper`;
    const errorMessageId = `${selectId}-error`;

    // Get classes using generic helper functions (DRY principle)
    const selectClasses = getSelectClasses(variant, actualState);
    const sizeClasses = getSelectSizeClasses(size);
    const radiusClasses = getSelectRadiusClasses(radius);
    const iconPaddingClasses = getIconPaddingClasses(prefixIcon, suffixIcon || true, size); // Always reserve space for dropdown arrow

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
                    onFocus={(e) => {
                        setIsOpen(true);
                        onFocus?.(e);
                    }}
                    onBlur={(e) => {
                        setIsOpen(false);
                        onBlur?.(e);
                    }}
                    placeholder={placeholder}
                    disabled={disabled}
                    readOnly={readOnly} // Fix: Use readOnly instead of readonly
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
                    aria-expanded={isOpen}
                    className={classNames(
                        selectClasses,
                        sizeClasses,
                        radiusClasses,
                        iconPaddingClasses,
                        'appearance-none cursor-pointer', // Remove default arrow, add pointer cursor
                        className
                    )}
                    {...props}
                >
                    {children}
                </select>

                {/* Custom Dropdown Arrow (replaces browser default) */}
                <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none flex items-center">
                    {suffixIcon ? (
                        <ShowIcons
                            icon={suffixIcon}
                            position="suffix"
                            size={size}
                            state={actualState}
                        />
                    ) : (
                        <Icon
                            name={isOpen ? "arrowUp" : "arrowDown"}
                            size={size === SELECT_SIZE.SM ? 16 : size === SELECT_SIZE.LG ? 22 : size === SELECT_SIZE.XL ? 24 : 20}
                            className={classNames(
                                'transition-all duration-200',
                                disabled ? 'text-gray-400' : 'text-gray-600',
                                isOpen && 'text-blue-600'
                            )}
                        />
                    )}
                </div>
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