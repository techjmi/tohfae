"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { SearchWithDropdown } from '@/shared/ui/search/SearchWithDropdown';
import { ProductService } from '@/services/product/product.service';

export const SearchBar = ({ className = "" }) => {
    const router = useRouter();
    const [searchTerm, setSearchTerm] = useState('');

    // Fetch search suggestions from API
    const fetchSuggestions = async (query) => {
        try {
            const products = await ProductService.getAll({
                search: query,
                limit: 5
            });
            return products || [];
        } catch (error) {
            console.error('Failed to fetch search suggestions:', error);
            return [];
        }
    };

    // Handle dropdown item selection
    const handleSelect = (product) => {
        // Navigate to product detail page
        router.push(`/products/${product.slug}`);
        setSearchTerm(''); // Clear search after selection
    };

    // Navigate to search page - only called on Enter key press
    const handleSearch = (value) => {
        if (value.trim()) {
            router.push(`/search?q=${encodeURIComponent(value)}`);
        }
    };

    // Handle Enter key press
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleSearch(searchTerm);
        }
    };

    // Handle clear button click
    const handleClear = () => {
        setSearchTerm('');
    };

    return (
        <SearchWithDropdown
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={handleKeyDown}
            onClear={handleClear}
            fetchSuggestions={fetchSuggestions}
            onSelect={handleSelect}
            minChars={2}
            showDropdown={true}
            placeholder="Search products, categories..."
            size="md"
            radius="full"
            className={className}
        />
    );
}
export default SearchBar;


