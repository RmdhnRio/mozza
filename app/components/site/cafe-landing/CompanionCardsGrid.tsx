// app/components/site/cafe-landing/CompanionCardsGrid.tsx
'use client'
import React from 'react'
import { CompanionData } from './cafe-landing-types'
import { CompanionCard } from './CompanionCard'

interface CompanionCardsGridProps {
    companions: CompanionData[]
    selectedId?: string
    onSelect?: (companion: CompanionData) => void
    className?: string
}

export const CompanionCardsGrid = ({
    companions,
    selectedId,
    onSelect,
    className = ''
}: CompanionCardsGridProps) => {
    return (
        <section className={`w-full px-6 md:px-16 lg:px-24 ${className}`}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {companions.map((companion) => (
                    <CompanionCard
                        key={companion.id}
                        companion={companion}
                        isSelected={companion.id === selectedId}
                        onClick={() => onSelect?.(companion)}
                    />
                ))}
            </div>

            {/* Empty state */}
            {companions.length === 0 && (
                <div className="text-center py-12">
                    <span className="text-4xl mb-4 block">🐾</span>
                    <p className="font-switzer text-gray-500">
                        No companions scheduled for this day.
                    </p>
                </div>
            )}
        </section>
    )
}

export default CompanionCardsGrid