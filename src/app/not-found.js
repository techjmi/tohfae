/**
 * Global 404 Not Found Page
 * Automatically used by Next.js when a route is not found
 */

import NotFoundComponent from '@/shared/ui/error/NotFoundComponent';
import { website_name } from '@/shared/constant/global-constant';

export const metadata = {
  title: `404 - Page Not Found | ${website_name}`,
  description: 'The page you are looking for could not be found.',
  noindex: true,
};

export default function NotFound() {
  return <NotFoundComponent />;
}

