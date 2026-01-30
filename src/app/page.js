/**
 * Home Page - Component Examples Showcase
 * Testing all UI components with examples
 */

import HeroCarousel from "../components/home/HeroCarousel";
import "../components/home/hero-carousel.css";

// Button Examples
import { AllButtonExamples } from "../shared/ui/button/EXAMPLES";

// Card Examples
import { ProductCardExample, MultipleProductCardsExample, HoverableCardsExample } from "../shared/ui/card/EXAMPLES";

// Dropdown Examples
import { ScrollableDropdownExample, PositionsDropdownExample } from "../shared/ui/dropdown/EXAMPLES";

// Drawer Examples
import { SimpleDrawerExample, DrawerPositionsExample } from "../shared/ui/drawer/EXAMPLES";

// Modal Examples
import { ProductDetailsModalExample, ProductQuickViewModalExample, SizesModalExample } from "../shared/ui/modal/EXAMPLES";

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Carousel */}
      <HeroCarousel />

      {/* Component Examples Showcase */}
      <div className="container mx-auto px-4 py-8 space-y-16">

        {/* Section: Buttons */}
        <section className="space-y-6">
          <div className="border-b pb-4">
            <h2 className="text-3xl font-bold text-gray-900">Button Component</h2>
            <p className="text-gray-600 mt-2">All button variants, sizes, and colors</p>
          </div>
          <AllButtonExamples />
        </section>

        {/* Section: Cards */}
        <section className="space-y-6">
          <div className="border-b pb-4">
            <h2 className="text-3xl font-bold text-gray-900">Card Component</h2>
            <p className="text-gray-600 mt-2">Product cards with real contract data</p>
          </div>
          <ProductCardExample />
          <MultipleProductCardsExample />
          <HoverableCardsExample />
        </section>

        {/* Section: Dropdowns */}
        <section className="space-y-6">
          <div className="border-b pb-4">
            <h2 className="text-3xl font-bold text-gray-900">Dropdown Component</h2>
            <p className="text-gray-600 mt-2">Dropdown menus with different positions and features</p>
          </div>
          <ScrollableDropdownExample />
          <PositionsDropdownExample />
        </section>

        {/* Section: Drawers */}
        <section className="space-y-6">
          <div className="border-b pb-4">
            <h2 className="text-3xl font-bold text-gray-900">Drawer Component</h2>
            <p className="text-gray-600 mt-2">Side panels from different positions</p>
          </div>
          <SimpleDrawerExample />
          <DrawerPositionsExample />
        </section>

        {/* Section: Modals */}
        <section className="space-y-6">
          <div className="border-b pb-4">
            <h2 className="text-3xl font-bold text-gray-900">Modal Component</h2>
            <p className="text-gray-600 mt-2">Modals with real product data and different sizes</p>
          </div>
          <ProductDetailsModalExample />
          <ProductQuickViewModalExample />
          <SizesModalExample />
        </section>

      </div>
    </div>
  );
}
