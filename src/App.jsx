import { useState, useCallback } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useDateEngine } from './hooks/useDateEngine'
import { useBackgroundMusic } from './hooks/useBackgroundMusic'
import SparkleBackground from './components/SparkleBackground'
import Countdown from './components/Countdown'
import EntranceGate from './components/EntranceGate'
import BirthdayHeader from './components/BirthdayHeader'
import PhotoSection from './components/PhotoSection'
import GiftZone from './components/GiftZone'
import DiamondSection from './components/DiamondSection'
import HiddenTapZone from './components/HiddenTapZone'
import SecretNumpad from './components/SecretNumpad'
import DevPanel from './components/DevPanel'
import MuteToggle from './components/MuteToggle'

export default function App() {
  const { isBirthdayMode, forceBirthday, countdown, toggleBirthdayMode } = useDateEngine()
  const { muted, started, startMusic, toggleMute } = useBackgroundMusic()
  const [numpadOpen, setNumpadOpen] = useState(false)
  const [unlocked, setUnlocked] = useState(false)
  const [giftOpened, setGiftOpened] = useState(false)

  const handleTapUnlock = useCallback(() => {
    if (!unlocked) {
      setNumpadOpen(true)
    } else {
      setUnlocked(prev => !prev)
    }
  }, [unlocked])

  const handleCodeSuccess = useCallback(() => {
    setNumpadOpen(false)
    setUnlocked(true)
  }, [])

  const handleUnboxed = useCallback(() => {
    setGiftOpened(true)
    // Start background music 5s after the gift is opened (user has interacted)
    startMusic()
  }, [startMusic])

  // Determine which view to show in birthday mode
  const showEntranceGate = isBirthdayMode && !giftOpened
  const showDashboard = isBirthdayMode && giftOpened

  return (
    <div className="relative min-h-screen">
      <SparkleBackground />

      <AnimatePresence mode="wait">
        {!isBirthdayMode && (
          <motion.div
            key="countdown"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.6 }}
          >
            <Countdown countdown={countdown} />
          </motion.div>
        )}

        {showEntranceGate && (
          <EntranceGate key="entrance" onUnboxed={handleUnboxed} />
        )}

        {showDashboard && (
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

      {/* Mute toggle — only after music has started */}
      {started && showDashboard && (
        <MuteToggle muted={muted} onToggle={toggleMute} />
      )}

      {/* Hidden 5-tap zone — only on countdown and entrance gate screens */}
      {!showDashboard && <HiddenTapZone onUnlock={handleTapUnlock} />}

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
        giftOpened={giftOpened}
        onToggle={toggleBirthdayMode}
        onResetGift={() => setGiftOpened(false)}
      />
    </div>
  )
}
