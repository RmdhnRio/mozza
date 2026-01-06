// app/components/site/shop/FeaturedProductCard.tsx
'use client';
import React from 'react';
import Image from 'next/image';
import { ArrowDownRight } from 'lucide-react';
import { ShopProduct } from './shop-types';
interface FeaturedProductCardProps {
    product: ShopProduct;
    className?: string;
    visibilityRatio?: number;
}
export const FeaturedProductCard: React.FC<FeaturedProductCardProps> = ({
    product,
    className = '',
    visibilityRatio = 1
}) => {
    const { title, coverImage, featuredMeta } = product;
    // Calculate warp effect styles based on visibility ratio
    // visibilityRatio: 1 = full width (220px), 0 = compressed (min ~40px)
    const isPartiallyVisible = visibilityRatio < 1;

    // Clamp ratio between 0.15 and 1 to prevent card from disappearing completely
    const clampedRatio = Math.max(0.15, Math.min(1, visibilityRatio));

    // Calculate dynamic width: from 220px (full) to ~33px (compressed)
    const dynamicWidth = isPartiallyVisible ? 220 * clampedRatio : 220;

    // Opacity fades as card gets more compressed
    const opacity = isPartiallyVisible ? clampedRatio : 1;

    return (
        <div
            className={`
                flex-shrink-0 
                bg-white 
                rounded-2xl 
                overflow-hidden 
                shadow-sm
                transition-all
                duration-300
                ${className}
            `}
            style={{
                width: `${dynamicWidth}px`,
                opacity: opacity,
                // Smooth transition for warp effect
                transition: isPartiallyVisible
                    ? 'width 0.15s ease-out, opacity 0.15s ease-out'
                    : 'box-shadow 0.3s ease'
            }}
        >
            {/* Image Container */}
            <div
                className="relative w-full bg-gray-200 rounded-t-2xl overflow-hidden"
                style={{
                    height: isPartiallyVisible ? `${180 * clampedRatio}px` : '180px',
                    minHeight: '40px'
                }}
            >
                <Image
                    src={coverImage}
                    alt={title}
                    fill
                    className="object-cover"
                    sizes="220px"
                />
            </div>
            {/* Content Container - Hidden when too compressed */}
            <div
                className="p-4 space-y-2 overflow-hidden"
                style={{
                    opacity: clampedRatio > 0.5 ? 1 : (clampedRatio - 0.15) / 0.35,
                    transform: `scaleX(${clampedRatio})`,
                    transformOrigin: 'left',
                    display: clampedRatio < 0.3 ? 'none' : 'block'
                }}
            >
                {/* Product Title */}
                <h3
                    className="font-switzer font-bold text-base text-gray-900 leading-tight"
                    style={{
                        // Truncate text based on available width
                        whiteSpace: clampedRatio < 0.7 ? 'nowrap' : 'normal',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis'
                    }}
                >
                    {clampedRatio < 0.6
                        ? title.substring(0, Math.floor(title.length * clampedRatio * 1.5)) + '...'
                        : title
                    }
                </h3>
                {/* Badge & Sold Info Row - Only show when mostly visible */}
                {clampedRatio > 0.6 && (
                    <div className="flex items-center justify-between text-xs">
                        {featuredMeta?.badgeLabel && (
                            <span className="text-gray-600 font-switzer">
                                {featuredMeta.badgeLabel}
                            </span>
                        )}
                        {featuredMeta?.soldInfo && clampedRatio > 0.8 && (
                            <span className="text-gray-400 font-switzer text-[10px]">
                                {featuredMeta.soldInfo}
                            </span>
                        )}
                    </div>
                )}
                {/* View Detail Button - Adapts to available width */}
                <button
                    className="
                        flex items-center justify-center gap-2 
                        bg-brand-peach 
                        text-gray-900 
                        font-switzer font-medium 
                        text-sm 
                        rounded-full 
                        hover:bg-brand-peach/50 
                        transition-colors
                        duration-200
                        mt-2
                    "
                    style={{
                        padding: clampedRatio > 0.6 ? '8px 16px' : '8px 12px',
                        minWidth: clampedRatio > 0.6 ? 'auto' : '40px'
                    }}
                >
                    {clampedRatio > 0.6 && 'View Detail'}
                    <ArrowDownRight size={16} />
                </button>
            </div>
        </div>
    );
};
export default FeaturedProductCard;