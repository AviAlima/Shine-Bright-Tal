import { useState, useCallback } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useDateEngine } from './hooks/useDateEngine'
import SparkleBackground from './components/SparkleBackground'
import Countdown from './components/Countdown'
import BirthdayHeader from './components/BirthdayHeader'
import PhotoSection from './components/PhotoSection'
import GiftZone from './components/GiftZone'
import DiamondSection from './components/DiamondSection'
import HiddenTapZone from './components/HiddenTapZone'
import SecretNumpad from './components/SecretNumpad'
import DevPanel from './components/DevPanel'

export default function App() {
  const { isBirthdayMode, forceBirthday, countdown, toggleBirthdayMode } = useDateEngine()
  const [numpadOpen, setNumpadOpen] = useState(false)
  const [unlocked, setUnlocked] = useState(false)

  const handleTapUnlock = useCallback(() => {
    if (!unlocked) {
      setNumpadOpen(true)
    } else {
      // Already unlocked — toggle panel visibility
      setUnlocked(prev => !prev)
    }
  }, [unlocked])

  const handleCodeSuccess = useCallback(() => {
    setNumpadOpen(false)
    setUnlocked(true)
  }, [])

  return (
    <div className="relative min-h-screen">
      <SparkleBackground />

      <AnimatePresence mode="wait">
        {!isBirthdayMode ? (
          <motion.div
            key="countdown"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.6 }}
          >
            <Countdown countdown={countdown} />
          </motion.div>
        ) : (
          <motion.div
            key="birthday"
            className="relative z-10 pb-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
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

      {/* Hidden 5-tap zone — always present, completely invisible */}
      <HiddenTapZone onUnlock={handleTapUnlock} />

      {/* Secret numpad modal */}
      <SecretNumpad
        open={numpadOpen}
        onClose={() => setNumpadOpen(false)}
        onSuccess={handleCodeSuccess}
      />

      {/* Dev control panel — only after successful auth */}
      <DevPanel
        visible={unlocked}
        isBirthdayMode={isBirthdayMode}
        forceBirthday={forceBirthday}
        onToggle={toggleBirthdayMode}
      />
    </div>
  )
}
