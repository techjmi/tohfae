/**
 * Profile Page
 * Protected route - requires authentication
 */

import ProfileClient from './ProfileClient';
import { buildSeo } from '@/lib/seo/seo';
import JsonLd from '@/shared/ui/jsonld/JsonLd';
import { PROFILE_SEO } from './profile.constant';
import PrivateRoute from '@/components/guards/PrivateRoute';

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
 * Profile Page Component
 */
export default function ProfilePage() {
  return (
    <PrivateRoute redirectTo="/login">
      <JsonLd data={PROFILE_SEO.jsonLd} />
      <main className="min-h-screen">
        <h1 className="sr-only">My Profile</h1>
        <ProfileClient />
      </main>
    </PrivateRoute>
  );
}

