/**
 * Form Helper Functions
 */
import { ERROR_MSG, REQUIRED_ERROR_MSG, INPUT_STATE } from './form.constant';

// ============================================
// VALIDATION HELPERS
// ============================================
/**
 * Validate email format
 * @param {string} email - Email to validate
 * @returns {boolean} - True if valid email
 */
export function isValidEmail(email) {
    if (!email) return false;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}
/**
 * Validate phone number format
 * @param {string} phone - Phone number to validate
 * @returns {boolean} - True if valid phone
 */
export function isValidPhone(phone) {
    if (!phone) return false;
    // Accepts formats: +1234567890, (123) 456-7890, 123-456-7890, etc.
    const phoneRegex = /^[\+]?[(]?[0-9]{1,4}[)]?[-\s\.]?[(]?[0-9]{1,4}[)]?[-\s\.]?[0-9]{1,9}$/;
    return phoneRegex.test(phone.replace(/\s/g, ''));
}

/**
 * Validate URL format
 * @param {string} url - URL to validate
 * @returns {boolean} - True if valid URL
 */
export function isValidUrl(url) {
    if (!url) return false;
    try {
        new URL(url);
        return true;
    } catch {
        return false;
    }
}

/**
 * Validate password strength
 * @param {string} password - Password to validate
 * @param {number} minLength - Minimum length (default: 8)
 * @returns {object} - { isValid: boolean, strength: string, message: string }
 */
export function validatePassword(password, minLength = 8) {
    if (!password) {
        return { isValid: false, strength: 'none', message: REQUIRED_ERROR_MSG };
    }

    if (password.length < minLength) {
        return {
            isValid: false,
            strength: 'weak',
            message: ERROR_MSG.MIN_LENGTH(minLength)
        };
    }

    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    const strengthScore = [hasUpperCase, hasLowerCase, hasNumbers, hasSpecialChar].filter(Boolean).length;

    if (strengthScore === 4) {
        return { isValid: true, strength: 'strong', message: 'Strong password' };
    } else if (strengthScore >= 2) {
        return { isValid: true, strength: 'medium', message: 'Medium strength password' };
    } else {
        return { isValid: false, strength: 'weak', message: 'Password is too weak' };
    }
}

/**
 * Generic input validation
 * @param {string} value - Value to validate
 * @param {string} type - Input type (email, tel, url, etc.)
 * @param {boolean} required - Is field required
 * @returns {string} - Error message or empty string if valid
 */
export function validateInput(value, type, required = false) {
    // Check required
    if (required && (!value || value.trim() === '')) {
        return REQUIRED_ERROR_MSG;
    }

    // If not required and empty, it's valid
    if (!value || value.trim() === '') {
        return '';
    }

    // Type-specific validation
    switch (type) {
        case 'email':
            return isValidEmail(value) ? '' : ERROR_MSG.INVALID_EMAIL;
        case 'tel':
            return isValidPhone(value) ? '' : ERROR_MSG.INVALID_PHONE;
        case 'url':
            return isValidUrl(value) ? '' : ERROR_MSG.INVALID_URL;
        default:
            return '';
    }
}

/**
 * Validate field with custom rules
 * @param {string} value - Value to validate
 * @param {object} rules - Validation rules { required, minLength, maxLength, pattern, custom }
 * @returns {string} - Error message or empty string if valid
 */
export function validateField(value, rules = {}) {
    const { required, minLength, maxLength, pattern, custom } = rules;

    // Required check
    if (required && (!value || value.trim() === '')) {
        return REQUIRED_ERROR_MSG;
    }

    // If not required and empty, skip other validations
    if (!value || value.trim() === '') {
        return '';
    }

    // Min length check
    if (minLength && value.length < minLength) {
        return ERROR_MSG.MIN_LENGTH(minLength);
    }

    // Max length check
    if (maxLength && value.length > maxLength) {
        return ERROR_MSG.MAX_LENGTH(maxLength);
    }

    // Pattern check
    if (pattern && !pattern.test(value)) {
        return ERROR_MSG.PATTERN_MISMATCH;
    }

    // Custom validation function
    if (custom && typeof custom === 'function') {
        return custom(value) || '';
    }

    return '';
}

// ============================================
// FORMATTING HELPERS
// ============================================

/**
 * Format phone number
 * @param {string} phone - Phone number to format
 * @returns {string} - Formatted phone number
 */
export function formatPhoneNumber(phone) {
    if (!phone) return '';
    const cleaned = phone.replace(/\D/g, '');

    if (cleaned.length === 10) {
        return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
    }

    return phone;
}
