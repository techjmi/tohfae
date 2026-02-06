"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search } from '@/shared/ui/search/Search';

export const SearchBar = ({ className = "" }) => {
    const router = useRouter();
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = (value) => {
        if (value.trim()) {
            router.push(`/search?q=${encodeURIComponent(value)}`);
        }
    };

    return (
        <Search
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onSearch={handleSearch}
            placeholder="Search products, categories..."
            size="md"
            radius="full"
            className={className}
        />
    );
}
export default SearchBar;


