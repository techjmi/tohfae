//all components, UI testing
/**
 * Home Page - Component Examples Showcase
 * Testing all UI components with examples
 */

import HeroCarousel from "../components/home/hero/HeroCarousel";
import "../components/home/hero-carousel.css";

// Button Examples
import { AllButtonExamples } from "../shared/ui/button/EXAMPLES";

// Card Examples

// Dropdown Examples
import { ScrollableDropdownExample, PositionExamples } from "../shared/ui/dropdown/EXAMPLES";

// Drawer Examples
import { SimpleDrawerExample, DrawerSizesExample } from "../shared/ui/drawer/EXAMPLES";

// Modal Examples
import { AllModalExamples } from "../shared/ui/modal/EXAMPLES";

// Banner Examples
import {
  SimpleBannerExample,
  BannerWithHeaderExample,
  ProductGridWithBannersExample,
  AllBannerTypesExample
} from "../shared/ui/banner/EXAMPLES";

// Input Examples
import {
  SimpleInputExample,
  InputWithHelperTextExample,
  InputWithErrorExample,
  InputWithIconsExample,
  AllVariantsExample,
  AllSizesExample,
  AllStatesExample,
  PasswordInputExample,
  SearchInputExample,
  FormExample,
} from "../shared/ui/from/EXAMPLES";

export default function Test() {
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
     

        {/* Section: Dropdowns */}
        <section className="space-y-6">
          <div className="border-b pb-4">
            <h2 className="text-3xl font-bold text-gray-900">Dropdown Component</h2>
            <p className="text-gray-600 mt-2">Dropdown menus with different positions and features</p>
          </div>
          <ScrollableDropdownExample />
          <PositionExamples />
        </section>

        {/* Section: Drawers */}
        <section className="space-y-6">
          <div className="border-b pb-4">
            <h2 className="text-3xl font-bold text-gray-900">Drawer Component</h2>
            <p className="text-gray-600 mt-2">Side panels from different positions and sizes</p>
          </div>
          <SimpleDrawerExample />
          <DrawerSizesExample />
        </section>

        {/* Section: Modals */}
        <section className="space-y-6">
          <div className="border-b pb-4">
            <h2 className="text-3xl font-bold text-gray-900">Modal Component</h2>
            <p className="text-gray-600 mt-2">Modals with real product data and account actions</p>
          </div>
          {/* <ProductDetailsModalExample />
          <ProductQuickViewModalExample />
          <AccountActionsModalExample /> */}
          <AllModalExamples/>
        </section>

        {/* Section: Banners */}
        <section className="space-y-6">
          <div className="border-b pb-4">
            <h2 className="text-3xl font-bold text-gray-900">Banner Component</h2>
            <p className="text-gray-600 mt-2">Banners using Card composition (CardHeader, CardBody, CardFooter)</p>
          </div>
          <SimpleBannerExample />
          <BannerWithHeaderExample />
          <AllBannerTypesExample />
          <ProductGridWithBannersExample />
        </section>

        {/* Section: Input Fields */}
        <section className="space-y-6">
          <div className="border-b pb-4">
            <h2 className="text-3xl font-bold text-gray-900">Input Component</h2>
            <p className="text-gray-600 mt-2">Form inputs with variants, sizes, states, and icons (DRY principles, default focus: false)</p>
          </div>
          <SimpleInputExample />
          <InputWithHelperTextExample />
          <InputWithErrorExample />
          <InputWithIconsExample />
          <AllVariantsExample />
          <AllSizesExample />
          <AllStatesExample />
          <PasswordInputExample />
          <SearchInputExample />
          <FormExample />
        </section>

      </div>
    </div>
  );
}
