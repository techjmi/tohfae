/**
 * DropdownDivider Component
 * Wrapper around shared Divider component with dropdown-specific defaults
 *
 * Usage:
 * <DropdownDivider />
 */

"use client";
import React from 'react';
import { Divider } from '@/shared/ui/divider';

const DropdownDivider = ({ spacing = "sm", ...props }) => {
    return <Divider spacing={spacing} {...props} />;
};

export default DropdownDivider;

