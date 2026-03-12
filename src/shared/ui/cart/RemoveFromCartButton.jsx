"use client";
import React from 'react';
import Button from '@/shared/ui/button/Button';
import { Icon } from '@/shared/icons';
import { useCart } from '@/shared/hooks/cart/useCart';

export const RemoveFromCartButton = ({
    productId,
    variantId = null,
    cartItemId = null,
    onSuccess,
    onError,
    showIcon = true,
    children = "Remove",
    variant = "outline",
    color = "danger",
    size = "sm",
    className = "",
    ...buttonProps
}) => {
    const { removeFromCart, isLoading } = useCart();

    const handleClick = async () => {
        const result = await removeFromCart({
            productId,
            variantId,
            cartItemId,
        });

        if (result.success) {
            // Pass backend message to success callback
            if (onSuccess) onSuccess(result.message);
        } else {
            if (onError) onError(result.error);
        }
    };

    return (
        <Button
            onClick={handleClick}
            loading={isLoading}
            disabled={isLoading}
            variant={variant}
            color={color}
            size={size}
            className={className}
            {...buttonProps}
        >
            {showIcon && !isLoading && <Icon name="trash" size={18} />}
            {children}
        </Button>
    );
};

export default RemoveFromCartButton;

