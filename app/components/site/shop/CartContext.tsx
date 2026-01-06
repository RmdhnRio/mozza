// app/components/site/shop/CartContext.tsx
'use client';
import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { ShopProduct } from './shop-types';
export interface CartItem {
    product: ShopProduct;
    quantity: number;
}
interface FlyingItem {
    id: string;
    product: ShopProduct;
    startPosition: { x: number; y: number };
}
interface CartContextType {
    items: CartItem[];
    isCartVisible: boolean;
    flyingItems: FlyingItem[];
    addToCart: (product: ShopProduct, startPosition?: { x: number; y: number }) => void;
    removeFromCart: (productId: string) => void;
    updateQuantity: (productId: string, quantity: number) => void;
    toggleCart: () => void;
    showCart: () => void;
    hideCart: () => void;
    clearFlyingItem: (id: string) => void;
    subtotal: number;
    itemCount: number;
}
const CartContext = createContext<CartContextType | undefined>(undefined);
export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [items, setItems] = useState<CartItem[]>([]);
    const [isCartVisible, setIsCartVisible] = useState(false);
    const [flyingItems, setFlyingItems] = useState<FlyingItem[]>([]);
    const addToCart = useCallback((product: ShopProduct, startPosition?: { x: number; y: number }) => {
        // Trigger flying animation if position provided
        if (startPosition) {
            const flyingId = `${product.id}-${Date.now()}`;
            setFlyingItems(prev => [...prev, { id: flyingId, product, startPosition }]);
        }
        setItems(prev => {
            const existingItem = prev.find(item => item.product.id === product.id);
            if (existingItem) {
                return prev.map(item =>
                    item.product.id === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            }
            return [...prev, { product, quantity: 1 }];
        });
        // Auto-show cart when item added
        setIsCartVisible(true);
    }, []);
    const removeFromCart = useCallback((productId: string) => {
        setItems(prev => prev.filter(item => item.product.id !== productId));
    }, []);
    const updateQuantity = useCallback((productId: string, quantity: number) => {
        if (quantity <= 0) {
            removeFromCart(productId);
            return;
        }
        setItems(prev =>
            prev.map(item =>
                item.product.id === productId
                    ? { ...item, quantity }
                    : item
            )
        );
    }, [removeFromCart]);
    const clearFlyingItem = useCallback((id: string) => {
        setFlyingItems(prev => prev.filter(item => item.id !== id));
    }, []);
    const toggleCart = useCallback(() => setIsCartVisible(prev => !prev), []);
    const showCart = useCallback(() => setIsCartVisible(true), []);
    const hideCart = useCallback(() => setIsCartVisible(false), []);
    const subtotal = items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
    const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
    return (
        <CartContext.Provider value={{
            items,
            isCartVisible,
            flyingItems,
            addToCart,
            removeFromCart,
            updateQuantity,
            toggleCart,
            showCart,
            hideCart,
            clearFlyingItem,
            subtotal,
            itemCount
        }}>
            {children}
        </CartContext.Provider>
    );
};
export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};