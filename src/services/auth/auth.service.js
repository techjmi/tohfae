import apiClient from '../api/client';
import { ENDPOINT } from '../api/endpoint';
import { API_CONFIG } from '../api/config';
import { handleApiError } from '../api/errorHandler';
import {
  mapAuthResponseFromAPI,
  mapSignupRequest,
  mapSigninRequest,
  mapVerifyEmailRequest,
  mapResendOtpRequest,
  mapForgotPasswordRequest,
  mapResetPasswordRequest,
} from './auth.mapper';
import { AUTH_MESSAGES } from './auth.constant';

const MOCK_USER = {
  id: 'user_001',
  email: 'test@example.com',
  firstName: 'John',
  lastName: 'Doe',
  avatar: null,
  role: 'customer',
  isEmailVerified: true,
  authProvider: 'local',
};

const MOCK_TOKENS = {
  accessToken: 'mock_access_token_' + Date.now(),
  refreshToken: 'mock_refresh_token_' + Date.now(),
};

export const AuthService = {
  signup: async (formData) => {
    try {
      if (API_CONFIG.USE_MOCK) {
        console.log('🔐 Using mock signup', formData);
        return Promise.resolve({
          success: true,
          message: AUTH_MESSAGES.SIGNUP_SUCCESS,
          user: { ...MOCK_USER, email: formData.email, firstName: formData.firstName },
        });
      }

      const requestData = mapSignupRequest(formData);
      const response = await apiClient.post(ENDPOINT.AUTH.SIGN_UP, requestData);
      const result = mapAuthResponseFromAPI(response.data);

      return {
        ...result,
        message: result.message || AUTH_MESSAGES.SIGNUP_SUCCESS,
      };
    } catch (error) {
      throw handleApiError(error);
    }
  },

  signin: async (formData) => {
    try {
      if (API_CONFIG.USE_MOCK) {
        console.log('🔐 Using mock signin', formData);
        return Promise.resolve({
          success: true,
          message: AUTH_MESSAGES.SIGNIN_SUCCESS,
          user: MOCK_USER,
          ...MOCK_TOKENS,
        });
      }

      const requestData = mapSigninRequest(formData);
      const response = await apiClient.post(ENDPOINT.AUTH.SIGN_IN, requestData);
      const result = mapAuthResponseFromAPI(response.data);

      return {
        ...result,
        message: result.message || AUTH_MESSAGES.SIGNIN_SUCCESS,
      };
    } catch (error) {
      throw handleApiError(error);
    }
  },

  signout: async () => {
    try {
      if (API_CONFIG.USE_MOCK) {
        console.log('🔐 Using mock signout');
        return Promise.resolve({
          success: true,
          message: AUTH_MESSAGES.SIGNOUT_SUCCESS,
        });
      }

      const response = await apiClient.post(ENDPOINT.AUTH.SIGN_OUT);
      return {
        ...response.data,
        message: response.data.message || AUTH_MESSAGES.SIGNOUT_SUCCESS,
      };
    } catch (error) {
      throw handleApiError(error);
    }
  },

  verifyEmail: async (email, otp) => {
    try {
      if (API_CONFIG.USE_MOCK) {
        console.log('🔐 Using mock verify email', { email, otp });
        return Promise.resolve({
          success: true,
          message: AUTH_MESSAGES.EMAIL_VERIFIED,
          user: MOCK_USER,
          ...MOCK_TOKENS,
        });
      }

      const requestData = mapVerifyEmailRequest(email, otp);
      const response = await apiClient.post(ENDPOINT.AUTH.VERIFY_EMAIL, requestData);
      const result = mapAuthResponseFromAPI(response.data);

      return {
        ...result,
        message: result.message || AUTH_MESSAGES.EMAIL_VERIFIED,
      };
    } catch (error) {
      throw handleApiError(error);
    }
  },

  resendOtp: async (email) => {
    try {
      if (API_CONFIG.USE_MOCK) {
        console.log('🔐 Using mock resend OTP', { email });
        return Promise.resolve({
          success: true,
          message: AUTH_MESSAGES.OTP_RESENT,
        });
      }

      const requestData = mapResendOtpRequest(email);
      const response = await apiClient.post(ENDPOINT.AUTH.RESEND_OTP, requestData);
      return {
        ...response.data,
        message: response.data.message || AUTH_MESSAGES.OTP_RESENT,
      };
    } catch (error) {
      throw handleApiError(error);
    }
  },

  forgotPassword: async (email) => {
    try {
      if (API_CONFIG.USE_MOCK) {
        console.log('🔐 Using mock forgot password', { email });
        return Promise.resolve({
          success: true,
          message: AUTH_MESSAGES.OTP_SENT,
        });
      }

      const requestData = mapForgotPasswordRequest(email);
      const response = await apiClient.post(ENDPOINT.AUTH.FORGOT_PASSWORD, requestData);
      return {
        ...response.data,
        message: response.data.message || AUTH_MESSAGES.OTP_SENT,
      };
    } catch (error) {
      throw handleApiError(error);
    }
  },

  resetPassword: async (email, otp, newPassword) => {
    try {
      if (API_CONFIG.USE_MOCK) {
        console.log('🔐 Using mock reset password', { email, otp });
        return Promise.resolve({
          success: true,
          message: AUTH_MESSAGES.PASSWORD_RESET_SUCCESS,
        });
      }

      const requestData = mapResetPasswordRequest(email, otp, newPassword);
      const response = await apiClient.post(ENDPOINT.AUTH.RESET_PASSWORD, requestData);
      return {
        ...response.data,
        message: response.data.message || AUTH_MESSAGES.PASSWORD_RESET_SUCCESS,
      };
    } catch (error) {
      throw handleApiError(error);
    }
  },
};

