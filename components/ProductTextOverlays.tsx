'use client'

import { motion, MotionValue, useTransform } from 'framer-motion'
import type { Product } from '@/data/products'

interface ProductTextOverlaysProps {
  product: Product
  progress: MotionValue<number>
}

export function ProductTextOverlays({ product, progress }: ProductTextOverlaysProps) {
  const p1 = useTransform(progress, [0.02, 0.1, 0.2, 0.28], [0, 1, 1, 0])
  const p2 = useTransform(progress, [0.24, 0.32, 0.45, 0.53], [0, 1, 1, 0])
  const p3 = useTransform(progress, [0.5, 0.6, 0.72, 0.8], [0, 1, 1, 0])
  const p4 = useTransform(progress, [0.76, 0.85, 0.97, 1], [0, 1, 1, 0])

  return (
    <div className="pointer-events-none absolute inset-0 z-20">
      <Overlay opacity={p1} title={product.section1.title} subtitle={product.section1.subtitle} />
      <Overlay opacity={p2} title={product.section2.title} subtitle={product.section2.subtitle} />
      <Overlay opacity={p3} title={product.section3.title} subtitle={product.section3.subtitle} />
      <Overlay opacity={p4} title={product.section4.title} subtitle={product.section4.subtitle} />
    </div>
  )
}

function Overlay({
  opacity,
  title,
  subtitle,
}: {
  opacity: MotionValue<number>
  title: string
  subtitle: string
}) {
  return (
    <motion.div
      style={{ opacity }}
      className="absolute left-1/2 top-[12%] w-[min(95vw,980px)] -translate-x-1/2 px-4 text-center"
    >
      <h2 className="display-font text-4xl leading-[0.95] text-white drop-shadow-[0_10px_32px_rgba(16,29,21,0.55)] md:text-7xl">
        {title}
      </h2>
      <p className="mx-auto mt-3 max-w-3xl text-sm text-white/90 md:text-lg">{subtitle}</p>
    </motion.div>
  )
}
