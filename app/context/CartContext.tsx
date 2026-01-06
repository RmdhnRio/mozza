'use client'
import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react'
import { CafeMenuItem, cafeMenuItems } from '@/app/components/site/cafe/cafe-menu-data'
export interface CartItem extends CafeMenuItem {
    quantity: number
}
interface CartContextType {
    items: CartItem[]
    addItem: (item: CafeMenuItem) => void
    removeItem: (id: string) => void
    updateQuantity: (id: string, quantity: number) => void
    clearCart: () => void
    totalItems: number
    subtotal: number
    recentlyAddedId: string | null
    suggestions: CafeMenuItem[]
}
const CartContext = createContext<CartContextType | undefined>(undefined)
export function CartProvider({ children }: { children: ReactNode }) {
    const [items, setItems] = useState<CartItem[]>([])
    const [recentlyAddedId, setRecentlyAddedId] = useState<string | null>(null)
    const [suggestions, setSuggestions] = useState<CafeMenuItem[]>([])
    const addItem = useCallback((item: CafeMenuItem) => {
        setItems(prev => {
            const existing = prev.find(i => i.id === item.id)

            if (existing) {
                // ✅ Item sudah ada - hanya tambah qty, JANGAN ubah suggestions
                return prev.map(i => i.id === item.id
                    ? { ...i, quantity: i.quantity + 1 }
                    : i
                )
            }

            // ✅ Item BARU - tambahkan di akhir array (kanan)
            // Dan generate suggestions baru
            setRecentlyAddedId(item.id)

            const newSuggestions = cafeMenuItems
                .filter(i => i.id !== item.id)
                .sort(() => Math.random() - 0.5)
                .slice(0, 2)
            setSuggestions(newSuggestions)

            return [{ ...item, quantity: 1, }, ...prev]
        })
    }, [])
    const removeItem = useCallback((id: string) => {
        setItems(prev => prev.filter(item => item.id !== id))
        if (id === recentlyAddedId) {
            setRecentlyAddedId(null)
            setSuggestions([])
        }
    }, [recentlyAddedId])
    const updateQuantity = useCallback((id: string, quantity: number) => {
        if (quantity <= 0) {
            removeItem(id)
            return
        }
        // ✅ Update qty TANPA mengubah suggestions
        setItems(prev => prev.map(item => item.id === id ? { ...item, quantity } : item))
    }, [removeItem])
    const clearCart = useCallback(() => {
        setItems([])
        setRecentlyAddedId(null)
        setSuggestions([])
    }, [])
    const totalItems = items.reduce((sum, item) => sum + item.quantity, 0)
    const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
    return (
        <CartContext.Provider value={{
            items, addItem, removeItem, updateQuantity, clearCart,
            totalItems, subtotal, recentlyAddedId, suggestions
        }}>
            {children}
        </CartContext.Provider>
    )
}
export function useCart() {
    const context = useContext(CartContext)
    if (!context) throw new Error('useCart must be used within CartProvider')
    return context
}