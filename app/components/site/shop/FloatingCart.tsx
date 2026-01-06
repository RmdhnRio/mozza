// app/components/site/shop/FloatingCart.tsx
'use client';
import React, { useRef } from 'react';
import { ShoppingCart, ChevronRight } from 'lucide-react';
import { useCart } from './CartContext';
import { CartItemCard } from './CartItemCard';
import { FlyingItem } from './FlyingItem';

const formatPrice = (price: number): string => {
    return new Intl.NumberFormat('id-ID').format(price);
};

export const FloatingCart: React.FC = () => {
    const { items, isCartVisible, flyingItems, toggleCart, hideCart, subtotal, itemCount } = useCart();
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    return (
        <>
            {/* Flying Items Layer */}
            {flyingItems.map(flyingItem => (
                <FlyingItem
                    key={flyingItem.id}
                    id={flyingItem.id}
                    product={flyingItem.product}
                    startPosition={flyingItem.startPosition}
                />
            ))}

            {/* Cart Toggle Button (when hidden) */}
            {!isCartVisible && itemCount > 0 && (
                <button
                    onClick={toggleCart}
                    className="
                        fixed bottom-8 right-8 z-50
                        w-14 h-14 rounded-full
                        bg-brand-yellow text-gray-900
                        shadow-lg hover:shadow-xl
                        flex items-center justify-center
                        transition-all duration-300
                        hover:scale-105
                    "
                >
                    <ShoppingCart size={24} />
                    <span className="
                        absolute -top-1 -right-1
                        w-5 h-5 rounded-full bg-pink-500 text-white
                        text-xs font-bold flex items-center justify-center
                    ">
                        {itemCount}
                    </span>
                </button>
            )}

            {/* Floating Cart Panel - Trolley Shape */}
            <div
                className={`
                    fixed bottom-0 right-[-80px] z-50 
                    transition-transform duration-500 ease-out
                    ${isCartVisible ? 'translate-x-0' : 'translate-x-[120%]'}
                `}
            >
                {/* SVG Trolley Shape Container */}
                <div className="relative w-[580px] h-[420px]">
                    {/* SVG Background Shape */}
                    <svg
                        viewBox="0 0 580 420"
                        className="absolute inset-0 w-full h-full"
                        style={{
                            filter: 'drop-shadow(-15px -10px 30px rgba(0,0,0,0.15))'
                        }}
                    >
                        <path
                            d="
                                M 50 170
                                C 48 150, 48 140, 55 130
                                C 62 120, 75 118, 90 115
                                L 440 70
                                C 450 68, 455 67, 460 66
                                L 510 50
                                C 545 40, 565 35, 575 48
                                C 585 61, 578 82, 565 120
                                L 470 340
                                C 465 355, 462 362, 455 368
                                C 448 374, 438 375, 420 376
                                L 100 395
                                C 78 396, 67 396, 58 386
                                C 49 376, 48 364, 46 340
                                L 50 170
                                Z
                            "
                            fill="white"
                        />
                    </svg>

                    {/* Hide Button */}
                    <button
                        onClick={hideCart}
                        className="
                            absolute top-[100px] left-[20px]
                            w-8 h-8 rounded-full bg-white shadow-lg
                            flex items-center justify-center
                            hover:bg-gray-50 transition-colors
                            z-20
                        "
                    >
                        <ChevronRight size={18} className="text-gray-600" />
                    </button>

                    {/* Cart Content - Positioned inside the shape */}
                    <div className="absolute top-[130px] left-[70px] right-[80px] bottom-[50px]">
                        {/* Items Scroll Container with Gradient Edges */}
                        <div className="relative mb-4">
                            {/* Left Gradient */}
                            <div className="absolute left-0 top-0 bottom-0 w-6 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />

                            {/* Right Gradient */}
                            <div className="absolute right-0 top-0 bottom-0 w-6 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

                            {/* Scrollable Items */}
                            <div
                                ref={scrollContainerRef}
                                className="flex gap-3 overflow-x-auto py-2 px-1"
                                style={{
                                    scrollbarWidth: 'none',
                                    msOverflowStyle: 'none',
                                    scrollBehavior: 'smooth'
                                }}
                            >
                                {items.length === 0 ? (
                                    <div className="flex-1 text-center py-4 w-full">
                                        <ShoppingCart size={24} className="mx-auto text-gray-300 mb-2" />
                                        <p className="text-gray-400 text-sm">Your cart is empty</p>
                                    </div>
                                ) : (
                                    items.map(item => (
                                        <CartItemCard key={item.product.id} item={item} />
                                    ))
                                )}
                            </div>
                        </div>

                        {/* Divider */}
                        <div className="h-px bg-gray-200 mb-4" />

                        {/* Subtotal & Checkout */}
                        <div className="flex items-end justify-between gap-4">
                            <div>
                                <p className="text-gray-500 text-sm">Sub Total</p>
                                <p className="font-switzer font-bold text-2xl text-gray-900">
                                    Rp. {formatPrice(subtotal)}
                                </p>
                                <p className="text-xs text-gray-400">*tax not included</p>
                            </div>

                            {/* Checkout Button */}
                            <button
                                className="
                                    px-5 py-2.5 mr-10 rounded-full
                                    bg-white
                                    border border-pink-100
                                    font-switzer font-semibold text-brand-peach text-sm
                                    flex items-center gap-2
                                    hover:shadow-lg
                                    transition-all duration-300
                                "
                                style={{
                                    boxShadow: '0 6px 20px rgba(255, 140, 100, 0.3), 0 3px 10px rgba(255, 180, 100, 0.2)'
                                }}
                            >
                                CHECKOUT
                                <ShoppingCart size={16} />
                            </button>
                        </div>
                    </div>
                </div>
            </div >
        </>
    );
};

export default FloatingCart;