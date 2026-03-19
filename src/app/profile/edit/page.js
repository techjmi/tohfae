/**
 * Edit Profile Page
 * Protected route - requires authentication
 */

import EditProfileClient from './EditProfileClient';
import { buildSeo } from '@/lib/seo/seo';
import JsonLd from '@/shared/ui/jsonld/JsonLd';
import { site_author } from '@/shared/constant/global-constant';
import { SEO_CONFIG, PAGE_CONFIG } from './EditProfile.constants';
import PrivateRoute from '@/components/guards/PrivateRoute';

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
 * Edit Profile Page Component
 */
export default function EditProfilePage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': SEO_CONFIG.JSONLD.TYPE,
    name: SEO_CONFIG.JSONLD.NAME,
    description: SEO_CONFIG.JSONLD.DESCRIPTION,
  };

  return (
    <PrivateRoute redirectTo="/login">
      <JsonLd data={jsonLd} />
      <main className="min-h-screen bg-gray-50">
        <h1 className="sr-only">{PAGE_CONFIG.TITLE}</h1>
        <EditProfileClient />
      </main>
    </PrivateRoute>
  );
}

