'use client'

import { memo, useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useMotionValueEvent, useScroll, useSpring, useTransform } from 'framer-motion'
import Image from 'next/image'
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



/* ── Menu Data ────────────────────────────────────────── */
const MENU_ITEMS = [
  { title: 'Amber Roast Chicken Salad', ingredients: 'Chicken, sweet potato, capsicum(green and yellow), purple cabbage, corn, lettuce, cherry tomato, english cucumber, pomegranate, peanut, cheese', dressing: 'Lemon Mustard Vinaigrette', calories: '300 kcal', price: '220', src: '/menu/optimized/DSC02327.jpg' },
  { title: 'BBQ Chicken Harvest Bowl', ingredients: 'BBQ Chicken, herbed carrots, capsicum(green and yellow), purple cabbage, corn, lettuce, cherry tomato, english cucumber, spring onion, sesame seeds, pomegranate, peanut, cheese', dressing: 'Lemon Mustard Vinaigrette', calories: '300 kcal', price: '225', src: '/menu/optimized/DSC02320.jpg' },
  { title: 'Orange Zest Chicken Bowl', ingredients: 'Chicken, sweet potato, capsicum(green and yellow), purple cabbage, corn, lettuce, cherry tomato, english cucumber, pomegranate, peanuts, orange slice', dressing: 'Orange Vinaigrette', calories: '300 kcal', price: '225', src: '/menu/optimized/DSC02264.jpg' },
  { title: 'Citrus Chicken Rice Bowl', ingredients: 'Chicken, brown rice, chickpeas, capsicum(green and yellow), purple cabbage, corn, lettuce, cherry tomato, english cucumber, peanuts, orange slice, parsley', dressing: 'Orange Vinaigrette', calories: '300 kcal', price: '225', src: '/menu/optimized/citrus_chicken_rice_bowl.jpg' },
  { title: 'Seoul Fusion Chicken Bowl', ingredients: 'Chicken, noodles, capsicum(green and yellow), purple cabbage, corn, lettuce, cherry tomato, english cucumber, spring onion, sesame seeds, apple, peanuts, cheese', dressing: 'Thai Dressing', calories: '300 kcal', price: '225', src: '/menu/optimized/seoul_fusion_chicken_bowl.jpg' },
  { title: 'Chicken Pasta Bowl', ingredients: 'Chicken, pasta, capsicum(green and yellow), purple cabbage, corn, lettuce, cherry tomato, english cucumber, apple, peanuts, cheese', dressing: 'Green Goddess Dressing', calories: '300 kcal', price: '220', src: '/menu/optimized/chicken_pasta_bowl.jpg' },
  { title: 'Protein Packed Paneer Bowl', ingredients: 'Paneer, chickpeas, capsicum(green and yellow), purple cabbage, corn, lettuce, cherry tomato, english cucumber, apple, peanut, cheese', dressing: 'Chipotle Sauce', calories: '300 kcal', price: '215', src: '/menu/optimized/protein_packed_paneer_bowl.jpg' },
  { title: 'Roasted Paneer & Sweet Potato Bowl', ingredients: 'Paneer, sweet potato, capsicum(green and yellow), purple cabbage, corn, lettuce, cherry tomato, english cucumber, apple, peanut, cheese', dressing: 'Chipotle Sauce', calories: '300 kcal', price: '215', src: '/menu/optimized/roasted_paneer_sweet_potato_bowl.jpg' },
  { title: 'Soya Sweet Potato Duo', ingredients: 'Glazed soya chunks, sweet potato, capsicum(green and yellow), purple cabbage, corn, lettuce, cherry tomato, english cucumber, sesame seeds, apple, cheese', dressing: 'Chilli Lime', calories: '300 kcal', price: '210', src: '/menu/optimized/soya_sweet_potato_duo.jpg' },
]

/* ── Menu card ───────────────────────────────────────── */
const MenuCard = memo(function MenuCard({ 
  src, title, price, ingredients, dressing, calories, delay = 0 
}: { 
  src?: string; title: string; price: string; ingredients: string; dressing: string; calories: string; delay?: number 
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className="group relative h-[30rem] w-full cursor-pointer overflow-hidden rounded-[2.5rem] bg-[#122018] shadow-2xl transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_30px_60px_rgba(0,0,0,0.3)]"
    >
      {src ? (
        <Image
          src={src}
          alt={title}
          fill
          loading="lazy"
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-1000 group-hover:scale-105"
        />
      ) : (
        <div className="absolute inset-0 h-full w-full bg-gradient-to-br from-[#1E3F2E] to-[#122018]" />
      )}
      
      {/* Overlay Gradients */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#011406]/95 via-[#011406]/30 to-transparent opacity-80" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-transparent opacity-40" />

      {/* Top Badges */}
      <div className="absolute inset-x-5 top-5 flex items-start justify-between">
        <span className="rounded-full border border-white/20 bg-black/30 px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.2em] text-[#DCE465] backdrop-blur-md">
          {calories}
        </span>
      </div>

      {/* Bottom Content */}
      <div className="absolute inset-x-0 bottom-0 p-8">
        <h3 className="display-font text-2xl text-white leading-tight mb-4">{title}</h3>
        
        <div className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-500 ease-out group-hover:grid-rows-[1fr]">
          <div className="overflow-hidden">
            <div className="pt-4 border-t border-white/10">
              <p className="text-[11px] text-white/70 leading-relaxed font-medium mb-5">
                {ingredients}
              </p>
              <div className="flex items-center gap-2.5 text-[10px] tracking-wide text-[#A5C0A0] font-semibold">
                <span className="h-1.5 w-1.5 rounded-full bg-[#DCE465]" />
                <span className="truncate">{dressing}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
})

/* ── FAQ Section ───────────────────────────────────────── */
const VENDING_SEQUENCE = {
  frameCount: 140,
  folderPath: '/vending_images',
  framePrefix: 'ezgif-frame-',
  framePad: 3,
  frameExtension: 'jpg',
  background: '#EDEDEB',
}

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value))
}

const VendingMachineSequence = memo(function VendingMachineSequence() {
  const sectionRef = useRef<HTMLElement | null>(null)
  const stageRef = useRef<HTMLDivElement | null>(null)
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const frameImagesRef = useRef<Array<HTMLImageElement | undefined>>([])
  const loadedFramesRef = useRef<Set<number>>(new Set())
  const canvasMetricsRef = useRef({ width: 0, height: 0, dpr: 0 })
  const rafRef = useRef<number | null>(null)
  const preloadTimerRef = useRef<number | null>(null)
  const latestProgressRef = useRef(0)
  const preloadCursorRef = useRef(1)
  const startedLoadingRef = useRef(false)
  const [ready, setReady] = useState(false)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  })

  const smoothProgress = useSpring(scrollYProgress, {
    damping: 24,
    stiffness: 280,
    mass: 0.1,
    restDelta: 0.0004,
  })
  const imageScale = useTransform(smoothProgress, [0, 0.12], [0.94, 1])
  const imageY = useTransform(smoothProgress, [0, 0.12], [20, 0])

  const getFrameSource = (index: number) => {
    const frameNumber = String(index + 1).padStart(VENDING_SEQUENCE.framePad, '0')
    return `${VENDING_SEQUENCE.folderPath}/${VENDING_SEQUENCE.framePrefix}${frameNumber}.${VENDING_SEQUENCE.frameExtension}`
  }

  const findNearestLoadedFrame = (targetIndex: number) => {
    for (let offset = 0; offset < VENDING_SEQUENCE.frameCount; offset++) {
      const lowerIndex = targetIndex - offset
      if (lowerIndex >= 0 && loadedFramesRef.current.has(lowerIndex)) {
        return frameImagesRef.current[lowerIndex]
      }

      const upperIndex = targetIndex + offset
      if (upperIndex < VENDING_SEQUENCE.frameCount && loadedFramesRef.current.has(upperIndex)) {
        return frameImagesRef.current[upperIndex]
      }
    }

    return undefined
  }

  const scheduleDraw = () => {
    if (rafRef.current !== null) return

    rafRef.current = window.requestAnimationFrame(() => {
      drawFrame(latestProgressRef.current)
      rafRef.current = null
    })
  }

  const loadFrame = (index: number) => {
    if (index < 0 || index >= VENDING_SEQUENCE.frameCount || frameImagesRef.current[index]) return

    const image = new window.Image()
    image.decoding = 'async'
    image.onload = () => {
      loadedFramesRef.current.add(index)
      if (index === 0) setReady(true)
      scheduleDraw()
    }
    image.onerror = () => {
      if (index === 0) setReady(true)
    }
    image.src = getFrameSource(index)
    frameImagesRef.current[index] = image
  }

  const preloadNextBatch = () => {
    if (preloadCursorRef.current >= VENDING_SEQUENCE.frameCount) return

    for (let count = 0; count < 3 && preloadCursorRef.current < VENDING_SEQUENCE.frameCount; count++) {
      loadFrame(preloadCursorRef.current)
      preloadCursorRef.current += 1
    }

    preloadTimerRef.current = window.setTimeout(preloadNextBatch, 120)
  }

  const startFrameLoading = () => {
    if (startedLoadingRef.current) return

    startedLoadingRef.current = true
    loadFrame(0)
    preloadNextBatch()
  }

  const drawFrame = (progress: number) => {
    const canvas = canvasRef.current
    const stage = stageRef.current
    if (!canvas || !stage || frameImagesRef.current.length === 0) return

    const index = Math.floor(clamp(progress, 0, 1) * (VENDING_SEQUENCE.frameCount - 1))
    const frame = loadedFramesRef.current.has(index)
      ? frameImagesRef.current[index]
      : findNearestLoadedFrame(index)
    if (!frame || !frame.complete) return

    const width = stage.clientWidth
    const height = stage.clientHeight
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    const canvasWidth = Math.round(width * dpr)
    const canvasHeight = Math.round(height * dpr)
    const ctx = canvas.getContext('2d', { alpha: false })
    if (!ctx) return

    if (
      canvasMetricsRef.current.width !== canvasWidth ||
      canvasMetricsRef.current.height !== canvasHeight ||
      canvasMetricsRef.current.dpr !== dpr
    ) {
      canvas.width = canvasWidth
      canvas.height = canvasHeight
      canvasMetricsRef.current = { width: canvasWidth, height: canvasHeight, dpr }
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    ctx.fillStyle = VENDING_SEQUENCE.background
    ctx.fillRect(0, 0, width, height)

    const imageRatio = frame.width / frame.height
    const canvasRatio = width / height
    let drawWidth = width
    let drawHeight = height
    let offsetX = 0
    let offsetY = 0

    if (imageRatio > canvasRatio) {
      drawHeight = drawWidth / imageRatio
      offsetY = (height - drawHeight) / 2
    } else {
      drawWidth = drawHeight * imageRatio
      offsetX = (width - drawWidth) / 2
    }

    const zoomOut = 0.94
    ctx.drawImage(
      frame,
      offsetX + (drawWidth * (1 - zoomOut)) / 2,
      offsetY + (drawHeight * (1 - zoomOut)) / 2,
      drawWidth * zoomOut,
      drawHeight * zoomOut,
    )
  }

  useEffect(() => {
    const section = sectionRef.current
    setReady(false)
    frameImagesRef.current = Array.from({ length: VENDING_SEQUENCE.frameCount })
    loadedFramesRef.current = new Set()

    let observer: IntersectionObserver | null = null
    if (section && typeof IntersectionObserver !== 'undefined') {
      observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            startFrameLoading()
            observer?.disconnect()
          }
        },
        { rootMargin: '1200px 0px' },
      )
      observer.observe(section)
    } else {
      startFrameLoading()
    }

    const handleResize = () => drawFrame(latestProgressRef.current)
    let resizeObserver: ResizeObserver | null = null
    if (stageRef.current && typeof ResizeObserver !== 'undefined') {
      resizeObserver = new ResizeObserver(handleResize)
      resizeObserver.observe(stageRef.current)
    }
    window.addEventListener('resize', handleResize)

    return () => {
      observer?.disconnect()
      window.removeEventListener('resize', handleResize)
      resizeObserver?.disconnect()
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current)
      if (preloadTimerRef.current !== null) window.clearTimeout(preloadTimerRef.current)
    }
  }, [])

  useMotionValueEvent(smoothProgress, 'change', (value) => {
    latestProgressRef.current = value
    if (!startedLoadingRef.current) startFrameLoading()

    const index = Math.floor(clamp(value, 0, 1) * (VENDING_SEQUENCE.frameCount - 1))
    loadFrame(index)
    loadFrame(index + 1)
    loadFrame(index - 1)
    if (!ready) return

    scheduleDraw()
  })

  return (
    <section ref={sectionRef} id="vending-machine" className="relative h-[320vh]">
      <div
        className="sticky top-0 flex h-screen flex-col items-center justify-center overflow-hidden"
        style={{ backgroundColor: VENDING_SEQUENCE.background }}
      >
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div
            className="absolute -top-40 left-1/2 h-[480px] w-[560px] -translate-x-1/2 rounded-full opacity-70 blur-[100px]"
            style={{ background: 'radial-gradient(circle, #f5f0ea 0%, transparent 70%)' }}
          />
          <div
            className="absolute -bottom-20 left-1/2 h-[200px] w-[700px] -translate-x-1/2 rounded-full opacity-40 blur-[60px]"
            style={{ background: 'radial-gradient(circle, #d0cdc9 0%, transparent 70%)' }}
          />
        </div>

        <motion.div
          style={{ scale: imageScale, y: imageY }}
          className="relative z-10 mx-auto w-full max-w-[900px] px-4"
        >
          <p className="mb-5 text-center text-[10px] font-bold uppercase tracking-[0.28em] text-[#2F6B3F]/55">
            Scroll to reveal
          </p>

          <div
            ref={stageRef}
            className="relative aspect-video w-full overflow-hidden"
          >
            <canvas
              ref={canvasRef}
              className="absolute inset-0 h-full w-full"
              style={{
                maskImage: 'radial-gradient(ellipse 50% 48% at center, black 45%, transparent 92%)',
                WebkitMaskImage: 'radial-gradient(ellipse 50% 48% at center, black 45%, transparent 92%)',
              }}
              aria-label="Zalada vending machine salad animation"
            />
            {!ready && (
              <Image
                src="/vending_images/ezgif-frame-001.jpg"
                alt=""
                fill
                sizes="(min-width: 1024px) 900px, 100vw"
                className="object-contain opacity-70"
              />
            )}
          </div>

          <div className="mt-4 flex flex-col items-center justify-center gap-2">
            <span className="text-[10px] uppercase tracking-[0.24em] text-[#2F6B3F]/50">
              Vending machine salad
            </span>
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
              className="h-4 w-px bg-[#2F6B3F]/30"
            />
          </div>
        </motion.div>
      </div>
    </section>
  )
})

const VendingMachineInfo = memo(function VendingMachineInfo() {
  return (
    <RevealSection id="vending-machine-info" className="py-24">
      <div className="mx-auto max-w-4xl text-center">
        <p className="label-font text-[#AC624B]">Vending Launch</p>
        <h2 className="display-font mt-4 text-5xl leading-[0.95] text-[#122018] md:text-7xl">
          Kerala&apos;s first vending machine salad
        </h2>
        <p className="mx-auto mt-7 max-w-2xl text-base leading-[1.8] text-[#3a5e48]/78 md:text-lg">
          Zalada&apos;s ready-to-eat salad vending machine is now available in
          Trivandrum at Technopark, Taurus Building.
        </p>
        <div className="mt-9 flex flex-wrap justify-center gap-3">
          {['Fresh Salad', 'Ready To Eat', 'Technopark Taurus'].map((item) => (
            <span
              key={item}
              className="stat-pill bg-white/45 px-5 py-2 text-[11px] uppercase tracking-[0.14em]"
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    </RevealSection>
  )
})

const FAQS = [
  { q: 'Where does Zalada deliver?', a: 'Zalada currently delivers premium salad bowls to Technopark, Sreekariyam, and surrounding areas in Trivandrum through Swiggy and Zomato.' },
  { q: 'Are your salad ingredients organic?', a: 'We source our ingredients from regenerative local farms. While not all items are certified organic, we prioritize farm-fresh, pesticide-free produce to ensure maximum nutritional value.' },
  { q: 'Can I order a custom salad bowl?', a: 'Currently, our menu features chef-crafted compositions designed for perfect flavor balance and cellular vitality. We do not offer custom bowls, but our diverse menu caters to most dietary preferences.' },

]

const FaqSection = memo(function FaqSection() {
  const [open, setOpen] = useState<number | null>(null)
  
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQS.map((faq) => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.a
      }
    }))
  }

  return (
    <RevealSection id="faq" className="mt-40 py-16">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <div className="text-center mb-16">
        <p className="label-font text-[#AC624B]">Common Questions</p>
        <h2 className="display-font mt-4 text-5xl text-[#122018]">Frequently Asked Questions</h2>
      </div>
      <div className="mx-auto max-w-3xl space-y-4">
        {FAQS.map((faq, i) => (
          <div key={i} className="glass-card rounded-2xl overflow-hidden border border-[rgba(36,66,46,0.1)] transition-all">
            <button 
              className="w-full px-6 py-5 text-left flex justify-between items-center text-lg font-bold text-[#122018]"
              onClick={() => setOpen(open === i ? null : i)}
            >
              {faq.q}
              <span className={`transform transition-transform duration-300 ${open === i ? 'rotate-180' : ''}`}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 9l6 6 6-6"/></svg>
              </span>
            </button>
            <div className={`overflow-hidden transition-all duration-300 ${open === i ? 'max-h-48' : 'max-h-0'}`}>
              <p className="px-6 pb-5 text-base text-[#3a5e48]/80">{faq.a}</p>
            </div>
          </div>
        ))}
      </div>
    </RevealSection>
  )
})

/* ── Main page ───────────────────────────────────────── */
export default function Page() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const product = products[currentIndex]

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' })
  }, [currentIndex])


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
            <RevealSection id="story" className="py-12">
              <div className="grid gap-6 md:grid-cols-12 md:grid-rows-2">
                
                {/* Main Narrative Card */}
                <div className="glass-card md:col-span-7 md:row-span-2 rounded-[2.5rem] p-10 flex flex-col justify-center border-[rgba(36,66,46,0.15)]">
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
            <RevealSection id="buy" className="py-24">
              <motion.div
                whileHover={{ y: -4 }}
                className="relative overflow-hidden rounded-[3.5rem] rounded-bl-[3.5rem] p-[1px] shadow-[0_50px_100px_rgba(18,32,24,0.15)] bg-gradient-to-br from-white/10 to-white/5"
              >
                <div className="relative overflow-hidden rounded-[3.45rem] rounded-bl-[3.45rem] bg-[#122018] px-8 py-16 md:p-20">
                  {/* Stylized depth elements */}
                  <div className="pointer-events-none absolute -right-24 -top-24 h-[30rem] w-[30rem] rounded-full bg-[#2F6B3F]/20 blur-[100px] opacity-60" />
                  <div className="pointer-events-none absolute -bottom-32 -left-24 h-[30rem] w-[30rem] rounded-full bg-[#AC624B]/10 blur-[100px] opacity-60" />
                  <div className="pointer-events-none absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22f%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23f)%22 opacity=%220.05%22/%3E%3C/svg%3E')] opacity-30" />
                  
                  <div className="relative flex flex-col gap-12 lg:flex-row lg:items-center lg:justify-between">
                    <div className="max-w-xl">
                      <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#cbdace]/40"></p>
                      <h3 className="display-font mt-6 text-4xl text-white md:text-6xl leading-tight">
                        Ready to Order?
                      </h3>
                      <p className="mt-4 text-xl text-[#cbdace]/60 font-medium italic">Freshly crafted for you</p>
                      
                      <div className="mt-12 flex flex-wrap gap-3">
                        {product.buyNowSection.processingParams.map((p) => (
                          <span key={p} className="rounded-full border border-white/5 bg-white/[0.03] flex items-center gap-2.5 px-6 py-2.5 text-[11px] font-bold text-white/80 backdrop-blur-3xl shadow-inner">
                            <span className="h-1.5 w-1.5 rounded-full bg-[#AC624B] shadow-[0_0_8px_#AC624B]" /> {p}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex w-full flex-col sm:flex-row items-center gap-5">
                      <motion.a
                        href="https://www.swiggy.com/city/thiruvananthapuram/zalada-technopark-rest1360935"
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        className="group relative flex h-16 w-full sm:w-56 items-center justify-center gap-3 overflow-hidden rounded-full bg-[#FC8019] text-sm font-black text-white shadow-[0_20px_60px_rgba(252,128,25,0.35)]"
                      >
                        <div className="relative z-10 flex items-center gap-2.5">
                          <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
                            <path d="M12 0C5.372 0 0 5.372 0 12s5.372 12 12 12 12-5.372 12-12S18.628 0 12 0zm5.118 17.584c-.381.562-1.127.721-1.666.353-.016-.011-3.267-2.186-3.267-2.186-.484-.336-.785-.884-.785-1.468V8.694c0-.663.537-1.2 1.2-1.2s1.2.537 1.2 1.2v5.127l2.965 1.983c.538.359.697 1.088.353 1.58z" />
                          </svg>
                          <span>Order Swiggy</span>
                        </div>
                        <div className="absolute inset-0 z-0 bg-white/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                      </motion.a>
                      <motion.a
                        href="https://www.zomato.com/trivandrum/zalada-sreekariyam/order"
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        className="group relative flex h-16 w-full sm:w-56 items-center justify-center gap-3 overflow-hidden rounded-full bg-[#E23744] text-sm font-black text-white shadow-[0_20px_60px_rgba(226,55,68,0.35)]"
                      >
                        <div className="relative z-10 flex items-center gap-2.5">
                          <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm3.31 14.31L11 11.62V6h2v4.38l3.69 3.69-1.38 1.24z" />
                          </svg>
                          <span>Order Zomato</span>
                        </div>
                        <div className="absolute inset-0 z-0 bg-white/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                      </motion.a>
                    </div>
                  </div>
                </div>
              </motion.div>
            </RevealSection>

            <VendingMachineSequence />
            <VendingMachineInfo />

            {/* Testimonials */}
            <RevealSection id="testimonials" className="mt-40 py-16">
              <div className="text-center">
                <p className="label-font text-[#AC624B]">Community Pulse</p>
                <h2 className="display-font mt-4 text-5xl text-[#122018] md:text-6xl text-balance">Fueling the Technopark Spirit</h2>
              </div>
              <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {[
                  { name: 'Arjun K. Prasad', role: 'Senior Developer, Technopark', text: 'Technopark lunch breaks used to be a nutritional challenge. Zalada changed the game. The Citrus Chicken Bowl keeps me sharp through the afternoon sprints.' },
                  { name: 'Meera Nair', role: 'UX Designer', text: 'As a designer, I appreciate the composition of these bowls as much as the taste. The freshness of the greens is the best I’ve seen in any delivery service.' },
                  { name: 'Rahul Varma', role: 'Project Lead', text: 'Minimalist, fiber-rich, and surprisingly filling. It’s the perfect sustainance for high-pressure release cycles. Authentic farm-to-table quality.' },
                  { name: 'Ananya Pillai', role: 'Systems Analyst', text: 'Finally a healthy option that doesn’t compromise on flavor. Stays incredibly fresh even if I have to take it back to my desk for a quick bite between meetings.' },
                ].map((t, i) => (
                  <motion.div
                    key={t.name}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="glass-card flex flex-col justify-between rounded-[2rem] p-8 border-[rgba(36,66,46,0.08)] bg-white/20"
                  >
                    <div>
                      <div className="flex gap-0.5 text-[#AC624B]/60 mb-6">
                        {[...Array(5)].map((_, i) => (
                          <svg key={i} viewBox="0 0 20 20" fill="currentColor" className="h-3.5 w-3.5">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                      <p className="text-sm italic leading-relaxed text-[#3a5e48]/80 line-clamp-4">"{t.text}"</p>
                    </div>
                    <div className="mt-8 pt-6 border-t border-[rgba(36,66,46,0.08)]">
                      <p className="font-bold text-[#122018] text-sm">{t.name}</p>
                      <p className="text-[10px] uppercase tracking-widest text-[#AC624B]/60 font-medium mt-1">{t.role}</p>
                    </div>
                  </motion.div>
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
              <div className="mt-16 grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
                {MENU_ITEMS.map((item, i) => (
                  <MenuCard key={item.title} {...item} delay={(i % 3) * 0.1} />
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
                  <div key={v.title} className="p-10 flex flex-col items-center text-center first:rounded-l-[2.9rem] last:rounded-r-[2.9rem]">
                    <span className="text-4xl mb-6">{v.icon}</span>
                    <h4 className="font-bold text-lg text-[#122018]">{v.title}</h4>
                    <p className="mt-3 text-sm text-[#3a5e48]/70 leading-relaxed">{v.desc}</p>
                  </div>
                ))}
              </div>
            </RevealSection>

            {/* FAQ Section */}
            <FaqSection />

          </div>
        </motion.div>
      </AnimatePresence>

      <Footer />
    </div>
  )
}
