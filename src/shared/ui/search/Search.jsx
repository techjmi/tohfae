/**
 * Search Component
 * Reusable search input with debouncing, clear button, and loading state
 */

"use client";
import { useState, useEffect } from 'react';
import { useDebounce } from '@/shared/hooks/useDebounce';
import Input from '@/shared/ui/from/Input';
import { Icon } from '@/shared/icons';
import Button from '@/shared/ui/button/Button';
import { INPUT_TYPE, INPUT_SIZE, INPUT_RADIUS, INPUT_VARIANT } from '@/shared/ui/from/form.constant';
import { SEARCH } from './search.constant';
import { classNames } from '@/shared/utils/classNames';

export const Search = ({
    value,
    defaultValue,
    onChange,
    onSearch,
    onClear,
    debounceTime = 300,
    showClearButton = true,
    loading = false,
    type = INPUT_TYPE.TEXT, 
    placeholder = SEARCH.placeholder,
    size = INPUT_SIZE.MD,
    radius = INPUT_RADIUS.MD,
    variant = INPUT_VARIANT.OUTLINE,
    prefixIcon = "search",
    className = "",
    ...inputProps
}) => {
    const [internalValue, setInternalValue] = useState(defaultValue || '');
    const isControlled = value !== undefined;
    const currentValue = isControlled ? value : internalValue;
    const debouncedValue = useDebounce(currentValue, debounceTime);

    useEffect(() => {
        if (onSearch && debouncedValue !== undefined) {
            onSearch(debouncedValue);
        }
    }, [debouncedValue, onSearch]);

    const handleChange = (e) => {
        const newValue = e.target.value;
        if (!isControlled) {
            setInternalValue(newValue);
        }
        if (onChange) {
            onChange(e);
        }
    };

    const handleClear = () => {
        const emptyValue = '';
        if (!isControlled) {
            setInternalValue(emptyValue);
        }
        if (onClear) {
            onClear();
        }
        if (onChange) {
            const syntheticEvent = {
                target: { value: emptyValue },
                currentTarget: { value: emptyValue },
            };
            onChange(syntheticEvent);
        }
        if (onSearch) {
            onSearch(emptyValue);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Escape' && currentValue) {
            handleClear();
            e.preventDefault();
        }
        if (inputProps.onKeyDown) {
            inputProps.onKeyDown(e);
        }
    };

    const getSuffixIcon = () => {
        if (loading) {
            return <Icon name="loader" className="animate-spin" size={18} />;
        }
        if (showClearButton && currentValue) {
            return (
                <Button
                    onClick={handleClear}
                    variant="ghost"
                    size="sm"
                    aria-label="Clear search"
                    className="p-0 h-auto min-h-0"
                >
                    <Icon name="close" size={18} />
                </Button>
            );
        }
        return inputProps.suffixIcon;
    };

    return (
        <Input
            type={type}
            value={currentValue}
            defaultValue={undefined}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            size={size}
            radius={radius}
            variant={variant}
            prefixIcon={prefixIcon}
            suffixIcon={getSuffixIcon()}
            className={classNames(className)}
            {...inputProps}
        />
    );
};

export default Search;
