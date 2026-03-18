"use client";
import React, { useState, useEffect } from 'react';
import ProductImageGallery from './components/ProductImageGallery';
import ProductMainInfo from './components/ProductMainInfo';
import ProductPricing from './components/ProductPricing';
import ProductVariants from './components/ProductVariants';
import ProductCustomization from './components/ProductCustomization';
import ProductActions from './components/ProductActions';
import ProductDescription from './components/ProductDescription';
import ProductReviews from './components/ProductReviews';
import RelatedProducts from './components/RelatedProducts';
import { ActivityService } from '@/services/activity/activity.service';

const ProductsDetails = ({ product }) => {
  const [selectedVariantId, setSelectedVariantId] = useState(product?.variants?.[0]?.id || null);
  const [customizationData, setCustomizationData] = useState({});
  const [quantity, setQuantity] = useState(1);
 //track activity api call
 const trackActivity = async () => {
    try {
      const response = await ActivityService.trackActivity({
        productSlug: product.slug,
      });
      console.log('Activity tracked:', response);
    } catch (error) {
      console.error('Failed to track activity:', error);
    }
  };

  useEffect(() => {
    trackActivity();
  }, []);

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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <ProductImageGallery
            images={product?.media?.images || []}
            productName={product?.basic?.name || ''}
          />

          <div className="space-y-6">
            <ProductMainInfo product={product} />

            <ProductPricing
              pricing={product?.pricing}
              offers={product?.offers || []}
            />

            {product?.variants && product.variants.length > 0 && (
              <ProductVariants
                variants={product.variants}
                onVariantChange={handleVariantChange}
                selectedVariantId={selectedVariantId}
                product={product}
              />
            )}

            {product?.customization?.enabled && (
              <ProductCustomization
                customization={product.customization}
                onCustomizationChange={handleCustomizationChange}
                customizationData={customizationData}
              />
            )}

            <ProductActions
              product={product}
              selectedVariantId={selectedVariantId}
              customizationData={customizationData}
              quantity={quantity}
              onQuantityChange={handleQuantityChange}
            />
          </div>
        </div>

        <ProductDescription product={product} className="mb-12" />

        <ProductReviews
          rating={product?.rating}
          productId={product?.id}
          className="mb-12"
        />

        <RelatedProducts
          products={[]}
          title="You May Also Like"
        />
      </div>
    </div>
  );
};

export default ProductsDetails;