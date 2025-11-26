'use client'

import Image from 'next/image'
import Navbar from './Navbar'
import { motion, useMotionValue, useTransform, useScroll } from 'framer-motion'
import { useEffect } from 'react'

export default function Hero() {
  const { scrollYProgress } = useScroll()

  // Scroll parallax
  const yBlob1 = useTransform(scrollYProgress, [0, 1], [0, 80])
  const yBlob2 = useTransform(scrollYProgress, [0, 1], [0, -60])
  const yBlob3 = useTransform(scrollYProgress, [0, 1], [0, 50])

  // Mouse parallax
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX / window.innerWidth - 0.5)
      mouseY.set(e.clientY / window.innerHeight - 0.5)
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [mouseX, mouseY])

  const blob1X = useTransform(mouseX, [-0.5, 0.5], [-25, 25])
  const blob1Y = useTransform(mouseY, [-0.5, 0.5], [-15, 15])
  const blob2X = useTransform(mouseX, [-0.5, 0.5], [35, -35])
  const blob2Y = useTransform(mouseY, [-0.5, 0.5], [20, -20])
  const blob3X = useTransform(mouseX, [-0.5, 0.5], [-15, 15])
  const blob3Y = useTransform(mouseY, [-0.5, 0.5], [20, -20])

  return (
    <section className="relative min-h-[100vh] md:min-h-[130vh] bg-white overflow-hidden">
      <Navbar />

      {/* LAYER 1 — white bg */}
      <div className="absolute inset-0 bg-white z-[0]" />

      {/* LAYER 2 — gradient shape */}
      <div
        className="
          absolute
          top-0
          left-1/2
          -translate-x-1/2
          w-[104%]
          h-[80vh] md:h-[100vh]
          bg-hero-gradient
          rounded-bl-[150px] md:rounded-bl-[600px]
          z-[1]
          overflow-hidden
        "
      />

      {/* LAYER 2b — bottom fade */}
      <div
        className="
          absolute bottom-0 left-0 w-full h-[100px] md:h-[180px] z-[2]
          pointer-events-none
          bg-gradient-to-b from-transparent to-white
        "
      />

      {/* BLOBS - Adjusted for mobile visibility */}
      <motion.div
        className="absolute top-[15%] left-[5%] md:top-[7%] md:left-[28%] w-[120px] md:w-[180px] z-[2] md:z-[10] opacity-60 md:opacity-100"
        style={{ x: blob1X, y: yBlob1 }}
      >
        <Image src="/images/blob_1.png" width={180} height={180} alt="blob1" />
      </motion.div>

      <motion.div
        className="absolute top-[10%] right-[-10%] md:top-[0%] md:right-[-5%] w-[180px] md:w-[260px] z-[3]"
        style={{ x: blob2X, y: yBlob2 }}
      >
        <Image src="/images/blob_2.png" width={260} height={260} alt="blob2" />
      </motion.div>

      <motion.div
        className="absolute bottom-[30%] left-[10%] md:bottom-[45%] md:left-[50%] w-[140px] md:w-[200px] z-[3]"
        style={{ x: blob3X, y: yBlob3 }}
      >
        <Image src="/images/blob_3.png" width={200} height={200} alt="blob3" />
      </motion.div>

      {/* TEXT */}
      <div className="relative z-[4] max-w-3xl px-6 pt-[25vh] md:pt-[18vh] mx-auto md:ml-[25%] text-center md:text-left">
        <h1 className="font-switzer text-white font-medium leading-[1.1] md:leading-[1] text-5xl md:text-[4.5rem] lg:text-[6rem]">
          We Care your <br />
          Anabul <br />
          the same <br />
          way as you
        </h1>
      </div>

      {/* DOG - Hidden on mobile as per original, kept for desktop */}
      <div className="absolute bottom-[18%] left-[5%] z-[50] hidden md:block">
        <Image
          src="/images/dog.png"
          width={360}
          height={360}
          className="drop-shadow-xl"
          alt="dog"
        />
      </div>

      {/* CAT - Hidden on mobile as per original, kept for desktop */}
      <div className="absolute top-[47%] right-[-12%] z-[50] hidden md:block">
        <Image
          src="/images/cat.png"
          width={560}
          height={560}
          className="drop-shadow-xl"
          alt="cat"
        />
      </div>
    </section>
  )
}
