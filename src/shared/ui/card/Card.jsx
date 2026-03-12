/**
 * @component Card
 *
 * Hybrid card component supporting both data-driven and composition patterns
 */
"use client";
import React from "react";
import {
  CARD_RADIUS,
  CARD_SHADOW,
  CARD_PADDING,
  CARD_BACKGROUND,
  CARD_BORDER,
} from "./cardConstant";
import { classNames } from "@/shared/utils/classNames";
import { getResponsiveImage } from "./Card.helpers";

import CardImage from "./components/CardImage";
import CardHeader from "./components/CardHeader";
import CardBody from "./components/CardBody";
import CardFooter from "./components/CardFooter";

const Card = ({
  data,
  variant = "default",
  image,
  header,
  body,
  footer,
  className = "",
  radius = "md",
  shadow = "sm",
  padding = "md",
  background = "default",
  border = "default",
  hoverable = false,
  clickable = false,
  onClick,
  children,
  as: Component = "div",
  ...cardProps
}) => {
  const isInteractive = hoverable || clickable;

  if (children) {
    return (
      <Component
        className={classNames(
          "relative",
          CARD_RADIUS[radius],
          CARD_SHADOW[shadow],
          CARD_PADDING[padding],
          CARD_BACKGROUND[background],
          CARD_BORDER[border],
          isInteractive &&
            "transition-shadow cursor-pointer hover:scale-[1.02]",
          className
        )}
        onClick={clickable ? onClick : undefined}
        {...cardProps}
      >
        {children}
      </Component>
    );
  }

  const renderImage = () => {
    if (image === false) return null;
    if (React.isValidElement(image)) return image;
    if (image === true && data?.image) {
      return (
        <CardImage
          src={getResponsiveImage(data.image)}
          alt={data.title || data.heading || ''}
          badges={data.badges}
          overlay={data.overlay}
          overlayOpacity={data.overlayOpacity}
          wishlist={data.wishlist}
          isWishlisted={data.isWishlisted}
          onWishlistClick={data.onWishlistClick}
          aspectRatio={data.aspectRatio}
        />
      );
    }
    return null;
  };

  const renderHeader = () => {
    if (header === false) return null;
    if (React.isValidElement(header)) return header;
    if (header === true && data) {
      return (
        <CardHeader
          title={data.title || data.heading}
          subtitle={data.subtitle || data.subheading || data.category}
          badge={data.badge}
          titleClassName={data.titleClassName}
          subtitleClassName={data.subtitleClassName}
        />
      );
    }
    return null;
  };

  const renderBody = () => {
    if (body === false) return null;
    if (React.isValidElement(body)) return body;
    if (body === true && data?.description) {
      return (
        <CardBody description={data.description} />
      );
    }
    return null;
  };

  const renderFooter = () => {
    if (footer === false) return null;
    if (React.isValidElement(footer)) return footer;
    if (footer === true && data) {
      return (
        <CardFooter data={data} variant={variant} />
      );
    }
    return null;
  };

  return (
    <Component
      className={classNames(
        "relative overflow-hidden",
        CARD_RADIUS[radius],
        CARD_SHADOW[shadow],
        CARD_BACKGROUND[background],
        CARD_BORDER[border],
        isInteractive &&
          "transition-all cursor-pointer hover:shadow-lg hover:scale-[1.02]",
        className
      )}
      onClick={clickable ? onClick : undefined}
      {...cardProps}
    >
      {renderImage()}
      <div className={classNames(CARD_PADDING[padding], "flex flex-col gap-3")}>
        {renderHeader()}
        {renderBody()}
        {renderFooter()}
      </div>
    </Component>
  );
};

export default Card;
