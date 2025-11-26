'use client'

import React, { useState, useRef, useEffect } from 'react'
import { format, addDays, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, isWithinInterval, startOfWeek, endOfWeek, isBefore, startOfDay } from 'date-fns'
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight } from 'lucide-react'

interface DateRangePickerProps {
    onChange?: (range: { from: Date; to: Date }) => void
    className?: string
    accentColor?: string
}

export function DateRangePicker({ onChange, className = '', accentColor = 'text-brand-purple' }: DateRangePickerProps) {
    const [isOpen, setIsOpen] = useState(false)
    const [currentMonth, setCurrentMonth] = useState(new Date())
    const [startDate, setStartDate] = useState<Date>(new Date())
    const [endDate, setEndDate] = useState<Date | null>(addDays(new Date(), 7))
    const containerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsOpen(false)
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    useEffect(() => {
        if (onChange && startDate && endDate) {
            onChange({ from: startDate, to: endDate })
        }
    }, [startDate, endDate, onChange])

    const handleDateClick = (date: Date) => {
        // If range is complete (both selected), start over with new start date
        if (startDate && endDate) {
            setStartDate(date)
            setEndDate(null)
            return
        }

        // If picking end date
        if (!endDate) {
            // Validation: End date cannot be smaller than start date
            if (isBefore(date, startDate)) {
                setStartDate(date) // Treat as correction of start date
                return
            }

            // Validation: Start and end cannot be same day
            if (isSameDay(date, startDate)) {
                return // Ignore click
            }

            // Valid end date
            setEndDate(date)
            setIsOpen(false)
        }
    }

    const daysInMonth = eachDayOfInterval({
        start: startOfWeek(startOfMonth(currentMonth)),
        end: endOfWeek(endOfMonth(currentMonth))
    })

    const nextMonth = () => setCurrentMonth(addDays(endOfMonth(currentMonth), 1))
    const prevMonth = () => setCurrentMonth(addDays(startOfMonth(currentMonth), -1))

    return (
        <div className={`relative ${className}`} ref={containerRef}>
            {/* Trigger */}
            <div className="flex gap-4">
                <div
                    className="flex-1 cursor-pointer group"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    <label className="block text-xs font-switzer text-gray-500 mb-1">Check-In</label>
                    <div className="flex items-center gap-3">
                        <CalendarIcon className={`w-6 h-6 ${accentColor}`} />
                        <div>
                            <div className="font-switzer font-bold text-gray-800 text-lg leading-none">
                                {format(startDate, 'dd MMMM')}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="w-[1px] bg-gray-200 self-end h-10 mb-1"></div>

                <div
                    className="flex-1 cursor-pointer group"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    <label className="block text-xs font-switzer text-gray-500 mb-1">Check-out</label>
                    <div className="flex items-center gap-3">
                        <CalendarIcon className={`w-6 h-6 ${accentColor}`} />
                        <div>
                            <div className="font-switzer font-bold text-gray-800 text-lg leading-none">
                                {endDate ? format(endDate, 'dd MMM') : 'Select Date'}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Dropdown Calendar */}
            {isOpen && (
                <div className="absolute top-full left-0 mt-4 bg-white rounded-2xl shadow-xl p-4 z-50 w-[320px] border border-gray-100">
                    <div className="flex items-center justify-between mb-4">
                        <button onClick={prevMonth} className="p-1 hover:bg-gray-100 rounded-full"><ChevronLeft className="w-5 h-5 text-gray-600" /></button>
                        <span className="font-switzer font-semibold text-gray-800">{format(currentMonth, 'MMMM yyyy')}</span>
                        <button onClick={nextMonth} className="p-1 hover:bg-gray-100 rounded-full"><ChevronRight className="w-5 h-5 text-gray-600" /></button>
                    </div>

                    <div className="grid grid-cols-7 gap-1 mb-2">
                        {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(d => (
                            <div key={d} className="text-center text-xs font-switzer text-gray-400">{d}</div>
                        ))}
                    </div>

                    <div className="grid grid-cols-7 gap-1">
                        {daysInMonth.map((day, i) => {
                            const isSelected = isSameDay(day, startDate) || (endDate ? isSameDay(day, endDate) : false)
                            const isInRange = endDate ? isWithinInterval(day, { start: startDate, end: endDate }) : false
                            const isCurrentMonth = day.getMonth() === currentMonth.getMonth()

                            return (
                                <button
                                    key={i}
                                    onClick={() => handleDateClick(day)}
                                    className={`
                    h-9 w-9 rounded-full flex items-center justify-center text-sm font-switzer transition-all
                    ${!isCurrentMonth ? 'text-gray-300' : 'text-gray-700'}
                    ${isSelected ? 'bg-brand-purple text-white shadow-md' : ''}
                    ${isInRange && !isSelected ? 'bg-brand-purple/10 text-brand-purple' : ''}
                    ${!isSelected && !isInRange && isCurrentMonth ? 'hover:bg-gray-100' : ''}
                  `}
                                >
                                    {format(day, 'd')}
                                </button>
                            )
                        })}
                    </div>
                </div>
            )}
        </div>
    )
}
