import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { motion, useReducedMotion, useScroll, useSpring } from 'framer-motion'

gsap.registerPlugin(ScrollTrigger)

const logoPath = '/brand/zalada-logo.svg'

const bowlHeroAssets = {
  backdrop:
    'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=2400&q=80',
  bowlBase:
    'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&w=1800&h=1800&q=80',
  lidTexture:
    'https://images.unsplash.com/photo-1464306076886-debede14e8cc?auto=format&fit=crop&w=1600&q=80',
}

const ingredientLayers = [
  {
    id: 'lettuce',
    src: 'https://pngimg.com/d/lettuce_PNG3672.png',
    depth: 1.35,
    size: 220,
    group: 'greens',
    start: { x: -220, y: -260, rotate: -30, scale: 0.62, opacity: 0 },
    mid: { x: -84, y: -88, rotate: -11, scale: 0.96, opacity: 1 },
    end: { x: -50, y: -52, rotate: -4, scale: 0.93, opacity: 0.95 },
  },
  {
    id: 'tomato',
    src: 'https://pngimg.com/d/tomato_PNG12589.png',
    depth: 1.18,
    size: 132,
    group: 'toppings',
    start: { x: 200, y: -270, rotate: 16, scale: 0.55, opacity: 0 },
    mid: { x: 98, y: -96, rotate: 4, scale: 0.82, opacity: 1 },
    end: { x: 56, y: -50, rotate: 0, scale: 0.78, opacity: 0.95 },
  },
  {
    id: 'avocado',
    src: 'https://pngimg.com/d/avocado_PNG15507.png',
    depth: 1.22,
    size: 168,
    group: 'protein',
    start: { x: 36, y: -282, rotate: 10, scale: 0.55, opacity: 0 },
    mid: { x: 20, y: -118, rotate: -7, scale: 0.78, opacity: 1 },
    end: { x: 4, y: -64, rotate: -9, scale: 0.72, opacity: 0.96 },
  },
  {
    id: 'cucumber',
    src: 'https://pngimg.com/d/cucumber_PNG84314.png',
    depth: 1.08,
    size: 196,
    group: 'greens',
    start: { x: -190, y: -236, rotate: 26, scale: 0.54, opacity: 0 },
    mid: { x: -70, y: -70, rotate: 12, scale: 0.76, opacity: 1 },
    end: { x: -34, y: -36, rotate: 7, scale: 0.73, opacity: 0.94 },
  },
  {
    id: 'leaf',
    src: 'https://pngimg.com/d/basil_PNG26.png',
    depth: 1.12,
    size: 112,
    group: 'greens',
    start: { x: 148, y: -234, rotate: -26, scale: 0.44, opacity: 0 },
    mid: { x: 64, y: -66, rotate: -15, scale: 0.76, opacity: 0.96 },
    end: { x: 34, y: -30, rotate: -10, scale: 0.72, opacity: 0.9 },
  },
  {
    id: 'kale',
    src: 'https://pngimg.com/d/kale_PNG3.png',
    depth: 1.28,
    size: 186,
    group: 'greens',
    start: { x: 214, y: -252, rotate: -18, scale: 0.5, opacity: 0 },
    mid: { x: 96, y: -94, rotate: -7, scale: 0.72, opacity: 0.95 },
    end: { x: 42, y: -44, rotate: -4, scale: 0.69, opacity: 0.9 },
  },
]

const timelinePhases = {
  intro: { start: 0, end: 0.2, ease: 'power2.out' },
  open: { start: 0.2, end: 0.46, ease: 'power3.inOut' },
  ingredients: { start: 0.42, end: 0.84, ease: 'power2.out' },
  settle: { start: 0.84, end: 1, ease: 'back.out(1.4)' },
}

const menuItems = [
  {
    name: 'Green Glow Bowl',
    price: 'Rs 299',
    tag: 'Ready To Eat',
    image:
      'https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=1400&q=80',
  },
  {
    name: 'Citrus Crunch Salad',
    price: 'Rs 319',
    tag: 'Fresh Salad',
    image:
      'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&w=1400&q=80',
  },
  {
    name: 'Herb Protein Bowl',
    price: 'Rs 349',
    tag: 'Best Seller',
    image:
      'https://images.unsplash.com/photo-1467453678174-768ec283a940?auto=format&fit=crop&w=1400&q=80',
  },
  {
    name: 'Mediterranean Mix',
    price: 'Rs 329',
    tag: 'Signature',
    image:
      'https://images.unsplash.com/photo-1511690743698-d9d85f2fbf38?auto=format&fit=crop&w=1400&q=80',
  },
  {
    name: 'Roasted Harvest Bowl',
    price: 'Rs 339',
    tag: 'Chef Pick',
    image:
      'https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=1400&q=80',
  },
  {
    name: 'Garden Classic',
    price: 'Rs 289',
    tag: 'Daily Fresh',
    image:
      'https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?auto=format&fit=crop&w=1400&q=80',
  },
]

const testimonials = [
  {
    quote:
      'Clean flavors, crunchy greens, and packaging that feels premium. My weekly go-to lunch.',
    name: 'Rhea S.',
    role: 'Regular Customer',
  },
  {
    quote:
      'Balanced portions and fast service. The bowls stay fresh and consistent every time.',
    name: 'Arjun M.',
    role: 'Fitness Coach',
  },
  {
    quote:
      'Stylish presentation with genuinely fresh ingredients. Zalada nails quality and speed.',
    name: 'Nikita P.',
    role: 'Food Creator',
  },
]

const contactDetails = {
  address: "WE'RE NOW AT",
  locationNote: 'VISIT US ON INSTAGRAM',
  licenseNo: 'LIC. NO. 21325131001075',
  email: 'hello@zalada.com',
}

const revealEase = [0.22, 1, 0.36, 1]
const MotionDiv = motion.div

function revealProps(shouldReduceMotion, delay = 0, y = 34, amount = 0.28) {
  if (shouldReduceMotion) {
    return { initial: false }
  }

  return {
    initial: { opacity: 0, y },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount },
    transition: { duration: 0.78, ease: revealEase, delay },
  }
}

function phaseDuration(phaseName) {
  const phase = timelinePhases[phaseName]
  return Math.max(phase.end - phase.start, 0.05)
}

function BowlHeroScene({ reducedEffects }) {
  const sectionRef = useRef(null)
  const stageRef = useRef(null)
  const bowlRef = useRef(null)
  const lidLeftRef = useRef(null)
  const lidRightRef = useRef(null)
  const textRef = useRef(null)
  const ingredientRefs = useRef([])
  const particleRefs = useRef([])

  useLayoutEffect(() => {
    if (reducedEffects) {
      return undefined
    }

    const context = gsap.context(() => {
      gsap.set(stageRef.current, { transformPerspective: 900 })
      gsap.set(bowlRef.current, { rotate: 0, scale: 1, yPercent: 0 })
      gsap.set(lidLeftRef.current, {
        xPercent: 0,
        yPercent: 0,
        rotate: -1.5,
        opacity: 0.98,
        transformOrigin: '88% 78%',
      })
      gsap.set(lidRightRef.current, {
        xPercent: 0,
        yPercent: 0,
        rotate: 1.5,
        opacity: 0.98,
        transformOrigin: '12% 78%',
      })

      ingredientLayers.forEach((layer, index) => {
        const element = ingredientRefs.current[index]
        if (!element) {
          return
        }
        gsap.set(element, {
          ...layer.start,
          z: layer.depth * 22,
          transformOrigin: '50% 50%',
        })
      })

      particleRefs.current.forEach((particle, index) => {
        if (!particle) {
          return
        }
        gsap.set(particle, {
          x: (index - 3) * 14,
          y: 24 + index * 6,
          opacity: 0,
          scale: 0.52,
        })
      })

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=150%',
          scrub: 0.9,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      })

      timeline.to(
        stageRef.current,
        {
          scale: 1.04,
          yPercent: -3,
          duration: phaseDuration('intro'),
          ease: timelinePhases.intro.ease,
        },
        timelinePhases.intro.start,
      )
      timeline.to(
        textRef.current,
        {
          yPercent: -10,
          duration: phaseDuration('intro'),
          ease: 'sine.out',
        },
        timelinePhases.intro.start,
      )

      timeline.to(
        lidLeftRef.current,
        {
          xPercent: -72,
          yPercent: -66,
          rotate: -44,
          scale: 0.92,
          duration: phaseDuration('open'),
          ease: timelinePhases.open.ease,
        },
        timelinePhases.open.start,
      )
      timeline.to(
        lidRightRef.current,
        {
          xPercent: 72,
          yPercent: -60,
          rotate: 44,
          scale: 0.92,
          duration: phaseDuration('open'),
          ease: timelinePhases.open.ease,
        },
        timelinePhases.open.start,
      )
      timeline.to(
        bowlRef.current,
        {
          scale: 1.07,
          rotate: -2,
          duration: phaseDuration('open'),
          ease: 'power2.out',
        },
        timelinePhases.open.start + 0.02,
      )

      ingredientLayers.forEach((layer, index) => {
        const element = ingredientRefs.current[index]
        if (!element) {
          return
        }
        const staggerShift = index * 0.045
        const ingredientPhaseLength = phaseDuration('ingredients')
        timeline.to(
          element,
          {
            ...layer.mid,
            duration: ingredientPhaseLength * 0.58,
            ease: 'power3.out',
          },
          timelinePhases.ingredients.start + staggerShift,
        )
        timeline.to(
          element,
          {
            ...layer.end,
            duration: ingredientPhaseLength * 0.42,
            ease: 'sine.inOut',
          },
          timelinePhases.ingredients.start +
            staggerShift +
            ingredientPhaseLength * 0.54,
        )
      })

      particleRefs.current.forEach((particle, index) => {
        if (!particle) {
          return
        }
        timeline.to(
          particle,
          {
            y: -96 - index * 20,
            x: (index - 3) * 30,
            opacity: 0.48,
            scale: 1.08,
            duration: phaseDuration('ingredients') * 0.82,
            ease: 'sine.out',
          },
          timelinePhases.ingredients.start + index * 0.05,
        )
        timeline.to(
          particle,
          {
            y: -156 - index * 28,
            opacity: 0,
            duration: phaseDuration('settle') * 0.92,
            ease: 'sine.in',
          },
          timelinePhases.settle.start + index * 0.015,
        )
      })

      timeline.to(
        bowlRef.current,
        {
          rotate: 0,
          yPercent: 0,
          scale: 1.02,
          duration: phaseDuration('settle'),
          ease: timelinePhases.settle.ease,
        },
        timelinePhases.settle.start,
      )
      timeline.to(
        [lidLeftRef.current, lidRightRef.current],
        {
          opacity: 0.16,
          yPercent: -95,
          duration: phaseDuration('settle'),
          ease: 'power2.in',
        },
        timelinePhases.settle.start,
      )
      timeline.to(
        textRef.current,
        {
          yPercent: -16,
          duration: phaseDuration('settle'),
          ease: 'sine.out',
        },
        timelinePhases.settle.start,
      )
    }, sectionRef)

    return () => {
      context.revert()
    }
  }, [reducedEffects])

  return (
    <section
      id="bowl"
      ref={sectionRef}
      className="bowl-hero mx-auto mt-4 max-w-[1240px] px-4 md:px-8"
    >
      <div className="bowl-hero__panel">
        <img
          src={bowlHeroAssets.backdrop}
          alt="Fresh bowl ingredients in natural light"
          className="bowl-hero__backdrop"
          fetchPriority="high"
        />
        <div className="bowl-hero__veil" />

        <div ref={textRef} className="bowl-hero__copy">
          <p className="bowl-hero__eyebrow">Scroll Crafted Motion</p>
          <h1 className="logo-style bowl-hero__brand">zalada</h1>
          <p className="bowl-hero__text">
            Real ingredients. Smooth motion. A premium bowl experience on every
            scroll.
          </p>
        </div>

        <div ref={stageRef} className="bowl-hero__stage">
          <div className="bowl-hero__ambient-glow" />
          <div ref={bowlRef} className="bowl-hero__bowl-shell">
            <div className="bowl-hero__bowl-mask">
              <img
                src={bowlHeroAssets.bowlBase}
                alt="Zalada signature bowl"
                className="bowl-hero__bowl-base"
                loading="eager"
              />
              <img
                ref={lidLeftRef}
                src={bowlHeroAssets.lidTexture}
                alt=""
                aria-hidden="true"
                className="bowl-hero__lid bowl-hero__lid--left"
                loading="eager"
              />
              <img
                ref={lidRightRef}
                src={bowlHeroAssets.lidTexture}
                alt=""
                aria-hidden="true"
                className="bowl-hero__lid bowl-hero__lid--right"
                loading="eager"
              />
              <div className="bowl-hero__ingredient-layer">
                {ingredientLayers.map((layer, index) => (
                  <img
                    key={layer.id}
                    ref={(element) => {
                      ingredientRefs.current[index] = element
                    }}
                    src={layer.src}
                    alt=""
                    aria-hidden="true"
                    className={`bowl-hero__ingredient bowl-hero__ingredient--${layer.group}`}
                    style={{
                      '--ingredient-size': `${layer.size}px`,
                      '--depth': `${layer.depth}`,
                    }}
                    loading={index < 4 ? 'eager' : 'lazy'}
                    decoding="async"
                  />
                ))}
              </div>
              <div className="bowl-hero__particle-layer" aria-hidden="true">
                {Array.from({ length: 7 }).map((_, index) => (
                  <span
                    key={index}
                    ref={(element) => {
                      particleRefs.current[index] = element
                    }}
                    className="bowl-hero__particle"
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function App() {
  const shouldReduceMotion = useReducedMotion()
  const [optimizeMotion, setOptimizeMotion] = useState(false)
  const [enquiry, setEnquiry] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  })
  const [enquiryStatus, setEnquiryStatus] = useState('')

  useEffect(() => {
    const coarsePointerMedia = window.matchMedia('(pointer: coarse)')
    const mobileMedia = window.matchMedia('(max-width: 900px)')

    const updateMotionMode = () => {
      const lowPowerCpu = navigator.hardwareConcurrency
        ? navigator.hardwareConcurrency <= 6
        : false
      setOptimizeMotion(
        coarsePointerMedia.matches || mobileMedia.matches || lowPowerCpu,
      )
    }

    updateMotionMode()
    coarsePointerMedia.addEventListener('change', updateMotionMode)
    mobileMedia.addEventListener('change', updateMotionMode)

    return () => {
      coarsePointerMedia.removeEventListener('change', updateMotionMode)
      mobileMedia.removeEventListener('change', updateMotionMode)
    }
  }, [])

  const reducedEffects = shouldReduceMotion || optimizeMotion

  useEffect(() => {
    if (typeof window === 'undefined') {
      return undefined
    }

    const criticalAssets = [
      bowlHeroAssets.backdrop,
      bowlHeroAssets.bowlBase,
      bowlHeroAssets.lidTexture,
      ...ingredientLayers.slice(0, 4).map((item) => item.src),
    ]

    criticalAssets.forEach((source) => {
      const preloadImage = new Image()
      preloadImage.decoding = 'async'
      preloadImage.src = source
    })

    return undefined
  }, [])

  useEffect(() => {
    if (reducedEffects) {
      return undefined
    }

    const lenis = new Lenis({
      smoothWheel: true,
      lerp: 0.092,
    })

    const handleLenisScroll = () => {
      ScrollTrigger.update()
    }
    lenis.on('scroll', handleLenisScroll)

    let frameId = 0
    const loop = (time) => {
      lenis.raf(time)
      frameId = window.requestAnimationFrame(loop)
    }
    frameId = window.requestAnimationFrame(loop)

    return () => {
      window.cancelAnimationFrame(frameId)
      lenis.off('scroll', handleLenisScroll)
      lenis.destroy()
    }
  }, [reducedEffects])

  const { scrollYProgress } = useScroll()
  const progressScale = useSpring(scrollYProgress, {
    stiffness: 170,
    damping: 30,
    mass: 0.34,
  })

  const handleEnquirySubmit = (event) => {
    event.preventDefault()
    const subject = encodeURIComponent(
      `Enquiry from ${enquiry.name || 'Website Visitor'}`,
    )
    const body = encodeURIComponent(
      `Name: ${enquiry.name}\nEmail: ${enquiry.email}\nPhone: ${enquiry.phone}\n\nMessage:\n${enquiry.message}`,
    )
    window.location.href = `mailto:${contactDetails.email}?subject=${subject}&body=${body}`
    setEnquiryStatus('Email draft opened. Please send to complete your enquiry.')
  }

  return (
    <div className="relative overflow-x-clip pb-16">
      <MotionDiv
        className="fixed left-0 top-0 z-[90] h-1 w-full origin-left bg-gradient-to-r from-[#226B39] via-[#2D7E4B] to-[#DCE465]"
        style={{ scaleX: progressScale, willChange: 'transform' }}
      />

      <div className="mx-auto max-w-[1240px] px-4 md:px-8">
        <header className="sticky top-4 z-50 mt-4 rounded-full border border-[#226B39]/16 bg-[#F8F5EB]/85 px-4 py-3 shadow-[0_14px_36px_rgba(34,107,57,0.14)] backdrop-blur-xl">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <a href="#top" className="inline-flex items-center">
              <img
                src={logoPath}
                alt="Zalada"
                className="h-10 w-auto md:h-11"
                loading="eager"
              />
            </a>
            <nav className="flex flex-wrap items-center gap-2 text-sm font-semibold text-[#1E4D33]">
              <a
                href="#menu"
                className="rounded-full px-4 py-2 transition hover:bg-[#DCE465]/35"
              >
                Menu
              </a>
              <a
                href="#bowl"
                className="rounded-full px-4 py-2 transition hover:bg-[#DCE465]/35"
              >
                Bowl Motion
              </a>
              <a
                href="#testimonials"
                className="rounded-full px-4 py-2 transition hover:bg-[#DCE465]/35"
              >
                Reviews
              </a>
              <a
                href="#enquiry"
                className="rounded-full px-4 py-2 transition hover:bg-[#DCE465]/35"
              >
                Enquiry
              </a>
              <a
                href="#contact"
                className="rounded-full px-4 py-2 transition hover:bg-[#DCE465]/35"
              >
                Contact
              </a>
              <a
                href="#order"
                className="rounded-full bg-gradient-to-r from-[#226B39] to-[#2E7B49] px-5 py-2 text-white shadow-[0_10px_24px_rgba(34,107,57,0.3)] transition hover:brightness-105"
              >
                Order
              </a>
            </nav>
          </div>
        </header>
      </div>

      <main id="top" className="relative z-10">
        <BowlHeroScene reducedEffects={reducedEffects} />

        <section
          id="menu"
          className="mx-auto mt-20 max-w-[1240px] px-4 md:px-8 [content-visibility:auto]"
        >
          <motion.div className="mb-8" {...revealProps(shouldReduceMotion, 0)}>
            <p className="section-label">Menu</p>
            <h2 className="section-title">Real Salad Bowls</h2>
          </motion.div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {menuItems.map((item, index) => (
              <motion.article
                key={item.name}
                {...revealProps(shouldReduceMotion, index * 0.06, 38)}
                className="group flex h-full flex-col overflow-hidden rounded-[1.6rem] border border-[#226B39]/14 bg-white/76 shadow-[0_20px_48px_rgba(34,107,57,0.11)]"
                whileHover={
                  shouldReduceMotion
                    ? undefined
                    : reducedEffects
                      ? { y: -4 }
                      : { y: -8, rotate: index % 2 ? 0.6 : -0.6 }
                }
              >
                <div className="overflow-hidden">
                  <motion.img
                    src={item.image}
                    alt={item.name}
                    className="h-64 w-full object-cover"
                    loading="lazy"
                    decoding="async"
                    whileHover={
                      shouldReduceMotion
                        ? undefined
                        : reducedEffects
                          ? { scale: 1.03 }
                          : { scale: 1.07 }
                    }
                    transition={{ duration: 0.5, ease: 'easeOut' }}
                  />
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <p className="w-fit rounded-full border border-[#226B39]/18 bg-[#DCE465]/30 px-3 py-1 text-xs font-bold uppercase tracking-[0.08em] text-[#234a34]">
                    {item.tag}
                  </p>
                  <h3 className="mt-3 min-h-[3.2rem] font-['Iowan_Old_Style','Palatino_Linotype','Book_Antiqua',serif] text-[1.7rem] leading-tight text-[#1E3F2E]">
                    {item.name}
                  </h3>
                  <p className="mt-auto pt-4 text-lg font-semibold text-[#226B39]">
                    {item.price}
                  </p>
                </div>
              </motion.article>
            ))}
          </div>
        </section>

        <section
          id="testimonials"
          className="mx-auto mt-20 max-w-[1240px] px-4 md:px-8 [content-visibility:auto]"
        >
          <motion.div className="mb-8" {...revealProps(shouldReduceMotion, 0)}>
            <p className="section-label">Testimonials</p>
            <h2 className="section-title">What Customers Say</h2>
          </motion.div>
          <div className="grid gap-5 md:grid-cols-3">
            {testimonials.map((item, index) => (
              <motion.article
                key={item.name}
                {...revealProps(shouldReduceMotion, index * 0.06, 30)}
                className="rounded-[1.4rem] border border-[#226B39]/14 bg-white/80 p-5 shadow-[0_18px_44px_rgba(34,107,57,0.1)]"
              >
                <p className="text-sm leading-relaxed text-[#2E5640]">
                  "{item.quote}"
                </p>
                <div className="mt-4">
                  <p className="font-semibold text-[#1E3F2E]">{item.name}</p>
                  <p className="text-xs uppercase tracking-[0.08em] text-[#4B6F5B]">
                    {item.role}
                  </p>
                </div>
              </motion.article>
            ))}
          </div>
        </section>

        <section
          id="enquiry"
          className="mx-auto mt-20 max-w-[1240px] px-4 md:px-8 [content-visibility:auto]"
        >
          <motion.div
            className="overflow-hidden rounded-[1.8rem] border border-[#226B39]/14 bg-[#F8F5EB]/88 p-6 shadow-[0_20px_48px_rgba(34,107,57,0.11)] md:p-8"
            {...revealProps(shouldReduceMotion, 0)}
          >
            <p className="section-label">Enquiries</p>
            <h2 className="section-title">Send An Enquiry</h2>
            <div className="mt-6 grid gap-6 md:grid-cols-[0.9fr_1.2fr]">
              <div className="rounded-[1.3rem] border border-[#226B39]/14 bg-white/66 p-5">
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#4A6D59]">
                  Business Desk
                </p>
                <h3 className="logo-style mt-2 text-3xl text-[#1F3F2E]">
                  zalada
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-[#3D5F4A]">
                  Share catering, events, daily office meals, or custom salad
                  plans. We reply through email with menu options and pricing.
                </p>
              </div>

              <form
                className="grid gap-4 md:grid-cols-2"
                onSubmit={handleEnquirySubmit}
              >
                <label className="flex flex-col gap-2">
                  <span className="text-xs font-bold uppercase tracking-[0.1em] text-[#43634F]">
                    Name
                  </span>
                  <input
                    required
                    value={enquiry.name}
                    onChange={(event) =>
                      setEnquiry((previous) => ({
                        ...previous,
                        name: event.target.value,
                      }))
                    }
                    className="rounded-xl border border-[#226B39]/18 bg-white/90 px-4 py-3 text-sm text-[#1F3D2D] outline-none transition focus:border-[#226B39]"
                    placeholder="Your name"
                  />
                </label>
                <label className="flex flex-col gap-2">
                  <span className="text-xs font-bold uppercase tracking-[0.1em] text-[#43634F]">
                    Email
                  </span>
                  <input
                    type="email"
                    required
                    value={enquiry.email}
                    onChange={(event) =>
                      setEnquiry((previous) => ({
                        ...previous,
                        email: event.target.value,
                      }))
                    }
                    className="rounded-xl border border-[#226B39]/18 bg-white/90 px-4 py-3 text-sm text-[#1F3D2D] outline-none transition focus:border-[#226B39]"
                    placeholder="you@email.com"
                  />
                </label>
                <label className="flex flex-col gap-2">
                  <span className="text-xs font-bold uppercase tracking-[0.1em] text-[#43634F]">
                    Phone
                  </span>
                  <input
                    value={enquiry.phone}
                    onChange={(event) =>
                      setEnquiry((previous) => ({
                        ...previous,
                        phone: event.target.value,
                      }))
                    }
                    className="rounded-xl border border-[#226B39]/18 bg-white/90 px-4 py-3 text-sm text-[#1F3D2D] outline-none transition focus:border-[#226B39]"
                    placeholder="+91"
                  />
                </label>
                <label className="flex flex-col gap-2 md:col-span-2">
                  <span className="text-xs font-bold uppercase tracking-[0.1em] text-[#43634F]">
                    Message
                  </span>
                  <textarea
                    required
                    value={enquiry.message}
                    onChange={(event) =>
                      setEnquiry((previous) => ({
                        ...previous,
                        message: event.target.value,
                      }))
                    }
                    className="min-h-32 rounded-xl border border-[#226B39]/18 bg-white/90 px-4 py-3 text-sm text-[#1F3D2D] outline-none transition focus:border-[#226B39]"
                    placeholder="Tell us your requirement"
                  />
                </label>
                <div className="md:col-span-2">
                  <button
                    type="submit"
                    className="pulse-cta rounded-full bg-gradient-to-r from-[#226B39] to-[#2E7B49] px-7 py-3 text-sm font-bold uppercase tracking-[0.12em] text-white shadow-[0_10px_24px_rgba(34,107,57,0.3)] transition hover:brightness-105"
                  >
                    Send Enquiry
                  </button>
                  {enquiryStatus ? (
                    <p className="mt-3 text-sm text-[#2D5A41]">{enquiryStatus}</p>
                  ) : null}
                </div>
              </form>
            </div>
          </motion.div>
        </section>

        <section
          id="contact"
          className="mx-auto mt-20 max-w-[1240px] px-4 md:px-8 [content-visibility:auto]"
        >
          <motion.div
            className="rounded-[1.8rem] border border-[#226B39]/14 bg-white/78 p-6 shadow-[0_20px_48px_rgba(34,107,57,0.11)] md:p-8"
            {...revealProps(shouldReduceMotion, 0)}
          >
            <p className="section-label">Contact</p>
            <h2 className="section-title">Connect With Zalada</h2>
            <div className="mt-5 grid gap-4 md:grid-cols-2">
              <div className="rounded-xl border border-[#226B39]/12 bg-[#F7F4EA] p-4">
                <p className="text-xs font-bold uppercase tracking-[0.1em] text-[#4C6A58]">
                  Address (From Packaging Copy)
                </p>
                <p className="logo-style mt-2 text-3xl text-[#226B39]">
                  {contactDetails.address.toLowerCase()}
                </p>
                <p className="mt-1 text-sm text-[#395C48]">
                  {contactDetails.locationNote}
                </p>
                <p className="mt-2 text-xs font-semibold text-[#4A6D59]">
                  {contactDetails.licenseNo}
                </p>
              </div>
              <div className="rounded-xl border border-[#226B39]/12 bg-[#EFF5E5] p-4">
                <p className="text-xs font-bold uppercase tracking-[0.1em] text-[#4C6A58]">
                  Email Connect
                </p>
                <a
                  href={`mailto:${contactDetails.email}`}
                  className="mt-3 inline-flex rounded-full bg-gradient-to-r from-[#226B39] to-[#2E7B49] px-6 py-3 text-sm font-bold uppercase tracking-[0.12em] text-white shadow-[0_10px_24px_rgba(34,107,57,0.3)] transition hover:brightness-105"
                >
                  {contactDetails.email}
                </a>
              </div>
            </div>
          </motion.div>
        </section>

        <section
          id="order"
          className="mx-auto mt-20 max-w-[1240px] px-4 md:px-8 [content-visibility:auto]"
        >
          <motion.div
            className="overflow-hidden rounded-[2rem] border border-[#226B39]/16 bg-gradient-to-br from-[#226B39] via-[#2B7A47] to-[#3A8A55] p-8 text-white shadow-[0_26px_70px_rgba(34,107,57,0.28)] md:p-10"
            {...revealProps(shouldReduceMotion, 0)}
          >
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#DCE465]">
                  Order Fresh
                </p>
                <h2 className="logo-style mt-2 text-4xl leading-[0.96] md:text-5xl">
                  zalada
                </h2>
              </div>
              <a
                href={`mailto:${contactDetails.email}`}
                className="rounded-full bg-[#DCE465] px-7 py-3 text-sm font-bold uppercase tracking-[0.14em] text-[#234B35] shadow-[0_12px_28px_rgba(220,228,101,0.4)] transition hover:brightness-105"
              >
                Order Now
              </a>
            </div>
          </motion.div>
        </section>
      </main>
    </div>
  )
}

export default App
