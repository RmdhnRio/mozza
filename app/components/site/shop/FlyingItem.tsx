// app/components/site/shop/FlyingItem.tsx
'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { ShopProduct } from './shop-types';
import { useCart } from './CartContext';
interface FlyingItemProps {
    id: string;
    product: ShopProduct;
    startPosition: { x: number; y: number };
}
export const FlyingItem: React.FC<FlyingItemProps> = ({ id, product, startPosition }) => {
    const { clearFlyingItem } = useCart();
    const [isAnimating, setIsAnimating] = useState(true);
    // Target position (floating cart area - bottom right)
    const targetX = typeof window !== 'undefined' ? window.innerWidth - 150 : 0;
    const targetY = typeof window !== 'undefined' ? window.innerHeight - 200 : 0;
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsAnimating(false);
            clearFlyingItem(id);
        }, 600); // Animation duration
        return () => clearTimeout(timer);
    }, [id, clearFlyingItem]);
    if (!isAnimating) return null;
    return (
        <div
            className="fixed z-[9999] pointer-events-none"
            style={{
                left: startPosition.x,
                top: startPosition.y,
                animation: 'flyToCart 0.6s ease-out forwards',
                '--target-x': `${targetX - startPosition.x}px`,
                '--target-y': `${targetY - startPosition.y}px`,
            } as React.CSSProperties}
        >
            <div className="w-16 h-16 rounded-lg overflow-hidden shadow-lg bg-white">
                <Image
                    src={product.coverImage}
                    alt={product.title}
                    width={64}
                    height={64}
                    className="object-cover w-full h-full"
                />
            </div>
        </div>
    );
};
export default FlyingItem;