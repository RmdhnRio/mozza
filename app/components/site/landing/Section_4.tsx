'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { Button } from '@/app/components/ui/button'
import { DateRangePicker } from '@/app/components/ui/date-range-picker'
import { CounterInput } from '@/app/components/ui/counter-input'
import { SelectInput } from '@/app/components/ui/select-input'
import { ThumbsUp, Star, Users } from 'lucide-react'
import { FoodCard } from './FoodCard'
import { foodItems } from './food-data'

export default function Section4() {
    const [petCount, setPetCount] = useState(2)
    const [petType, setPetType] = useState('Cats')

    return (
        <section className="relative py-24 px-6 md:px-16 lg:px-24 bg-white overflow-hidden">

            {/* === ROW 1: PET HOTEL === */}
            <div className="grid lg:grid-cols-2 gap-16 items-center mb-32">

                {/* LEFT: MASONRY GRID */}
                <div className="grid grid-cols-2 gap-4 h-[600px]">
                    <div className="space-y-4 mt-12">
                        <div className="relative h-[280px] w-full rounded-3xl overflow-hidden group">
                            <Image
                                src="/images/gallery/jae-park-7GX5aICb5i4-unsplash.jpg"
                                alt="Cat Hotel"
                                fill
                                className="object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                            <div className="absolute bottom-4 left-4 flex items-center gap-2 bg-black/30 backdrop-blur-sm rounded-full px-3 py-1">
                                <div className="w-6 h-6 rounded-full overflow-hidden border border-white">
                                    <Image src="/images/gallery/avatar_1.jpg" alt="User" width={24} height={24} />
                                </div>
                                <div className="text-white text-[10px]">
                                    <div className="font-bold">@iniKaika</div>
                                    <div className="opacity-80">16/09/2022</div>
                                </div>
                            </div>
                        </div>
                        <div className="relative h-[200px] w-full rounded-3xl overflow-hidden group">
                            <Image
                                src="/images/gallery/esra-afsar-xa9aU2LJ1uI-unsplash.jpg"
                                alt="Handshake"
                                fill
                                className="object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                            <div className="absolute bottom-4 left-4 flex items-center gap-2 bg-black/30 backdrop-blur-sm rounded-full px-3 py-1">
                                <div className="w-6 h-6 rounded-full overflow-hidden border border-white">
                                    <Image src="/images/gallery/avatar_2.jpg" alt="User" width={24} height={24} />
                                </div>
                                <div className="text-white text-[10px]">
                                    <div className="font-bold">@Rikaraki</div>
                                    <div className="opacity-80">25/11/2019</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div className="relative h-[180px] w-full rounded-3xl overflow-hidden group">
                            <Image
                                src="/images/gallery/sarandy-westfall-VYcDFMSkUAA-unsplash.jpg"
                                alt="Dog Hotel"
                                fill
                                className="object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                            <div className="absolute bottom-4 left-4 flex items-center gap-2 bg-black/30 backdrop-blur-sm rounded-full px-3 py-1">
                                <div className="w-6 h-6 rounded-full overflow-hidden border border-white">
                                    <Image src="/images/gallery/avatar_3.jpg" alt="User" width={24} height={24} />
                                </div>
                                <div className="text-white text-[10px]">
                                    <div className="font-bold">@Mozzarella</div>
                                    <div className="opacity-80">28/10/2021</div>
                                </div>
                            </div>
                        </div>
                        <div className="relative h-[340px] w-full rounded-3xl overflow-hidden group">
                            <Image
                                src="/images/gallery/timo-volz-ZlFKIG6dApg-unsplash.jpg"
                                alt="Cat Stretching"
                                fill
                                className="object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                            <div className="absolute bottom-4 left-4 flex items-center gap-2 bg-black/30 backdrop-blur-sm rounded-full px-3 py-1">
                                <div className="w-6 h-6 rounded-full overflow-hidden border border-white">
                                    <Image src="/images/gallery/avatar_4.jpg" alt="User" width={24} height={24} />
                                </div>
                                <div className="text-white text-[10px]">
                                    <div className="font-bold">@Richards</div>
                                    <div className="opacity-80">13/05/2021</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* RIGHT: CONTENT & BOOKING */}
                <div>
                    <h2 className="font-plein font-bold text-[4rem] leading-[1.1] text-brand-purple mb-6">
                        Pet Hotel
                    </h2>
                    <p className="font-switzer text-gray-700 text-lg leading-relaxed mb-10 max-w-md">
                        A cozy hotel for your anabul. <br />
                        We bet they’re not gonna miss you
                    </p>

                    {/* BOOKING WIDGET */}
                    <div className="bg-white rounded-[2rem] shadow-mozza p-6 border border-purple-50 max-w-md">
                        <div className="grid grid-cols-2 gap-6 mb-6 border-b border-gray-100 pb-6">
                            <DateRangePicker className="col-span-2" />
                        </div>

                        <div className="grid grid-cols-2 gap-6 mb-8">
                            <CounterInput
                                label="Number of pets"
                                value={petCount}
                                onChange={setPetCount}
                                accentColor="bg-brand-purple/40 hover:bg-brand-purple"
                            />
                            <SelectInput
                                label="Pet type"
                                value={petType}
                                options={['Cats', 'Dogs', 'Rabbits', 'Icikiwir']}
                                onChange={setPetType}
                            />
                        </div>

                        <Button variant="brand-purple" fullWidth className="rounded-xl py-4 text-lg font-bold shadow-xl shadow-brand-purple/20">
                            Book Now
                        </Button>
                    </div>
                </div>
            </div>


            {/* === ROW 2: PET CAFE === */}
            <div className="grid lg:grid-cols-2 gap-16 items-center">

                {/* LEFT: CONTENT */}
                <div className="order-2 lg:order-1">
                    <h2 className="font-plein font-bold text-[4rem] leading-[1.1] text-brand-peach mb-6">
                        Pet Cafe
                    </h2>
                    <p className="font-switzer text-gray-700 text-lg leading-relaxed mb-10 max-w-md">
                        A cozy place for you to hangout with friends and pets
                    </p>

                    <Button variant="brand-peach" size="lg" className="rounded-full px-10 py-6 text-xl font-bold text-white shadow-xl shadow-brand-peach/30">
                        Foods & Beverage
                    </Button>
                </div>

                {/* RIGHT: MASONRY GRID */}
                <div className="order-1 lg:order-2 grid grid-cols-2 gap-4 h-[500px]">
                    {foodItems.map((item) => {
                        const Icon = item.iconType === 'ThumbsUp' ? ThumbsUp : item.iconType === 'Star' ? Star : Users
                        return (
                            <FoodCard
                                key={item.id}
                                coverImage={item.coverImage}
                                title={item.title}
                                price={item.price}
                                metaInfo={item.metaInfo}
                                icon={<Icon className="w-4 h-4 text-white" />}
                                className={item.className}
                                description={item.description}
                                details={item.details}
                            />
                        )
                    })}
                </div>

            </div>

        </section>
    )
}
