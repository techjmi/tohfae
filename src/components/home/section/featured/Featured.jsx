/*
 * Featured Section
 *
 * Displays featured products
 */
import React from 'react'
import { FEATURED_SECTION_CONFIG } from './featured.constant';

const Featured = () => {
  return (
    <div>
        <h1>{FEATURED_SECTION_CONFIG.header}</h1>
        <p>{FEATURED_SECTION_CONFIG.subHeader}</p>
   
        
    </div>
  )
}

export default Featured