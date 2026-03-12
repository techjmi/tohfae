/**
 * PrivateRoute Component
 * 
 * Protects routes that require authentication
 * Redirects unauthenticated users to login page with return URL
 * 
 * Features:
 * - Checks authentication status from Redux
 * - Redirects to login with ?next= parameter
 * - Shows loading state while checking auth
 * - Waits for Redux hydration from localStorage
 * 
 * Usage:
 * import { PrivateRoute } from '@/components/guards';
 * 
 * export default function CartPage() {
 *   return (
 *     <PrivateRoute>
 *       <CartClient />
 *     </PrivateRoute>
 *   );
 * }
 */
"use client";

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useSelector } from 'react-redux';
import { selectIsAuthenticated, selectUser } from '@/redux/slice/authSlice';

const PrivateRoute = ({ children, redirectTo = '/login', loadingComponent = null }) => {
  const router = useRouter();
  const pathname = usePathname();
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const user = useSelector(selectUser);
  const [isReady, setIsReady] = useState(false);

  // Wait for Redux to hydrate from localStorage
  useEffect(() => {
    const timer = setTimeout(() => setIsReady(true), 0);
    return () => clearTimeout(timer);
  }, []);

  // Redirect if not authenticated
  useEffect(() => {
    if (!isReady) return;

    if (!isAuthenticated || !user) {
      // Encode current path as return URL
      const returnUrl = encodeURIComponent(pathname || '/');
      router.replace(`${redirectTo}?next=${returnUrl}`);
    }
  }, [isReady, isAuthenticated, user, router, pathname, redirectTo]);

  // Show loading while checking authentication
  if (!isReady) {
    if (loadingComponent) {
      return loadingComponent;
    }
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  // Don't render children if not authenticated (redirecting)
  if (!isAuthenticated || !user) {
    return null;
  }

  // Render protected content
  return <>{children}</>;
};

export default PrivateRoute;

