'use client'
import { useState, useMemo } from 'react'
import Navbar from '@/app/components/site/landing/Navbar'
import { CafeBanner } from '@/app/components/site/cafe/CafeBanner'
import { CafeSearchFilter } from '@/app/components/site/cafe/CafeSearchFilter'
import { CafeMenuGrid } from '@/app/components/site/cafe/CafeMenuGrid'
import { cafeMenuItems } from '@/app/components/site/cafe/cafe-menu-data'
import FloatingCart from '@/app/components/site/cafe/FloatingCart'
import Footer from '@/app/components/site/landing/Footer'
export default function MenuPage() {
    const [searchQuery, setSearchQuery] = useState('')
    const [activeCategory, setActiveCategory] = useState('all')
    // Filter items based on search and category
    const filteredItems = useMemo(() => {
        return cafeMenuItems.filter((item) => {
            const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                item.description.toLowerCase().includes(searchQuery.toLowerCase())
            const matchesCategory = activeCategory === 'all' ||
                activeCategory === 'promo' ? item.variant === 'promo' :
                item.category === activeCategory

            return matchesSearch && matchesCategory
        })
    }, [searchQuery, activeCategory])
    return (
        <main className="min-h-screen bg-white">
            {/* Navbar - using existing component */}
            <Navbar variant="dark" />
            {/* Main Content */}
            <div className="pt-24 md:pt-28 pb-16">
                {/* Banner Promo Section */}
                <section className="px-6 md:px-16 lg:px-24 mb-8 md:mb-12">
                    <CafeBanner />
                </section>
                {/* Search & Filter Section */}
                <section className="px-6 md:px-16 lg:px-24 mb-8">
                    <CafeSearchFilter
                        onSearch={setSearchQuery}
                        onCategoryChange={setActiveCategory}
                    />
                </section>
                {/* Food Cards Grid Section */}
                <section className="px-6 md:px-16 lg:px-24">
                    {filteredItems.length > 0 ? (
                        <CafeMenuGrid items={filteredItems} />
                    ) : (
                        <div className="text-center py-16">
                            <p className="text-gray-500 text-lg">No items found</p>
                        </div>
                    )}
                </section>
            </div>

            {/* Floating Cart */}
            <FloatingCart />

            {/* Footer */}
            <Footer />
        </main>
    )
}