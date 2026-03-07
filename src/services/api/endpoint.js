const API_BASE = '/api';

export const ENDPOINT = {
  PRODUCT: {
    LIST: `${API_BASE}/products`,                // ?category=&search=&sort=
    DETAILS: (id) => `${API_BASE}/products/${id}`,
    BY_SLUG: (slug) => `${API_BASE}/products/slug/${slug}`,
  },

  AUTH: {
    SIGN_UP: `${API_BASE}/auth/signup`,
    SIGN_IN: `${API_BASE}/auth/signin`,
    SIGN_OUT: `${API_BASE}/auth/signout`,
    VERIFY_EMAIL: `${API_BASE}/auth/verify-email`,
    RESEND_OTP: `${API_BASE}/auth/resend-otp`,
    FORGOT_PASSWORD: `${API_BASE}/auth/forgot-password`,
    RESET_PASSWORD: `${API_BASE}/auth/reset-password`,
    GOOGLE: `${API_BASE}/auth/google`,
    FACEBOOK: `${API_BASE}/auth/facebook`,
  },

  USER: {
    ME: `${API_BASE}/users/me`,                   // GET, PUT
    CHANGE_PASSWORD: `${API_BASE}/users/me/password`, // PUT
    ADDRESSES: `${API_BASE}/users/me/addresses`,  // POST
    ADDRESS_BY_ID: (id) => `${API_BASE}/users/me/addresses/${id}`, // PUT, DELETE
  },

  CART: {
    CART: `${API_BASE}/cart`,                     // GET, DELETE
    ITEMS: `${API_BASE}/cart/items`,              // POST
    ITEM_BY_ID: (id) => `${API_BASE}/cart/items/${id}`, // PUT, DELETE
    COUPON: `${API_BASE}/cart/coupon`,             // POST, DELETE
  },

  ORDER: {
    LIST: `${API_BASE}/orders`,                   // GET
    CREATE: `${API_BASE}/orders`,                 // POST
    DETAILS: (id) => `${API_BASE}/orders/${id}`,
    CANCEL: (id) => `${API_BASE}/orders/${id}/cancel`,
    TRACK: (id) => `${API_BASE}/orders/${id}/track`,
  },

  DESIGN: {
    LIST: `${API_BASE}/designs`,                  // GET
    CREATE: `${API_BASE}/designs`,                // POST
    DETAILS: (id) => `${API_BASE}/designs/${id}`, // GET
    UPDATE: (id) => `${API_BASE}/designs/${id}`,  // PUT
    DELETE: (id) => `${API_BASE}/designs/${id}`,  // DELETE
    PREVIEW: (id) => `${API_BASE}/designs/${id}/preview`,
  },

  UPLOAD: {
    SIGNATURE: `${API_BASE}/upload/signature`,
    DELETE: `${API_BASE}/upload`,
  },
};
