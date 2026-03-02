"use client";

import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { ProfileBody } from '@/shared/ui/profile';
import { getMyProfile } from '@/services/user/user.service';
import { selectUser, selectIsAuthenticated } from '@/redux/slice/authSlice';
import { Navigation_Url } from '@/shared/constant/global-constant';
import { ProfileSkeleton, ProfileError, AddressList } from './components';

export default function ProfileClient({ initialUserData }) {
  const router = useRouter();
  const reduxUser = useSelector(selectUser);
  const isAuthenticated = useSelector(selectIsAuthenticated);

  const [user, setUser] = useState(initialUserData || null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Redirect if not authenticated and no initial data
    if (!isAuthenticated && !initialUserData) {
      router.push(Navigation_Url.LOGIN);
      return;
    }

    // If we have initial SSR data, use it and skip loading
    if (initialUserData) {
      setUser(initialUserData);
      return;
    }

    // Only fetch if we don't have initial data
    const fetchUserProfile = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const profileData = await getMyProfile();
        setUser(profileData);
      } catch (err) {
        console.error('Failed to fetch profile:', err);
        setError(err.message || 'Failed to load profile');
        // Fallback to Redux user data if API fails
        setUser(reduxUser);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserProfile();
  }, [isAuthenticated, router, reduxUser, initialUserData]);

  const handleEdit = () => {
    router.push(Navigation_Url.PROFILE_EDIT);
  };

  const handleRetry = () => {
    window.location.reload();
  };

  // Loading state
  if (isLoading) {
    return <ProfileSkeleton />;
  }

  // Error state
  if (error && !user) {
    return <ProfileError error={error} onRetry={handleRetry} />;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <ProfileBody
          user={user}
          editable={true}
          showEmail={true}
          showPhone={true}
          showAddress={false}
          showBio={true}
          onEdit={handleEdit}
        />

        {/* Address Management Section */}
        <AddressList />
      </div>
    </div>
  );
}

