/**
 * Banner Component
 *
 * Displays promotional, informational, and marketing banners
 * Uses Card component composition (CardHeader, CardBody, CardFooter)
 *
 * Features:
 * - Full Card composition pattern
 * - CardHeader for title and close button
 * - CardBody for image and description
 * - CardFooter for CTA buttons
 * - Custom background and text colors
 *
 * @param {Object} banner - Banner data from banner contract
 * @param {boolean} showImage - Show/hide image
 * @param {boolean} showHeader - Show/hide header with title
 * @param {boolean} closeable - Show close button in header
 * @param {function} onClose - Close handler
 * @param {string} className - Additional CSS classes
 */

"use client";
import React, { useState } from 'react';
import { Card, CardHeader, CardBody, CardFooter } from '@/shared/ui/card';
import Button from '@/shared/ui/button/Button';
import { buildBannerCTAUrl } from '@/contract/banner.contract';
import { classNames } from '@/shared/utils/classNames';

export default function Banner({
    banner,
    showImage = true,
    showHeader = false,
    closeable = false,
    onClose,
    className,
}) {
    const [isVisible, setIsVisible] = useState(true);

    if (!banner || !isVisible) return null;

    const handleClose = () => {
        setIsVisible(false);
        if (onClose) onClose();
    };

    const { content, cta } = banner;
    const ctaUrl = cta?.enabled ? buildBannerCTAUrl(cta) : null;

    return (
        <Card
            className={classNames(className)}
            shadow="md"
            hoverable={!!ctaUrl && !cta?.enabled}
            style={{
                backgroundColor: content.backgroundColor || undefined,
                color: content.textColor || undefined,
            }}
        >
            {/* CardHeader - Optional */}
            {showHeader && (
                <CardHeader
                    title={banner.title || content.heading}
                    subtitle={banner.type ? `${banner.type} banner` : undefined}
                    onClose={closeable ? handleClose : undefined}
                />
            )}

            {/* CardBody - Main Content */}
            <CardBody padding={false}>
                <div className="flex flex-col md:flex-row gap-4 md:gap-6 p-4 md:p-6">
                    {/* Image */}
                    {showImage && content.image && (
                        <div className="shrink-0 w-full md:w-1/3">
                            <img
                                src={content.image.desktop}
                                alt={content.image.alt || content.heading}
                                className="w-full h-48 md:h-full object-cover rounded-md"
                            />
                        </div>
                    )}

                    {/* Content */}
                    <div className="flex-1 flex flex-col justify-center">
                        {/* Heading - Only show if no header */}
                        {!showHeader && content.heading && (
                            <h3
                                className="text-xl md:text-2xl font-bold"
                                style={{ color: content.textColor || undefined }}
                            >
                                {content.heading}
                            </h3>
                        )}

                        {/* Subheading */}
                        {content.subheading && (
                            <p
                                className={classNames(
                                    "text-base md:text-lg",
                                    !showHeader && content.heading && "mt-1"
                                )}
                                style={{ color: content.textColor || undefined }}
                            >
                                {content.subheading}
                            </p>
                        )}

                        {/* Description */}
                        {content.description && (
                            <p
                                className="text-sm md:text-base mt-2 opacity-90"
                                style={{ color: content.textColor || undefined }}
                            >
                                {content.description}
                            </p>
                        )}
                    </div>
                </div>
            </CardBody>

            {/* CardFooter - CTA Buttons */}
            {cta?.enabled && ctaUrl && (
                <CardFooter align="left">
                    <Button
                        as="a"
                        href={ctaUrl}
                        variant={cta.variant || "solid"}
                        color={cta.color || "primary"}
                        size="md"
                        target={cta.openInNewTab ? "_blank" : undefined}
                        rel={cta.openInNewTab ? "noopener noreferrer" : undefined}
                    >
                        {cta.text}
                    </Button>
                </CardFooter>
            )}
        </Card>
    );
}

