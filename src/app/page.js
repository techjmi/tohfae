// import Test from "./Test";
import HeroCarousel from "@/components/home/HeroCarousel";
import { getActiveBanners } from "@/services/banner";
export default async function Home() { 
  //fetch the hero carousel data from the api and pass it to the HeroCarousel component
  const heroCarouselData = await getActiveBanners({ page: 'home' });
  return (
    <div className="flex flex-col">
      <HeroCarousel apiBanners={heroCarouselData} />

    </div>
  );
}
