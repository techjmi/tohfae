"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search } from '@/shared/ui/search/Search';

export const SearchBar = ({ className = "" }) => {
    const router = useRouter();
    const [searchTerm, setSearchTerm] = useState('');

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

    return (
        <Search
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={handleKeyDown}
            // Remove onSearch to prevent auto-navigation on debounce
            // onSearch={handleSearch}  // ❌ This was causing auto-redirect
            placeholder="Search products, categories..."
            size="md"
            radius="full"
            className={className}
        />
    );
}
export default SearchBar;


