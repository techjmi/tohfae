"use client";

import Image from 'next/image';
import Link from 'next/link';

const CartItemImage = ({ product }) => {
  return (
    <Link href={`/products/${product.slug}`} className="shrink-0 group">
      <div className="relative w-20 h-20 sm:w-28 sm:h-28 rounded-lg sm:rounded-xl overflow-hidden bg-gray-100 border border-gray-200 group-hover:border-primary-400 transition-colors">
        <Image
          src={product.thumbnail || '/images/placeholder.jpg'}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 80px, 112px"
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
    </Link>
  );
};

export default CartItemImage;
