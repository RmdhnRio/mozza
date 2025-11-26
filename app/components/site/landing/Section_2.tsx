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
    <section className="relative bg-white pb-32 px-6 md:px-16 lg:px-24">

      {/* Big Card */}
      <div
        className="
          relative mx-auto max-w-5xl
          bg-white
          rounded-[100px]
          shadow-mozza
          p-8 md:p-16
        "
      >
        <div className="grid md:grid-cols-2 gap-12 items-center">

          {/* LEFT TEXT */}
          <div>
            <h2 className="font-plein font-bold text-[4.2rem] leading-[1.1] text-[#FE6BA8] mb-6">
              Proper Food <br />
              For your <br />
              Anabul
            </h2>

            <p className="font-switzer text-gray-500 text-lg max-w-md">
              We provide the best nutrition from the most trusted brands
              all over the world for your furry family.
            </p>
          </div>

          {/* RIGHT IMAGES */}
          <div className="relative flex flex-col gap-6">
            <div className="w-[380px] h-[380px] overflow-hidden self-center md:self-end">
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
        <div className="mt-16">
          <div
            className="
            flex gap-12 overflow-x-auto brand-scroll
            snap-x snap-mandatory
            pb-4
            "
          >
            {brands.map((b, i) => (
              <div
                key={i}
                className="
                  snap-start
                  min-w-[170px]
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
                  className="object-contain"
                />
              </div>
            ))}
          </div>

          <div className="text-right mt-4">
            <button className="font-switzer text-purple-500 hover:underline flex items-center gap-1 ml-auto">
              More available brand
              <span>→</span>
            </button>
          </div>
        </div>

      </div>
    </section>
  )
}
