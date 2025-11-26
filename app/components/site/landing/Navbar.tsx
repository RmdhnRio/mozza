'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled)
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [scrolled])

  const navLinks = [
    { name: 'Service', href: '#service' },
    { name: 'Shop', href: '#shop' },
    { name: 'About', href: '#about' },
    { name: 'Contact', href: '#contact' },
  ]

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id.replace('#', ''))
    if (element) {
      const offset = 80
      const bodyRect = document.body.getBoundingClientRect().top
      const elementRect = element.getBoundingClientRect().top
      const elementPosition = elementRect - bodyRect
      const offsetPosition = elementPosition - offset

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      })
    }
  }

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-[99] transition-all duration-300 ${scrolled
        ? 'bg-white/80 backdrop-blur-md shadow-sm py-4'
        : 'bg-transparent py-6'
        }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 md:px-16 lg:px-24">
        {/* === Logo === */}
        <Link href="/" className="group">
          <span className={`font-plein font-bold text-2xl md:text-3xl transition-colors duration-300 ${scrolled ? 'text-brand-purple' : 'text-white'
            }`}>
            MOZZA
          </span>
        </Link>

        {/* === Navigation Links === */}
        <ul className="hidden md:flex items-center gap-8 lg:gap-12">
          {navLinks.map((link) => (
            <li key={link.name}>
              <Link
                href={link.href}
                onClick={(e) => {
                  e.preventDefault()
                  scrollToSection(link.href)
                }}
                className={`font-plein font-medium text-base lg:text-lg transition-all duration-300 relative group ${scrolled ? 'text-gray-600 hover:text-brand-purple' : 'text-white/90 hover:text-white'
                  }`}
              >
                {link.name}
                <span className={`absolute -bottom-1 left-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full ${scrolled ? 'bg-brand-purple' : 'bg-white'
                  }`} />
              </Link>
            </li>
          ))}
        </ul>

        {/* === Mobile Menu Button === */}
        <button className={`md:hidden transition-colors duration-300 ${scrolled ? 'text-gray-800' : 'text-white'
          }`}>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
    </nav>
  )
}