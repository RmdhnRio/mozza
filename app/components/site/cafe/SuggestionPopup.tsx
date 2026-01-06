'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { useCart } from '@/app/context/CartContext'
import { CafeMenuItem } from '@/app/components/site/cafe/cafe-menu-data'

interface SuggestionPopupProps {
    item: CafeMenuItem
    onClose: () => void
}

export function SuggestionPopup({ item, onClose }: SuggestionPopupProps) {
    const { addItem } = useCart()
    const [isExpanded, setIsExpanded] = useState(false)
    const formatPrice = (val: number) => new Intl.NumberFormat('id-ID').format(val)

    const handleAddToCart = () => {
        addItem(item)
        onClose()
    }

    if (isExpanded) {
        return (
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 -translate-y-full z-30
                animate-in fade-in slide-in-from-bottom-2 duration-300">
                {/* Connector line/triangle */}
                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-3 h-3 bg-white rotate-45 shadow-sm" />

                {/* Mini Card */}
                <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-3 w-48">
                    {/* Image */}
                    <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden mb-2">
                        <Image
                            src={item.coverImage}
                            alt={item.title}
                            fill
                            className="object-cover"
                        />
                    </div>

                    {/* Title (truncated) */}
                    <p className="text-sm font-medium text-gray-900 truncate mb-1">
                        {item.title}
                    </p>

                    {/* Add to Cart Button */}
                    <button
                        onClick={handleAddToCart}
                        className="w-full py-2.5 rounded-xl bg-brand-peach/20 text-brand-peach
                            font-semibold text-sm transition-all duration-300
                            hover:bg-brand-peach hover:text-white active:scale-95">
                        + Add to Cart
                    </button>
                </div>
            </div>
        )
    }

    // Collapsed view - circle bubble
    return (
        <button
            onClick={() => setIsExpanded(true)}
            className="absolute -top-4 left-1/2 -translate-x-1/2 -translate-y-full z-30
                animate-in fade-in zoom-in duration-300 w-12 h-12 rounded-full overflow-hidden
                border-2 border-white shadow-lg hover:scale-110 transition-transform">
            <Image
                src={item.coverImage}
                alt={item.title}
                fill
                className="object-cover"
            />
        </button>
    )
}