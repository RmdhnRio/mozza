import { ThumbsUp, Star, Users } from 'lucide-react'

export interface FoodItem {
    id: string
    coverImage: string
    title: string
    price: string
    metaInfo?: string
    iconType: 'ThumbsUp' | 'Star' | 'Users'
    className: string // For height and specific styling
    description: string
    details: string[]
}

export const foodItems: FoodItem[] = [
    {
        id: '1',
        coverImage: '/images/gallery/ardi-evans-6cyBWL8con8-unsplash.jpg',
        title: 'Burger & Fries',
        price: '59.0',
        metaInfo: 'Mozza Signature',
        iconType: 'ThumbsUp',
        className: 'h-[240px]',
        description: 'Juicy beef patty topped with melted cheddar cheese, fresh lettuce, and our secret sauce, served with a side of crispy golden fries.',
        details: ['100% Angus Beef', 'Freshly baked bun', 'Crispy fries included', 'Secret sauce']
    },
    {
        id: '2',
        coverImage: '/images/gallery/maria-labanda-m3wUrrVBAZk-unsplash.jpg',
        title: 'Afternoon \n Pancake',
        price: '34.0',
        iconType: 'ThumbsUp',
        className: 'h-[240px]',
        description: 'Fluffy pancakes stacked high, drizzled with maple syrup and topped with fresh berries and a dollop of whipped cream.',
        details: ['Fluffy texture', 'Real maple syrup', 'Fresh berries', 'Whipped cream']
    },
    {
        id: '3',
        coverImage: '/images/gallery/jarek-ceborski-IhqDpFz7I8Q-unsplash.jpg',
        title: 'Es Kopi \n si empuss',
        price: '20.0',
        iconType: 'Star',
        className: 'h-[180px]',
        description: 'Our signature iced coffee blend, brewed to perfection with a hint of caramel and hazelnut. The perfect pick-me-up.',
        details: ['Signature blend', 'Caramel & Hazelnut notes', 'Freshly brewed', 'Served ice cold']
    },
    {
        id: '4',
        coverImage: '/images/gallery/pinar-kucuk-Ae7jQFDTPk4-unsplash.jpg',
        title: 'Pizza \n Mozarella \n Pizza Mozarella',
        price: '180.0',
        iconType: 'Users',
        className: 'h-[240px]',
        description: 'Authentic Italian pizza with a thin crust, topped with rich tomato sauce and an abundance of premium mozzarella cheese.',
        details: ['Wood-fired crust', 'Premium Mozzarella', 'Homemade tomato sauce', 'Fresh basil']
    }
]
