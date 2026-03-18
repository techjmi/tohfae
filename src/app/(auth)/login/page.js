import LoginForm from './LoginForm';
import { LOGIN_SEO } from './login.helper';
import { buildSeo } from '@/lib/seo/seo';
import JsonLd from '@/shared/ui/jsonld/JsonLd';

// Force dynamic rendering because root layout uses cookies()
export const dynamic = 'force-dynamic';

export const generateMetadata = async () => {
  return buildSeo({
    title: LOGIN_SEO.title,
    description: LOGIN_SEO.description,
    keywords: LOGIN_SEO.keywords,
    canonical: LOGIN_SEO.canonical,
    image: LOGIN_SEO.image,
    ogType: LOGIN_SEO.ogType,
    author: LOGIN_SEO.author,
    noindex: LOGIN_SEO.noindex, // CRITICAL: Prevent Google from indexing login page
  });
};

export default function LoginPage() {
  return (
    <>
      <JsonLd data={LOGIN_SEO.jsonLd} />
      <LoginForm />
    </>
  );
}

