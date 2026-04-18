'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export function Footer() {
  const year = new Date().getFullYear()
  const [modalType, setModalType] = useState<string | null>(null)

  const policies: Record<string, { title: string; content: string }> = {
    privacy: {
      title: 'Privacy Policy',
      content: 'Zalada is a static website. We do not collect, store, or process any personal data from our visitors. Browsing our menu is completely private, and no user information is tracked or shared with third parties.'
    },
    terms: {
      title: 'Terms of Service',
      content: 'By using Zalada, you agree to our terms. Our salads are made fresh daily. Orders are subject to availability. Delivery times are estimates. All sales of perishable items are final unless there is a quality issue reported within 1 hour of delivery.'
    },
    cookies: {
      title: 'Cookies Policy',
      content: 'We use essential cookies to manage your session and cart. We also use minimal analytics cookies to understand website usage and improve our services. You can manage cookie settings through your browser.'
    }
  }

  return (
    <footer className="border-t border-[rgba(47,107,63,0.1)] bg-[#EDEDEB]">
      {/* Top */}
      <div className="mx-auto max-w-6xl px-6 py-20 md:px-10">
        <div className="flex flex-col md:flex-row md:justify-between items-start gap-12">

          {/* Brand */}
          <div>
            <a href="#top" className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#2F6B3F] shadow-[0_6px_18px_rgba(47,107,63,0.3)]">
                <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5 text-white" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2C6 2 2 8 2 14c0 4 2 8 10 9 8-1 10-5 10-9 0-6-4-12-10-12z" />
                </svg>
              </div>
              <span className="display-font text-3xl text-[#122018] tracking-tight">Zalada</span>
            </a>
            <p className="mt-6 max-w-xs text-base leading-relaxed text-[#3a5e48]/70 font-medium">
              Luxury salad compositions architected for vibrancy and culinary intent. Farm-sourced, chef-assembled, delivered cold.
            </p>
          </div>

          {/* Contact Info */}
          <div className="md:text-right">
            <p className="label-font text-[#AC624B] mb-4">Contact & Location</p>
            <p className="text-sm font-bold text-[#122018]">Salad, Healthy Food</p>
            <p className="mt-2 text-sm leading-relaxed text-[#3a5e48]/70 max-w-[280px] md:ml-auto">
              Skra A 57, First Floor, Sivalochanam (kailas),<br />
              Temple Line, Sreekariyam, Trivandrum
            </p>
            <a href="tel:+919744396337" className="mt-4 block text-base font-bold text-[#2F6B3F] hover:text-[#AC624B] transition-colors">
              +91 97443 96337
            </a>
          </div>

        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-[rgba(47,107,63,0.06)] bg-[#EDEDEB]/30 backdrop-blur-sm">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 py-8 text-[11px] font-bold uppercase tracking-widest text-[#3a5e48]/40 md:flex-row md:px-10">
          <p>© {year} Zalada. All rights reserved.</p>
          <div className="flex gap-8">
            <button onClick={() => setModalType('privacy')} className="hover:text-[#AC624B] transition-colors focus:outline-none">Privacy</button>
            <button onClick={() => setModalType('terms')} className="hover:text-[#AC624B] transition-colors focus:outline-none">Terms</button>
            <button onClick={() => setModalType('cookies')} className="hover:text-[#AC624B] transition-colors focus:outline-none">Cookies</button>
          </div>
        </div>
      </div>

      {/* Modal Dialog */}
      <AnimatePresence>
        {modalType && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setModalType(null)}
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-lg overflow-hidden rounded-[2.5rem] bg-white p-8 shadow-2xl md:p-12"
            >
              <button 
                onClick={() => setModalType(null)}
                className="absolute right-6 top-6 flex h-10 w-10 items-center justify-center rounded-full bg-[#EDEDEB] text-[#122018] transition-colors hover:bg-[#cbdace]"
              >
                <svg viewBox="0 0 16 16" fill="none" className="h-4 w-4" stroke="currentColor" strokeWidth={2.5}>
                  <path d="M4 4l8 8m0-8l-8 8" />
                </svg>
              </button>
              
              <p className="label-font mb-6 text-[#AC624B]">Legal Documentation</p>
              <h3 className="display-font text-4xl text-[#122018] md:text-5xl">{policies[modalType].title}</h3>
              <p className="mt-8 text-base leading-relaxed text-[#3a5e48]/80 md:text-lg">
                {policies[modalType].content}
              </p>
              
              <button
                onClick={() => setModalType(null)}
                className="mt-10 w-full rounded-full bg-[#2F6B3F] py-4 text-sm font-bold text-white shadow-lg transition-all hover:bg-[#24422E] hover:shadow-xl active:scale-[0.98]"
              >
                Close Policy
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </footer>
  )
}
