/**
 * Not Found Page (404)
 * 
 * This file is automatically used by Next.js App Router when:
 * - A route is not found
 * - notFound() function is called
 * 
 * Next.js Conventions:
 * - File must be named "not-found.js" or "not-found.tsx"
 * - Place in app directory for global 404
 * - Place in app/[route]/not-found.js for route-specific 404
 * 
 * Features:
 * - Custom 404 UI
 * - Helpful navigation links
 * - User-friendly error message
 * - Responsive design
 */

import NotFoundComponent from '@/shared/ui/error/NotFoundComponent';
import { buildSeo } from '@/lib/seo/seo';
import { website_name } from '@/shared/constant/global-constant';

export const metadata = {
  title: `404 - Page Not Found | ${website_name}`,
  description: 'The page you are looking for could not be found.',
  noindex: true, // CRITICAL: Prevent Google from indexing 404 page
};

export default function NotFound() {
  return <NotFoundComponent />;
}

