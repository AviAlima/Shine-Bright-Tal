import { useEffect } from 'react'
import { motion } from 'framer-motion'
import confetti from 'canvas-confetti'

export default function BirthdayHeader() {
  useEffect(() => {
    // Initial burst
    const duration = 3000
    const end = Date.now() + duration

    const frame = () => {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.7 },
        colors: ['#fda4af', '#fbbf24', '#f43f5e', '#fcd34d'],
      })
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.7 },
        colors: ['#fda4af', '#fbbf24', '#f43f5e', '#fcd34d'],
      })

      if (Date.now() < end) {
        requestAnimationFrame(frame)
      }
    }
    frame()

    // Periodic confetti
    const interval = setInterval(() => {
      confetti({
        particleCount: 20,
        spread: 70,
        origin: { x: Math.random(), y: Math.random() * 0.4 },
        colors: ['#fda4af', '#fbbf24', '#f43f5e', '#fcd34d', '#e11d48'],
      })
    }, 4000)

    return () => clearInterval(interval)
  }, [])

  return (
    <motion.div
      className="text-center pt-8 sm:pt-16 pb-8"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: 'spring', damping: 12 }}
    >
      <motion.div
        className="text-5xl sm:text-7xl mb-4"
        animate={{ rotate: [0, -10, 10, -10, 0] }}
        transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
      >
        🎂
      </motion.div>

      <motion.h1
        className="font-script text-5xl sm:text-7xl lg:text-8xl text-transparent bg-clip-text bg-gradient-to-r from-rose-300 via-gold-300 to-rose-400 mb-4"
        initial={{ scale: 0.5 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', damping: 8, delay: 0.3 }}
      >
        Happy 24th Birthday
      </motion.h1>

      <motion.h2
        className="font-script text-4xl sm:text-6xl text-gold-300"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        Tal!
      </motion.h2>

      <motion.div
        className="flex justify-center gap-2 mt-6 text-2xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
      >
        {['✨', '💖', '🌟', '💎', '🌟', '💖', '✨'].map((emoji, i) => (
          <motion.span
            key={i}
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 1.5, delay: i * 0.15, repeat: Infinity }}
          >
            {emoji}
          </motion.span>
        ))}
      </motion.div>
    </motion.div>
  )
}
