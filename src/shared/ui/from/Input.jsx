/**
 * Input Component
 * A comprehensive, production-ready input field component
 * Features:
 * - Multiple variants (solid, outline, ghost, underline)
 * - Multiple sizes (sm, md, lg, xl)
 * - Multiple states (default, error, success, warning, disabled, readonly)
 * - Label support (optional)
 * - Helper text support (optional)
 * - Error message support (optional)
 * - Icon support (prefix/suffix)
 * - Full accessibility (aria-labels, aria-describedby)
 * - Controlled and uncontrolled modes
 * - Default focus: false (no auto-focus)
 *
 * @param {string} type - Input type (text, email, password, etc.)
 * @param {string} id - Input ID
 * @param {string} name - Input name
 * @param {string} value - Input value (controlled)
 * @param {string} defaultValue - Default value (uncontrolled)
 * @param {function} onChange - Change handler
 * @param {function} onBlur - Blur handler
 * @param {function} onFocus - Focus handler
 * @param {string} placeholder - Placeholder text
 * @param {string} variant - Input variant (solid, outline, ghost, underline)
 * @param {string} size - Input size (sm, md, lg, xl)
 * @param {string} state - Input state (default, error, success, warning, disabled, readonly)
 * @param {string} radius - Border radius (none, sm, md, lg, full)
 * @param {string} label - Label text
 * @param {boolean} required - Required field
 * @param {string} helperText - Helper text below input
 * @param {string} errorMessage - Error message (overrides helperText when state is error)
 * @param {string|ReactNode} prefixIcon - Icon before input
 * @param {string|ReactNode} suffixIcon - Icon after input
 * @param {boolean} disabled - Disabled state
 * @param {boolean} readonly - Readonly state
 * @param {boolean} autoFocus - Auto focus (default: false)
 * @param {string} className - Additional CSS classes
 */

"use client";
import React, { useId } from 'react';
import { classNames } from '@/shared/utils/classNames';
import ShowIcons from '@/shared/components/ShowIcons';
import {
    INPUT_TYPE,
    INPUT_VARIANT,
    INPUT_SIZE,
    INPUT_RADIUS,
    INPUT_STATE
} from './form.constant';
import {
    getInputClasses,
    getInputSizeClasses,
    getInputRadiusClasses,
    getLabelClasses,
    getHelperTextClasses,
    getIconPaddingClasses,
} from './form.style';

const Input = ({
    // Basic props
    type = INPUT_TYPE.TEXT,
    id,
    name,
    value,
    defaultValue,
    onChange,
    onBlur,
    onFocus,
    placeholder,

    // Styling props
    variant = INPUT_VARIANT.OUTLINE,
    size = INPUT_SIZE.MD,
    state = INPUT_STATE.DEFAULT,
    radius = INPUT_RADIUS.MD,

    // Label and text props
    label,
    required = false,
    helperText,
    errorMessage,

    // Icon props
    prefixIcon,
    suffixIcon,

    // State props
    disabled = false,
    readonly = false,
    autoFocus = false, // Default: false

    // Additional props
    className = "",
    ...props
}) => {
    // Determine actual state
    const actualState = disabled
        ? INPUT_STATE.DISABLED
        : readonly
        ? INPUT_STATE.READONLY
        : state;

    // Generate unique ID if not provided (using React's useId for SSR compatibility)
    const reactId = useId();
    const inputId = id || `input-${name || reactId}`;
    const helperTextId = `${inputId}-helper`;
    const errorMessageId = `${inputId}-error`;

    // Get classes using generic helper functions (DRY principle)
    const inputClasses = getInputClasses(variant, actualState);
    const sizeClasses = getInputSizeClasses(size);
    const radiusClasses = getInputRadiusClasses(radius, variant);
    const iconPaddingClasses = getIconPaddingClasses(prefixIcon, suffixIcon, size);

    return (
        <div className="w-full">
            {/* Label */}
            {label && (
                <label
                    htmlFor={inputId}
                    className={getLabelClasses(size, actualState)}
                >
                    {label}
                    {required && <span className="text-red-500 ml-1">*</span>}
                </label>
            )}

            {/* Input Wrapper (for icons) */}
            <div className="relative">
                {/* Prefix Icon */}
                <ShowIcons
                    icon={prefixIcon}
                    position="prefix"
                    size={size}
                    state={actualState}
                />

                {/* Input Field */}
                <input
                    type={type}
                    id={inputId}
                    name={name}
                    value={value}
                    defaultValue={defaultValue}
                    onChange={onChange}
                    onFocus={onFocus}
                    onBlur={onBlur}
                    placeholder={placeholder}
                    disabled={disabled}
                    readOnly={readonly}
                    required={required}
                    autoFocus={autoFocus}
                    aria-label={label || placeholder}
                    aria-describedby={
                        actualState === INPUT_STATE.ERROR && errorMessage
                            ? errorMessageId
                            : helperText
                            ? helperTextId
                            : undefined
                    }
                    aria-invalid={actualState === INPUT_STATE.ERROR}
                    aria-required={required}
                    className={classNames(
                        inputClasses,
                        sizeClasses,
                        radiusClasses,
                        iconPaddingClasses,
                        className
                    )}
                    {...props}
                />

                {/* Suffix Icon */}
                <ShowIcons
                    icon={suffixIcon}
                    position="suffix"
                    size={size}
                    state={actualState}
                />
            </div>

            {/* Helper Text or Error Message */}
            {(helperText || (actualState === INPUT_STATE.ERROR && errorMessage)) && (
                <p
                    id={actualState === INPUT_STATE.ERROR && errorMessage ? errorMessageId : helperTextId}
                    className={getHelperTextClasses(actualState)}
                >
                    {actualState === INPUT_STATE.ERROR && errorMessage ? errorMessage : helperText}
                </p>
            )}
        </div>
    );
};

export default Input;