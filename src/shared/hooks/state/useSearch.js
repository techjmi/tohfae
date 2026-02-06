//this is a custom hook for searching the data
"use client";
import { useState, useMemo } from 'react';
import { useDebounce } from '../useDebounce';

export const useSearch = (data = [], option = {}) => {
    const {
        searchField = [],
        debounceTime = 300,
        caseSensitive = false,
        searchFn,
    } = option;

    const [searchTerm, setSearchTerm] = useState('');
    const debouncedSearchTerm = useDebounce(searchTerm, debounceTime);

    // Default search function
    const defaultSearchFn = (item, term) => {
        return Object.values(item).some((value) => {
            if (typeof value === 'string') {
                const searchValue = caseSensitive ? value : value.toLowerCase();
                return searchValue.includes(term);
            }
            return false;
        });
    };

    // Search function
    const searchData = useMemo(() => {
        if (!debouncedSearchTerm.trim()) return data;

        const term = caseSensitive ? debouncedSearchTerm : debouncedSearchTerm.toLowerCase();

        return data.filter((item) => {
            // Search in specified fields
            if (searchField.length > 0) {
                return searchField.some((field) => {
                    // Support nested fields like 'basic.name'
                    const value = field.split('.').reduce((obj, key) => obj?.[key], item);
                    if (typeof value === 'string') {
                        const searchValue = caseSensitive ? value : value.toLowerCase();
                        return searchValue.includes(term);
                    }
                    return false;
                });
            }

            // Use custom search function or default
            return searchFn ? searchFn(item, term) : defaultSearchFn(item, term);
        });
    }, [data, debouncedSearchTerm, searchField, caseSensitive, searchFn]);

    const clearSearch = () => {
        setSearchTerm('');
    };

    return {
        searchTerm,
        setSearchTerm,
        searchData,
        clearSearch,
        isSearching: searchTerm !== debouncedSearchTerm,
    };
};
