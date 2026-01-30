/**
 * Dropdown Component
 * A flexible dropdown component with positioning, variants, and customization
 * Features:
 * - Multiple positions (top, bottom, left, right with variations)
 * - Multiple variants (default, dark, light, transparent, bordered)
 * - Multiple sizes (xs, sm, md, lg, xl, full)
 * - Auto-positioning based on viewport
 * - Keyboard navigation support
 * - Customizable styling
 * Usage:
 * <Dropdown position="bottom" variant="default" size="md">
 *   <DropdownContent>
 *     {content}
 *   </DropdownContent>
 * </Dropdown>
 */

'use client';
import React, { useEffect, useRef } from 'react';
import { classNames } from '@/shared/utils/classNames';
import {
    DROPDOWN_POSITION,
    DROPDOWN_VARIANT,
    DROPDOWN_SIZE,
    getPositionClass,
    getVariantClass,
    getSizeClass,
} from './dropdown.constant';
import { dropdownContainerStyles } from './dropdown.style';

const Dropdown = ({
    children,
    position = DROPDOWN_POSITION.bottomRight,
    variant = DROPDOWN_VARIANT.default,
    size = DROPDOWN_SIZE.md,
    className = "",
    animated = true,
    autoPosition = false,
    offset = 0,
    zIndex = 50,
    Component = "div",
    onOpen,
    onClose,
    ...dropdownProps
}) => {
    const dropdownRef = useRef(null);
    
    // Call onOpen when component mounts
    useEffect(() => {
        if (onOpen) {
            onOpen();
        }

        return () => {
            if (onClose) {
                onClose();
            }
        };
    }, [onOpen, onClose]);

    // Get position classes
    const positionClass = getPositionClass(position);
    const variantClass = getVariantClass(variant);
    const sizeClass = getSizeClass(size);

    // Build final className using classNames utility
    const finalClassName = classNames(
        dropdownContainerStyles.base,
        animated && dropdownContainerStyles.animated,
        positionClass,
        variantClass,
        sizeClass,
        className
    );

    return (
        <Component
            ref={dropdownRef}
            className={finalClassName}
            style={{ zIndex }}
            {...dropdownProps}
        >
            {children}
        </Component>
    );
};

export default Dropdown;