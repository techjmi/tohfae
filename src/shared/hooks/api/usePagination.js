//this is a custom hook for pagination
"use client";
import { useState, useMemo } from 'react';

export const usePagination = (data = [], options = {}) => {
    const {
        initialPage = 1,
        itemsPerPage = 20,
    } = options;

    const [currentPage, setCurrentPage] = useState(initialPage);
    const [perPage, setPerPage] = useState(itemsPerPage);

    const totalItems = data.length;
    const totalPages = Math.ceil(totalItems / perPage) || 1;

    // Paginated data
    const paginatedData = useMemo(() => {
        const startIndex = (currentPage - 1) * perPage;
        const endIndex = startIndex + perPage;
        return data.slice(startIndex, endIndex);
    }, [data, currentPage, perPage]);

    // Go to specific page
    const goToPage = (page) => {
        const pageNumber = Math.max(1, Math.min(page, totalPages));
        setCurrentPage(pageNumber);
    };

    // Next page
    const nextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(prev => prev + 1);
        }
    };

    // Previous page
    const prevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(prev => prev - 1);
        }
    };

    // Go to first page
    const goToFirstPage = () => setCurrentPage(1);

    // Go to last page
    const goToLastPage = () => setCurrentPage(totalPages);

    // Reset pagination
    const resetPagination = () => {
        setCurrentPage(initialPage);
        setPerPage(itemsPerPage);
    };

    return {
        paginatedData,
        currentPage,
        totalPages,
        totalItems,
        perPage,
        setPerPage,
        goToPage,
        nextPage,
        prevPage,
        goToFirstPage,
        goToLastPage,
        resetPagination,
        hasNextPage: currentPage < totalPages,
        hasPrevPage: currentPage > 1,
        startIndex: (currentPage - 1) * perPage + 1,
        endIndex: Math.min(currentPage * perPage, totalItems),
    };
};

