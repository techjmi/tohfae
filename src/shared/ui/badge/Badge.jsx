// Reusable Badge utility component (no external deps)
import React from "react";
import { classNames } from "@/shared/utils/classNames";
import { getBadgeClasses } from "./badge.style";

const Badge = ({
    size = "md",
  radius = "md",
  color = "neutral",
  className,
  children,
  ...rest
}) => {
  const badgeClasses = getBadgeClasses({ size, radius, color });
  return (
    <span className={classNames(badgeClasses, className)} {...rest}>
      {children}
    </span>
  );
};

export default Badge;
