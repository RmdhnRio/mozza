// app/components/site/cafe-landing/HeroSlideshow.tsx
'use client'
import React, { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import { ChevronLeft, Clock } from 'lucide-react'
import { SlideData } from './cafe-landing-types'
interface HeroSlideshowProps {
    className?: string
}
// Default slides data - ganti dengan gambar yang sesuai
const defaultSlides: SlideData[] = [
    {
        id: '1',
        image: '/images/gallery/cat-slideshow.png',
        alt: 'Adorable orange cat companion'
    },
    {
        id: '2',
        image: '/images/gallery/puddle-slideshow.png',
        alt: 'Puddle companion'
    },
    {
        id: '3',
        image: '/images/gallery/golden-retriever-slideshow.png',
        alt: 'Golden Retriever'
    },
    {
        id: '4',
        image: '/images/gallery/shiba-inu-slideshow.png',
        alt: 'Shiba Inu'
    }
]
export const HeroSlideShow = ({ className = '' }: HeroSlideshowProps) => {
    const [currentSlide, setCurrentSlide] = useState(0)
    const [slides] = useState<SlideData[]>(defaultSlides)
    const nextSlide = useCallback(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, [slides.length])
    const goToSlide = (index: number) => {
        setCurrentSlide(index)
    }
    // Auto-play setiap 5 detik
    useEffect(() => {
        const timer = setInterval(nextSlide, 5000)
        return () => clearInterval(timer)
    }, [nextSlide])
    return (
        <section className={`relative w-full px-6 md:px-16 lg:px-24 ${className}`}>
            <div className="relative w-full rounded-3xl overflow-hidden bg-neutral-gray-50">
                {/* Main Container - Two Column Layout */}
                <div className="flex flex-col md:flex-row min-h-[400px] md:min-h-[450px]">
                    {/* Left Content */}
                    <div className="flex-1 p-8 md:p-12 lg:p-16 flex flex-col justify-center">
                        {/* Back Button (optional) */}
                        <button className="inline-flex items-center gap-2 text-sm text-gray-600 
              hover:text-gray-900 mb-6 w-fit px-4 py-2 rounded-full bg-white shadow-sm">
                            <ChevronLeft className="w-4 h-4" />
                            Back to Schedule
                        </button>
                        {/* Title */}
                        <h1 className="font-plein font-bold text-3xl md:text-4xl lg:text-5xl text-gray-900 mb-4">
                            Today&apos;s Pet Companions
                        </h1>
                        {/* Description */}
                        <p className="font-switzer text-gray-600 text-base md:text-lg mb-6 max-w-md">
                            Check the schedule of our adorable pet companions so you know
                            when to come and play with your favorites!
                        </p>
                        {/* Active Hours */}
                        <div className="flex items-center gap-2 text-gray-700">
                            <Clock className="w-5 h-5" />
                            <span className="font-switzer font-medium">
                                Active hours: 10:00 AM - 6:00 PM
                            </span>
                        </div>
                    </div>
                    {/* Right - Slideshow */}
                    <div className="relative flex-1 min-h-[300px] md:min-h-full">
                        {/* Paw prints decoration */}
                        <div className="absolute top-4 right-4 z-10 opacity-20">
                            <span className="text-4xl">🐾</span>
                        </div>
                        {/* Slides */}
                        {slides.map((slide, index) => (
                            <div
                                key={slide.id}
                                className={`
                  absolute inset-0 transition-opacity duration-700
                  ${index === currentSlide ? 'opacity-100' : 'opacity-0'}
                `}
                            >
                                <Image
                                    src={slide.image}
                                    alt={slide.alt}
                                    fill
                                    className="object-cover"
                                    priority={index === 0}
                                />
                            </div>
                        ))}
                        {/* Gradient Fade Overlay - Left to Right */}
                        <div className="absolute inset-0 bg-gradient-to-r from-neutral-gray-50 via-neutral-gray-50/60 via-20% to-transparent z-[1]" />
                        {/* Dot Indicators */}
                        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 z-10">
                            {slides.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => goToSlide(index)}
                                    className={`
                    w-2 h-2 rounded-full transition-all duration-300
                    ${index === currentSlide
                                            ? 'bg-white w-6 shadow-md'
                                            : 'bg-white/60 hover:bg-white/80'}
                  `}
                                    aria-label={`Go to slide ${index + 1}`}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
export default HeroSlideShow