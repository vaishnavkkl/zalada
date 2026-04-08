'use client'

import { motion } from 'framer-motion'

interface NutritionRevealProps {
  visible: boolean
  calories: number
  fat: number
  protein: number
}

export function NutritionReveal({ visible, calories, fat, protein }: NutritionRevealProps) {
  return (
    <motion.div
      id="nutrition"
      initial={{ opacity: 0, y: 18, scale: 0.96 }}
      animate={visible ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0.26, y: 10, scale: 0.98 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className="glass-panel absolute bottom-6 left-1/2 z-30 w-[min(92vw,560px)] -translate-x-1/2 rounded-3xl p-4 md:bottom-8 md:p-6"
    >
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-olive-700">Total Intake</p>
      <div className="mt-4 grid grid-cols-3 gap-3">
        <Stat label="Calories" value={`${calories} kcal`} />
        <Stat label="Fat" value={`${fat.toFixed(1)} g`} />
        <Stat label="Protein" value={`${protein.toFixed(1)} g`} />
      </div>
    </motion.div>
  )
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/45 bg-white/46 p-3 text-center shadow-[0_14px_28px_rgba(24,42,30,0.14)]">
      <p className="text-xs uppercase tracking-[0.1em] text-olive-700">{label}</p>
      <p className="mt-1 text-lg font-semibold text-olive-900 md:text-xl">{value}</p>
    </div>
  )
}
