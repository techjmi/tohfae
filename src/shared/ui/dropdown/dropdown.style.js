/**
 * Dropdown Styles
 *
 * Custom styles and CSS-in-JS for dropdown components
 */

/**
 * Base dropdown container styles
 */
export const dropdownContainerStyles = {
    base: "absolute z-50 rounded-md overflow-hidden",
    animated: "transition-all duration-200 ease-out",
};

/**
 * Dropdown menu item styles
 */
export const dropdownItemStyles = {
    base: "px-4 py-2 text-sm cursor-pointer transition-colors duration-150",
    hover: "hover:bg-gray-100",
    active: "active:bg-gray-200",
    disabled: "opacity-50 cursor-not-allowed pointer-events-none",
    selected: "bg-blue-50 text-blue-700",
    danger: "text-red-600 hover:bg-red-50",
};

/**
 * Dropdown header styles
 */
export const dropdownHeaderStyles = {
    base: "px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider",
};

/**
 * Dropdown search input styles
 */
export const dropdownSearchStyles = {
    container: "px-3 py-2 border-b border-gray-200",
    input: "w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500",
};

/**
 * Dropdown scrollable content styles
 */
export const dropdownScrollStyles = {
    container: "max-h-[500px] overflow-y-auto overflow-x-hidden",
    scrollbar: "scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100",
};

/**
 * Get combined dropdown item classes
 */
export const getDropdownItemClass = (options = {}) => {
    const { hover = true, disabled = false, selected = false, danger = false } = options;

    let classes = dropdownItemStyles.base;

    if (hover && !disabled) {
        classes += ` ${dropdownItemStyles.hover} ${dropdownItemStyles.active}`;
    }

    if (disabled) {
        classes += ` ${dropdownItemStyles.disabled}`;
    }

    if (selected) {
        classes += ` ${dropdownItemStyles.selected}`;
    }

    if (danger) {
        classes += ` ${dropdownItemStyles.danger}`;
    }

    return classes;
};