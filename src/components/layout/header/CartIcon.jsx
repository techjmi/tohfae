"use client";
import { useRouter } from 'next/navigation';
import Button from '@/shared/ui/button/Button';
import { Badge } from '@/shared/ui/badge';
import { Icon } from '@/shared/icons';
import { classNames } from '@/shared/utils/classNames';
import { Navigation_Url } from '@/shared/constant/global-constant';

const CartIcon = ({
    itemCount = 0,
    onClick,
    showBadge = true,
    size = 24,
    className = "",
    iconClassName = "",
    badgeClassName = "",
    ...props
}) => {
    const router = useRouter();

    const handleClick = (e) => {
        if (onClick) {
            onClick(e);
        } else {
            router.push(Navigation_Url.CART);
        }
    };

    const displayCount = itemCount > 99 ? '99+' : itemCount;

    return (
        <Button
            onClick={handleClick}
            variant="ghost"
            radius="full"
            className={classNames(
                "relative p-2",
                className
            )}
            aria-label={`Shopping cart with ${itemCount} items`}
            {...props}
        >
            <Icon
                name="cart"
                size={size}
                className={classNames(
                    "text-gray-700 dark:text-gray-300",
                    iconClassName
                )}
            />

            {showBadge && itemCount > 0 && (
                <Badge
                    size="xs"
                    color="danger"
                    radius="full"
                    className={classNames(
                        "absolute -top-1 -right-1",
                        "min-w-5 h-5",
                        "flex items-center justify-center",
                        "text-xs font-semibold",
                        "animate-in zoom-in-50 duration-200",
                        badgeClassName
                    )}
                >
                    {displayCount}
                </Badge>
            )}
        </Button>
    );
};

export default CartIcon;
