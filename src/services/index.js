/**
 * Services Index
 *
 * Central export point for all services
 *
 * Usage:
 * import { ProductService, apiClient, ENDPOINT } from '@/app/services';
 */

// Export API utilities
export { default as apiClient, api } from './api/client';
export { ENDPOINT } from './api/endpoint';
export { API_CONFIG } from './api/config';
export { handleApiError } from './api/errorHandler';

// Export constants
export { ERROR_TYPES, ERROR_MSG } from './services.constant';

// Export services
export { ProductService } from './product/product.service';
export * as UserService from './user/user.service';
export * as AuthService from './auth/auth.service';

// TODO: Add more services as they are created
// export { CartService } from './cart/cart.service';
// export { OrderService } from './order/order.service';

