/*
 * Best Seller Section
 *
 * Displays best seller products
 */
import React from 'react'
import { BEST_SELLER_SECTION_CONFIG } from './best-seller-constant';

const BesSeller = () => {
  return (
    <div>
        <h1>{BEST_SELLER_SECTION_CONFIG.header}</h1>
        <p>{BEST_SELLER_SECTION_CONFIG.subHeader}</p>
   
        
    </div>
  )
}

export default BesSeller