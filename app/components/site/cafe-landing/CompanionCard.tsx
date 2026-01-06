// app/components/site/cafe-landing/CompanionCard.tsx
'use client'
import React from 'react'
import Image from 'next/image'
import { CompanionData } from './cafe-landing-types'
import { Heart, Clock } from 'lucide-react'

interface CompanionCardProps {
    companion: CompanionData
    isSelected?: boolean
    onClick?: () => void
}

export const CompanionCard = ({ companion, isSelected = false, onClick }: CompanionCardProps) => {
    return (
        <button
            onClick={onClick}
            className={`
                w-full bg-white rounded-2xl overflow-hidden shadow-sm
                transition-all duration-300 text-left
                hover:shadow-lg hover:-translate-y-1
                ${isSelected ? 'ring-2 ring-brand-peach shadow-lg' : ''}
            `}
        >
            {/* Image Container */}
            <div className="relative h-48 w-full bg-gray-100">
                <Image
                    src={companion.image}
                    alt={companion.name}
                    fill
                    className="object-cover"
                />
                {/*  Paw prints decoration */}
                <div className="absolute top-2 right-2 opacity-30">
                    <span className="text-xl">🐾</span>
                </div>
            </div>

            {/* Content */}
            <div className="p-4">
                {/* Name */}
                <h3 className="font-plein font-bold text-lg text-gray-900 mb-2">
                    {companion.name}
                </h3>

                {/* Visiting Hours */}
                <div className="flex items-center gap-1.5 text-sm text-gray-600 mb-2">
                    <Clock className="w-3.5 h-3.5" />
                    <span className="font-switzer">{companion.visitingHours}</span>
                </div>

                {/* Personality Badge */}
                <div className="flex items-center gap-1 mb-3">
                    <span className="inline-flex items-center gap-1 px-2.5 py-1
                        bg-amber-50 text-amber-700 rounded-full text-xs font-switzer font-medium">
                        {companion.personality}
                        <Heart className="w-3 h-3 fill-current" />
                    </span>
                </div>

                {/* Short Description */}
                <p className="font-switzer text-sm text-gray-500 line-clamp-2 mb-4">
                    {companion.description}
                </p>

                {/* View Profile Button */}
                <div className="inline-flex items-center gap-1 px-4 py-2
                    bg-amber-50 hover:bg-amber-100 text-amber-700
                    rounded-full text-sm font-switzer font-medium transition-colors">
                    View Profile
                </div>
            </div>
        </button>
    )
}

export default CompanionCard