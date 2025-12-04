'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'

const navItems = [
  { href: '/', label: 'Home' },
  { href: '/collections', label: 'Collections' },
  { href: '/about', label: 'About' },
  { href: '/custom', label: 'Custom Atelier' },
  { href: '/dealer-locator', label: 'Dealers' },
  { href: '/contact', label: 'Contact' },
]

export default function Header() {
  const pathname = usePathname()
  return (
    <header
      className={[
        'fixed top-0 left-0 right-0 z-30',
        'transition-all duration-300',
        // Very light, glassy header that lets background show through
        'backdrop-blur-xl bg-black/10 border-b border-white/10',
      ].join(' ')}
      aria-label="Main navigation"
    >
      <div className="w-full px-3 sm:px-5 md:px-8 py-3 sm:py-4 flex items-center justify-between gap-6">
        {/* Logo only, slightly larger & tucked toward the corner */}
        <Link href="/" className="flex items-center hover-scale" aria-label="Stara home">
          <div className="relative w-28 h-8 sm:w-32 sm:h-10">
            <Image
              src="/assets/Stara Logo Transparent.png"
              alt="Stara logo"
              fill
              className="object-contain"
              sizes="140px"
              priority
            />
          </div>
        </Link>

        {/* Nav links */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-8 text-sm">
          {navItems.map((item) => {
            const active = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                className={[
                  'relative text-white/80 hover:text-white transition-colors duration-200',
                  'after:absolute after:left-0 after:-bottom-1 after:h-px after:w-0 after:bg-white after:transition-all after:duration-200',
                  active ? 'text-white after:w-full' : 'after:w-0 hover:after:w-full',
                ].join(' ')}
              >
                {item.label}
              </Link>
            )
          })}
        </nav>

        {/* Right side spacer to balance layout (no extra Contact CTA) */}
        <div className="hidden sm:block w-16" aria-hidden="true" />
      </div>
    </header>
  )
}


