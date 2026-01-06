// app/cafe/page.tsx
'use client'
import React, { useState, useEffect, useCallback } from 'react'
import Navbar from '@/app/components/site/landing/Navbar'
import Footer from '@/app/components/site/landing/Footer'
import { HeroSlideShow } from '@/app/components/site/cafe-landing/HeroSlideShow'
import { MenuCtaBanner } from '@/app/components/site/cafe-landing/MenuCtaBanner'
import { TodayHighlight } from '@/app/components/site/cafe-landing/TodayHighlight'
import { CompanionCardsGrid } from '@/app/components/site/cafe-landing/CompanionCardsGrid'
import { CompanionDetail } from '@/app/components/site/cafe-landing/CompanionDetail'
import { DayNavItem, CompanionData } from '@/app/components/site/cafe-landing/cafe-landing-types'
import { getCompanionsForDate } from '@/app/components/site/cafe-landing/companion-data'
export default function CafePage() {
    // State: Selected date from TodayHighlight
    const [selectedDate, setSelectedDate] = useState<Date>(new Date())

    // State: Companions for selected date
    const [companions, setCompanions] = useState<CompanionData[]>([])

    // State: Selected companion for detail view
    const [selectedCompanion, setSelectedCompanion] = useState<CompanionData | null>(null)
    // Update companions when date changes
    useEffect(() => {
        const dateCompanions = getCompanionsForDate(selectedDate)
        setCompanions(dateCompanions)

        // Auto-select first companion, or clear if none
        if (dateCompanions.length > 0) {
            setSelectedCompanion(dateCompanions[0])
        } else {
            setSelectedCompanion(null)
        }
    }, [selectedDate])
    // Handler: Date selected from TodayHighlight
    const handleDaySelect = useCallback((day: DayNavItem) => {
        setSelectedDate(day.date)
    }, [])
    // Handler: Companion card clicked
    const handleCompanionSelect = (companion: CompanionData) => {
        setSelectedCompanion(companion)
    }
    return (
        <main className="min-h-screen bg-white">
            <Navbar variant="dark" />

            <div className="pt-24 md:pt-28 pb-16">
                {/* Step 1: Hero Slideshow */}
                <HeroSlideShow className="mb-8 md:mb-12" />

                {/* Step 2: Menu CTA Banner */}
                <MenuCtaBanner className="mb-8 md:mb-12" />

                {/* Step 3: Today's Highlight Navigation */}
                <TodayHighlight
                    onDaySelect={handleDaySelect}
                    className="mb-8 md:mb-12"
                />

                {/* Step 4: Companion Cards Grid */}
                <CompanionCardsGrid
                    companions={companions}
                    selectedId={selectedCompanion?.id}
                    onSelect={handleCompanionSelect}
                    className="mb-8 md:mb-12"
                />

                {/* Step 5: Companion Detail */}
                <CompanionDetail
                    companion={selectedCompanion}
                    className="mb-8 md:mb-12"
                />
            </div>

            <Footer />
        </main>
    )
}