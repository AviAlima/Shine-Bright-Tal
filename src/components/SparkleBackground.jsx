import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

function randomBetween(min, max) {
  return Math.random() * (max - min) + min
}

export default function SparkleBackground() {
  const [particles, setParticles] = useState([])

  useEffect(() => {
    const items = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      x: randomBetween(0, 100),
      y: randomBetween(0, 100),
      size: randomBetween(2, 6),
      duration: randomBetween(3, 8),
      delay: randomBetween(0, 5),
    }))
    setParticles(items)
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {particles.map(p => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-rose-300/30"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.2, 0.8, 0.2],
            scale: [0.8, 1.3, 0.8],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  )
}
