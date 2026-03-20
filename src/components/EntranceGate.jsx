import { useState, useRef, useCallback, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import GiftIcon from './GiftIcon'

const LONG_PRESS_MS = 1500

// Tiny sparkle particles that radiate during long press
function PressSparkles({ active, progress }) {
  if (!active) return null
  return (
    <div className="absolute inset-0 pointer-events-none">
      {[...Array(10)].map((_, i) => {
        const angle = (i / 10) * 2 * Math.PI + progress * 2
        const dist = 50 + progress * 40
        const gold = i % 2 === 0
        return (
          <motion.div
            key={i}
            className="absolute left-1/2 top-1/2 rounded-full"
            style={{
              width: gold ? 3 : 2,
              height: gold ? 3 : 2,
              background: gold ? '#fcd34d' : '#e2e8f0',
              marginLeft: -1.5,
              marginTop: -1.5,
            }}
            animate={{
              x: Math.cos(angle) * dist,
              y: Math.sin(angle) * dist,
              opacity: [0, 0.9, 0],
              scale: [0.5, 1.2, 0.3],
            }}
            transition={{
              duration: 0.8,
              repeat: Infinity,
              delay: i * 0.08,
              ease: 'easeOut',
            }}
          />
        )
      })}
    </div>
  )
}

export default function EntranceGate({ onUnboxed }) {
  const [pressing, setPressing] = useState(false)
  const [progress, setProgress] = useState(0)
  const [phase, setPhase] = useState('idle') // idle | pressing | flash | done
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

  const startPress = useCallback(() => {
    setPressing(true)
    setPhase('pressing')
    setProgress(0)
    startTimeRef.current = Date.now()
    rafRef.current = requestAnimationFrame(animateProgress)

    timerRef.current = setTimeout(() => {
      setPressing(false)
      setProgress(1)
      setPhase('flash')
      // TODO: Add sound effect here
    }, LONG_PRESS_MS)
  }, [animateProgress])

  const cancelPress = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current)
    if (rafRef.current) cancelAnimationFrame(rafRef.current)
    setPressing(false)
    setPhase('idle')
    setProgress(0)
  }, [])

  // Flash phase → transition to dashboard
  useEffect(() => {
    if (phase === 'flash') {
      const t = setTimeout(() => {
        setPhase('done')
        setTimeout(() => onUnboxed(), 400)
      }, 900)
      return () => clearTimeout(t)
    }
  }, [phase, onUnboxed])

  // Inner glow intensity based on press progress
  const glowOpacity = pressing ? 0.15 + progress * 0.5 : 0
  const glowRadius = pressing ? 80 + progress * 80 : 80

  return (
    <AnimatePresence>
      {phase !== 'done' && (
        <motion.div
          key="gate"
          className="fixed inset-0 z-20 flex flex-col items-center justify-center px-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Base ambient glow */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(253,164,175,0.06)_0%,_transparent_65%)]" />

          {/* Flash of light overlay */}
          <AnimatePresence>
            {phase === 'flash' && (
              <motion.div
                className="absolute inset-0 z-50"
                initial={{ opacity: 0, background: 'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.9) 0%, rgba(253,164,175,0.3) 40%, transparent 70%)' }}
                animate={{ opacity: [0, 1, 1, 0], background: 'radial-gradient(circle at 50% 50%, rgba(255,255,255,1) 0%, rgba(255,255,255,0.6) 50%, transparent 80%)' }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.9, times: [0, 0.15, 0.5, 1] }}
              />
            )}
          </AnimatePresence>

          {/* Floating ambient sparkle dots (silver & gold) */}
          {[...Array(12)].map((_, i) => {
            const gold = i % 3 === 0
            return (
              <motion.div
                key={i}
                className="absolute rounded-full pointer-events-none"
                style={{
                  width: gold ? 4 : 3,
                  height: gold ? 4 : 3,
                  background: gold ? '#fcd34d' : '#cbd5e1',
                  left: `${8 + i * 7.5}%`,
                  top: `${12 + (i % 4) * 20}%`,
                }}
                animate={{
                  y: [0, -18, 0],
                  opacity: [0.1, 0.45, 0.1],
                  scale: [0.7, 1.2, 0.7],
                }}
                transition={{
                  duration: 2.5 + i * 0.35,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: i * 0.2,
                }}
              />
            )
          })}

          {/* Instruction text */}
          <motion.p
            className="relative text-center text-rose-100/80 text-xl sm:text-2xl leading-relaxed mb-12 max-w-sm"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: phase === 'flash' ? 0 : 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            style={{ fontFamily: "'Dancing Script', cursive" }}
          >
            Tal, give Avi a sweet kiss
            <br />
            to unlock your sparkle...
          </motion.p>

          {/* Gift box area */}
          <motion.div
            className="relative select-none cursor-pointer"
            initial={{ scale: 0, rotate: -12 }}
            animate={{ scale: phase === 'flash' ? 1.15 : 1, rotate: 0 }}
            transition={phase === 'flash' ? { duration: 0.3 } : { type: 'spring', damping: 11, delay: 0.6 }}
          >
            {/* Inner glow — accumulates during press */}
            <div
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none transition-all"
              style={{
                width: glowRadius * 2,
                height: glowRadius * 2,
                background: `radial-gradient(circle, rgba(253,200,140,${glowOpacity}) 0%, rgba(251,113,133,${glowOpacity * 0.5}) 50%, transparent 75%)`,
                transitionDuration: pressing ? '0ms' : '300ms',
              }}
            />

            {/* Progress ring */}
            <svg
              className="absolute -inset-5 pointer-events-none"
              width="190"
              height="190"
              viewBox="0 0 190 190"
              style={{ transform: 'rotate(-90deg)' }}
            >
              <circle cx="95" cy="95" r="78" fill="none" stroke="rgba(251,113,133,0.08)" strokeWidth="3" />
              <circle
                cx="95" cy="95" r="78"
                fill="none"
                stroke="url(#ringGrad2)"
                strokeWidth="3"
                strokeLinecap="round"
                strokeDasharray={2 * Math.PI * 78}
                strokeDashoffset={2 * Math.PI * 78 * (1 - progress)}
                style={{ transition: pressing ? 'none' : 'stroke-dashoffset 0.25s ease-out' }}
              />
              <defs>
                <linearGradient id="ringGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#e2e8f0" />
                  <stop offset="50%" stopColor="#fbbf24" />
                  <stop offset="100%" stopColor="#fcd34d" />
                </linearGradient>
              </defs>
            </svg>

            {/* Idle pulse glow */}
            {!pressing && phase === 'idle' && (
              <motion.div
                className="absolute -inset-4 rounded-full pointer-events-none"
                animate={{
                  boxShadow: [
                    '0 0 0px rgba(252,211,77,0)',
                    '0 0 28px rgba(252,211,77,0.2)',
                    '0 0 0px rgba(252,211,77,0)',
                  ],
                }}
                transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
              />
            )}

            {/* Radiating sparkle particles during press */}
            <PressSparkles active={pressing} progress={progress} />

            {/* Touch target */}
            <motion.div
              className="w-[140px] h-[140px] flex items-center justify-center"
              animate={pressing ? {
                rotate: [-1.5, 1.5, -1.5, 1.5, -0.8, 0.8, 0],
                scale: [1, 1.03, 1, 1.03, 1],
              } : phase === 'flash' ? {
                scale: [1, 1.3],
                opacity: [1, 0],
              } : {
                y: [0, -5, 0],
              }}
              transition={pressing ? {
                duration: 0.35,
                repeat: Infinity,
              } : phase === 'flash' ? {
                duration: 0.5,
              } : {
                duration: 2.8,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              onPointerDown={phase === 'idle' ? startPress : undefined}
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
            animate={{ opacity: phase === 'flash' ? 0 : 1 }}
            transition={{ delay: phase === 'idle' ? 1.2 : 0 }}
          >
            {pressing ? '...' : 'press & hold'}
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
