//this is a custom hook for sorting the data
"use client";
import { useState, useCallback, useMemo } from 'react';
import { useToggle } from '../useToggle';

export const useSort = (data = [], option = {}) => {
    const {
        initialSortBy = '',
        initialSortDirection = 'asc',
        sortFunctions = {}
    } = option;

    const [sortBy, setSortBy] = useState(initialSortBy);
    const [sortDirection, setSortDirection] = useState(initialSortDirection);

    // Toggle sort direction
    const toggleSortDirection = useCallback(() => {
        setSortDirection((prev) => (prev === 'asc' ? 'desc' : 'asc'));
    }, []);

    // Set sort with auto toggle
    const setSort = useCallback((key) => {
        if (sortBy === key) {
            toggleSortDirection();
        } else {
            setSortBy(key);
            setSortDirection(initialSortDirection);
        }
    }, [sortBy, toggleSortDirection, initialSortDirection]);

    // Default sort function (handles nested fields)
    const defaultSortFn = useCallback((a, b, field) => {
        // Get nested value using dot notation (e.g., 'pricing.sellingPrice')
        const aVal = field.split('.').reduce((obj, key) => obj?.[key], a);
        const bVal = field.split('.').reduce((obj, key) => obj?.[key], b);

        if (typeof aVal === 'string' && typeof bVal === 'string') {
            return aVal.localeCompare(bVal);
        }
        return (aVal || 0) - (bVal || 0);
    }, []);

    // Sorted data
    const sortedData = useMemo(() => {
        if (!sortBy || !data.length) return data;

        const sorted = [...data].sort((a, b) => {
            // Use custom sort function if provided, otherwise use default
            const sortFn = sortFunctions[sortBy] || ((a, b) => defaultSortFn(a, b, sortBy));
            const result = sortFn(a, b);
            return sortDirection === 'asc' ? result : -result;
        });

        return sorted;
    }, [data, sortBy, sortDirection, sortFunctions, defaultSortFn]);

    // Apply sort manually
    const applySort = useCallback((key, direction) => {
        setSortBy(key);
        setSortDirection(direction);
    }, []);

    // Reset sort to initial state
    const resetSort = useCallback(() => {
        setSortBy(initialSortBy);
        setSortDirection(initialSortDirection);
    }, [initialSortBy, initialSortDirection]);

    return {
        sortedData,
        sortBy,
        sortDirection,
        toggleSortDirection,
        setSort,
        applySort,
        resetSort,
    };
};
