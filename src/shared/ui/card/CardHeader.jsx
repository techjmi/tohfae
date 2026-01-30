import React from "react";
import { Icon } from "@/shared/icons";
import { classNames } from "@/shared/utils/classNames";

const CardHeader = ({
  title,
  subtitle,
  actions,
  onClose,
  icon = "x", // default cross icon name
  children,
  className = "",
  cardHeaderProps = {},
}) => {
  // If children are provided → full custom header
  if (children) {
    return (
      <div
        className={classNames(
          "flex items-center justify-between px-4 py-3 border-b",
          className
        )}
        {...cardHeaderProps}
      >
        {children}
      </div>
    );
  }

  return (
    <div
      className={classNames(
        "flex items-start justify-between gap-3 px-4 py-3 border-b",
        className
      )}
      {...cardHeaderProps}
    >
      {/* Left: Title + Subtitle */}
      <div className="min-w-0">
        {title && (
          <h3 className="text-sm font-semibold text-foreground truncate">
            {title}
          </h3>
        )}

        {subtitle && (
          <p className="mt-0.5 text-xs text-muted-foreground truncate">
            {subtitle}
          </p>
        )}
      </div>

      {/* Right: Actions / Close */}
      {/* <div className="flex items-center gap-2 shrink-0">
        {actions}

        {onClose && (
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="rounded-md p-1 text-muted-foreground hover:bg-muted hover:text-foreground transition"
          >
            <Icon name={icon} size={18} />
          </button>
        )}
      </div> */}
    </div>
  );
};

export default CardHeader;
