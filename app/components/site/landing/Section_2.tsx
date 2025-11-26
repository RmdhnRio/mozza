'use client'

import Image from 'next/image'

export default function Section2() {
  const brands = [
    { src: '/images/whiskas.png', alt: 'Whiskas' },
    { src: '/images/purina.png', alt: 'Purina' },
    { src: '/images/royal_canin.png', alt: 'Royal Canin' },
    { src: '/images/sheba.png', alt: 'Sheba' },
    { src: '/images/pedigree.png', alt: 'Pedigree' },
  ]

  return (
    <section className="relative bg-white pb-16 md:pb-32 px-4 md:px-16 lg:px-24">

      {/* Big Card */}
      <div
        className="
          relative mx-auto max-w-5xl
          bg-white
          rounded-[40px] md:rounded-[100px]
          shadow-mozza
          p-6 md:p-16
        "
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">

          {/* LEFT TEXT */}
          <div className="text-center md:text-left">
            {/* Responsive Text: text-5xl di mobile, 4.2rem di desktop */}
            <h2 className="font-plein font-bold text-5xl md:text-[4.2rem] leading-[1.1] text-[#FE6BA8] mb-4 md:mb-6">
              Proper Food <br />
              For your <br />
              Anabul
            </h2>

            <p className="font-switzer text-gray-500 text-base md:text-lg max-w-md mx-auto md:mx-0">
              We provide the best nutrition from the most trusted brands
              all over the world for your furry family.
            </p>
          </div>

          {/* RIGHT IMAGES */}
          <div className="relative flex flex-col gap-6">
            <div className="w-full max-w-[300px] md:max-w-[380px] aspect-square overflow-hidden self-center md:self-end rounded-3xl md:rounded-none">
              <Image
                src="/images/dog_cat_eating.png"
                width={380}
                height={380}
                alt="Dog & Cat Eating"
                className="object-cover w-full h-full"
              />
            </div>
          </div>
        </div>

        {/* BRANDS SLIDER */}
        <div className="mt-10 md:mt-16">
          <div
            className="
            flex gap-6 md:gap-12 overflow-x-auto brand-scroll
            snap-x snap-mandatory
            pb-4
            "
          >
            {brands.map((b, i) => (
              <div
                key={i}
                className="
                  snap-start
                  min-w-[140px] md:min-w-[170px]
                  py-3
                  bg-white rounded-3xl
                  shadow-lg
                  flex items-center justify-center
                  shrink-0
                "
              >
                <Image
                  src={b.src}
                  alt={b.alt}
                  width={120}
                  height={50}
                  className="object-contain w-[100px] md:w-[120px]"
                />
              </div>
            ))}
          </div>

          <div className="text-right mt-4">
            <button className="font-switzer text-purple-500 hover:underline flex items-center gap-1 ml-auto text-sm md:text-base">
              More available brand
              <span>→</span>
            </button>
          </div>
        </div>

      </div>
    </section>
  )
}
