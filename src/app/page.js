import { cookies } from 'next/headers';
import HeroCarousel from "@/components/home/hero/HeroCarousel";
import Section from "@/components/home/section/Section";
import { Activity } from "@/components/home/activity";
import { getActiveBanners } from "@/services/banner";
import { ProductService } from '@/services/product/product.service';
import apiClient from '@/services/api/client';
import { ENDPOINT } from '@/services/api/endpoint';
import { mapProductsFromAPI } from '@/services/product/product.mapper';
import { SECTION_API_PARAMS, SECTION_TYPES } from '@/components/home/section/components';
import { ACTIVITY_API_PARAMS, ACTIVITY_TYPES } from '@/components/home/activity';

async function getRecentlyViewed() {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get('accessToken');
    const guestUserId = cookieStore.get('guestUserId');

    if (!accessToken && !guestUserId) {
      return [];
    }

    const cookieHeader = [];
    if (accessToken) cookieHeader.push(`accessToken=${accessToken.value}`);
    if (guestUserId) cookieHeader.push(`guestUserId=${guestUserId.value}`);

    const response = await apiClient.get(ENDPOINT.ACTIVITY.RECENTLY_VIEWED, {
      params: ACTIVITY_API_PARAMS[ACTIVITY_TYPES.RECENTLY_VIEWED],
      headers: {
        Cookie: cookieHeader.join('; ')
      }
    });

    const products = response.data?.data?.products || [];
    return mapProductsFromAPI(products);
  } catch (error) {
    console.error('Failed to fetch recently viewed products:', error);
    return [];
  }
}

export default async function Home() {
  // Fetch all data in parallel for better performance
  const [
    heroCarouselData,
    recentlyViewedProducts,
    newArrivalProducts,
    trendingProducts,
    featuredProducts,
    bestSellerProducts,
    dealsProducts,
  ] = await Promise.all([
    getActiveBanners({ page: 'home' }),
    getRecentlyViewed(),
    ProductService.getAll(SECTION_API_PARAMS[SECTION_TYPES.NEW_ARRIVAL]),
    ProductService.getAll(SECTION_API_PARAMS[SECTION_TYPES.TRENDING]),
    ProductService.getAll(SECTION_API_PARAMS[SECTION_TYPES.FEATURED]),
    ProductService.getAll(SECTION_API_PARAMS[SECTION_TYPES.BEST_SELLER]),
    ProductService.getAll(SECTION_API_PARAMS[SECTION_TYPES.DEALS]),
  ]);

  return (
    <div className="flex flex-col">
      <HeroCarousel apiBanners={heroCarouselData} />
      <Activity
        recentlyViewedProducts={recentlyViewedProducts}
      />
      <Section
        newArrivalProducts={newArrivalProducts}
        trendingProducts={trendingProducts}
        featuredProducts={featuredProducts}
        bestSellerProducts={bestSellerProducts}
        dealsProducts={dealsProducts}
      />
    </div>
  );
}
