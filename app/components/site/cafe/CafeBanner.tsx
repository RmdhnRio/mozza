'use client'

import React, { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'

interface BannerProps {
    id: string
    image: string
    title: string
    subtitle?: string
}

interface CafeBannerProps {
    slides?: BannerProps[]
    autoPlayInterval?: number
    className?: string
}

const defaultSlides: BannerProps[] = [
    {
        id: '1',
        image: '/images/cafe/promo-1.jpg',
        title: 'Special Promo',
        subtitle: 'Get 20% off on all drinks'
    },
    {
        id: '2',
        image: '/images/cafe/promo-2.jpg',
        title: 'New Menu',
        subtitle: 'Try our new signature coffee'
    },
    {
        id: '3',
        image: '/images/cafe/promo-3.jpg',
        title: 'Weekend Deal',
        subtitle: 'Free pastry with any coffee purchase'
    },
]

export const CafeBanner = ({
    slides = defaultSlides,
    autoPlayInterval = 5000,
    className = '',
}: CafeBannerProps) => {
    const [currentSlide, setCurrentSlide] = useState(0)

    const nextSlide = useCallback(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, [slides.length])

    const goToSlide = (index: number) => {
        setCurrentSlide(index)
    }

    // Auto-play
    useEffect(() => {
        const timer = setInterval(nextSlide, autoPlayInterval)
        return () => clearInterval(timer)
    }, [nextSlide, autoPlayInterval])

    return (
        <div className={`relative w-full ${className}`}>
            {/* Banner Container */}
            <div className="relative w-full aspect-[21/9] md:aspect-[3/1] lg:aspect-[4/1] overflow-hidden rounded-2xl bg-neutral-gray-50">
                {slides.map((slide, index) => (
                    <div
                        key={slide.id}
                        className={`
                            absolute inset-0 transition-opactity duration-700
                            ${index === currentSlide ? 'opactity-100' : 'opacity-0'}
                        `}
                    >
                        <Image
                            src={slide.image}
                            alt={slide.title}
                            fill
                            className="object-cover"
                            priority={index === 0}
                        />
                        {/* Overlay gradient */}
                        <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-transparent" />

                        {/* Content */}
                        <div className="absolute bottom-6 left-6 md:bottom-10 md:left-10 text-white">
                            <h2 className="font-plein font-bold text-2xl md:text-4xl lg:text-5xl mb-2">
                                {slide.title}
                            </h2>
                            {slide.subtitle && (
                                <p className="font-switzer text-sm md:text-lg opacity-90">
                                    {slide.subtitle}
                                </p>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            {/* Dot Indicators */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2">
                {slides.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => goToSlide(index)}
                        className={`
                            w-2 h-2 rounded-full transition-all duration-300
                            ${index === currentSlide
                                ? 'bg-white w-6'
                                : 'bg-white/50 hover:bg-white/70'}
                        `}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>

            {/* Arrow Control (Desktop Only) */}
            <button
                onClick={() => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)}
                className="absolute left-4 top-1/2 -translate-y-1/2 hidden md:flex w-10 h-10 rounded-full bg-white/20
                    backdrop-blur-sm items-center justify-center text-white hover:bg-white/40 transition-colors"
                aria-label="Previous slide"
            >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
            </button>
            <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 -translate-y-1/2 hidden md:flex w-10
                    h-10 rounded-full bg-white/20 backdrop-blur-sm items-center justify-center
                    text-white hover:bg-white/40 transition-colors"
                aria-label="Next slide"
            >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
            </button>
        </div>
    )
}

export default CafeBanner