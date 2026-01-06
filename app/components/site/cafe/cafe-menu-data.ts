export interface CafeMenuItem {
    id: string
    coverImage: string
    title: string
    description: string
    originalPrice?: number
    price: number
    variant?: 'default' | 'promo' | 'badge'
    promoLabel?: string
    badgeText?: string
    category?: string
}

export const cafeMenuItems: CafeMenuItem[] = [
    {
        id: '1',
        coverImage: '/images/cafe/jarek-ceborski-IhqDpFz7I8Q-unsplash.jpg',
        title: 'Es Kopi Susu si Empus',
        description: 'A delightful blend of roasted coffee and milk, perfectly chilled',
        originalPrice: 30000,
        price: 20000,
        variant: 'promo',
        promoLabel: 'SAVE 10%',
        badgeText: 'Promo',
        category: 'drinks'
    },
    {
        id: '2',
        coverImage: '/images/cafe/pinar-kucuk-Ae7jQFDTPk4-unsplash.jpg',
        title: 'Pizza Mozzarella Pizza Mozzarella',
        description: 'A delicious pizza with fresh mozzarella and tomato sauce',
        originalPrice: 280000,
        price: 238000,
        variant: 'promo',
        promoLabel: 'SAVE 15%',
        badgeText: 'Promo',
        category: 'lunch'
    },
    {
        id: '3',
        coverImage: '/images/cafe/alana-harris-C63YZ33DdvY-unsplash.jpg',
        title: 'Matcha Latte',
        description: 'A delightful blend of ceremonial matcha and premium milk, perfectly chilled and blended',
        price: 64000,
        variant: 'badge',
        category: 'drinks',
        badgeText: 'Recommended',
    },
    {
        id: '4',
        coverImage: '/images/cafe/great-cocktails-9PyQwwmZxpI-unsplash.jpg',
        title: 'Cocktail Mojito',
        description: 'A refreshing blend of fresh mint, lime, and rum, perfectly chilled',
        originalPrice: 30000,
        price: 20000,
        variant: 'promo',
        promoLabel: 'SAVE 10%',
        badgeText: 'Promo',
        category: 'drinks'
    },
    {
        id: '5',
        coverImage: '/images/cafe/vicky-nguyen-a4xoMVKzbak-unsplash.jpg',
        title: 'Croissant Butter',
        description: 'Freshly baked croissant with premium French butter',
        price: 25000,
        variant: 'badge',
        badgeText: 'Recommended',
        category: 'snack'
    },
    {
        id: '6',
        coverImage: '/images/cafe/maria-labanda-m3wUrrVBAZk-unsplash.jpg',
        title: 'Fluffy Pancakes',
        description: 'Stack of fluffy pancakes with maple syrup and fresh berries',
        price: 35000,
        variant: 'default',
        category: 'breakfast'
    },
    {
        id: '7',
        coverImage: '/images/cafe/eiliv-aceron-mAQZ3X_8_l0-unsplash.jpg',
        title: 'Club Sandwich',
        description: 'Triple decker sandwich with chicken, bacon, and fresh veggies',
        price: 45000,
        variant: 'default',
        category: 'lunch'
    },
    {
        id: '8',
        coverImage: '/images/cafe/nicola-pavan-xcy-we47x9w-unsplash.jpg',
        title: 'Chocolate Lava Cake',
        description: 'Warm chocolate cake with molten center, served with ice cream',
        originalPrice: 40000,
        price: 32000,
        variant: 'promo',
        promoLabel: 'SAVE 20%',
        category: 'dessert',
        badgeText: 'Promo',
    },
]