/**
 * API Interceptors
 *
 * Axios interceptors for API requests and responses
 *
 * Features:
 * - Request interceptor for adding headers
 * - Response interceptor for error handling
 * - Retry logic for failed requests
 * - Refresh token logic for authentication
 *
 * Usage:
 * import { apiClient } from '@/app/services/api/client';
 * apiClient.get('/endpoint').then(...).catch(...);
 */
import { API_CONFIG } from "./config";
import { ENDPOINT } from "./endpoint";

// Request interceptor
export const requestInterceptor = (config) => {
    // Add auth token if available (from localStorage, not hook)
    if (typeof window !== 'undefined') {
        const token = localStorage.getItem('auth_token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
    }

    // Add default headers
    config.headers = {
        ...API_CONFIG.HEADERS,
        ...config.headers,
    };

    // Log request in development
    if (API_CONFIG.ENABLE_LOGGING) {
        console.log('📤 API Request:', {
            method: config.method?.toUpperCase(),
            url: config.url,
            params: config.params,
            data: config.data,
        });
    }

    return config;
};

// Request error interceptor
export const requestErrorInterceptor = (error) => {
    if (API_CONFIG.ENABLE_LOGGING) {
        console.error('❌ Request Error:', error.message);
    }
    return Promise.reject(error);
};

// Response interceptor
export const responseInterceptor = (response) => {
    // Log response in development
    if (API_CONFIG.ENABLE_LOGGING) {
        console.log('📥 API Response:', {
            status: response.status,
            url: response.config.url,
            data: response.data,
        });
    }

    return response;
};

// Response error interceptor
export const responseErrorInterceptor = async (error) => {
    const originalRequest = error.config;

    // Handle 401 error - Refresh token
    if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;

        // Check if it's not the login endpoint
        if (originalRequest.url !== ENDPOINT.AUTH.SIGN_IN) {
            try {
                // Get refresh token from localStorage
                const refreshToken = typeof window !== 'undefined'
                    ? localStorage.getItem('refresh_token')
                    : null;

                if (refreshToken) {
                    // TODO: Implement refresh token logic
                    // const { data } = await axios.post(ENDPOINT.AUTH.REFRESH, { refreshToken });
                    // localStorage.setItem('auth_token', data.token);
                    // originalRequest.headers.Authorization = `Bearer ${data.token}`;
                    // return axios(originalRequest);
                }
            } catch (refreshError) {
                // Refresh failed, clear tokens and redirect to login
                if (typeof window !== 'undefined') {
                    localStorage.removeItem('auth_token');
                    localStorage.removeItem('refresh_token');
                    window.location.href = '/login';
                }
                return Promise.reject(refreshError);
            }
        }
    }

    // Log error in development
    if (API_CONFIG.ENABLE_LOGGING) {
        console.error('❌ API Error:', {
            status: error.response?.status,
            message: error.message,
            url: error.config?.url,
            data: error.response?.data,
        });
    }

    return Promise.reject(error);
};