'use client'

import Image from 'next/image'
import { Button } from '@/app/components/ui/button';


export default function Section3() {
  return (
    <section className="relative py-32 px-6 md:px-16 lg:px-24 bg-white">

      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">

        {/* LEFT CAPTION */}
        <div>
          <h2 className="font-plein font-bold text-[4rem] leading-[1.1] text-brand-green mb-6">
            Grooming
          </h2>

          <p className="font-switzer text-gray-700 text-lg leading-relaxed max-w-md mb-10">
            Happy to help you keep your furry friends looking their best!
            We offer a range of grooming services for cats and dogs, including baths, nail trimming, and grooming.
            Our team of experienced groomers will ensure your pet is comfortable and happy during their grooming session.
          </p>

          <Button variant="brand-green" className="text-white font-switzer" size="md" onClick={() => { }}>
            Schedule a Call
          </Button>
        </div>

        {/* RIGHT IMAGES */}
        <div className="relative flex justify-center md:justify-end">

          <div
            className="
                    w-[380px] h-[560px]
                    overflow-hidden
                    relative"
          >
            <Image
              src="/images/cat_grooming.png"
              alt="Cat Grooming"
              width={380}
              height={560}
              className="object-cover w-full h-full"
            />
          </div>

          <div
            className="
                    w-[230px] h-[230px]
                    overflow-hidden
                    absolute bottom-[-40px] right-[320px]
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
    </section>
  )
}