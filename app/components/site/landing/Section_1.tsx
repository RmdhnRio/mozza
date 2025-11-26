'use client'

import Image from 'next/image'

export default function Section1() {
  const services = [
    { title: 'Pet Food', desc: 'High-quality nutrition for your pets every day.', icon: '/images/icon_petfood.png', color: 'text-pink-400' },
    { title: 'Grooming', desc: 'Professional grooming to keep them clean and comfy.', icon: '/images/icon_grooming.png', color: 'text-teal-400' },
    { title: 'Pet Hotel', desc: 'Safe and cozy stays while you’re away.', icon: '/images/icon_pethotel.png', color: 'text-purple-400' },
    { title: 'Pet Cafe', desc: 'Hang out with your furry friends and relax.', icon: '/images/icon_petcafe.png', color: 'text-yellow-400' },
  ]

  return (
    <section id="service" className="relative bg-white pb-24">

      <h2 className="text-center font-plein text-3xl md:text-4xl text-purple-500 mb-5">
        Everything you need, <br /> all in one piece!
      </h2>

      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center px-6 md:px-16 lg:px-24">

        {/* Left Dog Illustration */}
        <div className="flex justify-center">
          <Image
            src="/images/shopping_dog.png"
            width={480}
            height={480}
            alt="shopping dog"
            className="object-contain"
          />
        </div>

        {/* Right Service Grid */}
        <div className="grid grid-cols-2 gap-6">
          {services.map((s, i) => (
            <div
              key={i}
              className="
                group p-6 rounded-3xl border border-gray-100 bg-white
                transition-all duration-300
                hover:shadow-[0_20px_60px_rgba(0,0,0,0.08)]
                hover:-translate-y-1
              "
            >
              <div className="mb-3">
                <Image src={s.icon} width={48} height={48} alt={s.title} />
              </div>

              <h3 className={`font-plein text-lg font-semibold ${s.color}`}>
                {s.title}
              </h3>

              <p className="font-switzer text-sm text-gray-500 mt-1 leading-snug">
                {s.desc}
              </p>

            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
