/**
 * Axios Client Instance
 *
 * Centralized axios instance with interceptors
 *
 * Features:
 * - Base URL configuration
 * - Request/Response interceptors
 * - Error handling
 * - Auth token management
 *
 * Usage:
 * import { apiClient, api } from '@/app/services/api/client';
 *
 * // Using apiClient directly
 * apiClient.get('/endpoint').then(...).catch(...);
 *
 * // Using convenience methods
 * api.get('/endpoint').then(...).catch(...);
 */
import axios from 'axios';
import { API_CONFIG } from './config';
import {
    requestInterceptor,
    requestErrorInterceptor,
    responseInterceptor,
    responseErrorInterceptor,
} from './interceptors';

// Create axios instance
const apiClient = axios.create({
    baseURL: API_CONFIG.BASE_URL,
    timeout: API_CONFIG.TIMEOUT,
    headers: API_CONFIG.HEADERS,
});

// Add request interceptors
apiClient.interceptors.request.use(
    requestInterceptor,
    requestErrorInterceptor
);

// Add response interceptors
apiClient.interceptors.response.use(
    responseInterceptor,
    responseErrorInterceptor
);

// Export axios instance
export default apiClient;

// Export convenience methods
export const api = {
    get: (url, config) => apiClient.get(url, config),
    post: (url, data, config) => apiClient.post(url, data, config),
    put: (url, data, config) => apiClient.put(url, data, config),
    patch: (url, data, config) => apiClient.patch(url, data, config),
    delete: (url, config) => apiClient.delete(url, config),
};
