"use client";
import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import Button from '@/shared/ui/button/Button';
import { Icon } from '@/shared/icons';
import { useCart } from '@/shared/hooks/cart/useCart';
import { selectIsInCart, selectItemQuantity } from '@/redux/slice/cartSlice';

export const AddToCartButton = ({
    productId,
    variantId = null,
    quantity = 1,
    customization = null,
    mode = "default",
    showGoToCart = true,
    onSuccess,
    onError,
    onQuantityChange,
    renderWhenInCart,
    renderQuantitySelector,
    children = "Add to Cart",
    goToCartText = "Go to Cart",
    showIcon = true,
    variant = "solid",
    color = "primary",
    size = "md",
    className = "",
    minQuantity = 1,
    maxQuantity = 5,
    showQuantityInput = false,
    ...buttonProps
}) => {
    const router = useRouter();
    const { addToCart, updateQuantity, removeFromCart, isLoading } = useCart();
    const isInCart = useSelector(selectIsInCart(productId, variantId));
    const currentQuantity = useSelector(selectItemQuantity(productId, variantId));

    const handleAddToCart = async (e) => {
        e.stopPropagation();
        e.preventDefault();
        const result = await addToCart({ productId, variantId, quantity, customization });
        if (result.success) {
            if (onSuccess) onSuccess();
        } else {
            if (onError) onError(result.error);
        }
    };

    const handleGoToCart = () => {
        router.push('/cart');
    };

    const handleIncrement = async () => {
        const newQuantity = currentQuantity + 1;
        if (newQuantity > maxQuantity) return;

        const result = await updateQuantity({ productId, variantId, quantity: newQuantity });
        if (result.success) {
            if (onQuantityChange) onQuantityChange(newQuantity);
        } else {
            if (onError) onError(result.error);
        }
    };

    const handleDecrement = async () => {
        const newQuantity = currentQuantity - 1;

        if (newQuantity < minQuantity) {
            const result = await removeFromCart({ productId, variantId });
            if (result.success && onQuantityChange) onQuantityChange(0);
            return;
        }

        const result = await updateQuantity({ productId, variantId, quantity: newQuantity });
        if (result.success) {
            if (onQuantityChange) onQuantityChange(newQuantity);
        } else {
            if (onError) onError(result.error);
        }
    };


    if (isInCart && renderWhenInCart) {
        return renderWhenInCart(currentQuantity);
    }

    if (mode === "quantity-selector" && isInCart) {
        if (renderQuantitySelector) {
            return renderQuantitySelector({
                quantity: currentQuantity,
                onIncrement: handleIncrement,
                onDecrement: handleDecrement,
                isLoading,
            });
        }

        return (
            <div className="flex items-center gap-2">
                <Button
                    onClick={handleDecrement}
                    variant="outline"
                    color="secondary"
                    size="sm"
                    className="h-8 w-8 p-0 min-w-0"
                    disabled={isLoading}
                >
                    <Icon name="minus" size={16} />
                </Button>
                {showQuantityInput ? (
                    <input
                        type="number"
                        value={currentQuantity}
                        onChange={(e) => {
                            const val = parseInt(e.target.value) || minQuantity;
                            updateQuantity({ productId, variantId, quantity: val });
                        }}
                        className="w-16 text-center border rounded px-2 py-1"
                        min={minQuantity}
                        max={maxQuantity}
                    />
                ) : (
                    <span className="w-8 text-center font-medium">{currentQuantity}</span>
                )}
                <Button
                    onClick={handleIncrement}
                    variant="outline"
                    color="secondary"
                    size="sm"
                    className="h-8 w-8 p-0 min-w-0"
                    disabled={isLoading || currentQuantity >= maxQuantity}
                >
                    <Icon name="plus" size={16} />
                </Button>
            </div>
        );
    }

    if (isInCart && showGoToCart) {
        return (
            <Button
                onClick={handleGoToCart}
                variant="outline"
                color="secondary"
                size={size}
                className={className}
                {...buttonProps}
            >
                {showIcon && <Icon name="cart" size={20} />}
                {goToCartText}
            </Button>
        );
    }

    return (
        <Button
            onClick={handleAddToCart}
            disabled={isLoading}
            variant={variant}
            color={color}
            size={size}
            className={className}
            {...buttonProps}
        >
            {showIcon && !isLoading && <Icon name="cart" size={20} />}
            {isLoading ? "Adding..." : children}
        </Button>
    );
};

export default AddToCartButton;