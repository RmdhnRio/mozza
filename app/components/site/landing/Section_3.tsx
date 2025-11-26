'use client'

import Image from 'next/image'
import { Button } from '@/app/components/ui/button';


export default function Section3() {
  return (
    <section className="relative py-16 md:py-32 px-6 md:px-16 lg:px-24 bg-white">

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">

        {/* LEFT CAPTION */}
        <div className="text-center md:text-left">
          {/* Responsive Text Size: text-5xl di mobile, text-[4rem] di desktop */}
          <h2 className="font-plein font-bold text-5xl md:text-[4rem] leading-[1.1] text-brand-green mb-6">
            Grooming
          </h2>

          <p className="font-switzer text-gray-700 text-lg leading-relaxed max-w-md mx-auto md:mx-0 mb-10">
            Happy to help you keep your furry friends looking their best!
            We offer a range of grooming services for cats and dogs, including baths, nail trimming, and grooming.
            Our team of experienced groomers will ensure your pet is comfortable and happy during their grooming session.
          </p>

          <Button variant="brand-green" className="text-white font-switzer" size="md" onClick={() => { }}>
            Schedule a Call
          </Button>
        </div>

        {/* RIGHT IMAGES */}
        <div className="relative flex justify-center md:justify-end mt-8 md:mt-0">

          {/* Wrapper Container untuk menjaga posisi relatif gambar */}
          <div className="relative">
            {/* Main Image */}
            <div
              className="
                w-[280px] h-[410px] 
                md:w-[380px] md:h-[560px]
                overflow-hidden
                relative rounded-2xl"
            >
              <Image
                src="/images/cat_grooming.png"
                alt="Cat Grooming"
                width={380}
                height={560}
                className="object-cover w-full h-full"
              />
            </div>

            {/* Secondary Image (Overlapping) */}
            {/* Posisi absolute relatif terhadap wrapper, bukan section */}
            <div
              className="
                w-[160px] h-[160px]
                md:w-[230px] md:h-[230px]
                overflow-hidden
                absolute -bottom-8 -left-[0]
                md:bottom-[-40px] md:left-[-150px]
                
              "
            >
              <Image
                src="/images/dog_grooming.png"
                alt="Dog Grooming"
                width={230}
                height={230}
                className="object-cover w-full h-full"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}