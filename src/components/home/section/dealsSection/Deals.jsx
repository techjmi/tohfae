/*
 * Deals Section
 *
 * Displays deals of the day products
 */
import React from 'react'
import { DEALS_SECTION_CONFIG } from './deals.constant';

const Deals = () => {
  return (
    <div>
        <h1>{DEALS_SECTION_CONFIG.header}</h1>
        <p>{DEALS_SECTION_CONFIG.subHeader}</p>
   
        
    </div>
  )
}

export default Deals