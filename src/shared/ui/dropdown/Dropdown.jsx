/**
 * Dropdown - Controlled positioned container
 */

'use client';
import React, { useRef } from 'react';
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
import DropdownContent from './DropdownContent';
import DropdownHeader from './DropdownHeader';
import DropdownFooter from './DropdownFooter';

const Dropdown = ({
    isOpen = false,
    onClose,
    header,
    footer,
    isShowHeader = true,
    isShowFooter = true,
    children,
    position = DROPDOWN_POSITION.bottomRight,
    variant = DROPDOWN_VARIANT.default,
    size = DROPDOWN_SIZE.md,
    className = "",
    animated = true,
    autoPosition = false,
    offset = 0,
    zIndex = 50,
    scrollable = false,
    maxHeight = "16rem",
    Component = "div",
    ...props
}) => {
    const dropdownRef = useRef(null);

    if (!isOpen) return null;

    const finalClassName = classNames(
        dropdownContainerStyles.base,
        animated && dropdownContainerStyles.animated,
        getPositionClass(position),
        getVariantClass(variant),
        getSizeClass(size),
        className
    );

    return (
        <Component
            ref={dropdownRef}
            className={finalClassName}
            style={{ zIndex }}
            {...props}
        >
            <DropdownContent scrollable={scrollable} maxHeight={maxHeight}>
                {isShowHeader && <DropdownHeader data={header} />}
                {children}
                {isShowFooter && <DropdownFooter data={footer} onClose={onClose} />}
            </DropdownContent>
        </Component>
    );
};

export default Dropdown;