"use client";

import Button from "../../shared/ui/button";
import OptimizedImage from "../../shared/ui/image";

/**
 * HeroSlide Component
 */
export default function HeroSlide({ banner, priority = false }) {
  const images = banner.content?.image;
  const alt = banner.content?.image?.alt || banner.title || 'Banner';
  const heading = banner.content?.heading;
  const subheading = banner.content?.subheading;
  const backgroundColor = banner.content?.backgroundColor;
  const textColor = banner.content?.textColor;
  const cta = banner.cta;

  return (
    <div
      className="hero-slide"
      style={{ backgroundColor: backgroundColor || 'transparent' }}
    >
      <div className="hero-slide__background">
        <OptimizedImage
          images={images}
          alt={alt}
          priority={priority}
          sizes="100vw"
          objectFit="cover"
          overlay={!backgroundColor}
          overlayOpacity={0.5}
          className="hero-slide__image"
        />
      </div>

      <div className="hero-slide__content">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <h1
              className="hero-slide__title"
              style={{ color: textColor || '#ffffff' }}
            >
              {heading}
            </h1>

            <p
              className="hero-slide__subtitle"
              style={{ color: textColor || '#e5e7eb' }}
            >
              {subheading}
            </p>

            {cta?.enabled && cta?.text && (
              <div className="hero-slide__cta">
                <Button
                  as="a"
                  href={cta.url}
                  variant={cta?.variant}
                  color="primary"
                  size={cta.size || 'lg'}
                  radius="md"
                  className="shadow-lg hover:shadow-xl transition-shadow"
                >
                  {cta.text}
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

