'use client'

import React from 'react'
import Image from 'next/image'
import { Sparkles, ThumbsUp, Percent } from 'lucide-react'

export interface CafeFoodCardProps {
    coverImage: string
    title: string
    description?: string
    originalPrice?: number
    price: number
    variant?: 'default' | 'promo' | 'badge'
    promoLabel?: string
    badgeText?: string
    onAddToCart?: () => void
    className?: string
}

export const CafeFoodCard = ({
    coverImage,
    title,
    description = 'A delightful blend of roasted coffee and milk, perfectly chilled',
    originalPrice,
    price,
    variant = 'default',
    promoLabel = 'SAVE 10%',
    badgeText = 'Recommended',
    onAddToCart,
    className = '',
}: CafeFoodCardProps) => {
    const formatPrice = (value: number) => {
        return new Intl.NumberFormat('id-ID').format(value)
    }

    return (
        <div
            className={`
                relative bg-white rounded-3xl overflow-hidden
                border border-gray-100 shadow-sm
                transition-all duration-300 hover:shadow-lg
                hover:border-brand-peach/30
                flex flex-col
                ${className}
            `}
        >
            {/* === PROMO RIBBON (pojok kiri atas - diagonal) === */}
            {variant === 'promo' && (
                <div className="absolute top-0 left-0 z-20 overflow-hidden w-24 h-24">
                    <div className="absolute top-4 -left-8 w-32 text-center bg-brand-peach text-white text-xs
                     font-bold py-1 transform -rotate-45 shadow-md"
                    >
                        {promoLabel}
                    </div>
                </div>
            )}

            {/* === BADGE (pojok kanan atas) === */}
            {(variant === 'badge' || variant === 'promo') && badgeText && (
                <div className="absolute top-3 right-3 z-20">
                    <div className="
                        flex items-center gap-1 bg-neutral-gray-50
                        text-gray-600 text-xs font-medium px-2 py-1 
                        rounded-full border border-gray-200
                    "
                    >
                        {variant === 'promo' && (
                            <Percent className="w-3 h-3" />
                        )}
                        {variant === 'badge' && (
                            <ThumbsUp className="w-3 h-3" />
                        )}

                        <span>{badgeText}</span>
                    </div>
                </div>
            )}

            {/* === COVER IMAGE === */}
            <div className="relative w-full aspect-square overflow-hidden bg-neutral-gray-50">
                <Image
                    src={coverImage}
                    alt={title}
                    fill
                    className="object-cover transition-transform duration-500 hover:scale-105"
                />
            </div>

            {/* === CONTENT === */}
            <div className="p-4 flex flex-col flex-grow">
                {/* Title */}
                <h3 className="font-bold text-gray-900 text-base leading-tight mb-1 line-clamp-2">
                    {title}
                </h3>

                {/* Description */}
                <p className="text-gray-500 text-xs leading-relaxed mb-3 line-clamp-2 flex-grow">
                    {description}
                </p>

                {/* Price */}
                <div className="mb-3">
                    {variant === 'promo' && originalPrice && (
                        <div className="text-brand-pink text-xs line-through">
                            Rp. {formatPrice(originalPrice)}
                        </div>
                    )}
                    <div className="text-brand-peach font-bold text-lg">
                        Rp. {formatPrice(price)}
                    </div>
                </div>

                {/* Add to Cart Button */}
                <button
                    onClick={onAddToCart}
                    className="
                        w-full py-3 rounded-xl bg-brand-peach/20
                        text-brand-peach font-semibold text-sm
                        transition-all duration-300 hover:bg-brand-peach
                        hover:text-white active:scale-95
                    "
                >
                    + Add to Cart
                </button>
            </div>
        </div>
    )
}

export default CafeFoodCard