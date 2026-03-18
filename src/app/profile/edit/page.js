/**
 * Edit Profile Page
 * Server component for edit profile page
 * Fetches user data and passes to client component
 */

import { cookies } from 'next/headers';
import EditProfileClient from './EditProfileClient';
import { buildSeo } from '@/lib/seo/seo';
import JsonLd from '@/shared/ui/jsonld/JsonLd';
import apiClient from '@/services/api/client';
import { ENDPOINT } from '@/services/api/endpoint';
import { mapUserResponse } from '@/services/user/user.mapper';
import { redirect } from 'next/navigation';
import { Navigation_Url, site_author } from '@/shared/constant/global-constant';
import { SEO_CONFIG, PAGE_CONFIG } from './EditProfile.constants';

// Force dynamic rendering because this page uses cookies()
export const dynamic = 'force-dynamic';

/**
 * Generate metadata for SEO
 */
export async function generateMetadata() {
  return buildSeo({
    title: SEO_CONFIG.TITLE,
    description: SEO_CONFIG.DESCRIPTION,
    keywords: SEO_CONFIG.KEYWORDS,
    canonical: SEO_CONFIG.CANONICAL,
    noindex: SEO_CONFIG.NOINDEX,
    author: site_author,
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
 * Edit Profile Page Component
 */
export default async function EditProfilePage() {
  const userData = await getUserData();

  // Redirect to login if not authenticated
  if (!userData) {
    redirect(`${Navigation_Url.LOGIN}?redirect=/profile/edit`);
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': SEO_CONFIG.JSONLD.TYPE,
    name: SEO_CONFIG.JSONLD.NAME,
    description: SEO_CONFIG.JSONLD.DESCRIPTION,
  };

  return (
    <>
      <JsonLd data={jsonLd} />

      <main className="min-h-screen bg-gray-50">
        <h1 className="sr-only">{PAGE_CONFIG.TITLE}</h1>
        <EditProfileClient initialUserData={userData} />
      </main>
    </>
  );
}

