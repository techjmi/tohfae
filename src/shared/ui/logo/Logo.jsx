"use client";
import Link from 'next/link';
import Image from 'next/image';
import { LOGO, LOGO_SIZE, LOGO_VARIANT } from './logo.constant';
import { classNames } from '@/shared/utils/classNames';
import { Navigation_Url } from '@/shared/constant/global-constant';

const getSizeClasses = (size) => {
    const sizes = {
        [LOGO_SIZE.XS]: {
            dimension: 24,
            text: "text-sm",
            container: "gap-1.5",
        },
        [LOGO_SIZE.SM]: {
            dimension: 32,
            text: "text-base",
            container: "gap-2",
        },
        [LOGO_SIZE.MD]: {
            dimension: 40,
            text: "text-lg",
            container: "gap-2",
        },
        [LOGO_SIZE.LG]: {
            dimension: 48,
            text: "text-xl",
            container: "gap-3",
        },
        [LOGO_SIZE.XL]: {
            dimension: 64,
            text: "text-2xl",
            container: "gap-3",
        },
    };
    return sizes[size] || sizes[LOGO_SIZE.MD];
};

const Logo = ({
    size = LOGO_SIZE.MD,
    variant = LOGO_VARIANT.FULL,
    href = Navigation_Url.HOME,
    showTagline = false,
    className = "",
    imageClassName = "",
    textClassName = "",
    as = "link",
    onClick,
    ...props
}) => {
    const sizeClasses = getSizeClasses(size);

    const logoImage = (
        <Image
            src={LOGO.light}
            alt={LOGO.altText}
            width={sizeClasses.dimension}
            height={sizeClasses.dimension}
            className={classNames(
                "object-contain",
                imageClassName
            )}
            priority
        />
    );

    const logoText = (
        <div className="flex flex-col">
            <span className={classNames(
                sizeClasses.text,
                "font-bold text-gray-900 dark:text-white",
                textClassName
            )}>
                {LOGO.text}
            </span>
            {showTagline && (
                <span className="text-xs text-gray-500 dark:text-gray-400">
                    {LOGO.tagline}
                </span>
            )}
        </div>
    );

    const content = (
        <>
            {variant !== LOGO_VARIANT.TEXT_ONLY && logoImage}
            {variant !== LOGO_VARIANT.ICON_ONLY && logoText}
        </>
    );

    const containerClasses = classNames(
        "inline-flex items-center",
        sizeClasses.container,
        className
    );

    if (as === "div") {
        return (
            <div className={containerClasses} onClick={onClick} {...props}>
                {content}
            </div>
        );
    }

    return (
        <Link
            href={href}
            className={containerClasses}
            onClick={onClick}
            {...props}
        >
            {content}
        </Link>
    );
};

export default Logo;

