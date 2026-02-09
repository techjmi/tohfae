/**
 * DropdownItem Component
 * Individual item in dropdown menu
 * Features:
 * - Hover effects
 * - Active/selected states
 * - Disabled state
 * - Danger variant
 * - Icon support
 * - Keyboard navigation
 * Usage:
 * <DropdownItem onClick={handleClick} icon="user">
 *   Profile
 * </DropdownItem>
 */
"use client";
import React from 'react';
import { classNames } from '@/shared/utils/classNames';
import { getDropdownItemClass } from './dropdown.style';

const DropdownItem = ({
    children,
    onClick,
    href,
    icon,
    disabled = false,
    selected = false,
    danger = false,
    className = "",
    Component = "div",
    ...props
}) => {
    const itemClass = getDropdownItemClass({
        hover: true,
        disabled,
        selected,
        danger,
    });

    const finalClassName = classNames(itemClass, className);

    const handleClick = (e) => {
        if (disabled) {
            e.preventDefault();
            return;
        }
        
        if (onClick) {
            onClick(e);
        }
    };
    // If href is provided, render as link
    if (href && !disabled) {
        return (
            <a
                href={href}
                onClick={handleClick}
                className={finalClassName}
                {...props}
            >
                {icon && <span className="mr-2">{icon}</span>}
                {children}
            </a>
        );
    }

    // Otherwise render as div/button
    return (
        <Component
            onClick={handleClick}
            className={finalClassName}
            role="menuitem"
            tabIndex={disabled ? -1 : 0}
            {...props}
        >
            {icon && <span className="mr-2">{icon}</span>}
            {children}
        </Component>
    );
};

export default DropdownItem;

