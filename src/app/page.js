import HeroCarousel from "@/components/home/hero/HeroCarousel";
import Section from "@/components/home/section/Section";
import { Activity } from "@/components/home/activity";
import { getActiveBanners } from "@/services/banner";
import { ProductService } from '@/services/product/product.service';
import { SECTION_API_PARAMS, SECTION_TYPES } from '@/components/home/section/components';

export default async function Home() {
  const [
    heroCarouselData,
    newArrivalProducts,
    trendingProducts,
    featuredProducts,
    bestSellerProducts,
    dealsProducts,
  ] = await Promise.all([
    getActiveBanners({ page: 'home' }),
    ProductService.getAll(SECTION_API_PARAMS[SECTION_TYPES.NEW_ARRIVAL]),
    ProductService.getAll(SECTION_API_PARAMS[SECTION_TYPES.TRENDING]),
    ProductService.getAll(SECTION_API_PARAMS[SECTION_TYPES.FEATURED]),
    ProductService.getAll(SECTION_API_PARAMS[SECTION_TYPES.BEST_SELLER]),
    ProductService.getAll(SECTION_API_PARAMS[SECTION_TYPES.DEALS]),
  ]);

  return (
    <div className="flex flex-col">
      <HeroCarousel apiBanners={heroCarouselData} />
      <Activity />
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
