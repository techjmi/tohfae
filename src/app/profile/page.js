/**
 * Profile Page
 *
 * Server-side rendered user profile page
 * Fetches user data from API and passes to client component
 *
 * Features:
 * - SSR for better performance
 * - Rich structured data (JSON-LD)
 * - Comprehensive metadata
 * - Error handling
 * - Cookie-based authentication
 */

import { cookies } from 'next/headers';
import ProfileClient from './ProfileClient';
import { buildSeo } from '@/lib/seo/seo';
import JsonLd from '@/shared/ui/jsonld/JsonLd';
import apiClient from '@/services/api/client';
import { ENDPOINT } from '@/services/api/endpoint';
import { mapUserResponse } from '@/services/user/user.mapper';
import { PROFILE_SEO } from './profile.constant';

/**
 * Generate metadata for SEO
 */
export async function generateMetadata() {
  return buildSeo({
    title: PROFILE_SEO.title,
    description: PROFILE_SEO.description,
    keywords: PROFILE_SEO.keywords,
    canonical: PROFILE_SEO.canonical,
    image: PROFILE_SEO.image,
    ogType: PROFILE_SEO.type,
    author: PROFILE_SEO.author,
    noindex: PROFILE_SEO.noindex,
  });
}

/**
 * Fetch user data on server side
 */
async function getUserData() {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get('accessToken');

    if (!accessToken) {
      return null;
    }

    const response = await apiClient.get(ENDPOINT.USER.ME, {
      headers: {
        Cookie: `accessToken=${accessToken.value}`
      }
    });

    return mapUserResponse(response);
  } catch (error) {
    const errorMessage = error?.response?.data?.message || error?.message || 'Failed to fetch user data';
    console.error('Failed to fetch user data:', errorMessage, error);
    return null;
  }
}

/**
 * Profile Page Component
 */
export default async function ProfilePage() {
  const userData = await getUserData();

  return (
    <>
      <JsonLd data={PROFILE_SEO.jsonLd} />

      <main className="min-h-screen">
        <h1 className="sr-only">My Profile</h1>
        <ProfileClient initialUserData={userData} />
      </main>
    </>
  );
}

