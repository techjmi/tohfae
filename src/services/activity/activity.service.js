import apiClient from '../api/client';
import { ENDPOINT } from '../api/endpoint';
import { getSessionId } from '@/shared/utils/session';
import { mapProductsFromAPI } from '../product/product.mapper';

export const ActivityService = {
    getRecentlyViewed: async (params = {}) => {
        try {
            const response = await apiClient.get(ENDPOINT.ACTIVITY.RECENTLY_VIEWED, { params });
            const products = response.data?.data?.products || [];
            return mapProductsFromAPI(products);
        } catch (error) {
            console.error('Failed to fetch recently viewed products:', error);
            return [];
        }
    },

    trackActivity: async (data) => {
        try {
            const sessionId = getSessionId();

            await apiClient.post(ENDPOINT.ACTIVITY.TRACK, {
                ...data,
                sessionId,
            });
            return true;
        } catch (error) {
            console.error('Failed to track activity:', error);
            return false;
        }
    },
}
