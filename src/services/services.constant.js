//this is the services constant file for this web project
export const ERROR_TYPES = {
    NETWORK_ERROR: 'NETWORK_ERROR',
    TIMEOUT_ERROR: 'TIMEOUT_ERROR',
    UNKNOWN_ERROR: 'UNKNOWN_ERROR',
    VALIDATION_ERROR: 'VALIDATION_ERROR',
    UNAUTHORIZED_ERROR: 'UNAUTHORIZED_ERROR',
    FORBIDDEN_ERROR: 'FORBIDDEN_ERROR',
    NOT_FOUND_ERROR: 'NOT_FOUND_ERROR',
    CONFLICT_ERROR: 'CONFLICT_ERROR',
    SERVER_ERROR: 'SERVER_ERROR',
}

//error msg
export const ERROR_MSG = {
    [ERROR_TYPES.NETWORK_ERROR]: 'Network error. Please check your internet connection.',
    [ERROR_TYPES.TIMEOUT_ERROR]: 'Request timed out. Please try again.',
    [ERROR_TYPES.UNKNOWN_ERROR]: 'Something went wrong. Please try again.',
    [ERROR_TYPES.VALIDATION_ERROR]: 'Validation error. Please check your input.',
    [ERROR_TYPES.UNAUTHORIZED_ERROR]: 'You are not authorized to perform this action.',
    [ERROR_TYPES.FORBIDDEN_ERROR]: 'You are not allowed to access this resource.',
    [ERROR_TYPES.NOT_FOUND_ERROR]: 'The requested resource was not found.',
    [ERROR_TYPES.CONFLICT_ERROR]: 'The requested resource already exists.',
    [ERROR_TYPES.SERVER_ERROR]: 'Something went wrong on our end. Please try again later.',
}
 