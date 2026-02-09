/**
 * DropdownHeader Component
 * Header/title for dropdown menu sections
 * Usage:
 * <DropdownHeader>Account Settings</DropdownHeader>
 */
"use client";
import React from 'react';
import { classNames } from '@/shared/utils/classNames';
import { dropdownHeaderStyles } from './dropdown.style';

const DropdownHeader = ({ children, className = "" }) => {
    return (
        <div
            className={classNames(dropdownHeaderStyles.base, className)}
            role="heading"
        >
            {children}
        </div>
    );
};

export default DropdownHeader;

