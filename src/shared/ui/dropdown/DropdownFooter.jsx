"use client";
import React from 'react';
import DropdownItem from './DropdownItem';

const DropdownFooter = ({ data, onClose, children, className = "" }) => {
    if (children) {
        return children;
    }

    if (!data) return null;

    if (React.isValidElement(data)) {
        return data;
    }

    if (typeof data === 'object') {
        return (
            <DropdownItem
                href={data.href}
                onClick={data.onClick ? () => {
                    data.onClick();
                    if (data.closeOnClick !== false) onClose?.();
                } : undefined}
                danger={data.danger}
                className={className}
            >
                {data.label}
            </DropdownItem>
        );
    }

    return <div className="px-4 py-2 text-sm text-gray-500">
        {data}
        {children}
    </div>;
};

export default DropdownFooter;

