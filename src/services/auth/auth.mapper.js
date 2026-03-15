export const mapUserFromAPI = (apiUser) => {
  if (!apiUser) return null;

  return {
    id: apiUser.id || apiUser._id,
    email: apiUser.email,
    firstName: apiUser.firstName || apiUser.first_name || apiUser.profile?.firstName,
    lastName: apiUser.lastName || apiUser.last_name || apiUser.profile?.lastName,
    avatar: apiUser.avatar || apiUser.profile?.avatar || null,
    role: apiUser.role || 'customer',
    isEmailVerified: apiUser.isEmailVerified || apiUser.is_email_verified || false,
    authProvider: apiUser.authProvider || apiUser.auth_provider || 'local',
  };
};

export const mapAuthResponseFromAPI = (apiResponse) => {
  if (!apiResponse) return null;

  return {
    success: apiResponse.success || false,
    message: apiResponse.message || '',
    user: apiResponse.user ? mapUserFromAPI(apiResponse.user) : null,
    accessToken: apiResponse.accessToken || apiResponse.access_token || null,
    refreshToken: apiResponse.refreshToken || apiResponse.refresh_token || null,
  };
};

export const mapSignupRequest = (formData) => {
  return {
    email: formData.email,
    password: formData.password,
    confirmPassword: formData.confirmPassword,
    firstName: formData.firstName,
    lastName: formData.lastName || '',
    phone: formData.phone || '',
  };
};

export const mapSigninRequest = (formData) => {
  return {
    email: formData.email,
    password: formData.password,
  };
};

export const mapVerifyEmailRequest = (email, otp) => {
  return {
    email,
    otp,
  };
};

export const mapResendOtpRequest = (email) => {
  return {
    email,
  };
};

export const mapForgotPasswordRequest = (email) => {
  return {
    email,
  };
};

export const mapResetPasswordRequest = (email, otp, newPassword, confirmPassword) => {
  return {
    email,
    otp,
    newPassword,
    confirmPassword,
  };
};

