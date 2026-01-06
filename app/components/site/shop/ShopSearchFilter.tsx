'use client';
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Search } from 'lucide-react';

interface Category {
    id: string;
    label: string;
}

interface ShopSearchFilterProps {
    categories?: Category[];
    onSearch?: (query: string) => void;
    onCategoryChange?: (category: string) => void;
    className?: string;
}

const defaultCategories: Category[] = [
    { id: 'all', label: 'All' },
    { id: 'promo', label: 'Promo' },
    { id: 'snack', label: 'Snack' },
    { id: 'toys', label: 'Toys' },
    { id: 'dog food', label: 'Dog Food' },
    { id: 'cat food', label: 'Cat Food' },
];

export const ShopSearchFilter: React.FC<ShopSearchFilterProps> = ({
    categories = defaultCategories,
    onSearch,
    onCategoryChange,
    className = '',
}) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [activeCategory, setActiveCategory] = useState('all');
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearchQuery(value);
        onSearch?.(value);
    };

    const handleCategoryClick = (categoryId: string) => {
        setActiveCategory(categoryId);
        onCategoryChange?.(categoryId);
    };

    // Curved pills effect (similar to CafeSearchFilter)
    const calculatePillTransform = useCallback(() => {
        const container = scrollContainerRef.current;
        if (!container) return;
        const containerRect = container.getBoundingClientRect();
        const containerCenter = containerRect.width / 2;
        const pills = container.querySelectorAll('.filter-pill');
        pills.forEach((pill) => {
            const pillElement = pill as HTMLElement;
            const pillRect = pillElement.getBoundingClientRect();
            const pillCenter = pillRect.left - containerRect.left + pillRect.width / 2;
            const distanceFromCenter = (pillCenter - containerCenter) / containerCenter;
            const absDistance = Math.abs(distanceFromCenter);
            const curveIntensity = 8;
            const translateY = Math.pow(absDistance, 2) * curveIntensity;
            const minScale = 0.85;
            const scale = 1 - (absDistance * (1 - minScale));
            const minOpacity = 0.6;
            const opacity = 1 - (absDistance * (1 - minOpacity));
            pillElement.style.transform = `translateY(${translateY}px) scale(${scale})`;
            pillElement.style.opacity = `${opacity}`;
        });
    }, []);

    useEffect(() => {
        const container = scrollContainerRef.current;
        if (!container) return;

        calculatePillTransform();
        container.addEventListener('scroll', calculatePillTransform);
        window.addEventListener('resize', calculatePillTransform)

        return () => {
            container.removeEventListener('scroll', calculatePillTransform);
            window.removeEventListener('resize', calculatePillTransform);
        }
    }, [calculatePillTransform]);

    return (
        <div className={`flex flex-col lg:flex-row items-start lg:items-center gap-4 lg:gap-6 ${className}`}>
            {/* Search Bar */}
            <div className="relative w-full lg:w-140">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                    <Search className="w-5 h-5" />
                </div>
                <input
                    type="text"
                    value={searchQuery}
                    onChange={handleSearchChange}
                    placeholder="Search products..."
                    className="
                        w-full pl-12 pr-4 py-3 
                        bg-white border border-gray-200 
                        rounded-full text-gray-900
                        placeholder:text-gray-400 
                        focus:outline-none focus:ring-2 
                        focus:ring-brand-yellow/50 focus:border-brand-yellow 
                        transition-all duration-300
                    "
                />
            </div>

            {/* Category Filter Pills */}
            <div className="relative w-full lg:flex-1 overflow-hidden">
                {/* Gradient Fade Left */}
                <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />

                {/* Gradient Fade Right */}
                <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

                {/* Scrollable Pills Container */}
                <div
                    ref={scrollContainerRef}
                    className="flex items-center gap-3 overflow-x-auto py-4 px-4 brand-scroll"
                    style={{
                        scrollBehavior: 'smooth',
                        WebkitOverflowScrolling: 'touch',
                        scrollbarWidth: 'none',
                        msOverflowStyle: 'none'
                    }}
                >
                    {categories.map((category) => (
                        <button
                            key={category.id}
                            onClick={() => handleCategoryClick(category.id)}
                            className={`
                                filter-pill px-5 py-2.5 rounded-full 
                                text-sm font-medium whitespace-nowrap 
                                transition-all duration-200 ease-out flex-shrink-0
                                ${activeCategory === category.id
                                    ? 'bg-brand-peach text-gray-900 shadow-md'
                                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                }
                            `}
                            style={{ transformOrigin: 'center center' }}
                        >
                            {category.label}
                        </button>
                    ))}
                </div>
            </div>

        </div>
    );
};

export default ShopSearchFilter;