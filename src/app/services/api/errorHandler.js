/**
 * API Error Handler
 *
 * Centralized error handling for API calls
 *
 * Features:
 * - Maps HTTP status codes to error types
 * - Provides user-friendly error messages
 * - Handles network errors
 * - Handles validation errors
 *
 * Usage:
 * import { handleApiError } from '@/app/services/api/errorHandler';
 *
 * try {
 *   const response = await apiClient.get('/endpoint');
 * } catch (error) {
 *   const apiError = handleApiError(error);
 *   console.error(apiError.message);
 * }
 */
import { ERROR_TYPES, ERROR_MSG } from '@/app/services/services.constant';

export const handleApiError = (error) => {
    console.log('1234 error', error);
    // Network error (no response from server)
    if (!error?.response) {
        // Check if it's a timeout error
        if (error.code === 'ECONNABORTED') {
            return {
                type: ERROR_TYPES.TIMEOUT_ERROR,
                message: ERROR_MSG[ERROR_TYPES.TIMEOUT_ERROR],
                originalError: error,
            };
        }

        // General network error
        return {
            type: ERROR_TYPES.NETWORK_ERROR,
            message: ERROR_MSG[ERROR_TYPES.NETWORK_ERROR],
            originalError: error,
        };
    }

    // HTTP status code errors
    const { status, data } = error.response;
    console.log('1234 status', status, data);

    switch (status) {
        case 401:
            return {
                type: ERROR_TYPES.UNAUTHORIZED_ERROR,
                message: data?.message || ERROR_MSG[ERROR_TYPES.UNAUTHORIZED_ERROR],
                originalError: error,
            };

        case 403:
            return {
                type: ERROR_TYPES.FORBIDDEN_ERROR,
                message: data?.message || ERROR_MSG[ERROR_TYPES.FORBIDDEN_ERROR],
                originalError: error,
            };

        case 404:
            return {
                type: ERROR_TYPES.NOT_FOUND_ERROR,
                message: data?.message || ERROR_MSG[ERROR_TYPES.NOT_FOUND_ERROR],
                originalError: error,
            };

        case 409:
            return {
                type: ERROR_TYPES.CONFLICT_ERROR,
                message: data?.message || ERROR_MSG[ERROR_TYPES.CONFLICT_ERROR],
                originalError: error,
            };

        case 422:
            return {
                type: ERROR_TYPES.VALIDATION_ERROR,
                message: data?.message || ERROR_MSG[ERROR_TYPES.VALIDATION_ERROR],
                errors: data?.errors || {},
                originalError: error,
            };

        case 500:
        case 502:
        case 503:
        case 504:
            return {
                type: ERROR_TYPES.SERVER_ERROR,
                message: data?.message || ERROR_MSG[ERROR_TYPES.SERVER_ERROR],
                originalError: error,
            };

        default:
            return {
                type: ERROR_TYPES.UNKNOWN_ERROR,
                message: data?.message || ERROR_MSG[ERROR_TYPES.UNKNOWN_ERROR],
                originalError: error,
            };
    }
};
