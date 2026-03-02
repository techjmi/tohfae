// Form field configurations
export const AUTH_FIELDS = {
  FIRST_NAME: {
    name: 'firstName',
    label: 'First name',
    type: 'text',
    required: true,
  },
  LAST_NAME: {
    name: 'lastName',
    label: 'Last name',
    type: 'text',
    required: false,
  },
  EMAIL: {
    name: 'email',
    label: 'Email address',
    type: 'email',
    required: true,
  },
  PHONE: {
    name: 'phone',
    label: 'Phone number',
    type: 'tel',
    placeholder: '+1234567890',
    required: false,
  },
  PASSWORD: {
    name: 'password',
    label: 'Password',
    type: 'password',
    required: true,
  },
  CONFIRM_PASSWORD: {
    name: 'confirmPassword',
    label: 'Confirm password',
    type: 'password',
    required: true,
  },
};

export const AUTH_TEXT = {
  LOGIN_TITLE: 'Sign in to your account',
  LOGIN_SUBTITLE: 'Or',
  LOGIN_SUBTITLE_LINK: 'create a new account',
  LOGIN_BUTTON: 'Sign in',
  LOGIN_LOADING: 'Signing in...',
  
  SIGNUP_TITLE: 'Create your account',
  SIGNUP_SUBTITLE: 'Or',
  SIGNUP_SUBTITLE_LINK: 'sign in to existing account',
  SIGNUP_BUTTON: 'Sign up',
  SIGNUP_LOADING: 'Creating account...',
  
  FORGOT_PASSWORD: 'Forgot your password?',
  
  SOCIAL_DIVIDER: 'Or continue with',
  GOOGLE_BUTTON: 'Google',
  FACEBOOK_BUTTON: 'Facebook',
  
  OTP_TITLE: 'Verify your email',
  OTP_SUBTITLE: "We've sent a 6-digit code to",
  OTP_VERIFY_BUTTON: 'Verify',
  OTP_VERIFY_LOADING: 'Verifying...',
  OTP_RESEND_BUTTON: 'Resend OTP',
  OTP_RESEND_COOLDOWN: 'Resend in',
};

