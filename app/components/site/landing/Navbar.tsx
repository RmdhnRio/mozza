'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

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
    setIsMobileMenuOpen(false)
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
      className={`fixed top-0 left-0 w-full z-[99] transition-all duration-300 
        ${scrolled || isMobileMenuOpen
          ? 'bg-white shadow-sm py-4 pt-8 md:pt-4' // Solid white, extra top padding on mobile
          : 'bg-white pt-8 pb-4 md:bg-transparent md:py-6 md:pt-6 shadow-sm md:shadow-none' // Mobile: Solid white + padding. Desktop: Transparent
        }
      `}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 md:px-16 lg:px-24">
        {/* === Logo === */}
        <Link href="/" className="group z-50">
          <span className={`font-plein font-bold text-2xl md:text-3xl transition-colors duration-300 
            ${scrolled || isMobileMenuOpen
              ? 'text-brand-purple'
              : 'text-brand-purple md:text-white' // Mobile: Purple. Desktop: White (at top)
            }`}>
            MOZZA
          </span>
        </Link>

        {/* === Desktop Navigation === */}
        <ul className="hidden md:flex items-center gap-8 lg:gap-12">
          {navLinks.map((link) => (
            <li key={link.name}>
              <Link
                href={link.href}
                onClick={(e) => {
                  e.preventDefault()
                  scrollToSection(link.href)
                }}
                className={`font-plein font-medium text-base lg:text-lg transition-all duration-300 relative group 
                  ${scrolled
                    ? 'text-gray-600 hover:text-brand-purple'
                    : 'text-white/90 hover:text-white'
                  }`}
              >
                {link.name}
                <span className={`absolute -bottom-1 left-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full 
                  ${scrolled ? 'bg-brand-purple' : 'bg-white'
                  }`} />
              </Link>
            </li>
          ))}
        </ul>

        {/* === Mobile Menu Button === */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className={`md:hidden z-50 transition-colors duration-300 
            ${scrolled || isMobileMenuOpen
              ? 'text-gray-800'
              : 'text-gray-800' // Always dark on mobile
            }`}
        >
          {isMobileMenuOpen ? (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>

        {/* === Mobile Menu Overlay === */}
        {/* Added 'top-[60px]' to start below navbar, and ensure bg-white is solid */}
        <div className={`fixed inset-0 top-0 bg-white z-40 flex flex-col items-center justify-center transition-transform duration-300 md:hidden 
          ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}
        `}>
          <ul className="flex flex-col items-center gap-8">
            {navLinks.map((link) => (
              <li key={link.name}>
                <Link
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault()
                    scrollToSection(link.href)
                  }}
                  className="font-plein font-bold text-2xl text-gray-800 hover:text-brand-purple transition-colors"
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

      </div>
    </nav>
  )
}