/**
 * SearchWithDropdown Component
 *
 * Combines Search input with dropdown results
 *
 * Props:
 * @param {string} value - Controlled value
 * @param {function} onChange - Change handler
 * @param {function} onSearch - Debounced search callback
 * @param {function} onSelect - Dropdown item select callback
 * @param {function} fetchSuggestions - Async function to fetch suggestions
 * @param {function} renderItem - Custom render function for dropdown items
 * @param {number} minChars - Minimum characters to trigger suggestions (default: 2)
 * @param {boolean} showDropdown - Enable/disable dropdown (default: true)
 *
 * Usage:
 * <SearchWithDropdown
 *   value={searchTerm}
 *   onChange={(e) => setSearchTerm(e.target.value)}
 *   onSelect={(item) => router.push(`/products/${item.slug}`)}
 *   fetchSuggestions={async (query) => {
 *     const res = await fetch(`/api/search?q=${query}`);
 *     return res.json();
 *   }}
 *   renderItem={(item) => (
 *     <div className="flex items-center gap-2">
 *       <img src={item.image} className="w-8 h-8" />
 *       <span>{item.name}</span>
 *     </div>
 *   )}
 * />
 */
"use client";
import { useState, useEffect } from 'react';
import { Search } from './Search';
import { Dropdown, DropdownItem } from '@/shared/ui/dropdown';
import { useClickOutside } from '@/shared/hooks/useClickOutside';
import { useDebounce } from '@/shared/hooks/useDebounce';

export const SearchWithDropdown = ({
    value,
    onChange,
    onSearch,
    onSelect,
    fetchSuggestions,
    renderItem,
    minChars = 2,
    debounceTime = 300,
    showDropdown = true,
    className = "",
    ...searchProps
}) => {
    const [suggestions, setSuggestions] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const dropdownRef = useClickOutside(() => setIsOpen(false));

    // Debounce the search value to avoid too many API calls
    const debouncedValue = useDebounce(value, debounceTime);

    // Fetch suggestions when debounced value changes
    useEffect(() => {
        if (!showDropdown || !fetchSuggestions) return;

        // Only fetch if value meets minimum character requirement
        if (debouncedValue && debouncedValue.length >= minChars) {
            const fetchData = async () => {
                setLoading(true);
                try {
                    const results = await fetchSuggestions(debouncedValue);
                    setSuggestions(results || []);
                    setIsOpen(results && results.length > 0);
                } catch (error) {
                    console.error('Failed to fetch suggestions:', error);
                    setSuggestions([]);
                    setIsOpen(false);
                } finally {
                    setLoading(false);
                }
            };

            fetchData();
        } else {
            // Clear suggestions if value is too short
            setSuggestions([]);
            setIsOpen(false);
        }
    }, [debouncedValue, fetchSuggestions, minChars, showDropdown]);

    // Handle item selection
    const handleSelect = (item) => {
        setIsOpen(false);
        if (onSelect) {
            onSelect(item);
        }
    };

    return (
        <div ref={dropdownRef} className={`relative ${className}`}>
            <Search
                value={value}
                onChange={onChange}
                onSearch={onSearch}
                loading={loading}
                debounceTime={0}
                className="w-full"
                {...searchProps}
            />

            {showDropdown && isOpen && suggestions.length > 0 && (
                <Dropdown
                    isOpen={isOpen}
                    onClose={() => setIsOpen(false)}
                    position="bottomLeft"
                    variant="default"
                    size="md"
                    scrollable={suggestions.length > 5}
                    maxHeight="20rem"
                    className="mt-2"
                >
                    {suggestions.map((item, index) => (
                        <DropdownItem
                            key={item.id || item._id || index}
                            onClick={() => handleSelect(item)}
                            className="hover:bg-gray-50 px-4 py-3 cursor-pointer transition-colors border-b border-gray-100 last:border-b-0"
                        >
                            <div className="flex items-center gap-3">
                                <div className="flex-1">
                                    <div className="text-sm font-medium text-gray-900">
                                        {renderItem ? renderItem(item) : (item.basic?.name || item.name || item.title || item)}
                                    </div>
                                </div>
                            </div>
                        </DropdownItem>
                    ))}
                </Dropdown>
            )}
        </div>
    );
};