// app/components/site/shop/FeaturedCollections.tsx
'use client';
import React, { useRef, useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { getFeaturedProducts } from './shop-product-data';
import { FeaturedProductCard } from './FeaturedProductCard';
interface FeaturedCollectionsProps {
    className?: string;
}
interface CardVisibility {
    [key: string]: number;
}
export const FeaturedCollections: React.FC<FeaturedCollectionsProps> = ({
    className = ''
}) => {
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(true);
    const [cardVisibilities, setCardVisibilities] = useState<CardVisibility>({});

    // Ref to prevent initial render loop
    const isInitialMount = useRef(true);
    const featuredProducts = getFeaturedProducts();
    const CARD_WIDTH = 220;
    const GAP = 24;
    const SCROLL_AMOUNT = CARD_WIDTH + GAP;
    // Setup scroll and visibility calculations
    useEffect(() => {
        const container = scrollContainerRef.current;
        if (!container) return;
        const updateScrollState = () => {
            const { scrollLeft, scrollWidth, clientWidth } = container;
            setCanScrollLeft(scrollLeft > 0);
            setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
        };
        const updateVisibilities = () => {
            const containerRect = container.getBoundingClientRect();
            const containerRight = containerRect.right;
            const containerLeft = containerRect.left;
            const newVisibilities: CardVisibility = {};
            const cards = container.querySelectorAll('[data-product-id]');
            cards.forEach((card) => {
                const cardElement = card as HTMLElement;
                const productId = cardElement.dataset.productId;
                if (!productId) return;
                const cardRect = cardElement.getBoundingClientRect();
                if (cardRect.right > containerRight) {
                    const visibleWidth = containerRight - cardRect.left;
                    const ratio = Math.max(0, visibleWidth / CARD_WIDTH);
                    newVisibilities[productId] = ratio;
                } else if (cardRect.left >= containerLeft) {
                    newVisibilities[productId] = 1;
                } else {
                    newVisibilities[productId] = 1;
                }
            });

            setCardVisibilities(newVisibilities);
        };
        const handleScroll = () => {
            updateScrollState();
            updateVisibilities();
        };
        const handleResize = () => {
            updateVisibilities();
        };
        // Add event listeners
        container.addEventListener('scroll', handleScroll);
        window.addEventListener('resize', handleResize);
        // Initial calculation with delay (only once)
        if (isInitialMount.current) {
            isInitialMount.current = false;
            // Use requestAnimationFrame to ensure DOM is ready
            requestAnimationFrame(() => {
                updateScrollState();
                updateVisibilities();
            });
        }
        return () => {
            container.removeEventListener('scroll', handleScroll);
            window.removeEventListener('resize', handleResize);
        };
    }, [featuredProducts.length]); // Only depend on products length, not object reference
    // Scroll handlers
    const handleScrollLeft = () => {
        const container = scrollContainerRef.current;
        if (container) {
            container.scrollBy({
                left: -SCROLL_AMOUNT,
                behavior: 'smooth'
            });
        }
    };
    const handleScrollRight = () => {
        const container = scrollContainerRef.current;
        if (container) {
            container.scrollBy({
                left: SCROLL_AMOUNT,
                behavior: 'smooth'
            });
        }
    };
    // Don't render if no featured products
    if (featuredProducts.length === 0) {
        return null;
    }
    return (
        <section className={`w-full py-12 ${className}`}>
            <div className="max-w-7xl mx-auto px-6 md:px-16 lg:px-24">
                {/* Header Row */}
                <div className="flex items-start justify-between mb-8">
                    {/* Title & Subtitle */}
                    <div>
                        <h2 className="font-plein font-bold text-2xl md:text-3xl text-gray-900">
                            Featured Collections
                        </h2>
                        <p className="font-switzer text-gray-500 mt-1">
                            Our most purchased products by our customers
                        </p>
                    </div>
                    {/* Navigation Buttons */}
                    <div className="flex items-center gap-2">
                        <button
                            onClick={handleScrollLeft}
                            disabled={!canScrollLeft}
                            className={`
                                w-10 h-10 rounded-full border-2
                                flex items-center justify-center
                                transition-all duration-200
                                ${canScrollLeft
                                    ? 'border-gray-300 text-gray-600 hover:border-gray-400'
                                    : 'border-gray-200 text-gray-300 cursor-not-allowed'}
                            `}
                            aria-label="Scroll left"
                        >
                            <ChevronLeft size={20} />
                        </button>
                        <button
                            onClick={handleScrollRight}
                            disabled={!canScrollRight}
                            className={`
                                w-10 h-10 
                                rounded-full 
                                border-2 
                                flex items-center justify-center
                                transition-all duration-200
                                ${canScrollRight
                                    ? 'border-gray-800 bg-gray-800 text-white hover:bg-gray-700'
                                    : 'border-gray-200 bg-gray-100 text-gray-300 cursor-not-allowed'
                                }
                            `}
                            aria-label="Scroll right"
                        >
                            <ChevronRight size={20} />
                        </button>
                    </div>
                </div>
                {/* Carousel Container */}
                <div
                    ref={scrollContainerRef}
                    className="
                        flex gap-6 overflow-x-auto overflow-y-visible
                        scroll-smooth pb-4 
                    "
                    style={{
                        scrollbarWidth: 'none',
                        msOverflowStyle: 'none'
                    }}
                >
                    {featuredProducts.map((product) => (
                        <div
                            key={product.id}
                            data-product-id={product.id}
                            className="flex-shrink-0"
                        >
                            <FeaturedProductCard
                                product={product}
                                visibilityRatio={cardVisibilities[product.id] ?? 1}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
export default FeaturedCollections;