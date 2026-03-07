/**
 * User Data Mapper
 * Maps backend user data to frontend format
 */

/**
 * Map user response from backend
 */
export const mapUserResponse = (response) => {
  // Handle both direct data and nested response.data
  const userData = response?.data?.data || response?.data || response;

  if (!userData) {
    return null;
  }

  return {
    id: userData._id || userData.id,
    email: userData.email,
    firstName: userData.profile?.firstName || '',
    lastName: userData.profile?.lastName || '',
    name: userData.profile?.fullName ||
          userData.profile?.effectiveDisplayName ||
          (userData.profile?.firstName && userData.profile?.lastName
            ? `${userData.profile.firstName} ${userData.profile.lastName}`
            : userData.profile?.firstName || userData.email?.split('@')[0] || 'User'),
    phone: userData.phone || '',
    avatar: userData.profile?.avatar || null,
    role: userData.role,
    status: userData.status,
    isEmailVerified: userData.isEmailVerified,
    addresses: userData.addresses || [],
    preferences: userData.preferences || {},
    authProvider: userData.authProvider,
    createdAt: userData.createdAt,
    updatedAt: userData.updatedAt
  };
};

/**
 * Map profile update data to backend format
 * Backend expects flat fields: firstName, lastName, avatar, phone
 */
export const mapProfileUpdateData = (formData) => {
  return {
    firstName: formData.firstName,
    lastName: formData.lastName,
    avatar: formData.avatar,
    phone: formData.phone
  };
};

