/**
 * ShowIcons Component
 *
 * Reusable icon component for all form fields (Input, Select, Textarea, etc.)
 * Handles both string icon names and React components
 * Automatically adjusts size and color based on field state
 *
 * @param {string|ReactNode} icon - Icon name (string) or React component
 * @param {string} position - Icon position ('prefix' or 'suffix')
 * @param {string} size - Field size (sm, md, lg, xl)
 * @param {string} state - Field state (default, error, success, warning, disabled, readonly)
 * @param {string} className - Additional CSS classes
 */

"use client";
import { Icon } from '@/shared/icons';
import { INPUT_SIZE, INPUT_STATE } from '@/shared/ui/from/form.constant';
import { getIconWrapperClasses } from '@/shared/ui/from/form.style';

export default function ShowIcons({
    icon,
    position = 'prefix',
    size = INPUT_SIZE.MD,
    state = INPUT_STATE.DEFAULT,
    className = ""
}) {
    // If no icon, return null
    if (!icon) return null;

    // Get wrapper classes from helper function
    const iconWrapperClasses = getIconWrapperClasses(position, size);

    // Determine icon color based on state
    const getIconColor = () => {
        switch (state) {
            case INPUT_STATE.ERROR:
                return "text-red-500";
            case INPUT_STATE.SUCCESS:
                return "text-green-500";
            case INPUT_STATE.WARNING:
                return "text-yellow-500";
            case INPUT_STATE.DISABLED:
                return "text-gray-300";
            case INPUT_STATE.READONLY:
                return "text-gray-400";
            default:
                return "text-gray-400";
        }
    };

    // Determine icon size based on field size
    const getIconSize = () => {
        switch (size) {
            case INPUT_SIZE.SM:
                return 16;
            case INPUT_SIZE.LG:
            case INPUT_SIZE.XL:
                return 20;
            default:
                return 18;
        }
    };

    const iconColor = getIconColor();
    const iconSize = getIconSize();

    return (
        <div className={`${iconWrapperClasses} ${className}`}>
            {typeof icon === 'string' ? (
                <Icon name={icon} className={iconColor} size={iconSize} />
            ) : (
                <span className={iconColor}>{icon}</span>
            )}
        </div>
    );
}