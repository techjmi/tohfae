/*
 * Product Details Page
 *
 * Client-side rendering for product details
 * Fetches product data by slug and displays details
 * will accept props from page.js
 */
"use client";
import React, { useState } from 'react';
// Import detail components
import ProductImageGallery from './components/ProductImageGallery';
import ProductMainInfo from './components/ProductMainInfo';
import ProductPricing from './components/ProductPricing';
import ProductVariants from './components/ProductVariants';
import ProductCustomization from './components/ProductCustomization';
import ProductActions from './components/ProductActions';
import ProductDescription from './components/ProductDescription';
import ProductReviews from './components/ProductReviews';
import RelatedProducts from './components/RelatedProducts';

const ProductsDetails = ({ product }) => {
  // State management
  const [selectedVariantId, setSelectedVariantId] = useState(product?.variants?.[0]?.id || null);
  const [customizationData, setCustomizationData] = useState({});
  const [quantity, setQuantity] = useState(1);

  // Handlers
  const handleVariantChange = (variantId) => {
    setSelectedVariantId(variantId);
  };

  const handleCustomizationChange = (data) => {
    setCustomizationData(data);
  };

  const handleQuantityChange = (newQuantity) => {
    setQuantity(newQuantity);
  };

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Product not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Main Product Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Left Column - Image Gallery */}
          <ProductImageGallery
            images={product?.media?.images || []}
            productName={product?.basic?.name || ''}
          />

          {/* Right Column - Product Info */}
          <div className="space-y-6">
            {/* Main Info */}
            <ProductMainInfo product={product} />

            {/* Pricing */}
            <ProductPricing
              pricing={product?.pricing}
              offers={product?.offers || []}
            />

            {/* Variants */}
            {product?.variants && product.variants.length > 0 && (
              <ProductVariants
                variants={product.variants}
                onVariantChange={handleVariantChange}
                selectedVariantId={selectedVariantId}
              />
            )}

            {/* Customization */}
            {product?.customization?.enabled && (
              <ProductCustomization
                customization={product.customization}
                onCustomizationChange={handleCustomizationChange}
                customizationData={customizationData}
              />
            )}

            {/* Actions */}
            <ProductActions
              product={product}
              selectedVariantId={selectedVariantId}
              customizationData={customizationData}
              quantity={quantity}
              onQuantityChange={handleQuantityChange}
            />
          </div>
        </div>

        {/* Description & Specifications */}
        <ProductDescription product={product} className="mb-12" />

        {/* Reviews */}
        <ProductReviews
          rating={product?.rating}
          productId={product?.id}
          className="mb-12"
        />

        {/* Related Products */}
        <RelatedProducts
          products={[]} // TODO: Fetch related products
          title="You May Also Like"
        />
      </div>
    </div>
  );
};

export default ProductsDetails;