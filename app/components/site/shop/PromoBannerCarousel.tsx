// app/components/site/shop/PromoBannerCarousel.tsx
'use client';
import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { Copy, ArrowUpRight, Check } from 'lucide-react';
import { PromoVoucher } from './shop-types';
import { promoVouchers } from './shop-product-data';
interface PromoBannerCarouselProps {
    vouchers?: PromoVoucher[];
    autoPlayInterval?: number;
    className?: string;
}
export const PromoBannerCarousel: React.FC<PromoBannerCarouselProps> = ({
    vouchers = promoVouchers,
    autoPlayInterval = 5000,
    className = ''
}) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [copied, setCopied] = useState(false);
    const [isPaused, setIsPaused] = useState(false);
    const currentVoucher = vouchers[currentIndex];
    // Auto-play carousel
    useEffect(() => {
        if (isPaused || vouchers.length <= 1) return;
        const timer = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % vouchers.length);
        }, autoPlayInterval);
        return () => clearInterval(timer);
    }, [isPaused, vouchers.length, autoPlayInterval]);
    const handleCopy = useCallback(async () => {
        try {
            await navigator.clipboard.writeText(currentVoucher.code);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy:', err);
        }
    }, [currentVoucher.code]);
    if (vouchers.length === 0) return null;
    return (
        <div
            className={`
                relative rounded-2xl overflow-hidden
                h-[100px] md:h-[140px]
                ${className}
            `}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
        >
            {/* Background Image */}
            {currentVoucher.image && (
                <Image
                    src={currentVoucher.image}
                    alt={currentVoucher.title}
                    fill
                    className="object-cover"
                    sizes="600px"
                />
            )}
            {/* Gradient Overlay: Transparent (left) to brand-peach (right) */}
            <div
                className="absolute inset-0"
                style={{
                    background: 'linear-gradient(to right, transparent 0%, transparent 20%, rgba(255, 235, 220, 0.85) 50%, rgba(255, 220, 200, 0.95) 100%)'
                }}
            />
            {/* Content - Positioned to the right */}
            <div className="absolute inset-0 flex items-center justify-end">
                <div className="pr-6 md:pr-8 py-4 max-w-[60%] md:max-w-[50%]">
                    {/* Title */}
                    <h3 className="font-plein font-bold text-sm md:text-base text-gray-900 mb-2 leading-tight">
                        {currentVoucher.title}
                    </h3>
                    {/* Voucher Code Field */}
                    <div className="flex items-center gap-2 mb-3">
                        <span className="text-xs text-gray-600">Code :</span>
                        <div className="flex items-center gap-1.5 bg-white/90 backdrop-blur-sm border border-gray-200 rounded px-2 py-1">
                            <span className="font-mono font-semibold text-xs md:text-sm text-gray-900 italic">
                                {currentVoucher.code}
                            </span>
                            <button
                                onClick={handleCopy}
                                className="p-0.5 hover:bg-gray-100 rounded transition-colors"
                                aria-label="Copy voucher code"
                            >
                                {copied ? (
                                    <Check size={12} className="text-green-500" />
                                ) : (
                                    <Copy size={12} className="text-gray-400" />
                                )}
                            </button>
                        </div>
                    </div>
                    {/* View Products Button */}
                    <button className="
                        inline-flex items-center justify-center gap-1.5
                        bg-gray-900 text-white
                        px-4 py-2 rounded-full
                        font-switzer font-medium text-xs
                        hover:bg-gray-800 transition-colors
                        border border-gray-900
                    ">
                        View Products
                        <ArrowUpRight size={14} />
                    </button>
                </div>
            </div>
            {/* Carousel Dots - Bottom Left */}
            {vouchers.length > 1 && (
                <div className="absolute bottom-3 left-4 flex items-center gap-1.5">
                    {vouchers.map((_, idx) => (
                        <button
                            key={idx}
                            onClick={() => setCurrentIndex(idx)}
                            className={`
                                w-2 h-2 rounded-full transition-all
                                ${idx === currentIndex
                                    ? 'bg-gray-800 w-4'
                                    : 'bg-gray-400 hover:bg-gray-500'}
                            `}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};
export default PromoBannerCarousel;