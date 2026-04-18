'use client'

import { motion, useMotionValueEvent, useScroll, useTransform } from 'framer-motion'
import { useState, useRef } from 'react'

const NAV_LINKS = [
  { label: 'Story', href: '#story' },
  { label: 'Menu', href: '#menu' },
  { label: 'Testimonials', href: '#testimonials' },
]

export function Navbar() {
  const { scrollY } = useScroll()
  const [elevated, setElevated] = useState(false)
  const [hovered, setHovered] = useState<string | null>(null)

  useMotionValueEvent(scrollY, 'change', (v) => setElevated(v > 40))

  return (
    <motion.header
      initial={{ y: -32, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4 md:pt-6"
    >
      <div
        className={`w-full max-w-[1100px] rounded-[1.75rem] px-6 py-2.5 transition-all duration-500 border ${
          elevated
            ? 'glass-card-dark bg-[#122018]/80 text-white border-white/5 shadow-2xl backdrop-blur-3xl'
            : 'bg-white/80 border-[rgba(36,66,46,0.1)] backdrop-blur-xl shadow-lg'
        }`}
      >
        <div className="flex items-center justify-between gap-4">

          {/* Logo */}
          <a href="#top" className="flex items-center gap-3 group">
            <div className="relative flex h-9 w-9 items-center justify-center rounded-full bg-[#2F6B3F] shadow-[0_4px_14px_rgba(47,107,63,0.3)] transition-transform duration-500 group-hover:scale-110">
              <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5 text-white" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2C6 2 2 8 2 14c0 4 2 8 10 9 8-1 10-5 10-9 0-6-4-12-10-12z" />
              </svg>
            </div>
            <span className={`display-font text-2xl tracking-tight transition-colors duration-300 ${elevated ? 'text-white' : 'text-[#122018]'}`}>Zalada</span>
          </a>

          {/* Nav links */}
          <nav className="hidden items-center gap-1 md:flex">
            {NAV_LINKS.map(({ label, href }) => (
              <a
                key={label}
                href={href}
                onMouseEnter={() => setHovered(label)}
                onMouseLeave={() => setHovered(null)}
                className={`relative px-5 py-2 text-sm font-bold tracking-tight transition-colors duration-300 ${
                  elevated 
                    ? 'text-white/60 hover:text-white' 
                    : 'text-[#1f3828]/60 hover:text-[#2F6B3F]'
                }`}
              >
                {hovered === label && (
                  <motion.span
                    layoutId="nav-pill"
                    className={`absolute inset-0 rounded-full ${elevated ? 'bg-white/10' : 'bg-[#AC624B]/5'}`}
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{label}</span>
              </a>
            ))}
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-4">

            {/* CTA */}
            <motion.a
              href="#buy"
              whileHover={{ scale: 1.05, y: -1 }}
              whileTap={{ scale: 0.95 }}
              className={`flex items-center gap-2 rounded-full px-6 py-2.5 text-xs font-black uppercase tracking-widest shadow-xl transition-all ${
                elevated 
                  ? 'bg-white text-[#122018] hover:bg-[#EDEDEB]' 
                  : 'bg-[#2F6B3F] text-white hover:bg-[#24422E]'
              }`}
            >
              Order Now
            </motion.a>
          </div>
        </div>
      </div>
    </motion.header>
  )
}
