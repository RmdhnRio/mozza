// app/components/site/shop/ShopProductCard.tsx
'use client';
import React from 'react';
import Image from 'next/image';
import { Star } from 'lucide-react';
import { ShopProduct } from './shop-types';
import { useCart } from './CartContext';

interface ShopProductCardProps {
    product: ShopProduct;
    className?: string;
    onAddToCart?: (product: ShopProduct) => void;
    size?: 'default' | 'small';
}
const formatPrice = (price: number): string => {
    return new Intl.NumberFormat('id-ID').format(price);
};
export const ShopProductCard: React.FC<ShopProductCardProps> = ({
    product,
    className = '',
    onAddToCart,
    size = 'default'
}) => {
    const { title, coverImage, price, rating } = product;
    const isSmall = size === 'small';
    const renderStars = (rating: number = 0) => {
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 >= 0.5;
        const stars = [];
        for (let i = 0; i < 5; i++) {
            if (i < fullStars) {
                stars.push(<Star key={i} size={12} className="fill-yellow-400 text-yellow-400" />);
            } else if (i === fullStars && hasHalfStar) {
                stars.push(<Star key={i} size={12} className="fill-yellow-400/50 text-yellow-400" />);
            } else {
                stars.push(<Star key={i} size={12} className="text-gray-300" />);
            }
        }
        return stars;
    };
    const { addToCart } = useCart();

    return (
        <div
            className={`
                bg-gray-50 rounded-2xl overflow-hidden p-2
                transition-all duration-300 hover:shadow-md hover:bg-white
                ${className}
            `}
        >
            {/* Image - No margin, contained within padding */}
            <div className={`
                relative w-full bg-gray-200 rounded-xl overflow-hidden
                ${isSmall ? 'aspect-[4/3]' : 'aspect-[4/3]'}
            `}>
                <Image
                    src={coverImage}
                    alt={title}
                    fill
                    className="object-cover"
                    sizes={isSmall ? "150px" : "200px"}
                />
            </div>
            {/* Content */}
            <div className={`space-y-2 ${isSmall ? 'pt-1.5 px-1' : 'pt-2 px-1'}`}>
                <h3 className={`font-switzer text-gray-800 line-clamp-1 ${isSmall ? 'text-xs' : 'text-sm'}`}>
                    {title}
                </h3>
                <p className={`font-switzer font-bold text-gray-900 ${isSmall ? 'text-base' : 'text-lg'}`}>
                    Rp. {formatPrice(price)}
                </p>
                <div className="flex items-center gap-1">
                    {renderStars(rating)}
                    <span className="text-xs text-gray-400 ml-1">
                        {rating?.toFixed(1)}/5
                    </span>
                </div>
                <button
                    onClick={(e) => {
                        const rect = e.currentTarget.getBoundingClientRect();
                        const startPosition = {
                            x: rect.left + rect.width / 2 - 32,
                            y: rect.top - 32
                        };
                        addToCart(product, startPosition);
                        onAddToCart?.(product);
                    }}
                    className={`
                        w-full rounded-xl
                        bg-brand-peach/20
                        font-switzer font-medium text-brand-peach
                        transition-all duration-200
                        hover:bg-brand-peach hover:text-white hover:shadow-md
                        active:scale-[0.98]
                        ${isSmall ? 'py-2 text-xs' : 'py-2.5 text-sm'}
                    `}
                >
                    Add to Cart
                </button>
            </div>
        </div>
    );
};
export default ShopProductCard;