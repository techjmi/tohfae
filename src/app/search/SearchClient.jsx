/**
 * Search Client Component
 *
 * Client-side component for search page
 * Renders search results and filters
 */
"use client";
import { usePathname } from 'next/navigation';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { ProductService } from '@/services/product/product.service';
import { SEARCH_PAGE_CONFIG } from './search.constant';
import { SearchHeader } from './components/header/SearchHeader';

export const SearchClient = ({ initialProducts=[] }) =>{
    return(
        <div>
            <SearchHeader />
            <h1>Search Client</h1>
        </div>
    )
}