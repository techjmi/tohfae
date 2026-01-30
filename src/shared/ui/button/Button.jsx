"use client";
// Reusable Button with variant/size/color and optional navigation
import React from "react";
import { classNames } from "@/shared/utils/classNames";
import { SIZE, RADIUS, COLOR } from "./buttonConstant";

const getClasses = ({ variant, color }) => {
  const colorMap = COLOR[color];
  return colorMap[variant];
};

const Button = ({
  as: As = "button",
  href,
  label,
  children,
  size = "md",
  radius = "md",
  color = "neutral",
  variant = "outline",
  fullWidth = false,
  disabled = false,
  className,
  ...rest
}) => {
  const base =
    "inline-flex items-center justify-center whitespace-nowrap select-none transition-colors cursor-pointer";

  const sizeCls =  SIZE[size] || SIZE.md;
  const radiusCls = RADIUS[radius] || RADIUS.md;
  const colorCls = getClasses({ variant, color });
  const widthCls = fullWidth ? "w-full" : "";
  const disabledCls = disabled ? "opacity-60 pointer-events-none" : "";

  const heightCls =
    size === "xs" || size === "sm"
      ? "btn--sm"
      : size === "lg"
      ? "btn--lg"
      : "";

  const defaultHeightCls = !heightCls ? "h-[var(--control-h)]" : "";

  const content = children ?? label;

  if (As === "a") {
    return (
      <a
        href={href}
        className={classNames(
          base,
          sizeCls,
          radiusCls,
          colorCls,
          widthCls,
          disabledCls,
          heightCls,
          defaultHeightCls,
          className
        )}
        aria-disabled={disabled}
        {...rest}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      type={rest.type || "button"}
      disabled={disabled}
      className={classNames(
        base,
        sizeCls,
        radiusCls,
        colorCls,
        widthCls,
        disabledCls,
        heightCls,
        defaultHeightCls,
        className
      )}
      {...rest}
    >
      {content}
    </button>
  );
};

export default Button;
