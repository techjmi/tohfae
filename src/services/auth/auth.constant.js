export const AUTH_MESSAGES = {
  SIGNUP_SUCCESS: 'Account created successfully! Please verify your email.',
  SIGNIN_SUCCESS: 'Welcome back!',
  SIGNOUT_SUCCESS: 'Signed out successfully',
  EMAIL_VERIFIED: 'Email verified successfully!',
  OTP_SENT: 'OTP sent to your email',
  OTP_RESENT: 'OTP resent successfully',
  PASSWORD_RESET_SUCCESS: 'Password reset successfully',
  INVALID_CREDENTIALS: 'Invalid email or password',
  EMAIL_ALREADY_EXISTS: 'Email already registered',
  USER_NOT_FOUND: 'User not found',
  INVALID_OTP: 'Invalid or expired OTP',
};

export const AUTH_ERRORS = {
  NETWORK_ERROR: 'Network error. Please check your connection.',
  SERVER_ERROR: 'Server error. Please try again later.',
  VALIDATION_ERROR: 'Please check your input and try again.',
  UNAUTHORIZED: 'Please login to continue',
  FORBIDDEN: 'You do not have permission to access this resource',
};

export const OTP_CONFIG = {
  LENGTH: 6,
  EXPIRY_MINUTES: 10,
  RESEND_COOLDOWN_SECONDS: 60,
};

export const PASSWORD_RULES = {
  MIN_LENGTH: 8,
  REQUIRE_UPPERCASE: true,
  REQUIRE_LOWERCASE: true,
  REQUIRE_NUMBER: true,
  REQUIRE_SPECIAL: false,
};

export const SOCIAL_PROVIDERS = {
  GOOGLE: 'google',
  FACEBOOK: 'facebook',
};

export const SOCIAL_PROVIDER_CONFIG = {
  google: {
    name: 'Google',
    icon: 'google',
    color: '#DB4437',
    bgColor: '#ffffff',
    textColor: '#757575',
  },
  facebook: {
    name: 'Facebook',
    icon: 'facebook',
    color: '#1877F2',
    bgColor: '#1877F2',
    textColor: '#ffffff',
  },
};

export const AUTH_ROUTES = {
  LOGIN: '/login',
  SIGNUP: '/signup',
  FORGOT_PASSWORD: '/forgot-password',
  RESET_PASSWORD: '/reset-password',
  VERIFY_EMAIL: '/verify-email',
  OAUTH_CALLBACK: '/auth/callback',
};

export const REDIRECT_ROUTES = {
  AFTER_LOGIN: '/',
  AFTER_SIGNUP: '/verify-email',
  AFTER_LOGOUT: '/login',
  AFTER_VERIFY: '/login',
};

