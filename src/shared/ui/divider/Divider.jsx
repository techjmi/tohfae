/**
 * Divider Component
 * Reusable divider/separator for sections, menus, lists, etc.
 * 
 * Usage:
 * <Divider />
 * <Divider orientation="vertical" />
 * <Divider spacing="lg" />
 */

"use client";
import React from 'react';
import { classNames } from '@/shared/utils/classNames';
import { DIVIDER_ORIENTATION, DIVIDER_SPACING, getDividerClass } from './divider.constant';

const Divider = ({ 
    orientation = DIVIDER_ORIENTATION.horizontal,
    spacing = DIVIDER_SPACING.md,
    className = "",
    ...props 
}) => {
    const dividerClass = getDividerClass({ orientation, spacing });
    
    return (
        <div
            className={classNames(dividerClass, className)}
            role="separator"
            aria-orientation={orientation}
            {...props}
        />
    );
};

export default Divider;

