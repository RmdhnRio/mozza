// app/components/site/shop/CartItemCard.tsx
'use client';
import React from 'react';
import Image from 'next/image';
import { Minus, Plus } from 'lucide-react';
import { CartItem, useCart } from './CartContext';
interface CartItemCardProps {
    item: CartItem;
}
const formatPrice = (price: number): string => {
    return new Intl.NumberFormat('id-ID').format(price);
};
export const CartItemCard: React.FC<CartItemCardProps> = ({ item }) => {
    const { updateQuantity } = useCart();
    const { product, quantity } = item;
    const handleDecrease = () => {
        updateQuantity(product.id, quantity - 1);
    };
    const handleIncrease = () => {
        updateQuantity(product.id, quantity + 1);
    };
    return (
        <div className="
            flex-shrink-0 flex gap-3 
            bg-white rounded-xl p-2
            shadow-sm border border-gray-100
            w-[180px]
        ">
            {/* Product Image - Left side, square */}
            <div className="relative w-16 h-16 flex-shrink-0 bg-gray-100 rounded-lg overflow-hidden">
                <Image
                    src={product.coverImage}
                    alt={product.title}
                    fill
                    className="object-cover"
                    sizes="64px"
                />
            </div>
            {/* Right side: Price + Qty Controls */}
            <div className="flex flex-col justify-between flex-1 min-w-0">
                {/* Price */}
                <p className="font-switzer font-bold text-sm text-gray-900 truncate">
                    Rp. {formatPrice(product.price)}
                </p>
                {/* Quantity Controls */}
                <div className="flex items-center gap-1">
                    <button
                        onClick={handleDecrease}
                        className="
                            w-6 h-6 rounded-full bg-gray-300
                            flex items-center justify-center
                            hover:bg-gray-400 transition-colors
                            text-white
                        "
                    >
                        <Minus size={12} />
                    </button>
                    <span className="font-switzer font-medium text-sm text-gray-900 min-w-[20px] text-center">
                        {quantity}
                    </span>
                    <button
                        onClick={handleIncrease}
                        className="
                            w-6 h-6 rounded-full bg-yellow-200
                            flex items-center justify-center
                            hover:bg-brand-peach transition-colors
                            text-gray-900
                        "
                    >
                        <Plus size={12} />
                    </button>
                </div>
            </div>
        </div>
    );
};
export default CartItemCard;