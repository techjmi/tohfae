// import Test from "./Test";
import HeroCarousel from "@/components/home/hero/HeroCarousel";
import Section from "@/components/home/section/Section";
import { getActiveBanners } from "@/services/banner";
import { ProductService } from '@/services/product/product.service';
import { NEW_ARRIVAL_API_PARAMS } from '@/components/home/section/newArrival/newArrival-constant';

export default async function Home() {
  // Fetch all data in parallel for better performance
  const [heroCarouselData, newArrivalProducts] = await Promise.all([
    getActiveBanners({ page: 'home' }),
    ProductService.getAll(NEW_ARRIVAL_API_PARAMS),
  ]);

  // When you implement other sections, add them here:
  // const [heroCarouselData, newArrivalProducts, trendingProducts, featuredProducts] = await Promise.all([
  //   getActiveBanners({ page: 'home' }),
  //   ProductService.getAll(NEW_ARRIVAL_API_PARAMS),
  //   ProductService.getAll(TRENDING_API_PARAMS),
  //   ProductService.getAll(FEATURED_API_PARAMS),
  // ]);

  return (
    <div className="flex flex-col">
      <HeroCarousel apiBanners={heroCarouselData} />
      <Section
        newArrivalProducts={newArrivalProducts}
        // trendingProducts={trendingProducts}
        // featuredProducts={featuredProducts}
        // bestSellerProducts={bestSellerProducts}
        // dealsProducts={dealsProducts}
      />
    </div>
  );
}
