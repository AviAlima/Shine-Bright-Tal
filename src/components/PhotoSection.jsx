import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const BASE = import.meta.env.BASE_URL + 'memories/'

const MEMORIES = [
  { id: 1, title: 'Mustache', file: '1-mustache/photo.jpg' },
  { id: 2, title: 'Chocolate', file: '2-chocolate/photo.jpg' },
  { id: 3, title: 'By the Lake', file: '3-by-the-lake/photo.jpg' },
  { id: 4, title: 'With Hugo', file: '4-with-hugo/photo.jpg' },
  { id: 5, title: 'Leaving Home', file: '5-leaving-home/photo.jpg' },
  { id: 6, title: 'Cooking', file: '6-cooking/video.mp4', video: true },
  { id: 7, title: 'Towels', file: '7-towels/photo.jpg' },
  { id: 8, title: 'First Trip Abroad', file: '8-first-trip-abroad/photo.jpg' },
  { id: 9, title: "At Tassi's", file: '9-at-tassis/photo.jpg' },
  { id: 10, title: 'Under Fire', file: '10-under-fire/photo.jpg' },
]

function LockedTile({ memory, index, onReveal, revealed }) {
  return (
    <motion.button
      className="aspect-square rounded-2xl overflow-hidden relative"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.5 + index * 0.08 }}
      whileTap={{ scale: 0.96 }}
      onClick={() => onReveal(memory)}
    >
      {revealed ? (
        // Revealed thumbnail
        memory.video ? (
          <video
            src={BASE + memory.file}
            className="absolute inset-0 w-full h-full object-cover"
            muted
            playsInline
            preload="metadata"
          />
        ) : (
          <img
            src={BASE + memory.file}
            alt={memory.title}
            className="absolute inset-0 w-full h-full object-cover"
            loading="lazy"
          />
        )
      ) : (
        // Locked frosted tile
        <div className="absolute inset-0 bg-white/[0.04] backdrop-blur-sm border border-white/[0.08] flex flex-col items-center justify-center gap-2">
          <span
            className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-amber-300 to-amber-500"
            style={{ fontFamily: "Georgia, serif" }}
          >
            {memory.id}
          </span>
          {memory.video && (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="text-white/20">
              <polygon points="5,3 19,12 5,21" />
            </svg>
          )}
        </div>
      )}

      {/* Title bar at bottom when revealed */}
      {revealed && (
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent px-2 pb-2 pt-4">
          <p className="text-white text-[11px] text-center font-medium truncate">{memory.title}</p>
        </div>
      )}
    </motion.button>
  )
}

function Lightbox({ memory, onClose }) {
  // Lock body scroll
  useEffect(() => {
    const y = window.scrollY
    document.body.style.position = 'fixed'
    document.body.style.top = `-${y}px`
    document.body.style.left = '0'
    document.body.style.right = '0'
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.position = ''
      document.body.style.top = ''
      document.body.style.left = ''
      document.body.style.right = ''
      document.body.style.overflow = ''
      window.scrollTo(0, y)
    }
  }, [])

  return (
    <motion.div
      className="fixed inset-0 z-[260] flex flex-col items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/80 backdrop-blur-md" />

      <motion.div
        className="relative z-10 max-w-lg w-full mx-4 flex flex-col items-center"
        initial={{ scale: 0.85, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ type: 'spring', damping: 20 }}
        onClick={e => e.stopPropagation()}
      >
        {/* Media */}
        <div className="w-full rounded-2xl overflow-hidden bg-black/40">
          {memory.video ? (
            <video
              src={BASE + memory.file}
              className="w-full max-h-[65vh] object-contain"
              autoPlay
              loop
              muted
              playsInline
            />
          ) : (
            <img
              src={BASE + memory.file}
              alt={memory.title}
              className="w-full max-h-[65vh] object-contain"
            />
          )}
        </div>

        {/* Title */}
        <p
          className="text-white/90 text-lg mt-4 text-center"
          style={{ fontFamily: "'Dancing Script', cursive" }}
        >
          {memory.title}
        </p>

        {/* Close */}
        <button
          className="mt-4 text-white/30 text-xs hover:text-white/50 transition-colors py-2 px-4"
          onClick={onClose}
        >
          Close
        </button>
      </motion.div>
    </motion.div>
  )
}

export default function PhotoSection() {
  const [revealed, setRevealed] = useState(new Set())
  const [lightboxItem, setLightboxItem] = useState(null)

  const handleReveal = (memory) => {
    setRevealed(prev => new Set(prev).add(memory.id))
    setLightboxItem(memory)
  }

  return (
    <motion.section
      className="px-4 sm:px-8 py-12"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.5 }}
    >
      <h3 className="font-script text-3xl sm:text-4xl text-center text-rose-200 mb-8">
        Our Memories
      </h3>

      <div className="grid grid-cols-2 gap-3 sm:gap-4 max-w-sm mx-auto">
        {MEMORIES.map((memory, index) => (
          <LockedTile
            key={memory.id}
            memory={memory}
            index={index}
            revealed={revealed.has(memory.id)}
            onReveal={handleReveal}
          />
        ))}
      </div>

      <AnimatePresence>
        {lightboxItem && (
          <Lightbox
            key={lightboxItem.id}
            memory={lightboxItem}
            onClose={() => setLightboxItem(null)}
          />
        )}
      </AnimatePresence>
    </motion.section>
  )
}
