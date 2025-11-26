'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { ArrowLeft, ArrowRight, Star } from 'lucide-react';
import { testimonials } from './testimonial-data';

export default function Section_5() {
    const [currentIndex, setCurrentIndex] = useState(0);

    const handleNext = () => {
        setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    };

    const handlePrev = () => {
        setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    };

    const currentTestimonial = testimonials[currentIndex];

    return (
        <section className="w-full py-20 bg-white">
            <div className="container mx-auto px-4 md:px-8 lg:px-16">
                <div className="bg-white rounded-[2.5rem] shadow-xl p-8 md:p-12 lg:p-16 max-w-6xl mx-auto border border-gray-100">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

                        {/* Left Content: Text */}
                        <div className="space-y-8">
                            <div className="text-pink-300 text-6xl font-serif">“</div>
                            <h2 className="text-5xl md:text-6xl font-bold text-pink-200 leading-tight">
                                What our <br />
                                <span className="text-pink-300">Customer</span><br />
                                Says
                            </h2>

                            <div className="space-y-4">
                                <p className="text-xl text-gray-800 font-medium max-w-md">
                                    "{currentTestimonial.quote}"
                                </p>
                                <div className="flex items-center gap-3">
                                    <div className="h-0.5 w-8 bg-gray-800"></div>
                                    <p className="text-lg font-semibold text-gray-500 ml-2">
                                        {currentTestimonial.name}
                                        <span className="text-sm font-normal text-gray-500 ml-2">
                                            {currentTestimonial.date}
                                        </span>
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Right Content: Image & Card */}
                        <div className="relative flex justify-center lg:justify-end">
                            {/* Main Customer Image */}
                            <div className="relative w-[300px] h-[300px] md:w-[400px] md:h-[400px] rounded-full overflow-hidden border-4 border-white shadow-xl z-10">
                                {/* Gunakan Image dari next/image */}
                                <Image
                                    src={currentTestimonial.image}
                                    alt={currentTestimonial.name}
                                    fill
                                    className="object-cover"
                                />
                            </div>

                            {/* Floating Food Card */}
                            <div className="absolute -bottom-10 left-0 md:-left-10 bg-white p-4 rounded-2xl shadow-lg z-20 flex items-center gap-4 max-w-[280px] animate-in fade-in slide-in-from-bottom-4 duration-500">
                                <div className="relative w-20 h-20 rounded-xl overflow-hidden flex-shrink-0">
                                    <Image
                                        src={currentTestimonial.foodItem.image}
                                        alt={currentTestimonial.foodItem.name}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                                <div>
                                    <h4 className="font-bold text-gray-900 text-sm">
                                        {currentTestimonial.foodItem.name}
                                    </h4>
                                    <p className="text-gray-500 text-xs mb-1">
                                        {currentTestimonial.foodItem.category}
                                    </p>
                                    <div className="flex gap-0.5">
                                        {[...Array(5)].map((_, i) => (
                                            <Star
                                                key={i}
                                                className={`w-3 h-3 ${i < Math.floor(currentTestimonial.foodItem.rating)
                                                    ? 'fill-yellow-400 text-yellow-400'
                                                    : 'fill-gray-200 text-gray-200'
                                                    }`}
                                            />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/*  Navigation Controls */}
                    <div className="flex justify-end items-center gap-4 mt-12 lg:mt-0">
                        <button
                            onClick={handlePrev}
                            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                            aria-label="Previous testimonials">
                            <ArrowLeft className="w-6 h-6 text-gray-600" />
                        </button>

                        <div className="flex gap-2">
                            {testimonials.map((_, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setCurrentIndex(idx)}
                                    className={`w-2.5 h-2.5 rounded-full transition-all ${idx === currentIndex ? 'bg-gray-800 w-6' : 'bg-gray-300'
                                        }`}
                                    aria-label={`Go to slide ${idx + 1}`}
                                />
                            ))}
                        </div>

                        <button
                            onClick={handleNext}
                            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                            aria-label="Next testimonial"
                        >
                            <ArrowRight className="w-6 h-6 text-gray-600" />
                        </button>
                    </div>
                </div>
            </div>
        </section>
    )
}
