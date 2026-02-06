"use client";
import React from 'react';
import { classNames } from '@/shared/utils/classNames';
import {
    TEXTAREA_VARIANT,
    TEXTAREA_SIZE,
    TEXTAREA_STATE,
    TEXTAREA_RADIUS,
    TEXTAREA_RESIZE,
} from './form.constant';
import {
    getTextareaClasses,
    getTextareaSizeClasses,
    getTextareaRadiusClasses,
    getTextareaResizeClasses,
    getLabelClasses,
    getHelperTextClasses,
} from './form.style';

const Textarea = ({
    id,
    name,
    value,
    defaultValue,
    onChange,
    onFocus,
    onBlur,
    placeholder,
    variant = TEXTAREA_VARIANT.OUTLINE,
    size = TEXTAREA_SIZE.MD,
    state = TEXTAREA_STATE.DEFAULT,
    radius = TEXTAREA_RADIUS.MD,
    resize = TEXTAREA_RESIZE.VERTICAL,
    rows = 4,
    label,
    required = false,
    helperText,
    errorMessage,
    disabled = false,
    readonly = false,
    autoFocus = false,
    maxLength,
    className = "",
    ...props
}) => {
    const textareaId = id || `textarea-${Math.random().toString(36).substring(2, 9)}`;
    const helperTextId = `${textareaId}-helper`;
    const errorMessageId = `${textareaId}-error`;

    const actualState = disabled ? TEXTAREA_STATE.DISABLED : readonly ? TEXTAREA_STATE.READONLY : state;

    // Get classes using helper functions
    const textareaClasses = getTextareaClasses(variant, actualState);
    const sizeClasses = getTextareaSizeClasses(size);
    const radiusClasses = getTextareaRadiusClasses(radius);
    const resizeClasses = getTextareaResizeClasses(resize);

    return (
        <div className="w-full">
            {/* Label */}
            {label && (
                <label
                    htmlFor={textareaId}
                    className={getLabelClasses(size, actualState)}
                >
                    {label}
                    {required && <span className="text-red-500 ml-1">*</span>}
                </label>
            )}

            {/* Textarea Field */}
            <textarea
                id={textareaId}
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
                rows={rows}
                maxLength={maxLength}
                aria-label={label || placeholder}
                aria-describedby={
                    actualState === TEXTAREA_STATE.ERROR && errorMessage
                        ? errorMessageId
                        : helperText
                        ? helperTextId
                        : undefined
                }
                aria-invalid={actualState === TEXTAREA_STATE.ERROR}
                aria-required={required}
                className={classNames(
                    textareaClasses,
                    sizeClasses,
                    radiusClasses,
                    resizeClasses,
                    className
                )}
                {...props}
            />

            {/* Helper Text or Error Message */}
            {(helperText || (actualState === TEXTAREA_STATE.ERROR && errorMessage)) && (
                <p
                    id={actualState === TEXTAREA_STATE.ERROR && errorMessage ? errorMessageId : helperTextId}
                    className={getHelperTextClasses(actualState)}
                >
                    {actualState === TEXTAREA_STATE.ERROR && errorMessage ? errorMessage : helperText}
                </p>
            )}
        </div>
    );
};

export default Textarea;