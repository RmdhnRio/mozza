'use client'

import React from 'react'
import { Plus, Minus } from 'lucide-react'

interface CounterInputProps {
    label: string
    value: number
    onChange: (val: number) => void
    min?: number
    max?: number
    className?: string
    accentColor?: string
}

export function CounterInput({
    label,
    value,
    onChange,
    min = 0,
    max = 99,
    className = '',
    accentColor = 'bg-brand-purple'
}: CounterInputProps) {

    const increment = () => {
        if (value < max) onChange(value + 1)
    }

    const decrement = () => {
        if (value > min) onChange(value - 1)
    }

    return (
        <div className={`flex items-center justify-between ${className}`}>
            <div>
                <label className="block text-xs font-switzer text-brand-purple mb-1">{label}</label>
                <input
                    type="text"
                    inputMode="numeric"
                    value={value}
                    onChange={(e) => {
                        let inputValue = e.target.value.replace(/[^0-9]/g, '')
                        if (inputValue === '') {
                            onChange(min)
                            return
                        }
                        let newValue = parseInt(inputValue, 10)
                        if (newValue > max) newValue = max
                        onChange(newValue)
                    }}
                    className="font-switzer font-bold text-gray-800 text-4xl leading-none w-20 bg-transparent border-none focus:outline-none p-0"
                />
            </div>

            <div className="flex flex-col gap-1">
                <button
                    onClick={increment}
                    className={`w-6 h-6 rounded flex items-center justify-center text-white transition-colors hover:opacity-90 ${accentColor}`}
                >
                    <Plus className="w-4 h-4" />
                </button>
                <button
                    onClick={decrement}
                    className={`w-6 h-6 rounded flex items-center justify-center text-white transition-colors hover:opacity-90 ${accentColor}`}
                >
                    <Minus className="w-4 h-4" />
                </button>
            </div>
        </div>
    )
}
