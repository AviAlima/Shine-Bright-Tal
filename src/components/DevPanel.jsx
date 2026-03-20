import { motion, AnimatePresence } from 'framer-motion'

export default function DevPanel({ visible, isBirthdayMode, forceBirthday, giftOpened, onToggle, onResetGift }) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed bottom-0 left-0 right-0 z-[150] px-4 pb-5 pt-3"
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ type: 'spring', damping: 20 }}
        >
          <div className="max-w-sm mx-auto bg-slate-800/90 backdrop-blur-md border border-slate-600/40 rounded-2xl px-5 py-4 shadow-2xl space-y-3">
            {/* Birthday mode toggle */}
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-300 text-sm font-medium">
                  Simulate March 25th
                </p>
                <p className="text-slate-500 text-[11px] mt-0.5">
                  {forceBirthday ? 'Birthday Mode active' : 'Showing real date'}
                </p>
              </div>
              <button
                onClick={onToggle}
                className={`w-14 h-7 rounded-full transition-colors duration-300 relative flex-shrink-0 ${
                  isBirthdayMode ? 'bg-rose-500' : 'bg-slate-600'
                }`}
              >
                <div
                  className={`w-6 h-6 rounded-full bg-white absolute top-0.5 transition-transform duration-300 shadow-sm ${
                    isBirthdayMode ? 'translate-x-7' : 'translate-x-0.5'
                  }`}
                />
              </button>
            </div>

            {/* Reset gift button — only when gift has been opened */}
            {isBirthdayMode && giftOpened && (
              <button
                onClick={onResetGift}
                className="w-full py-2 rounded-xl bg-amber-500/15 border border-amber-400/20 text-amber-300 text-sm hover:bg-amber-500/25 transition-colors"
              >
                Reset Unboxing
              </button>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
