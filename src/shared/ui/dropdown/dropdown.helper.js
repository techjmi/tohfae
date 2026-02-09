/**
 * Dropdown Helper Functions
 *
 * Utility functions for dropdown components
 */

/**
 * Calculate dropdown position based on trigger element
 * @param {HTMLElement} triggerElement - The element that triggers the dropdown
 * @returns {object} Position styles
 */
export const calculateDropdownPosition = (triggerElement) => {
    if (!triggerElement) return {};

    const rect = triggerElement.getBoundingClientRect();
    const viewportHeight = window.innerHeight;
    const viewportWidth = window.innerWidth;

    // Check if dropdown would overflow viewport
    const hasSpaceBelow = rect.bottom + 200 < viewportHeight;
    const hasSpaceAbove = rect.top - 200 > 0;
    const hasSpaceRight = rect.right + 200 < viewportWidth;
    const hasSpaceLeft = rect.left - 200 > 0;

    return {
        hasSpaceBelow,
        hasSpaceAbove,
        hasSpaceRight,
        hasSpaceLeft,
    };
};

/**
 * Get auto-adjusted position based on available space
 * @param {HTMLElement} triggerElement - The element that triggers the dropdown
 * @param {string} preferredPosition - Preferred position
 * @returns {string} Adjusted position
 */
export const getAutoPosition = (triggerElement, preferredPosition) => {
    const space = calculateDropdownPosition(triggerElement, preferredPosition);

    // Auto-adjust based on available space
    if (preferredPosition.includes('bottom') && !space.hasSpaceBelow && space.hasSpaceAbove) {
        return preferredPosition.replace('bottom', 'top');
    }

    if (preferredPosition.includes('top') && !space.hasSpaceAbove && space.hasSpaceBelow) {
        return preferredPosition.replace('top', 'bottom');
    }

    if (preferredPosition.includes('right') && !space.hasSpaceRight && space.hasSpaceLeft) {
        return preferredPosition.replace('right', 'left');
    }

    if (preferredPosition.includes('left') && !space.hasSpaceLeft && space.hasSpaceRight) {
        return preferredPosition.replace('left', 'right');
    }

    return preferredPosition;
};

/**
 * Check if click is outside element
 * @param {Event} event - Click event
 * @param {HTMLElement} element - Element to check
 * @returns {boolean} True if click is outside
 */
export const isClickOutside = (event, element) => {
    if (!element) return true;
    return !element.contains(event.target);
};

/**
 * Handle keyboard navigation in dropdown
 * @param {Event} event - Keyboard event
 * @param {Array} items - Dropdown items
 * @param {number} currentIndex - Current focused index
 * @returns {number} New focused index
 */
export const handleKeyboardNavigation = (event, items, currentIndex) => {
    const key = event.key;

    if (key === 'ArrowDown') {
        event.preventDefault();
        return Math.min(currentIndex + 1, items.length - 1);
    }

    if (key === 'ArrowUp') {
        event.preventDefault();
        return Math.max(currentIndex - 1, 0);
    }

    if (key === 'Home') {
        event.preventDefault();
        return 0;
    }

    if (key === 'End') {
        event.preventDefault();
        return items.length - 1;
    }

    return currentIndex;
};

/**
 * Filter dropdown items based on search query
 * @param {Array} items - Dropdown items
 * @param {string} query - Search query
 * @returns {Array} Filtered items
 */
export const filterDropdownItems = (items, query) => {
    if (!query) return items;

    const lowerQuery = query.toLowerCase();
    return items.filter(item => {
        if (item.type === 'divider') return true;
        return item.label?.toLowerCase().includes(lowerQuery);
    });
};

/**
 * Get dropdown z-index based on nesting level
 * @param {number} level - Nesting level
 * @returns {number} Z-index value
 */
export const getDropdownZIndex = (level = 0) => {
    return 1000 + (level * 10);
};
