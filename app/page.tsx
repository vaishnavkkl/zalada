'use client'

import { memo, useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Footer } from '@/components/Footer'
import { Navbar } from '@/components/Navbar'
import { SaladBowlScroll } from '@/components/SaladBowlScroll'
import { products } from '@/data/products'

/* ── Marquee ticker ──────────────────────────────────── */
const TICKER = ['Farm to Table', 'Zero Compromise', 'Fresh Everyday', 'Locally Sourced', 'Chef Crafted', 'Clean Eating']

const Ticker = memo(function Ticker() {
  const items = [...TICKER, ...TICKER]
  return (
    <div className="relative flex w-full overflow-hidden border-y border-[rgba(0,0,0,0.06)] py-3" style={{ backgroundColor: '#E4E4E2' }}>
      <div className="flex animate-marquee whitespace-nowrap will-change-transform">
        {items.map((t, i) => (
          <span key={i} className="flex items-center gap-5 px-8 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#2F6B3F]">
            {t}
            <span className="h-1 w-1 rounded-full bg-[#2F6B3F]/40" />
          </span>
        ))}
      </div>
    </div>
  )
})

/* ── Section wrapper with scroll-in animation ─────── */
function RevealSection({ children, className = '', id }: { children: React.ReactNode; className?: string; id?: string }) {
  return (
    <motion.section
      id={id}
      className={`mx-auto w-full max-w-6xl px-4 md:px-8 ${className}`}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      style={{ contentVisibility: 'auto', containIntrinsicSize: '0 500px' }}
    >
      {children}
    </motion.section>
  )
}

/* ── Stat card ───────────────────────────────────────── */
const StatCard = memo(function StatCard({ label, val, delay = 0 }: { label: string; val: string; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
      className="glass-card group cursor-default rounded-[1.25rem] p-5 transition-all duration-300"
    >
      <p className="label-font">{label}</p>
      <p className="mt-2 text-2xl font-bold text-[#122018] md:text-3xl">{val}</p>
    </motion.div>
  )
})

/* ── Testimonial card ────────────────────────────────── */
const TestimonialCard = memo(function TestimonialCard({ name, role, quote, delay = 0 }: { name: string; role: string; quote: string; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className="glass-card group relative flex flex-col rounded-[1.75rem] p-8 transition-all duration-300"
    >
      <span className="absolute right-8 top-7 text-6xl font-bold leading-none text-[#2F6B3F]/10 select-none">"</span>
      <div className="flex gap-1 text-[#2F6B3F]">
        {[...Array(5)].map((_, i) => (
          <svg key={i} className="h-4 w-4 fill-current" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
      <p className="mt-5 flex-1 text-[0.9rem] leading-[1.75] text-[#3a5e48]/80">"{quote}"</p>
      <div className="mt-7 flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-[#3d8a53] to-[#2F6B3F] text-sm font-bold text-white shadow-md">
          {name[0]}
        </div>
        <div>
          <p className="text-sm font-semibold text-[#122018]">{name}</p>
          <p className="text-[11px] text-[#2F6B3F]/80">{role}</p>
        </div>
      </div>
    </motion.div>
  )
})

/* ── Menu card ───────────────────────────────────────── */
const MenuCard = memo(function MenuCard({ src, title, tag, delay = 0 }: { src: string; title: string; tag: string; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28, scale: 0.96 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className="group relative aspect-[3/4] cursor-pointer overflow-hidden rounded-[1.5rem] border border-[rgba(47,107,63,0.1)] shadow-[0_4px_20px_rgba(47,107,63,0.08)] transition-all duration-500"
    >
      <img
        src={src}
        alt={title}
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-108"
        loading="lazy"
        style={{ transformOrigin: 'center' }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0a1f10]/80 via-[#0a1f10]/10 to-transparent opacity-70 transition-opacity duration-300 group-hover:opacity-90" />
      <div className="absolute left-4 top-4">
        <span className="rounded-full border border-white/20 bg-white/15 px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-white backdrop-blur-md">
          {tag}
        </span>
      </div>
      <div className="absolute bottom-0 left-0 right-0 p-5">
        <p className="display-font text-xl text-white drop-shadow-md">{title}</p>
        <div className="mt-2 flex items-center gap-1.5 opacity-0 transition-all duration-300 group-hover:opacity-100">
          <span className="text-[11px] text-white/80">Explore</span>
          <svg viewBox="0 0 16 16" fill="none" className="h-3.5 w-3.5 text-white" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round">
            <path d="M3 8h10M9 4l4 4-4 4" />
          </svg>
        </div>
      </div>
    </motion.div>
  )
})

/* ── Main page ───────────────────────────────────────── */
export default function Page() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const product = products[currentIndex]

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' })
  }, [currentIndex])

  const goNext = () => setCurrentIndex((p) => (p + 1) % products.length)

  return (
    <div className="relative isolate grain min-h-screen" style={{ backgroundColor: '#EDEDEB', ['--product-gradient' as string]: product.gradient }}>
      <Navbar />

      <AnimatePresence mode="wait">
        <motion.div
          key={product.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.45 }}
          style={{ willChange: 'opacity' }}
        >
          {/* ── Hero section — preserved animation position ── */}
          <SaladBowlScroll product={product} />

          {/* ── Main Content Area — Inherits #EDEDEB ── */}
          <div className="relative z-10 pb-32 pt-24 shadow-[0_-20px_80px_rgba(0,0,0,0.03)] selection:bg-[#AC624B] selection:text-white">
            
            {/* Story / Product Details — Modern Bent Grid */}
            <RevealSection id="story">
              <div className="grid gap-6 md:grid-cols-12 md:grid-rows-2">
                
                {/* Main Narrative Card */}
                <div className="glass-card md:col-span-7 md:row-span-2 rounded-[2.5rem] p-10 flex flex-col justify-center border-[rgba(36,66,46,0.15)] bg-white/40">
                  <p className="label-font mb-4 text-[#AC624B]">Composition Theory</p>
                  <h2 className="display-font text-5xl leading-[0.95] text-[#122018] md:text-7xl">
                    {product.detailsSection.title}
                  </h2>
                  <p className="mt-8 text-base leading-[1.8] text-[#3a5e48]/80 md:text-lg">
                    {product.detailsSection.description}
                  </p>
                  
                  {/* Features mini-grid */}
                  <div className="mt-10 grid grid-cols-2 gap-4 border-t border-[rgba(36,66,46,0.1)] pt-8">
                    {product.features.map((f) => (
                      <div key={f} className="flex items-center gap-2.5 text-xs font-bold text-[#1f3828]">
                        <span className="h-2 w-2 rounded-full bg-[#AC624B]/30" />
                        {f}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Stats row */}
                <div className="grid grid-cols-3 gap-4 md:col-span-5">
                  {product.stats.map((s, i) => (
                    <StatCard key={s.label} label={s.label} val={s.val} delay={i * 0.1} />
                  ))}
                </div>

                {/* Secondary highlight card */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="glass-card md:col-span-5 rounded-[2.2rem] p-8 border-[rgba(36,66,46,0.1)]"
                  style={{ background: 'rgba(255, 255, 255, 0.4)' }}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="label-font text-[#2F6B3F]">Sanitary Standard</p>
                      <h3 className="display-font mt-3 text-2xl text-[#122018]">{product.freshnessSection.title}</h3>
                      <p className="mt-3 text-sm leading-relaxed text-[#3a5e48]/75">{product.freshnessSection.description}</p>
                    </div>
                    <div className="h-12 w-12 rounded-full border border-[#2F6B3F]/20 flex items-center justify-center text-xl">
                      🌿
                    </div>
                  </div>
                </motion.div>
              </div>
            </RevealSection>

            {/* Marquee Ticker */}
            <div className="my-28">
              <Ticker />
            </div>

            {/* ── Interactive Offer ────────────────────────── */}
            <RevealSection id="buy">
              <motion.div
                whileHover={{ y: -4 }}
                className="relative overflow-hidden rounded-[3rem] p-1 shadow-[0_40px_100px_rgba(36,66,46,0.12)] bg-gradient-to-br from-[#24422E] to-[#2F6B3F]"
              >
                <div className="relative overflow-hidden rounded-[2.9rem] bg-[#24422E] px-8 py-12 md:p-16">
                  <div className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-[#3d8a53]/20 blur-3xl opacity-50" />
                  <div className="pointer-events-none absolute -bottom-32 -left-24 h-96 w-96 rounded-full bg-[#AC624B]/10 blur-3xl opacity-50" />
                  
                  <div className="relative flex flex-col gap-10 md:flex-row md:items-center md:justify-between">
                    <div className="max-w-xl">
                      <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#cbdace]/60">Order Experience</p>
                      <h3 className="display-font mt-4 text-5xl text-white md:text-7xl">
                        {product.buyNowSection.price}
                      </h3>
                      <p className="mt-2 text-lg text-[#cbdace]/80">{product.buyNowSection.unit}</p>
                      
                      <div className="mt-8 flex flex-wrap gap-3">
                        {product.buyNowSection.processingParams.map((p) => (
                          <span key={p} className="rounded-full border border-white/10 bg-white/5 flex items-center gap-2 px-5 py-2 text-xs font-semibold text-white backdrop-blur-md">
                            <span className="h-1 w-1 rounded-full bg-[#AC624B]" /> {p}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex flex-col items-center gap-5">
                      <motion.button
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        className="group relative flex h-20 w-64 items-center justify-center overflow-hidden rounded-full bg-white text-lg font-bold text-[#24422E] shadow-[0_20px_50px_rgba(0,0,0,0.3)]"
                      >
                        <span className="relative z-10 transition-colors duration-300 group-hover:text-white">Reserve Bowl →</span>
                        <div className="absolute inset-0 z-0 translate-y-full bg-[#AC624B] transition-transform duration-300 group-hover:translate-y-0" />
                      </motion.button>
                      <p className="text-center text-xs text-white/40 tracking-wide">{product.buyNowSection.deliveryPromise}</p>
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.button
                onClick={goNext}
                whileHover={{ scale: 1.01 }}
                className="group mt-10 flex w-full items-center justify-between rounded-[2rem] border border-[rgba(36,66,46,0.1)] bg-white/40 p-6 shadow-sm shadow-black/5 transition-all hover:bg-white/60 hover:shadow-md"
              >
                <div className="flex items-center gap-6">
                  <div className="h-16 w-16 overflow-hidden rounded-2xl bg-[#EDEDEB] p-2 flex items-center justify-center">
                    <img src={products[(currentIndex + 1) % products.length].fullBowlSrc} alt="next" className="h-full w-full object-contain" />
                  </div>
                  <div className="text-left">
                    <p className="label-font text-[#3a5e48]/50">Up Next</p>
                    <p className="display-font text-2xl text-[#122018]">{products[(currentIndex + 1) % products.length].name}</p>
                  </div>
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-full border border-[rgba(36,66,46,0.15)] text-[#24422E] transition-colors group-hover:bg-[#24422E] group-hover:text-white">
                  <svg viewBox="0 0 16 16" fill="none" className="h-5 w-5" stroke="currentColor" strokeWidth={2.5}>
                    <path d="M3 8h10M9 4l4 4-4 4" />
                  </svg>
                </div>
              </motion.button>
            </RevealSection>

            {/* Community & Reviews */}
            <RevealSection id="testimonials" className="mt-40">
              <div className="flex flex-col items-center text-center">
                <span className="h-10 w-1 bg-[#AC624B]/20 rounded-full mb-6" />
                <p className="label-font">Voice of the Circle</p>
                <h2 className="display-font mt-4 text-5xl text-[#122018] md:text-6xl">Consumer Notes</h2>
              </div>
              <div className="mt-16 grid gap-6 md:grid-cols-3">
                {[
                  { name: 'Sarah J.', role: 'Fitness Coach', quote: 'A nutritional composition that doesn\'t sacrifice culinary intent. The texture balance is exceptional.' },
                  { name: 'Michael T.', role: 'Chef & Critic', quote: 'Remarkable cold-chain integrity. Every component maintains its structural peak from prep to table.' },
                  { name: 'Elena R.', role: 'Yoga Instructor', quote: 'Wholesome, vibrant, and surprisingly indulgent. Zalada has redefined what a convenient lunch can be.' },
                ].map((t, i) => (
                  <TestimonialCard key={t.name} {...t} delay={i * 0.1} />
                ))}
              </div>
            </RevealSection>

            {/* Interactive Menu Gallery */}
            <RevealSection id="menu" className="mt-40">
              <div className="grid gap-12 md:grid-cols-2 md:items-end">
                <div>
                  <p className="label-font">The Portfolio</p>
                  <h2 className="display-font mt-4 text-5xl text-[#122018] md:text-6xl">Seasonal Menus</h2>
                </div>
                <p className="text-lg leading-relaxed text-[#3a5e48]/70">
                  Four core pillars of fresh eating. Every item is architected for freshness, flavor density, and cellular vitality.
                </p>
              </div>
              <div className="mt-16 grid gap-6 grid-cols-2 md:grid-cols-4">
                {[
                  { src: '/info-assets/zalada-salad-final.png', title: 'Signature Bowls', tag: 'Architected' },
                  { src: '/info-assets/sandwich-v4.png', title: 'Pressed Greens', tag: 'Artisan' },
                  { src: '/info-assets/zalada-dessert.png', title: 'Botanical Sweets', tag: 'Pure' },
                  { src: '/info-assets/cold-coffee-label.png', title: 'Clean Brews', tag: 'Roasted' },
                ].map((item, i) => (
                  <MenuCard key={item.title} {...item} delay={i * 0.1} />
                ))}
              </div>
            </RevealSection>

            {/* Core Values Strip */}
            <RevealSection className="mt-40">
              <div className="grid gap-1 px-1 sm:grid-cols-2 lg:grid-cols-4 rounded-[3rem] overflow-hidden border border-[rgba(36,66,46,0.1)] bg-[rgba(36,66,46,0.03)] p-1">
                {[
                  { icon: '🌿', title: 'Direct Sourcing', desc: 'Sourced from regenerative local farms.' },
                  { icon: '❄️', title: 'Cold Integrity', desc: 'Strict thermal control from harvest to bowl.' },
                  { icon: '👨‍🍳', title: 'Culinary Intent', desc: 'Assembled by chefs, not assembly lines.' },
                  { icon: '♻️', title: 'Clean Cycles', desc: 'Compostable botanical-based packaging.' },
                ].map((v) => (
                  <div key={v.title} className="bg-white/40 p-10 flex flex-col items-center text-center first:rounded-l-[2.9rem] last:rounded-r-[2.9rem]">
                    <span className="text-4xl mb-6">{v.icon}</span>
                    <h4 className="font-bold text-lg text-[#122018]">{v.title}</h4>
                    <p className="mt-3 text-sm text-[#3a5e48]/70 leading-relaxed">{v.desc}</p>
                  </div>
                ))}
              </div>
            </RevealSection>

          </div>
        </motion.div>
      </AnimatePresence>

      <Footer />
    </div>
  )
}
