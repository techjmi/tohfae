/**
 * Wishlist page - accessible to guest (localStorage) and authenticated users (API)
 */
import { buildSeo } from '@/lib/seo/seo';
import JsonLd from '@/shared/ui/jsonld';
import WishlistClient from './WishlistClient';
import { WISHLIST_SEO } from './wishlist.helper';

export const generateMetadata = async () => {
  return buildSeo({
    title: WISHLIST_SEO.title,
    description: WISHLIST_SEO.description,
    keywords: WISHLIST_SEO.keywords,
    canonical: WISHLIST_SEO.canonical,
    image: WISHLIST_SEO.image,
    ogType: WISHLIST_SEO.type,
    author: WISHLIST_SEO.author,
    noindex: WISHLIST_SEO.noindex,
  });
};

const WishlistPage = () => {
  return (
    <>
      {/* JSON-LD Structured Data for SEO */}
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        "name": "My Wishlist",
        "description": "View and manage your wishlist of personalized gifts"
      }} />

      {/* Main Content */}
      <main className="min-h-screen">
        <WishlistClient />
      </main>
    </>
  );
};

export default WishlistPage;