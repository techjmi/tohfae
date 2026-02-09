//this is a custom hook for filtering the data
"use client";
import { useState, useCallback, useMemo } from 'react';
import {
    updateStateProperty,
    updateStateProperties,
    removeStateProperty,
    resetState
} from '@/shared/utils/state';

export const useFilters = (initialFilters = {}) => {
    const [filters, setFilters] = useState(initialFilters);

    // Set single filter
    const applyFilter = useCallback((key, value) => {
        setFilters((prev) => updateStateProperty(prev, key, value));
    }, []);

    // Set multiple filters
    const applyMultipleFilters = useCallback((newFilters) => {
        setFilters((prev) => updateStateProperties(prev, newFilters));
    }, []);

    // Remove single filter
    const removeFilter = useCallback((key) => {
        setFilters((prev) => removeStateProperty(prev, key));
    }, []);

    // Reset all filters
    const resetFilters = useCallback(() => {
        setFilters(resetState(initialFilters));
    }, [initialFilters]);

    // Check if filters are applied (memoized)
    const areFiltersApplied = useMemo(() => {
        return Object.keys(filters).some(
            key => filters[key] !== undefined &&
                   filters[key] !== null &&
                   filters[key] !== ''
        );
    }, [filters]);

    // Get active filters count (memoized)
    const activeFiltersCount = useMemo(() => {
        return Object.keys(filters).filter(
            key => filters[key] !== undefined &&
                   filters[key] !== null &&
                   filters[key] !== ''
        ).length;
    }, [filters]);

    return {
        filters,
        applyFilter,
        applyMultipleFilters,
        resetFilters,
        removeFilter,
        areFiltersApplied,
        activeFiltersCount,
    };
};
