'use client'

import React, { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { X } from 'lucide-react'

interface DialogProps {
    isOpen: boolean
    onClose: () => void
    children: React.ReactNode
    className?: string
}

export const Dialog = ({ isOpen, onClose, children, className = '' }: DialogProps) => {
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
        return () => setMounted(false)
    }, [])

    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose()
        }

        if (isOpen) {
            document.addEventListener('keydown', handleEscape)
            document.body.style.overflow = 'hidden'
        }

        return () => {
            document.removeEventListener('keydown', handleEscape)
            document.body.style.overflow = 'unset'
        }
    }, [isOpen, onClose])

    if (!mounted || !isOpen) return null

    return createPortal(
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            />
            <div
                className={`relative lg:top-5 bg-white rounded-3xl w-full max-w-5xl max-h-[90vh] overflow-y-auto shadow-2xl animate-in fade-in zoom-in-95 duration-200 ${className}`}
            >
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 p-2 bg-white/80 backdrop-blur-sm hover:bg-white rounded-full transition-colors z-10 shadow-sm"
                >
                    <X className="w-6 h-6 text-gray-800" />
                </button>
                {children}
            </div>
        </div>,
        document.body
    )
}
