"use client";
import React from 'react';
import { classNames } from '@/shared/utils/classNames';
import { dropdownHeaderStyles } from './dropdown.style';

const DropdownHeader = ({ data, children, className = "" }) => {
    if (children) {
        return (
            <div className={classNames(dropdownHeaderStyles.base, className)}>
                {children}
            </div>
        );
    }

    if (!data) return null;

    if (React.isValidElement(data)) {
        return data;
    }

    if (typeof data === 'object') {
        return (
            <div className="px-4 py-3 border-b border-gray-200 bg-gray-50">
                {data.title && (
                    <p className="text-sm font-semibold text-gray-900">
                        {data.title}
                    </p>
                )}
                {data.subtitle && (
                    <p className="text-xs text-gray-500 mt-0.5">
                        {data.subtitle}
                    </p>
                )}
                {data.content}
            </div>
        );
    }

    return (
        <div className={classNames(dropdownHeaderStyles.base, className)}>
            {data}
        </div>
    );
};

export default DropdownHeader;

