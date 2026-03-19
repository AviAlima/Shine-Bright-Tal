import { AnimatePresence, motion } from 'framer-motion'
import { useDateEngine } from './hooks/useDateEngine'
import SparkleBackground from './components/SparkleBackground'
import Countdown from './components/Countdown'
import BirthdayHeader from './components/BirthdayHeader'
import PhotoSection from './components/PhotoSection'
import GiftZone from './components/GiftZone'
import DiamondSection from './components/DiamondSection'
import DevTools from './components/DevTools'

export default function App() {
  const { isBirthdayMode, forceBirthday, countdown, toggleBirthdayMode } = useDateEngine()

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

      <DevTools
        isBirthdayMode={isBirthdayMode}
        forceBirthday={forceBirthday}
        onToggle={toggleBirthdayMode}
      />
    </div>
  )
}
