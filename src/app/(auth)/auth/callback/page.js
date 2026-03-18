"use client";
import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { signInSuccess } from '@/redux/slice/authSlice';
import { getMyProfile } from '@/services/user/user.service';
import { AuthService } from '@/services/auth/auth.service';
import { REDIRECT_ROUTES, AUTH_ROUTES } from '@/services/auth/auth.constant';

/**
 * OAuth Callback Page
 * Handles redirect from Google/Facebook OAuth
 * Backend sets HTTP-only cookies and redirects here with ?success=true
 */
export default function OAuthCallbackPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const dispatch = useDispatch();
  const [status, setStatus] = useState('loading'); // loading, success, error

  useEffect(() => {
    const handleOAuthCallback = async () => {
      try {
        // Check for success parameter
        const success = searchParams.get('success');
        const error = searchParams.get('error');

        if (error) {
          setStatus('error');
          // Redirect to login with error message after 2 seconds
          setTimeout(() => {
            router.push(`${AUTH_ROUTES.LOGIN}?error=${error}`);
          }, 2000);
          return;
        }

        if (success === 'true') {
          // Cookies are already set by backend
          // Fetch user data from backend
          const userData = await getMyProfile();

          // Update Redux state with user data
          dispatch(signInSuccess({ user: userData }));

          // Merge guest wishlist after successful OAuth login
          await AuthService.mergeGuestWishlist();

          setStatus('success');

          // Redirect to home page after 1 second
          setTimeout(() => {
            router.push(REDIRECT_ROUTES.AFTER_LOGIN);
          }, 1000);
        } else {
          // No success or error parameter - something went wrong
          setStatus('error');
          setTimeout(() => {
            router.push(AUTH_ROUTES.LOGIN);
          }, 2000);
        }
      } catch (error) {
        setStatus('error');
        // Redirect to login after 2 seconds
        setTimeout(() => {
          router.push(`${AUTH_ROUTES.LOGIN}?error=oauth_failed`);
        }, 2000);
      }
    };

    handleOAuthCallback();
  }, [searchParams, dispatch, router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full px-6">
        <div className="bg-white rounded-lg shadow-sm p-8 text-center">
          {status === 'loading' && (
            <>
              <div className="flex justify-center mb-4">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
              </div>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                Completing sign in...
              </h2>
              <p className="text-sm text-gray-600">
                Please wait while we set up your account
              </p>
            </>
          )}

          {status === 'success' && (
            <>
              <div className="flex justify-center mb-4">
                <div className="rounded-full h-12 w-12 bg-green-100 flex items-center justify-center">
                  <svg className="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </div>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                Sign in successful!
              </h2>
              <p className="text-sm text-gray-600">
                Redirecting you to the home page...
              </p>
            </>
          )}

          {status === 'error' && (
            <>
              <div className="flex justify-center mb-4">
                <div className="rounded-full h-12 w-12 bg-red-100 flex items-center justify-center">
                  <svg className="h-6 w-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </div>
              </div>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                Sign in failed
              </h2>
              <p className="text-sm text-gray-600">
                Redirecting you back to login...
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

