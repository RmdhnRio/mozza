'use client'

import React, { useState, useRef, useEffect, useCallback } from 'react'
import { Search } from 'lucide-react'

interface Category {
    id: string
    label: string
}

interface CafeSearchFilterProps {
    categories?: Category[]
    onSearch?: (query: string) => void
    onCategoryChange?: (categoryId: string) => void
    className?: string
}

const defaultCategories: Category[] = [
    { id: 'all', label: 'All' },
    { id: 'promo', label: 'Promo' },
    { id: 'drinks', label: 'Drinks' },
    { id: 'snack', label: 'Snack' },
    { id: 'breakfast', label: 'Breakfast' },
    { id: 'lunch', label: 'Lunch' },
    { id: 'dessert', label: 'Dessert' },
]

export const CafeSearchFilter = ({
    categories = defaultCategories,
    onSearch,
    onCategoryChange,
    className = '',
}: CafeSearchFilterProps) => {
    const [searchQuery, setSearchQuery] = useState('')
    const [activeCategory, setActiveCategory] = useState('all')
    const scrollContainerRef = useRef<HTMLDivElement>(null)
    const [pillPositions, setPillPositions] = useState<number[]>([])

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        setSearchQuery(value)
        onSearch?.(value)
    }

    const handleCategoryClick = (categoryId: string) => {
        setActiveCategory(categoryId)
        onCategoryChange?.(categoryId)
    }

    const calculatePillTransform = useCallback(() => {
        const container = scrollContainerRef.current
        if (!container) return

        const containerRect = container.getBoundingClientRect()
        const containerCenter = containerRect.width / 2
        const pills = container.querySelectorAll('.filter-pill')

        pills.forEach((pill, index) => {
            const pillElement = pill as HTMLElement
            const pillRect = pillElement.getBoundingClientRect()
            const pillCenter = pillRect.left - containerRect.left + pillRect.width / 2
            const transformX = pillCenter - containerCenter


            // Jarak dari center container (normalized -1 to 1)
            const distanceFromCenter = (pillCenter - containerCenter) / containerCenter
            const absDistance = Math.abs(distanceFromCenter)

            // Curved effect : translateY berdasarkan jarak dari center
            // Semakin jauh dari center = semakin turun (curved)
            const curveIntensity = 10 // pixels maksimum translateY
            const translateY = Math.pow(absDistance, 2) * curveIntensity

            // Scale effect: pills di edge lebih kecil
            const minScale = 0.75
            const scale = 1 - (absDistance * (1 - minScale))

            // Opacity effect: pills di edfe lebih faded
            const minOpacity = 0.8
            const opacity = 1 - (absDistance * (1 - minOpacity))

            // Apply transforms and styles
            pillElement.style.transform = `translateY(${translateY}px) scale(${scale})`
            pillElement.style.opacity = `${opacity}`

        })
    }, [])

    useEffect(() => {
        const container = scrollContainerRef.current
        if (!container) return
        // Initial calculation
        calculatePillTransform()
        // Add scroll listener
        container.addEventListener('scroll', calculatePillTransform)
        window.addEventListener('resize', calculatePillTransform)
        return () => {
            container.removeEventListener('scroll', calculatePillTransform)
            window.removeEventListener('resize', calculatePillTransform)
        }
    }, [calculatePillTransform])

    return (
        <div className={`flex flex-col lg:flex-row items-start lg:items-center gap-4 lg:gap-8 ${className}`}>
            {/* Search Bar */}
            <div className="relative w-full lg:w-160">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text gray-400">
                    <Search className="w-5 h-5" />
                </div>
                <input
                    type="text"
                    value={searchQuery}
                    onChange={handleSearchChange}
                    placeholder="Search menu..."
                    className="
                        w-full pl-12 pr-4 py-3 bg-white border
                        border-gray-200 rounded-full text-gray-900
                        placehoder:text-gray-400 focus:outline-none
                        focus:ring-2 focus:ring-brand-peach/50
                        docus:border-brand-peach transition-all duration-300"
                />
            </div>

            {/* Category Filter Pills - Curved Scrolling */}
            <div className="relative w-full lg:w-auto overflow-hidden">
                {/* Gradient Fade Left */}
                <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />

                {/* Gradient Fade Right */}
                <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

                {/* Scrollable Pills Container */}
                <div
                    ref={scrollContainerRef}
                    className="flex items-center gap-3 overflow-x-auto brand-scroll py-6 px-6"
                    style={{
                        scrollBehavior: 'smooth',
                        WebkitOverflowScrolling: 'touch',
                    }}
                >
                    {categories.map((category) => (
                        <button
                            key={category.id}
                            onClick={() => handleCategoryClick(category.id)}
                            className={`filter-pill px-5 py-2.5 rounded-full text-sm font-medium
                    whitespace-nowrap transition-all duration-200 ease-out
                    flex-shrink-0
                    ${activeCategory === category.id
                                    ? 'bg-brand-peach text-gray-900 shadow-lg'
                                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                }
                `}
                            style={{
                                transformOrigin: 'center center',
                            }}
                        >
                            {category.label}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    )
}
export default CafeSearchFilter