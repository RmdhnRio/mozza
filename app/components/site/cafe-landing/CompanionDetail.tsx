// app/components/site/cafe-landing/CompanionDetail.tsx
'use client'
import React from 'react'
import Image from 'next/image'
import { CompanionData } from './cafe-landing-types'
import { Heart, Clock, Sparkles, AlertTriangle } from 'lucide-react'
interface CompanionDetailProps {
    companion: CompanionData | null
    className?: string
}
export const CompanionDetail = ({ companion, className = '' }: CompanionDetailProps) => {
    if (!companion) {
        return (
            <section className={`w-full px-6 md:px-16 lg:px-24 ${className}`}>
                <div className="bg-neutral-gray-50 rounded-2xl p-8 text-center">
                    <span className="text-4xl mb-4 block">👆</span>
                    <p className="font-switzer text-gray-500">
                        Select a companion above to see their details
                    </p>
                </div>
            </section>
        )
    }
    return (
        <section className={`w-full px-6 md:px-16 lg:px-24 ${className}`}>
            <div className="bg-neutral-gray-50 rounded-2xl overflow-hidden">
                <div className="flex flex-col lg:flex-row">

                    {/* Left: Image */}
                    <div className="relative w-full lg:w-1/3 min-h-[300px] lg:min-h-[400px]">
                        <Image
                            src={companion.image}
                            alt={companion.name}
                            fill
                            className="object-cover"
                        />
                        {/* Personality badge on image */}
                        <div className="absolute bottom-4 left-4">
                            <span className="inline-flex items-center gap-1 px-3 py-1.5 
                bg-white/90 backdrop-blur-sm text-gray-800 rounded-full 
                text-sm font-switzer font-medium shadow-sm">
                                <Heart className="w-4 h-4 text-red-400 fill-current" />
                                {companion.personality}
                            </span>
                        </div>
                    </div>
                    {/* Right: Content */}
                    <div className="flex-1 p-6 lg:p-8">
                        {/* Header */}
                        <div className="flex items-start justify-between mb-4">
                            <div>
                                <h2 className="font-plein font-bold text-2xl lg:text-3xl text-gray-900 mb-1">
                                    {companion.name}
                                </h2>
                                <p className="font-switzer text-gray-500">{companion.breed}</p>
                            </div>
                            {/* Paw decoration */}
                            <div className="hidden md:block">
                                <Image
                                    src="/images/paw-decoration.png"
                                    alt=""
                                    width={60}
                                    height={60}
                                    className="opacity-30"
                                    onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
                                />
                            </div>
                        </div>
                        {/* Visiting Hours */}
                        <div className="flex items-center gap-2 text-gray-700 mb-4">
                            <Clock className="w-5 h-5" />
                            <span className="font-switzer font-medium">
                                Visiting hours: {companion.visitingHours}
                            </span>
                        </div>
                        {/* Description */}
                        <p className="font-switzer text-gray-600 mb-6">
                            {companion.description}
                        </p>
                        {/* Quirks & Preferences */}
                        <div className="mb-6">
                            <h3 className="font-plein font-bold text-lg text-gray-900 mb-3 flex items-center gap-2">
                                <Sparkles className="w-5 h-5 text-amber-500" />
                                Quirks & Preferences
                            </h3>
                            <ul className="space-y-2">
                                {companion.quirks.map((quirk, index) => (
                                    <li key={index} className="flex items-start gap-2">
                                        <span className="text-amber-500 mt-0.5">🐾</span>
                                        <span className="font-switzer text-gray-600">{quirk}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        {/* Visit Tips */}
                        <div>
                            <h3 className="font-plein font-bold text-lg text-gray-900 mb-3 flex items-center gap-2">
                                <AlertTriangle className="w-5 h-5 text-amber-500" />
                                Visit Tips
                            </h3>
                            <ul className="space-y-2">
                                {companion.visitTips.map((tip, index) => (
                                    <li key={index} className="flex items-start gap-2">
                                        <span className="text-amber-500 mt-0.5">⚠️</span>
                                        <span className="font-switzer text-gray-600">{tip}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
export default CompanionDetail