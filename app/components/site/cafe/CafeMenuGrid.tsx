'use client'

import React from 'react'
import { CafeFoodCard, CafeFoodCardProps } from '@/app/components/ui/food-card'
import { CafeMenuItem } from '@/app/components/site/cafe/cafe-menu-data'
import { useCart } from '@/app/context/CartContext'



interface CafeMenuGridProps {
    items: CafeMenuItem[]
    className?: string
}

export function CafeMenuGrid({ items }: { items: CafeMenuItem[] }) {
    const { addItem } = useCart()

    return (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {items.map((item) => (
                <CafeFoodCard
                    key={item.id}
                    {...item}
                    onAddToCart={() => addItem(item)}
                />
            ))}
        </div>
    )
}