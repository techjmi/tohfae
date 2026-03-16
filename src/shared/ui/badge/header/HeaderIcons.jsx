/**
 * HeaderIcons Component
 *
 * Reusable icon button with badge for header actions
 *
 * Features:
 * - Icon with badge (count)
 * - Click to navigate
 * - Visual feedback (hover, active states)
 * - Accessibility (aria-label)
 *
 * Usage:
 * <HeaderIcons name="cart" count={5} onClick={handleClick} label="Cart" />
 */

"use client";

import React from 'react';
import Button from '@/shared/ui/button/Button';
import { Icon } from '@/shared/icons';
import { Badge } from '@/shared/ui/badge';
import './headerIcons.css';

export const HeaderIcons = ({
    name,
    count = 0,
    onClick,
    label,
    size = 24,
    className = "",
    ...props
}) => {
    return (
        <Button
            onClick={onClick}
            variant="ghost"
            radius="full"
            className={`p-2 relative ${className}`}
            aria-label={label}
            {...props}
        >
            <Icon name={name} size={size} />
            {count > 0 && (
                <Badge
                    size="xs"
                    color="danger"
                    radius="full"
                    className="absolute -top-1 -right-1"
                >
                    {count}
                </Badge>
            )}
        </Button>
    );
};