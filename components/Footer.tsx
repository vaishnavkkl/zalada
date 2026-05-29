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
            <p className="label-font text-[#AC624B] mb-4">Contact</p>
            <div className="mt-2 flex items-center gap-3 md:justify-end">
              <a
                href="https://wa.me/919744396337"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Open WhatsApp"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#2F6B3F] text-white shadow-[0_6px_16px_rgba(47,107,63,0.28)] transition-all hover:-translate-y-0.5 hover:bg-[#24422E]"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                  className="h-5 w-5"
                >
                  <path d="M20.52 3.48A11.86 11.86 0 0 0 12.08 0C5.49 0 .14 5.36.14 11.96c0 2.1.55 4.16 1.58 5.98L0 24l6.25-1.64a11.9 11.9 0 0 0 5.82 1.48h.01c6.59 0 11.94-5.36 11.94-11.96 0-3.19-1.24-6.18-3.5-8.4ZM12.08 21.8a9.8 9.8 0 0 1-5-1.37l-.36-.21-3.71.97.99-3.61-.24-.37a9.82 9.82 0 0 1-1.51-5.25c0-5.44 4.4-9.86 9.83-9.86 2.63 0 5.09 1.03 6.95 2.89a9.79 9.79 0 0 1 2.87 6.97c0 5.43-4.42 9.84-9.82 9.84Zm5.39-7.35c-.29-.14-1.72-.85-1.99-.95-.26-.1-.46-.14-.65.14-.19.29-.74.95-.91 1.15-.17.19-.34.22-.63.07-.29-.14-1.22-.45-2.33-1.44-.86-.77-1.44-1.72-1.61-2.01-.17-.29-.02-.45.13-.6.13-.12.29-.31.43-.46.14-.17.19-.29.29-.48.1-.19.05-.36-.02-.5-.07-.14-.65-1.58-.89-2.17-.24-.57-.48-.5-.65-.5h-.55c-.19 0-.5.07-.77.36-.26.29-1.01.98-1.01 2.4 0 1.41 1.03 2.78 1.18 2.97.14.19 2.03 3.1 4.92 4.35.69.29 1.23.46 1.65.59.69.22 1.31.19 1.8.12.55-.08 1.72-.7 1.96-1.37.24-.67.24-1.24.17-1.37-.07-.12-.26-.19-.55-.33Z" />
                </svg>
              </a>
              <a
                href="https://www.instagram.com/zalada__/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Open Instagram"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#2F6B3F] text-white shadow-[0_6px_16px_rgba(47,107,63,0.28)] transition-all hover:-translate-y-0.5 hover:bg-[#24422E]"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  aria-hidden="true"
                  className="h-5 w-5"
                >
                  <rect x="2.5" y="2.5" width="19" height="19" rx="5" />
                  <circle cx="12" cy="12" r="4.5" />
                  <circle cx="18" cy="6" r="1" fill="currentColor" stroke="none" />
                </svg>
              </a>
            </div>
            <a
              href="https://wa.me/919744396337"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 block text-base font-bold text-[#2F6B3F] hover:text-[#AC624B] transition-colors"
            >
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
