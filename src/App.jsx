import { useState, useCallback } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useBackgroundMusic } from './hooks/useBackgroundMusic'
import SparkleBackground from './components/SparkleBackground'
import EntranceGate from './components/EntranceGate'
import BirthdayHeader from './components/BirthdayHeader'
import PhotoSection from './components/PhotoSection'
import GiftZone from './components/GiftZone'
import DiamondSection from './components/DiamondSection'

export default function App() {
  const { startMusic } = useBackgroundMusic()
  const [giftOpened, setGiftOpened] = useState(false)

  const handleUnboxed = useCallback(() => {
    setGiftOpened(true)
  }, [])

  return (
    <div className="relative min-h-screen">
      <SparkleBackground />

      <AnimatePresence mode="wait">
        {!giftOpened && (
          <EntranceGate key="entrance" onUnboxed={handleUnboxed} />
        )}

        {giftOpened && (
          <motion.div
            key="birthday"
            className="relative z-10 pb-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            onPointerDown={startMusic}
          >
            <BirthdayHeader />
            <PhotoSection />
            <GiftZone />
            <DiamondSection />

            <footer className="text-center py-8">
              <p className="text-rose-300/30 text-xs">
                Made with all my love, for you
              </p>
            </footer>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
