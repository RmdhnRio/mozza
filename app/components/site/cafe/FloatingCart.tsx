'use client'
import React, { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import { ShoppingCart, Plus, Minus } from 'lucide-react'
import { useCart, CartItem } from '@/app/context/CartContext'
import { CafeMenuItem } from '@/app/components/site/cafe/cafe-menu-data'
// ===== CART ITEM =====
const CartItemCard = ({
    item,
    onQuantityChange,
}: {
    item: CartItem
    onQuantityChange: (qty: number) => void
}) => {
    const formatPrice = (val: number) => new Intl.NumberFormat('id-ID').format(val)
    return (
        <div className="flex-shrink-0 flex items-center gap-3 bg-white rounded-2xl p-2 pr-4 shadow-sm border border-gray-100">
            <div className="relative w-14 h-14 rounded-xl overflow-hidden flex-shrink-0">
                <Image src={item.coverImage} alt={item.title} fill className="object-cover" />
            </div>
            <div className="flex-1 min-w-0">
                <p className="text-xs font-medium text-gray-900 truncate max-w-[100px]">{item.title}</p>
                <p className="text-sm font-bold text-brand-peach">Rp. {formatPrice(item.price)}</p>
            </div>
            <div className="flex items-center gap-2">
                <button onClick={() => onQuantityChange(item.quantity - 1)}
                    className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200">
                    <Minus className="w-3 h-3 text-gray-600" />
                </button>
                <span className="text-sm font-semibold w-5 text-center text-brand-peach">{item.quantity}</span>
                <button onClick={() => onQuantityChange(item.quantity + 1)}
                    className="w-6 h-6 rounded-full bg-brand-peach flex items-center justify-center hover:opacity-90">
                    <Plus className="w-3 h-3 text-white" />
                </button>
            </div>
        </div>
    )
}
// ===== MAIN FLOATING CART =====
export function FloatingCart() {
    const { items, updateQuantity, subtotal, recentlyAddedId, suggestions, addItem } = useCart()
    const [expandedId, setExpandedId] = useState<string | null>(null)
    const scrollRef = useRef<HTMLDivElement>(null)
    const formatPrice = (val: number) => new Intl.NumberFormat('id-ID').format(val)
    const recentlyAddedItem = items.find(i => i.id === recentlyAddedId)
    const recentlyAddedIndex = items.findIndex(i => i.id === recentlyAddedId)
    // ✅ Reset expandedId saat suggestions berubah atau item dihapus
    useEffect(() => {
        setExpandedId(null)
    }, [recentlyAddedId, suggestions])
    if (items.length === 0) return null
    return (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-4xl">
            {/* SUGGESTION BUBBLES - LAYER TERPISAH */}
            {suggestions.length > 0 && recentlyAddedItem && (
                <div className="absolute -top-14 left-0 z-[60] flex gap-2 px-6">
                    <div style={{ marginLeft: `${recentlyAddedIndex * 220}px` }} className="flex gap-2">
                        {suggestions.map((suggestion) => (
                            <div key={suggestion.id} className="relative">
                                {/* BUBBLE SELALU LINGKARAN - w-12 h-12 rounded-full */}
                                <button
                                    onClick={() => setExpandedId(expandedId === suggestion.id ? null : suggestion.id)}
                                    className="w-12 h-12 rounded-full overflow-hidden border-2 border-white shadow-lg 
                                        hover:scale-110 transition-transform relative">
                                    <Image src={suggestion.coverImage} alt={suggestion.title} fill className="object-cover" />
                                </button>
                                {/* EXPANDED CARD - TEXT HITAM */}
                                {expandedId === suggestion.id && (
                                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 
                                        bg-white rounded-2xl p-3 shadow-xl border border-gray-100 w-44 z-[70]">
                                        {/* Triangle */}
                                        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-3 h-3 
                                            bg-white rotate-45 border-r border-b border-gray-100" />
                                        {/* Image */}
                                        <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden mb-2">
                                            <Image src={suggestion.coverImage} alt={suggestion.title} fill className="object-cover" />
                                        </div>
                                        {/* Title - TEXT HITAM */}
                                        <p className="text-sm font-medium text-gray-900 truncate mb-1">
                                            {suggestion.title}
                                        </p>
                                        {/* Price - TEXT HITAM */}
                                        <p className="text-base font-bold text-gray-900 mb-2">
                                            Rp. {formatPrice(suggestion.price)}
                                        </p>
                                        {/* Add to Cart Button */}
                                        <button onClick={() => { addItem(suggestion); setExpandedId(null); }}
                                            className="w-full py-2 rounded-xl bg-brand-peach/20 text-brand-peach 
                                                font-semibold text-sm hover:bg-brand-peach hover:text-white transition-colors">
                                            + Add to Cart
                                        </button>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            )}
            {/* MAIN CART CONTAINER */}
            <div className="bg-white/95 backdrop-blur-lg rounded-3xl shadow-2xl border border-gray-100 p-4">
                <div className="relative">
                    <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
                    <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
                    <div ref={scrollRef} className="flex gap-3 overflow-x-auto brand-scroll py-1 px-2">
                        {items.map((item) => (
                            <CartItemCard
                                key={item.id}
                                item={item}
                                onQuantityChange={(qty) => updateQuantity(item.id, qty)}
                            />
                        ))}
                    </div>
                </div>
                <div className="h-px bg-gray-100 my-4" />
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-xs text-gray-500">Sub total</p>
                        <p className="text-2xl font-bold text-gray-900">Rp. {formatPrice(subtotal)}</p>
                        <p className="text-xs text-gray-400">*tax & services included</p>
                    </div>
                    <button className="relative group px-8 py-4 rounded-full font-semibold text-gray-900 bg-white
                        transition-transform duration-200 hover:scale-105 active:scale-95">
                        <span className="absolute inset-0 -z-10 rounded-full bg-gradient-to-r from-brand-purple via-brand-pink to-brand-peach
                            opacity-60 blur-xl scale-105 group-hover:opacity-80 transition-opacity" />
                        <span className="absolute inset-0 rounded-full bg-white shadow-lg" />
                        <span className="relative z-10 flex items-center gap-2">
                            CHECKOUT <ShoppingCart className="w-5 h-5" />
                        </span>
                    </button>
                </div>
            </div>
        </div>
    )
}
export default FloatingCart