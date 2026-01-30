"use client"; // for useEffect to work on the client side
import React from "react";
import {
  CARD_RADIUS,
  CARD_SHADOW,
  CARD_PADDING,
  CARD_BACKGROUND,
  CARD_BORDER,
} from "./cardConstant";
import { classNames } from "@/shared/utils/classNames";

const Card = ({
  children,
  className = "",
  radius = "md",
  shadow = "sm",
  padding = "md",
  background = "default",
  border = "default",
  hoverable = false,
  clickable = false,
  onClick,
  as: Component = "div",
  ...cardProps
}) => {
  const isInteractive = hoverable || clickable;

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
          "transition-shadow cursor-pointer hover:shadow-md",
        className
      )}
      onClick={clickable ? onClick : undefined}
      {...cardProps}
    >
      {children}
    </Component>
  );
};

export default Card;
