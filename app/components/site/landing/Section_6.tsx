import React from 'react';
import Image from 'next/image';
import { Mail } from 'lucide-react';

export default function Section_6() {
    return (
        <section className="w-full py-20 bg-white">
            <div className="container mx-auto px-4 md:px-8 lg:px-16">

                {/*  Main Card with Gradient */}
                <div className="relative w-full max-w-6xl mx-auto rounded-[3rem] overflow-hidden bg-gradient-to-r from-[#F9A8D4] to-[#DDA5FF] shadow-2xl min-h-[400px] flex flex-col justify-center items-center text-center p-8 md:p-12">

                    {/* Cat Paw - bottom left */}
                    <div className="absolute top-[1rem] left-[-5rem] w-32 md:w-48 lg:w-80 z-10">
                        <Image
                            src="/images/cat_paw.png"
                            alt="Cat Paw"
                            width={500}
                            height={500}
                            className="object-contain"
                        />
                    </div>

                    {/* Twingle - Top Right */}
                    <div className="absolute top-0 right-0 w-48 md:w-72 lg:w-90 z-10">
                        <Image
                            src="/images/twingle.png"
                            alt="Twingle"
                            width={500}
                            height={500}
                            className="object-contain"
                        />
                    </div>

                    {/* Main Content */}
                    <div className="relative z-20 max-w-2xl mx-auto space-y-6">
                        <div className="space-y-2">
                            <p className="text-white text-lg md:text-xl font-medium tracking-wide">
                                Subscribe to our newsletter
                            </p>
                            <h2 className="text-3xl md:text-5xl font-bold text-white leading-tight">
                                For our Promos and Benefits
                            </h2>
                        </div>

                        {/* Email Input Field */}
                        <div className="bg-white p-2 rounded-full shadow-lg flex items-center max-w-lg mx-auto mt-8 transition-transform focus-withn:scale-105 duration-300">
                            <input
                                type="email"
                                placeholder="Example@email.com"
                                className="flex-1 px-6 py-3 text-gray-700 placeholder-gray-400 bg-transparent border-none outline-none focus:ring-0 text-base md:text-lg" />
                            <button className="bg-[#A855F7] hover:bg-[#9333EA] text-white p-3 md:p-4 rounded-full transition-colors shadow-md flex items-center justify-center group">
                                <Mail className="w-6 h-6 group-hover:scale-110 transition-transform" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}