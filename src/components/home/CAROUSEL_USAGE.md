# Hero Carousel Usage Guide

## Overview

The HeroCarousel component supports both static (constant) and dynamic (API) slides. This guide shows how to use it in different scenarios.

## Basic Usage (Static Slides)

Use the default slides from the constant file:

```jsx
import HeroCarousel from "@/components/home/HeroCarousel";

export default function HomePage() {
  return (
    <div>
      <HeroCarousel />
    </div>
  );
}
```

## Advanced Usage (API Slides)

### 1. Fetch and Replace Default Slides

```jsx
"use client";
import { useState, useEffect } from "react";
import HeroCarousel from "@/components/home/HeroCarousel";

export default function HomePage() {
  const [apiSlides, setApiSlides] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchSlides() {
      try {
        const response = await fetch("/api/carousel-slides");
        const data = await response.json();
        
        if (data.success) {
          setApiSlides(data.slides);
        }
      } catch (error) {
        console.error("Failed to fetch carousel slides:", error);
        // Falls back to default slides automatically
      } finally {
        setLoading(false);
      }
    }

    fetchSlides();
  }, []);

  if (loading) {
    return <div className="h-[600px] bg-gray-200 animate-pulse" />;
  }

  return (
    <div>
      <HeroCarousel apiSlides={apiSlides} />
    </div>
  );
}
```

### 2. Server-Side Fetching (Next.js App Router)

```jsx
// app/page.js
import HeroCarousel from "@/components/home/HeroCarousel";

async function getCarouselSlides() {
  try {
    const response = await fetch(`${process.env.API_URL}/carousel-slides`, {
      next: { revalidate: 3600 } // Revalidate every hour
    });
    
    if (!response.ok) return [];
    
    const data = await response.json();
    return data.slides || [];
  } catch (error) {
    console.error("Failed to fetch carousel slides:", error);
    return [];
  }
}

export default async function HomePage() {
  const apiSlides = await getCarouselSlides();

  return (
    <div>
      <HeroCarousel apiSlides={apiSlides} />
    </div>
  );
}
```

## API Response Format

Your API should return slides in this format:

```json
{
  "success": true,
  "slides": [
    {
      "image": "https://example.com/image1.jpg",
      "title": "Welcome to Tohfae",
      "subtitle": "Create amazing personalized gifts",
      "cta": {
        "primary": {
          "text": "Shop Now",
          "href": "/products"
        },
        "secondary": {
          "text": "Learn More",
          "href": "/about"
        }
      }
    }
  ]
}
```

## Using Constants Directly

If you need to access the carousel constants elsewhere:

```jsx
import { 
  HERO_CAROUSEL_SLIDES, 
  CAROUSEL_CONFIG,
  mergeCarouselSlides,
  validateCarouselSlide
} from "@/shared/constant/carousel.constant";

// Get default slides
const defaultSlides = HERO_CAROUSEL_SLIDES;

// Get carousel configuration
const config = CAROUSEL_CONFIG;

// Merge API slides with defaults
const combinedSlides = mergeCarouselSlides(apiSlides, false);

// Replace defaults with API slides
const replacedSlides = mergeCarouselSlides(apiSlides, true);

// Validate a slide
const isValid = validateCarouselSlide(slideObject);
```

## Customizing Carousel Configuration

You can override the default configuration:

```jsx
import HeroCarousel from "@/components/home/HeroCarousel";

export default function HomePage() {
  return (
    <div>
      <HeroCarousel 
        apiSlides={[]}
        // Component uses CAROUSEL_CONFIG by default
        // To customize, you'd need to modify the constant file
      />
    </div>
  );
}
```

## Constant File Location

```
tohfae/src/shared/constant/
├── carousel.constant.js    ← Carousel slides & config
├── global-constant.js      ← Global constants
└── index.js                ← Central export
```

## Helper Functions

### `mergeCarouselSlides(apiSlides, replaceDefault)`

- **apiSlides**: Array of slides from API
- **replaceDefault**: Boolean
  - `true`: Replace default slides with API slides
  - `false`: Merge API slides with defaults (API slides first)

### `validateCarouselSlide(slide)`

Validates if a slide object has the required structure.

## Example: Backend API Route

```javascript
// app/api/carousel-slides/route.js
import { NextResponse } from "next/server";

export async function GET() {
  // Fetch from database or CMS
  const slides = await db.carouselSlides.findMany({
    where: { active: true },
    orderBy: { order: 'asc' }
  });

  return NextResponse.json({
    success: true,
    slides: slides.map(slide => ({
      image: slide.imageUrl,
      title: slide.title,
      subtitle: slide.subtitle,
      cta: {
        primary: {
          text: slide.primaryCtaText,
          href: slide.primaryCtaHref
        },
        secondary: {
          text: slide.secondaryCtaText,
          href: slide.secondaryCtaHref
        }
      }
    }))
  });
}
```

## Best Practices

1. ✅ Always provide fallback to default slides
2. ✅ Validate API response before using
3. ✅ Use loading states for better UX
4. ✅ Cache API responses when possible
5. ✅ Keep slide images optimized (WebP, proper dimensions)
6. ✅ Test with different numbers of slides (1, 3, 5+)

