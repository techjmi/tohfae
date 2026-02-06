"use client";
import React from 'react';
import { classNames } from '@/shared/utils/classNames';
import {
    CHECKBOX_SIZE,
    CHECKBOX_STATE,
    CHECKBOX_VARIANT,
} from './form.constant';
import {
    getCheckboxClasses,
    getCheckboxSizeClasses,
    getHelperTextClasses,
} from './form.style';

const Checkbox = ({
    id,
    name,
    value,
    checked,
    defaultChecked,
    onChange,
    onFocus,
    onBlur,
    variant = CHECKBOX_VARIANT.SOLID,
    size = CHECKBOX_SIZE.MD,
    state = CHECKBOX_STATE.DEFAULT,
    label,
    helperText,
    errorMessage,
    disabled = false,
    required = false,
    indeterminate = false,
    className = "",
    labelClassName = "",
    ...props
}) => {
    const checkboxId = id || `checkbox-${Math.random().toString(36).substring(2, 9)}`;
    const helperTextId = `${checkboxId}-helper`;
    const errorMessageId = `${checkboxId}-error`;

    const actualState = disabled ? CHECKBOX_STATE.DISABLED : state;

    const checkboxRef = React.useRef(null);

    // Handle indeterminate state
    React.useEffect(() => {
        if (checkboxRef.current) {
            checkboxRef.current.indeterminate = indeterminate;
        }
    }, [indeterminate]);

    const checkboxClasses = getCheckboxClasses(variant, actualState);
    const sizeClasses = getCheckboxSizeClasses(size);

    return (
        <div className="w-full">
            <div className="flex items-start">
                <div className="flex items-center h-5">
                    <input
                        ref={checkboxRef}
                        type="checkbox"
                        id={checkboxId}
                        name={name}
                        value={value}
                        checked={checked}
                        defaultChecked={defaultChecked}
                        onChange={onChange}
                        onFocus={onFocus}
                        onBlur={onBlur}
                        disabled={disabled}
                        required={required}
                        aria-describedby={
                            actualState === CHECKBOX_STATE.ERROR && errorMessage
                                ? errorMessageId
                                : helperText
                                ? helperTextId
                                : undefined
                        }
                        aria-invalid={actualState === CHECKBOX_STATE.ERROR}
                        aria-required={required}
                        className={classNames(
                            checkboxClasses,
                            sizeClasses,
                            "rounded focus:ring-2 focus:ring-offset-2",
                            className
                        )}
                        {...props}
                    />
                </div>
                {label && (
                    <div className="ml-3">
                        <label
                            htmlFor={checkboxId}
                            className={classNames(
                                "font-medium text-gray-900",
                                size === CHECKBOX_SIZE.SM ? "text-sm" : "text-base",
                                disabled && "text-gray-400 cursor-not-allowed",
                                labelClassName
                            )}
                        >
                            {label}
                            {required && <span className="text-red-500 ml-1">*</span>}
                        </label>
                    </div>
                )}
            </div>

            {/* Helper Text or Error Message */}
            {(helperText || (actualState === CHECKBOX_STATE.ERROR && errorMessage)) && (
                <p
                    id={actualState === CHECKBOX_STATE.ERROR && errorMessage ? errorMessageId : helperTextId}
                    className={classNames(
                        getHelperTextClasses(actualState),
                        "ml-8"
                    )}
                >
                    {actualState === CHECKBOX_STATE.ERROR && errorMessage ? errorMessage : helperText}
                </p>
            )}
        </div>
    );
};

export default Checkbox;
