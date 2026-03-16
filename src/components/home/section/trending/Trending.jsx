/*
 * Trending Section
 *
 * Displays trending products
 */
import React from 'react'
import { TRENDING_SECTION_CONFIG } from './trending.constant';

const Trending = () => {
  return (
    <div>
        <h1>{TRENDING_SECTION_CONFIG.header}</h1>
        <p>{TRENDING_SECTION_CONFIG.subHeader}</p>
   
        
    </div>
  )
}

export default Trending