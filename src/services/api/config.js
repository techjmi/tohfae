/**
 * API Configuration
 * @description Environment-based API configuration
 */
import { local_api_url, main_url } from '@/shared/constant/global-constant';

const getBaseURL = () => {
  if (process.env.NEXT_PUBLIC_API_URL) {
    return process.env.NEXT_PUBLIC_API_URL;
  }
  return process.env.NODE_ENV === 'production' ? main_url : local_api_url;
};

export const API_CONFIG = {
  BASE_URL: getBaseURL(),
  TIMEOUT: 30000,
  RETRY_ATTEMPTS: 3,
  RETRY_DELAY: 1000,
  HEADERS: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  USE_MOCK: process.env.NEXT_PUBLIC_USE_MOCK === 'true',
  ENABLE_LOGGING: process.env.NODE_ENV === 'development',
};
