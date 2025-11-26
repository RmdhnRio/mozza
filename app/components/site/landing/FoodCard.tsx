import React, { useState } from 'react'
import Image from 'next/image'
import { ThumbsUp, Star } from 'lucide-react'
import { Dialog } from '../../ui/dialog'

interface FoodCardProps {
    coverImage: string
    title: string
    price: string
    metaInfo?: string
    className?: string
    icon?: React.ReactNode
    description?: string
    details?: string[]
}

export const FoodCard = ({
    coverImage,
    title,
    price,
    metaInfo,
    className = '',
    icon,
    description = 'Delicious food prepared with fresh ingredients. Perfect for any time of the day.',
    details = ['Freshly prepared', 'Premium ingredients', 'Chef\'s recommendation']
}: FoodCardProps) => {
    const [isDialogOpen, setIsDialogOpen] = useState(false)

    return (
        <>
            <div
                onClick={() => setIsDialogOpen(true)}
                className={`relative w-full rounded-3xl overflow-hidden group cursor-pointer ${className}`}
            >
                <Image
                    src={coverImage}
                    alt={title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                />

                {/* Overlay Gradient for better text visibility */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />

                {/* Top Left Icon/Badge */}
                {icon && (
                    <div className="absolute top-4 left-4 w-8 h-8 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center z-10">
                        {icon}
                    </div>
                )}

                {/* Content */}
                {metaInfo ? (
                    // Layout with Meta Info (Right Aligned)
                    <div className="absolute bottom-4 right-4 text-white text-right z-10">
                        <div className="text-xs opacity-90 mb-1">{metaInfo}</div>
                        <div className="text-2xl font-bold leading-tight">{title}</div>
                        <div className="text-sm font-mono mt-1">
                            IDR. <span className="text-xl">{price}</span>
                        </div>
                    </div>
                ) : (
                    // Layout without Meta Info (Split)
                    <>
                        <div className="absolute bottom-4 left-4 text-white z-10">
                            <div className="text-sm font-bold leading-tight whitespace-pre-line">
                                {title}
                            </div>
                        </div>
                        <div className="absolute bottom-4 right-4 text-white text-right z-10">
                            <div className="text-xs font-mono">
                                IDR. <span className="text-lg font-bold">{price}</span>
                            </div>
                        </div>
                    </>
                )}
            </div>

            <Dialog isOpen={isDialogOpen} onClose={() => setIsDialogOpen(false)}>
                <div className="grid md:grid-cols-2 gap-0 h-full min-h-[400px]">
                    {/* Image Section */}
                    <div className="relative h-64 md:h-full w-full">
                        <Image
                            src={coverImage}
                            alt={title}
                            fill
                            className="object-cover"
                        />
                    </div>

                    {/* Content Section */}
                    <div className="p-8 flex flex-col h-full">
                        <div className="flex-1">
                            <div className="flex items-start justify-between mb-4">
                                <div>
                                    {metaInfo && (
                                        <span className="inline-block px-3 py-1 rounded-full bg-orange-100 text-orange-600 text-xs font-medium mb-2">
                                            {metaInfo}
                                        </span>
                                    )}
                                    <h2 className="text-3xl font-bold text-gray-900 mb-2">{title}</h2>
                                    <div className="text-2xl font-mono text-gray-900">
                                        IDR. {price}
                                    </div>
                                </div>
                            </div>

                            <div className="prose prose-sm text-gray-600 mb-8">
                                <p>
                                    {description}
                                </p>
                                <h4 className="text-sm font-bold text-gray-900 mt-4 mb-2">Details</h4>
                                <ul className="list-disc pl-4 space-y-1">
                                    {details.map((detail, index) => (
                                        <li key={index}>{detail}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        <div className="mt-auto pt-6 border-t border-gray-100">
                            <button className="w-full bg-black text-white py-4 rounded-xl font-bold text-lg hover:bg-gray-800 transition-colors flex items-center justify-center gap-2">
                                <ThumbsUp className="w-5 h-5" />
                                Add to Order
                            </button>
                        </div>
                    </div>
                </div>
            </Dialog>
        </>
    )
}
