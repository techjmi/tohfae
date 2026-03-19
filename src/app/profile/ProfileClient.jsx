"use client";

import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { ProfileBody } from '@/shared/ui/profile';
import { getMyProfile } from '@/services/user/user.service';
import { selectUser } from '@/redux/slice/authSlice';
import { Navigation_Url } from '@/shared/constant/global-constant';
import { ProfileSkeleton, ProfileError, AddressList } from './components';

export default function ProfileClient() {
  const router = useRouter();
  const reduxUser = useSelector(selectUser);

  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
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
  }, [reduxUser]);

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

