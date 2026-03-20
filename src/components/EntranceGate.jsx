import { useState, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import confetti from 'canvas-confetti'
import GiftIcon from './GiftIcon'

const LONG_PRESS_MS = 1500
const RING_RADIUS = 78
const RING_CIRCUMFERENCE = 2 * Math.PI * RING_RADIUS

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
    confetti({ particleCount: 140, spread: 100, origin: { x: 0.5, y: 0.45 }, colors, startVelocity: 50 })
    setTimeout(() => {
      confetti({ particleCount: 60, angle: 55, spread: 65, origin: { x: 0.1, y: 0.5 }, colors })
      confetti({ particleCount: 60, angle: 125, spread: 65, origin: { x: 0.9, y: 0.5 }, colors })
    }, 120)
    setTimeout(() => {
      confetti({ particleCount: 90, spread: 170, origin: { x: 0.5, y: 0.15 }, colors, startVelocity: 30 })
    }, 300)
  }, [])

  const startPress = useCallback(() => {
    setPressing(true)
    setProgress(0)
    startTimeRef.current = Date.now()
    rafRef.current = requestAnimationFrame(animateProgress)

    timerRef.current = setTimeout(() => {
      setPressing(false)
      setProgress(1)
      setExploding(true)
      fireExplosion()
      // TODO: Add sound effect here
      setTimeout(() => onUnboxed(), 1100)
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
          exit={{ opacity: 0, scale: 1.08 }}
          transition={{ duration: 0.7 }}
        >
          {/* Soft radial glow */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(253,164,175,0.1)_0%,_transparent_65%)]" />

          {/* Floating hearts */}
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute pointer-events-none select-none"
              style={{
                left: `${10 + i * 11}%`,
                top: `${18 + (i % 3) * 22}%`,
                color: `rgba(251,113,133,${0.1 + (i % 3) * 0.06})`,
                fontSize: `${16 + (i % 4) * 7}px`,
              }}
              animate={{ y: [0, -14, 0], opacity: [0.12, 0.3, 0.12] }}
              transition={{ duration: 3 + i * 0.5, repeat: Infinity, ease: 'easeInOut' }}
            >
              ♥
            </motion.div>
          ))}

          {/* Instruction text — English, Dancing Script */}
          <motion.p
            className="relative text-center text-rose-100/80 text-xl sm:text-2xl leading-relaxed mb-12 max-w-sm"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            style={{ fontFamily: "'Dancing Script', cursive" }}
          >
            Tal, give Avi a sweet kiss
            <br />
            to unlock your sparkle...
          </motion.p>

          {/* Gift box with progress ring */}
          <motion.div
            className="relative select-none cursor-pointer"
            initial={{ scale: 0, rotate: -12 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: 'spring', damping: 11, delay: 0.6 }}
          >
            {/* Progress ring */}
            <svg
              className="absolute -inset-5 pointer-events-none"
              width="190"
              height="190"
              viewBox="0 0 190 190"
              style={{ transform: 'rotate(-90deg)' }}
            >
              <circle
                cx="95" cy="95" r={RING_RADIUS}
                fill="none"
                stroke="rgba(251,113,133,0.1)"
                strokeWidth="3.5"
              />
              <circle
                cx="95" cy="95" r={RING_RADIUS}
                fill="none"
                stroke="url(#ringGrad)"
                strokeWidth="3.5"
                strokeLinecap="round"
                strokeDasharray={RING_CIRCUMFERENCE}
                strokeDashoffset={RING_CIRCUMFERENCE * (1 - progress)}
                style={{ transition: pressing ? 'none' : 'stroke-dashoffset 0.25s ease-out' }}
              />
              <defs>
                <linearGradient id="ringGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#fb7185" />
                  <stop offset="50%" stopColor="#f43f5e" />
                  <stop offset="100%" stopColor="#fbbf24" />
                </linearGradient>
              </defs>
            </svg>

            {/* Outer pulse glow — idle only */}
            {!pressing && (
              <motion.div
                className="absolute -inset-4 rounded-full pointer-events-none"
                animate={{
                  boxShadow: [
                    '0 0 0px rgba(251,113,133,0)',
                    '0 0 30px rgba(251,113,133,0.25)',
                    '0 0 0px rgba(251,113,133,0)',
                  ],
                }}
                transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
              />
            )}

            {/* Touch target */}
            <motion.div
              className="w-[140px] h-[140px] flex items-center justify-center"
              animate={pressing ? {
                rotate: [-1.5, 1.5, -1.5, 1.5, -0.8, 0.8, 0],
                scale: [1, 1.03, 1, 1.03, 1],
              } : {
                y: [0, -5, 0],
              }}
              transition={pressing ? {
                duration: 0.35,
                repeat: Infinity,
              } : {
                duration: 2.8,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              onPointerDown={startPress}
              onPointerUp={cancelPress}
              onPointerLeave={cancelPress}
              onContextMenu={e => e.preventDefault()}
              style={{ touchAction: 'none', WebkitTouchCallout: 'none', userSelect: 'none' }}
            >
              <GiftIcon size={120} />
            </motion.div>
          </motion.div>

          {/* Hint */}
          <motion.p
            className="relative text-rose-300/30 text-xs mt-10 tracking-wide"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
          >
            {pressing ? '💋 ...' : 'press & hold'}
          </motion.p>
        </motion.div>
      ) : (
        <motion.div
          key="exploding"
          className="fixed inset-0 z-20 flex items-center justify-center"
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 0.9, delay: 0.25 }}
        >
          {[...Array(14)].map((_, i) => {
            const angle = (i / 14) * 2 * Math.PI
            const dist = 100 + (i % 3) * 30
            return (
              <motion.div
                key={i}
                className="absolute text-2xl"
                initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
                animate={{
                  x: Math.cos(angle) * dist,
                  y: Math.sin(angle) * dist,
                  opacity: 0,
                  scale: 0.2,
                }}
                transition={{ duration: 0.75, ease: 'easeOut' }}
              >
                {['✨', '💖', '🌟', '💎', '💋'][i % 5]}
              </motion.div>
            )
          })}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
