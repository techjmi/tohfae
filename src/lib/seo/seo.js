//this is global seo constant and utility function for this web project
import { default_seo_constant } from "./seo.constant";
import { main_url, website_name } from "../../shared/constant/global-constant";
export const DEFAULT_SEO = {
    title: default_seo_constant.title,
    description: default_seo_constant.description,
    metadataBase: new URL(main_url),
    keywords: default_seo_constant.keywords,
    openGraph: {
        title: default_seo_constant.title,
        description: default_seo_constant.description,
        type: default_seo_constant.type,
        url: default_seo_constant.canonical,
        images: [{ url: default_seo_constant.image, width: 1200, height: 630, alt: default_seo_constant.title }],
        siteName: website_name,
    },
    twitter: {
        card: 'summary_large_image',
        title: default_seo_constant.title,
        description: default_seo_constant.description,
        images: [default_seo_constant.image],
        creator: default_seo_constant.author,
    },
    alternates: { canonical: default_seo_constant.canonical },
    robots: { index: true, follow: true },
};
export const default_json_ld = {
    "@context": "https://schema.org",
    "@type": default_seo_constant.type,
    "name": website_name,
    "url": main_url,
    "description": default_seo_constant.description,
    "image": default_seo_constant.image,
    "author": {
        "@type": "Person",
        "name": default_seo_constant.author,
        "url": main_url
    },
    "publisher": {
        "@type": "Organization",
        "name": website_name,
        "logo": {
            "@type": "ImageObject",
            "url": default_seo_constant.image
        }
    }
}
export const buildSeo = ({
  title,
  description,
  keywords = [],
  canonical = default_seo_constant.canonical,
  image,
  ogType = "website",
  schemaType = "WebSite",
  author = default_seo_constant.author,
  article = {}, // { publishedTime, modifiedTime, authors, tags }
}) => {
  const mergedKeywords = Array.from(
    new Set([...(DEFAULT_SEO.keywords || []), ...keywords])
  );

  const canonicalUrl = new URL(
    canonical,
    DEFAULT_SEO.metadataBase
  ).toString();

  const ogImages = [
    {
      url: image || default_seo_constant.image,
      width: 1200,
      height: 630,
      alt: title,
    },
  ];

  const ogArticle =
    ogType === "article"
      ? {
          authors: article.authors || [author],
          publishedTime: article.publishedTime,
          modifiedTime:
            article.modifiedTime || article.publishedTime,
          tags: article.tags,
        }
      : undefined;

  return {
    ...DEFAULT_SEO,
    title,
    description,
    keywords: mergedKeywords,
    openGraph: {
      ...DEFAULT_SEO.openGraph,
      title,
      description,
      type: ogType,
      url: canonicalUrl,
      images: ogImages,
      article: ogArticle,
    },
    twitter: {
      ...DEFAULT_SEO.twitter,
      title,
      description,
      images: [image || default_seo_constant.image],
    },
    alternates: { canonical: canonicalUrl },
    robots: { index: true, follow: true },
  };
};

export const buildJsonLd = ({
  title,
  description,
  image,
  type = "WebSite",
  author = default_seo_constant.author,
}) => ({
  "@context": "https://schema.org",
  "@type": type,
  name: title,
  description,
  image: image || default_seo_constant.image,
  url: main_url,
  author: {
    "@type": "Person",
    name: author,
    url: main_url,
  },
  publisher: {
    "@type": "Organization",
    name: website_name,
    logo: {
      "@type": "ImageObject",
      url: image || default_seo_constant.image,
    },
  },
});
