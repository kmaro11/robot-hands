'use client'

import Link from 'next/link'
import { twMerge } from 'tailwind-merge'

import type { Header } from '@/payload-types'
import { Media } from '@/components/Media'
import { Nav } from './Nav'
import { useEffect, useState } from 'react'

interface HeaderClientProps {
  data: Header
}

export const HeaderClient: React.FC<HeaderClientProps> = ({ data }) => {
  const [menuOpen, setMenuOpen] = useState(false)
  const [hideHeader, setHideHeader] = useState(false)

  const toggleMenu = (action?: boolean) => {
    if (typeof action === 'boolean') {
      return setMenuOpen(action)
    }
    setMenuOpen((prev) => !prev)
  }

  const handleMenuToggle = () => toggleMenu()

  // Lock scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
  }, [menuOpen])

  // Scroll detection
  useEffect(() => {
    let lastScrollY = window.scrollY

    const handleScroll = () => {
      const currentScrollY = window.scrollY

      if (!menuOpen) {
        if (currentScrollY > lastScrollY && currentScrollY > 60) {
          setHideHeader(true)
        } else {
          setHideHeader(false)
        }
      }

      lastScrollY = currentScrollY
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [menuOpen])

  return (
    <header
      className={twMerge(
        'bg-white fixed top-0 left-0 right-0 z-50 px-8 transition-transform duration-300 ease-in-out',
        hideHeader ? '-translate-y-full' : 'translate-y-0',
      )}
    >
      <div className="max-w-[1193px] w-full mx-auto flex justify-between items-center py-[14px] h-[60px]">
        <Link href="/" className="max-w-[135px] w-full z-50" onClick={() => toggleMenu(false)}>
          <Media resource={data.media} />
        </Link>

        <div className="hidden lg:flex">
          <Nav navItems={data} closeMenu={() => toggleMenu(false)} />
        </div>

        <button
          onClick={handleMenuToggle}
          className="lg:hidden text-gray-700 focus:outline-none z-50"
          aria-label="Toggle Menu"
        >
          {menuOpen ? (
            <svg width="22" height="21" viewBox="0 0 22 21" fill="none">
              <line x1="2.5" y1="1" x2="21" y2="19.5" stroke="black" strokeWidth="2" />
              <line x1="1" y1="19.5" x2="20" y2="1" stroke="black" strokeWidth="2" />
            </svg>
          ) : (
            <svg width="51" height="29" viewBox="0 0 51 29" fill="none">
              <rect x="0.5" y="0.5" width="50" height="28" rx="2.5" stroke="black" />
              <rect x="16.17" y="10.74" width="17.41" height="1.07" fill="black" />
              <rect x="16.17" y="13.96" width="17.41" height="1.07" fill="black" />
              <rect x="16.17" y="17.19" width="17.41" height="1.07" fill="black" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Menu (no slide, just appear) */}
      <div
        className={twMerge(
          'fixed z-40 left-0 right-0 h-[100dvh] overflow-y-auto',
          menuOpen ? 'top-[59px] bg-white' : 'hidden',
        )}
      >
        <div className="px-8 pt-10 pb-6">
          <Nav navItems={data} closeMenu={() => toggleMenu(false)} />
        </div>
      </div>
    </header>
  )
}
