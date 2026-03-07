/**
 * API Configuration
 *
 * Centralized API configuration for the application
 *
 * Features:
 * - Environment-based base URL
 * - Timeout configuration
 * - Retry logic configuration
 * - Default headers
 * - Feature flags (logging, mock data)
 *
 * Usage:
 * import { API_CONFIG } from '@/app/services/api/config';
 */
import { main_url, local_api_url } from '@/shared/constant/global-constant';
const production_url = main_url;
const development_url = local_api_url;
export const API_CONFIG = {
    // Base URL (from environment or default)
    BASE_URL: process.env.NEXT_PUBLIC_API_URL ||
              (process.env.NODE_ENV === 'production' ? production_url : development_url),

    // Timeout for axios (30 seconds)
    TIMEOUT: 30000,
    // Retry configuration
    RETRY_ATTEMPTS: 3,
    RETRY_DELAY: 1000,
    // Default headers
    HEADERS: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
    // Feature flags
    USE_MOCK: process.env.NEXT_PUBLIC_USE_MOCK === 'true' || false, // ← Changed to false - use real API
    ENABLE_LOGGING: process.env.NODE_ENV === 'development',
};
