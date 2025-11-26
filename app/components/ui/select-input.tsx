'use client'

import React from 'react'
import { ChevronDown } from 'lucide-react'

interface SelectInputProps {
    label: string
    value: string
    options: string[]
    onChange: (val: string) => void
    className?: string
    accentColor?: string
}

export function SelectInput({
    label,
    value,
    options,
    onChange,
    className = '',
    accentColor = 'bg-brand-purple'
}: SelectInputProps) {
    return (
        <div className={`relative ${className}`}>
            <label className="block text-xs font-switzer text-gray-500 mb-1">{label}</label>
            <div className="relative">
                <select
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    className={`
            w-full appearance-none bg-brand-purple/10 rounded-lg px-4 py-2 pr-10
            font-switzer font-medium text-gray-800
            focus:outline-none focus:ring-2 focus:ring-brand-purple/20
            cursor-pointer
          `}
                >
                    {options.map((opt) => (
                        <option key={opt} value={opt}>{opt}</option>
                    ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-brand-purple pointer-events-none" />
            </div>
        </div>
    )
}
