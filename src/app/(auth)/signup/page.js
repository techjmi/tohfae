import SignupForm from './SignupForm';
import { SIGNUP_SEO } from './signup.helper';
import { buildSeo } from '@/lib/seo/seo';
import JsonLd from '@/shared/ui/jsonld/JsonLd';

export const generateMetadata = async () => {
  return buildSeo({
    title: SIGNUP_SEO.title,
    description: SIGNUP_SEO.description,
    keywords: SIGNUP_SEO.keywords,
    canonical: SIGNUP_SEO.canonical,
    image: SIGNUP_SEO.image,
    ogType: SIGNUP_SEO.ogType,
    author: SIGNUP_SEO.author,
    noindex: SIGNUP_SEO.noindex, // CRITICAL: Prevent Google from indexing signup page
  });
};

export default function SignupPage() {
  return (
    <>
      <JsonLd data={SIGNUP_SEO.jsonLd} />
      <SignupForm />
    </>
  );
}

