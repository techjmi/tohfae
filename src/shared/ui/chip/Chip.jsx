/**
 * Chip Component
 * 
 * Reusable chip component for filter and tag display
 * 
 * Features:
 * - Clickable with optional onClick handler
 * - Closable with optional onClose handler
 * - Customizable size, variant, and color
 * 
 * Usage:
 * <Chip label="T-Shirts" value="tshirt" onClick={handleClick} />
 */
"use client";
import React from 'react';
import { classNames } from '@/shared/utils/classNames';
import { CHIP_SIZE, CHIP_VARIANT, CHIP_COLOR } from './chip.constant';
import { Badge } from '../badge';
import { Icon } from '@/shared/icons';
const Chip=({
    label,
    value,
    size = CHIP_SIZE.MD,
    variant = CHIP_VARIANT.SOLID,
    color = CHIP_COLOR.NEUTRAL,
    onClick,
    onClose,
    className = "",
    ...props
})=>{
return(
    <>
    <Badge size={size} variant={variant} color={color} className={classNames("flex items-center gap-1.5", className)} onClick={onClick}>
        <span>{label}</span>
        {onClose && <Icon name="close" size={16} className="cursor-pointer" onClick={onClose} />}
    </Badge>
    </>
)
}
export default Chip;