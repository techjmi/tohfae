/**
 * DropdownContent Component
 *
 * Content wrapper for dropdown with optional scrolling and padding
 *
 * Features:
 * - Scrollable content with max height
 * - Customizable padding
 * - Support for headers, dividers, and items
 *
 * Usage:
 * <DropdownContent scrollable={true} maxHeight="300px">
 *   {content}
 * </DropdownContent>
 */
"use client";
import React from 'react';
import { classNames } from '@/shared/utils/classNames';
import { dropdownScrollStyles } from './dropdown.style';

const DropdownContent = ({
    children,
    className = "",
    scrollable = false,
    maxHeight = "16rem", // 256px (max-h-64)
    padding = true,
    Component = "div",
    ...dropdownContentProps
}) => {
    // Build className using classNames utility
    const finalClassName = classNames(
        scrollable && dropdownScrollStyles.container,
        scrollable && dropdownScrollStyles.scrollbar,
        padding && 'py-1',
        className
    );

    const style = scrollable ? { maxHeight } : {};

    return (
        <Component
            className={finalClassName}
            style={style}
            {...dropdownContentProps}
        >
            {children}
        </Component>
    );
};

export default DropdownContent;
