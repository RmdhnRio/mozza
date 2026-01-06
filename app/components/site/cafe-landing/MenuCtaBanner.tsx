// app/components/site/cafe-landing/MenuCtaBanner.tsx
'use client'
import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ChevronRight } from 'lucide-react'

interface MenuCtaBannerProps {
    className?: string
}

export const MenuCtaBanner = ({ className = '' }: MenuCtaBannerProps) => {
    return (
        <section className={`w-full px-6 md:px-16 lg:px-24 ${className}`}>
            <div className="relative w-full rounded-2xl overflow-hidden min-h-[160px] md:min-h-[180px]">

                {/* Background Image */}
                <Image
                    src="/images/gallery/cafe-cta.png"
                    alt="Cafe food background"
                    fill
                    className="object-cover object-right"
                />

                {/* Gradient Fade Overlay - Left to Right */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#FFF5E6] via-[#FFF5E6]/90 via-40% to-transparent" />

                {/* Content Container */}
                <div className="relative z-10 flex items-center p-6 md:p-8 lg:p-10 h-full">
                    {/* Left Content */}
                    <div className="max-w-md">
                        <h2 className="font-plein font-bold text-xl md:text-2xl lg:text-3xl text-gray-900 mb-2">
                            Hungry while you visit?
                        </h2>
                        <p className="font-switzer text-gray-600 text-sm md:text-base mb-4">
                            Order food & drinks before or during your visit.
                        </p>

                        {/* CTA Button */}
                        <Link
                            href="/menu"
                            className="inline-flex items-center gap-2 px-6 py-3 
                                bg-brand-peach hover:bg-amber-400 text-gray-900 
                                font-switzer font-semibold rounded-full 
                                transition-all duration-300 shadow-md hover:shadow-lg"
                        >
                            View Menu
                            <ChevronRight className="w-4 h-4" />
                        </Link>

                        {/* Paw prints decoration */}
                        <span className="inline-block ml-4 text-2xl opacity-30">🐾</span>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default MenuCtaBanner