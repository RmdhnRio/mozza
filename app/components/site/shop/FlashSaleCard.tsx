// app/components/site/shop/FlashSaleCard.tsx
'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Zap, Star, ShoppingCart, ChevronLeft, ChevronRight } from 'lucide-react';
import { ShopProduct } from './shop-types';

interface FlashSaleCardProps {
    product: ShopProduct;
    className?: string;
}

// helper to format price
const formatPrice = (price: number): string => {
    return new Intl.NumberFormat('id-ID').format(price);
};

// helper to calculate remaining time
const calculateTimeRemaining = (endTime: string) => {
    const end = new Date(endTime).getTime();
    const now = new Date().getTime();
    const diff = end - now;
    if (diff <= 0) {
        return { hours: 0, minutes: 0, seconds: 0, expired: true };
    }
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);
    return { hours, minutes, seconds, expired: false };
};

export const FlashSaleCard: React.FC<FlashSaleCardProps> = ({
    product,
    className = ''
}) => {
    const { title, coverImage, originalPrice, price, rating, flashSaleMeta } = product;
    const endTime = flashSaleMeta?.endTime || '';
    const carouselImages = flashSaleMeta?.carouselImages || [coverImage];
    const [timeRemaining, setTimeRemaining] = useState(calculateTimeRemaining(endTime));
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    // Timer countdown
    useEffect(() => {
        const timer = setInterval(() => {
            setTimeRemaining(calculateTimeRemaining(endTime));
        }, 1000);
        return () => clearInterval(timer);
    }, [endTime]);
    // Carousel navigation
    const nextImage = () => {
        setCurrentImageIndex((prev) => (prev + 1) % carouselImages.length);
    };
    const prevImage = () => {
        setCurrentImageIndex((prev) => (prev - 1 + carouselImages.length) % carouselImages.length);
    };
    // Format time display
    const formatTime = (num: number) => num.toString().padStart(2, '0');
    const timerDisplay = `${formatTime(timeRemaining.hours)}:${formatTime(timeRemaining.minutes)}:${formatTime(timeRemaining.seconds)}`;
    // Generate rating stars
    const renderStars = (rating: number = 0) => {
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 >= 0.5;
        const stars = [];
        for (let i = 0; i < 5; i++) {
            if (i < fullStars) {
                stars.push(<Star key={i} size={14} className="fill-yellow-400 text-yellow-400" />);
            } else if (i === fullStars && hasHalfStar) {
                stars.push(<Star key={i} size={14} className="fill-yellow-400/50 text-yellow-400" />);
            } else {
                stars.push(<Star key={i} size={14} className="text-gray-300" />);
            }
        }
        return stars;
    };
    return (
        <div
            className={`
                relative rounded-2xl overflow-hidden
                bg-white
                ${className}
            `}
            style={{
                // Gradient border effect: pink to peach
                background: 'linear-gradient(135deg, #FFB6C1 0%, #FFDAB9 100%)',
                padding: '3px'
            }}
        >
            {/* Inner card with white background */}
            <div className="relative rounded-xl overflow-hidden bg-white h-full">
                {/* Flash Sale Badge */}
                <div className="absolute top-3 left-3 z-20 flex items-center gap-1">
                    <span className="font-switzer font-bold text-lg italic">
                        <span className="text-gray-900">F</span>
                        <Zap size={16} className="inline text-yellow-500 fill-yellow-500 -mx-0.5" />
                        <span className="text-gray-900">ASH</span>
                    </span>
                    <span className="font-switzer font-normal text-lg text-gray-500 italic ml-1">SALE</span>
                </div>
                {/* Timer */}
                <div className="absolute top-3 right-3 z-20">
                    <span className={`
                        font-mono text-sm font-medium px-2 py-1 rounded
                        ${timeRemaining.expired ? 'text-red-500 bg-red-50' : 'text-pink-500 bg-pink-50'}
                    `}>
                        {timeRemaining.expired ? 'EXPIRED' : timerDisplay}
                    </span>
                </div>
                {/* Image Carousel */}
                <div className="p-2 mt-10">
                    <div className="relative w-full bg-gray-200 rounded-xl overflow-hidden aspect-[4/3]">
                        <Image
                            src={carouselImages[currentImageIndex]}
                            alt={title}
                            fill
                            className="object-cover"
                            sizes="300px"
                        />
                        {/* Carousel dots */}
                        {carouselImages.length > 1 && (
                            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 z-10">
                                {carouselImages.map((_, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => setCurrentImageIndex(idx)}
                                        className={`
                                        w-2 h-2 rounded-full transition-all
                                        ${idx === currentImageIndex
                                                ? 'bg-white w-4'
                                                : 'bg-white/50 hover:bg-white/75'}
                                    `}
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* Content */}
                <div className="p-4 space-y-3">
                    {/* Title */}
                    <h3 className="font-switzer font-bold text-base text-gray-900 line-clamp-2">
                        {title}
                    </h3>
                    {/* Price Row */}
                    <div className="flex items-center gap-3">
                        {originalPrice && (
                            <span className="text-sm text-brand-pink line-through">
                                Rp. {formatPrice(originalPrice)}
                            </span>
                        )}
                        {rating && (
                            <div className="flex items-center gap-1">
                                {renderStars(rating)}
                                <span className="text-xs text-gray-400 ml-1">
                                    {rating.toFixed(1)}/5
                                </span>
                            </div>
                        )}
                    </div>
                    {/* Discounted Price */}
                    <p className="font-switzer font-bold text-2xl text-brand-peach">
                        Rp. {formatPrice(price)}
                    </p>
                    {/* Checkout Button - Gradient with animation */}
                    <button
                        className="
                            w-full py-3 px-6 rounded-xl
                            font-switzer font-semibold text-white
                            flex items-center justify-center gap-2
                            transition-all duration-300
                            hover:scale-[1.02] hover:shadow-lg
                            active:scale-[0.98]
                        "
                        style={{
                            background: 'linear-gradient(135deg, #FF6B9D 0%, #FFB347 100%)',
                        }}
                    >
                        CHECKOUT
                        <ShoppingCart size={18} />
                    </button>
                </div>
            </div>
        </div>
    );
};
export default FlashSaleCard;