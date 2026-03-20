import { useState, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import confetti from 'canvas-confetti'

const LONG_PRESS_MS = 1500

export default function EntranceGate({ onUnboxed }) {
  const [pressing, setPressing] = useState(false)
  const [progress, setProgress] = useState(0)
  const [exploding, setExploding] = useState(false)
  const timerRef = useRef(null)
  const rafRef = useRef(null)
  const startTimeRef = useRef(null)

  const animateProgress = useCallback(() => {
    const elapsed = Date.now() - startTimeRef.current
    const pct = Math.min(elapsed / LONG_PRESS_MS, 1)
    setProgress(pct)

    if (pct < 1) {
      rafRef.current = requestAnimationFrame(animateProgress)
    }
  }, [])

  const fireExplosion = useCallback(() => {
    const colors = ['#fda4af', '#fbbf24', '#f43f5e', '#fcd34d', '#e11d48', '#ec4899', '#a855f7']
    // Big center burst
    confetti({ particleCount: 120, spread: 100, origin: { x: 0.5, y: 0.45 }, colors, startVelocity: 45 })
    // Side bursts
    setTimeout(() => {
      confetti({ particleCount: 60, angle: 60, spread: 60, origin: { x: 0.15, y: 0.5 }, colors })
      confetti({ particleCount: 60, angle: 120, spread: 60, origin: { x: 0.85, y: 0.5 }, colors })
    }, 150)
    // Top shower
    setTimeout(() => {
      confetti({ particleCount: 80, spread: 160, origin: { x: 0.5, y: 0.2 }, colors, startVelocity: 30 })
    }, 350)
  }, [])

  const startPress = useCallback(() => {
    setPressing(true)
    setProgress(0)
    startTimeRef.current = Date.now()
    rafRef.current = requestAnimationFrame(animateProgress)

    timerRef.current = setTimeout(() => {
      // Long press completed
      setPressing(false)
      setProgress(1)
      setExploding(true)
      fireExplosion()
      // TODO: Add sound effect here
      setTimeout(() => onUnboxed(), 1200)
    }, LONG_PRESS_MS)
  }, [animateProgress, fireExplosion, onUnboxed])

  const cancelPress = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current)
    if (rafRef.current) cancelAnimationFrame(rafRef.current)
    setPressing(false)
    setProgress(0)
  }, [])

  return (
    <AnimatePresence>
      {!exploding ? (
        <motion.div
          key="gate"
          className="fixed inset-0 z-20 flex flex-col items-center justify-center px-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.1 }}
          transition={{ duration: 0.8 }}
        >
          {/* Soft radial glow background */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(253,164,175,0.08)_0%,_transparent_70%)]" />

          {/* Floating hearts */}
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-rose-400/20 pointer-events-none select-none"
              style={{
                left: `${12 + i * 11}%`,
                top: `${15 + (i % 3) * 25}%`,
                fontSize: `${18 + (i % 4) * 8}px`,
              }}
              animate={{ y: [0, -15, 0], opacity: [0.15, 0.35, 0.15] }}
              transition={{ duration: 3 + i * 0.4, repeat: Infinity, ease: 'easeInOut' }}
            >
              ♥
            </motion.div>
          ))}

          {/* Hebrew instruction text */}
          <motion.p
            className="relative text-center text-rose-200/80 text-lg sm:text-xl leading-relaxed mb-10 max-w-xs"
            dir="rtl"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            style={{ fontFamily: "'Poppins', sans-serif" }}
          >
            טל, תני לאבי נשיקה גדולה
            <br />
            כדי לפתוח את המתנה...
          </motion.p>

          {/* Gift box */}
          <motion.div
            className="relative select-none cursor-pointer"
            initial={{ scale: 0, rotate: -15 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: 'spring', damping: 10, delay: 0.6 }}
          >
            {/* Heart fill ring — shows long-press progress */}
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none"
              viewBox="0 0 160 160"
              style={{ transform: 'rotate(-90deg)' }}
            >
              <circle
                cx="80" cy="80" r="72"
                fill="none"
                stroke="rgba(251,113,133,0.15)"
                strokeWidth="4"
              />
              <circle
                cx="80" cy="80" r="72"
                fill="none"
                stroke="url(#progressGrad)"
                strokeWidth="4"
                strokeLinecap="round"
                strokeDasharray={2 * Math.PI * 72}
                strokeDashoffset={2 * Math.PI * 72 * (1 - progress)}
                style={{ transition: pressing ? 'none' : 'stroke-dashoffset 0.3s ease' }}
              />
              <defs>
                <linearGradient id="progressGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#fb7185" />
                  <stop offset="100%" stopColor="#fbbf24" />
                </linearGradient>
              </defs>
            </svg>

            {/* The box itself */}
            <motion.div
              className="w-40 h-40 flex items-center justify-center text-8xl"
              animate={pressing ? {
                rotate: [-2, 2, -2, 2, -1, 1, 0],
                scale: [1, 1.04, 1, 1.04, 1],
              } : {
                y: [0, -6, 0],
              }}
              transition={pressing ? {
                duration: 0.4,
                repeat: Infinity,
              } : {
                duration: 2.5,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              onPointerDown={startPress}
              onPointerUp={cancelPress}
              onPointerLeave={cancelPress}
              onContextMenu={e => e.preventDefault()}
              style={{ touchAction: 'none', WebkitTouchCallout: 'none', userSelect: 'none' }}
            >
              🎁
            </motion.div>
          </motion.div>

          {/* Hint text */}
          <motion.p
            className="relative text-rose-300/30 text-xs mt-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
          >
            {pressing ? '💋 ...' : 'לחצי והחזיקי...'}
          </motion.p>
        </motion.div>
      ) : (
        <motion.div
          key="exploding"
          className="fixed inset-0 z-20 flex items-center justify-center"
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 1.0, delay: 0.3 }}
        >
          {/* Explosion sparkle burst */}
          {[...Array(12)].map((_, i) => {
            const angle = (i / 12) * 2 * Math.PI
            return (
              <motion.div
                key={i}
                className="absolute text-2xl"
                initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
                animate={{
                  x: Math.cos(angle) * 120,
                  y: Math.sin(angle) * 120,
                  opacity: 0,
                  scale: 0.3,
                }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
              >
                {['✨', '💖', '🌟', '💎'][i % 4]}
              </motion.div>
            )
          })}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
