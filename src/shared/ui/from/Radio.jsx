"use client";
import React from 'react';
import { classNames } from '@/shared/utils/classNames';
import {
    RADIO_SIZE,
    RADIO_STATE,
    RADIO_VARIANT,
} from './form.constant';
import {
    getRadioClasses,
    getRadioSizeClasses,
    getHelperTextClasses,
} from './form.style';

const Radio = ({
    id,
    name,
    value,
    checked,
    defaultChecked,
    onChange,
    onFocus,
    onBlur,
    variant = RADIO_VARIANT.SOLID,
    size = RADIO_SIZE.MD,
    state = RADIO_STATE.DEFAULT,
    label,
    helperText,
    errorMessage,
    disabled = false,
    required = false,
    className = "",
    labelClassName = "",
    ...props
}) => {
    const radioId = id || `radio-${Math.random().toString(36).substring(2, 9)}`;
    const helperTextId = `${radioId}-helper`;
    const errorMessageId = `${radioId}-error`;

    const actualState = disabled ? RADIO_STATE.DISABLED : state;

    const radioClasses = getRadioClasses(variant, actualState);
    const sizeClasses = getRadioSizeClasses(size);

    return (
        <div className="w-full">
            <div className="flex items-start">
                <div className="flex items-center h-5">
                    <input
                        type="radio"
                        id={radioId}
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
                            actualState === RADIO_STATE.ERROR && errorMessage
                                ? errorMessageId
                                : helperText
                                ? helperTextId
                                : undefined
                        }
                        aria-invalid={actualState === RADIO_STATE.ERROR}
                        aria-required={required}
                        className={classNames(
                            radioClasses,
                            sizeClasses,
                            "focus:ring-2 focus:ring-offset-2",
                            className
                        )}
                        {...props}
                    />
                </div>
                {label && (
                    <div className="ml-3">
                        <label
                            htmlFor={radioId}
                            className={classNames(
                                "font-medium text-gray-900",
                                size === RADIO_SIZE.SM ? "text-sm" : "text-base",
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
            {(helperText || (actualState === RADIO_STATE.ERROR && errorMessage)) && (
                <p
                    id={actualState === RADIO_STATE.ERROR && errorMessage ? errorMessageId : helperTextId}
                    className={classNames(
                        getHelperTextClasses(actualState),
                        "ml-8"
                    )}
                >
                    {actualState === RADIO_STATE.ERROR && errorMessage ? errorMessage : helperText}
                </p>
            )}
        </div>
    );
};

export default Radio;