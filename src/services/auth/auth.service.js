import apiClient from '../api/client';
import { ENDPOINT } from '../api/endpoint';
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

export const AuthService = {
  signup: async (formData) => {
    try {
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

  resetPassword: async (email, otp, newPassword, confirmPassword) => {
    try {
      const requestData = mapResetPasswordRequest(email, otp, newPassword, confirmPassword);
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

