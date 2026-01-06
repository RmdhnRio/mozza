// app/components/site/cafe-landing/TodayHighlight.tsx
'use client'
import React, { useState, useRef, useEffect } from 'react'
import { DayNavItem, generateDayNavItems } from './cafe-landing-types'
import { WeatherIcon } from './WeatherIcons'
interface TodayHighlightProps {
    onDaySelect?: (day: DayNavItem) => void
    className?: string
}
export const TodayHighlight = ({ onDaySelect, className = '' }: TodayHighlightProps) => {
    const [days] = useState<DayNavItem[]>(() => generateDayNavItems(new Date()))
    const [selectedDay, setSelectedDay] = useState<DayNavItem | null>(null)
    const scrollRef = useRef<HTMLDivElement>(null)
    // Set default to today
    useEffect(() => {
        const today = days.find(d => d.isToday)
        if (today) {
            setSelectedDay(today)
            onDaySelect?.(today)
        }
    }, [days, onDaySelect])
    const handleDayClick = (day: DayNavItem) => {
        setSelectedDay(day)
        onDaySelect?.(day)
    }
    const isSelected = (day: DayNavItem) => {
        return selectedDay?.date.getTime() === day.date.getTime()
    }
    return (
        <section className={`w-full px-6 md:px-16 lg:px-24 ${className}`}>
            <div ref={scrollRef}
                className="flex items-center gap-3 md:gap-4 overflow-x-auto pb-4 brand-scroll">
                {days.map((day, index) => (
                    <React.Fragment key={day.date.toISOString()}>
                        <button
                            data-day-item
                            onClick={() => handleDayClick(day)}
                            className={`flex-shrink-0 transition-all duration-300
                ${isSelected(day)
                                    ? 'bg-[#FFE7AA] rounded-2xl p-2 min-w-[280px]'
                                    : 'bg-white hover:bg-gray-50 rounded-xl px-4 py-3 min-w-[70px]'}`}
                        >
                            {isSelected(day) ? (
                                /* Selected State - Layered shapes sesuai design */
                                <div className="flex items-center gap-3">
                                    {/* Left section: Single #FFC73B wrapper */}
                                    <div className="bg-[#FFC73B] rounded-lg rounded-tr-2xl overflow-hidden">
                                        {/* Day name */}
                                        <div className="px-4 py-1.5">
                                            <span className="font-switzer font-semibold text-sm text-gray-900">
                                                {day.dayName}
                                            </span>
                                        </div>
                                        {/* Weather row: white wrapper with icon + temperature */}
                                        <div className="bg-white rounded-tr-xl flex items-stretch">
                                            {/* Weather icon - #FFF1CE background with rounded-tr */}
                                            <div className="bg-[#FFF1CE] rounded-tr-xl p-2 flex items-center justify-center">
                                                <WeatherIcon condition={day.weather.condition} size={18} />
                                            </div>
                                            {/* Temperature */}
                                            <div className="px-3 py-1.5 flex items-center">
                                                <span className="font-switzer text-sm text-gray-700 font-medium">
                                                    {day.weather.temperature}°C
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    {/* Right: Full Date */}
                                    <span className="font-switzer text-base md:text-lg text-gray-800 font-medium ml-auto">
                                        {day.dateNumber} {day.monthName} {day.year}
                                    </span>
                                </div>
                            ) : (
                                /* Unselected State - Compact */
                                <div className="flex flex-col items-center gap-1">
                                    <span className="font-switzer text-xs text-gray-500">{day.dayShort}</span>
                                    <WeatherIcon condition={day.weather.condition} size={18} />
                                    {day.isToday && (
                                        <span className="w-1.5 h-1.5 bg-brand-peach rounded-full" />
                                    )}
                                </div>
                            )}
                        </button>
                    </React.Fragment>
                ))}
            </div>
        </section>
    )
}
export default TodayHighlight