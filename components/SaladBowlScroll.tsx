'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useMotionValueEvent, useScroll, useSpring, useTransform } from 'framer-motion'
import { type Product } from '@/data/products'

interface SaladBowlScrollProps {
  product: Product
}

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value))
}

// Exact studio grey from the video background — sampled from top-left corner
// This makes the image edge invisible against the page bg
const VIDEO_BG = '#EDEDEB'

const TAGS = ['Farm Fresh', 'Zero Preservatives', 'Chef Crafted', 'Cold Chain']

export function SaladBowlScroll({ product }: SaladBowlScrollProps) {
  const sectionRef = useRef<HTMLElement | null>(null)
  const stageRef = useRef<HTMLDivElement | null>(null)
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const frameImagesRef = useRef<HTMLImageElement[]>([])
  const canvasMetricsRef = useRef({ width: 0, height: 0, dpr: 0 })
  const rafRef = useRef<number | null>(null)
  const latestProgressRef = useRef(0)

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

  // Hero headline parallax — slide up gently as you scroll
  const headlineY = useTransform(smoothProgress, [0, 0.25], [0, -32])
  const headlineOpacity = useTransform(smoothProgress, [0, 0.20], [1, 0])
  // Image scales slightly into view from below
  const imageScale = useTransform(smoothProgress, [0, 0.12], [0.94, 1])
  const imageY = useTransform(smoothProgress, [0, 0.12], [20, 0])

  // ── Canvas draw ─────────────────────────────────────────────────
  const drawFrame = (progress: number) => {
    const canvas = canvasRef.current
    const stage = stageRef.current
    if (!canvas || !stage || frameImagesRef.current.length === 0) return

    const idx = Math.floor(clamp(progress, 0, 1) * (product.frameCount - 1))
    const frame = frameImagesRef.current[idx]
    if (!frame || !frame.complete) return

    const width = stage.clientWidth
    const height = stage.clientHeight
    const dpr = Math.min(window.devicePixelRatio || 1, 2) // Cap DPR at 2 for performance

    const nW = Math.round(width * dpr)
    const nH = Math.round(height * dpr)

    const ctx = canvas.getContext('2d', { alpha: false }) // Disable alpha if possible for faster clear
    if (!ctx) return

    if (
      canvasMetricsRef.current.width !== nW ||
      canvasMetricsRef.current.height !== nH ||
      canvasMetricsRef.current.dpr !== dpr
    ) {
      canvas.width = nW
      canvas.height = nH
      canvasMetricsRef.current = { width: nW, height: nH, dpr }
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    // Clear canvas
    ctx.fillStyle = VIDEO_BG
    ctx.fillRect(0, 0, width, height)

    // Draw image cover with slight overdraw (1.01x) to prevent sub-pixel edge gaps
    const ir = frame.width / frame.height
    const cr = width / height
    let dw = width, dh = height, ox = 0, oy = 0
    if (ir > cr) {
      dh = dw / ir
      oy = (height - dh) / 2
    } else {
      dw = dh * ir
      ox = (width - dw) / 2
    }

    const scale = 1.01
    ctx.drawImage(frame, ox - (dw * (scale - 1)) / 2, oy - (dh * (scale - 1)) / 2, dw * scale, dh * scale)
  }

  // ── Load images ──────────────────────────────────────────────────
  useEffect(() => {
    let canceled = false
    setReady(false)

    const images = Array.from({ length: product.frameCount }, (_, i) => {
      const img = new Image()
      const n = String(i + 1).padStart(product.framePad, '0')
      img.src = `${product.folderPath}/${product.framePrefix}${n}.${product.frameExtension}`
      return img
    })
    frameImagesRef.current = images

    let loaded = 0
    const onDone = () => {
      loaded++
      if (!canceled && loaded >= product.frameCount) {
        setReady(true)
        drawFrame(latestProgressRef.current)
      }
    }
    images.forEach(img => { img.onload = onDone; img.onerror = onDone })

    const onResize = () => drawFrame(latestProgressRef.current)
    let ro: ResizeObserver | null = null
    if (stageRef.current && typeof ResizeObserver !== 'undefined') {
      ro = new ResizeObserver(onResize)
      ro.observe(stageRef.current)
    }
    window.addEventListener('resize', onResize)

    return () => {
      canceled = true
      window.removeEventListener('resize', onResize)
      ro?.disconnect()
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current)
    }
  }, [product])

  useMotionValueEvent(smoothProgress, 'change', (v) => {
    latestProgressRef.current = v
    if (!ready) return
    if (rafRef.current === null) {
      rafRef.current = window.requestAnimationFrame(() => {
        drawFrame(latestProgressRef.current)
        rafRef.current = null
      })
    }
  })


  return (
    /*
      Section height: 340vh = scroll distance for the full animation.
      The sticky container is the full viewport, bg matches VIDEO_BG exactly.
    */
    <section ref={sectionRef} className="relative h-[340vh]" id="top">
      <div
        className="sticky top-0 flex h-screen flex-col items-center justify-start overflow-hidden pt-20 md:pt-24"
        style={{ backgroundColor: VIDEO_BG }}
      >

        {/* ── Ambient blobs that match the video lighting ── */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          {/* Top-center warm glow — matches the warm highlight in the video */}
          <div
            className="absolute -top-40 left-1/2 h-[480px] w-[560px] -translate-x-1/2 rounded-full opacity-70 blur-[100px]"
            style={{ background: 'radial-gradient(circle, #f5f0ea 0%, transparent 70%)' }}
          />
          {/* Bottom soft shadow — matches the ground shadow in video */}
          <div
            className="absolute -bottom-20 left-1/2 h-[200px] w-[700px] -translate-x-1/2 rounded-full opacity-40 blur-[60px]"
            style={{ background: 'radial-gradient(circle, #d0cdc9 0%, transparent 70%)' }}
          />
        </div>

        {/* ── Canvas — constrained width, edge-faded ── */}
        <motion.div
          style={{ scale: imageScale, y: imageY }}
          className="relative z-10 mx-auto w-full max-w-[620px] px-4"
        >
          {/* Canvas with edge-fade overlays */}
          <div
            ref={stageRef}
            className="relative w-full overflow-hidden"
            style={{ aspectRatio: '16/9' }}
          >
            <canvas
              ref={canvasRef}
              className="absolute inset-0 h-full w-full"
              style={{
                maskImage: 'radial-gradient(ellipse 50% 48% at center, black 45%, transparent 92%)',
                WebkitMaskImage: 'radial-gradient(ellipse 50% 48% at center, black 45%, transparent 92%)'
              }}
              aria-hidden="true"
            />

            {/* Loading placeholder — just the match bg during heavy preload */}
            {!ready && (
              <div className="absolute inset-0" style={{ backgroundColor: VIDEO_BG }} />
            )}
          </div>

          {/* ── Scroll Prompt (Removed percentage circle indicator) ── */}
          <div className="mt-4 flex flex-col items-center justify-center gap-2">
            <span className="text-[10px] uppercase tracking-[0.24em] text-[#2F6B3F]/50">
              Scroll to discover
            </span>
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
              className="h-4 w-px bg-[#2F6B3F]/30"
            />
          </div>
        </motion.div>

        {/* ── Hero headline — moved below the image ── */}
        <motion.div
          style={{ y: headlineY, opacity: headlineOpacity }}
          className="relative z-20 mt-6 w-full max-w-3xl px-4 text-center"
        >
          {/* Main title — slightly smaller for better viewport fit */}
          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.12, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="display-font text-[2.4rem] leading-[1.1] text-[#1a1a18] md:text-[3.2rem] lg:text-[4rem]"
          >
            {product.name}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="mt-2 text-[0.85rem] font-light tracking-wide text-[#5a5a52]"
          >
            {product.description}
          </motion.p>
        </motion.div>

      </div>
    </section>
  )
}
