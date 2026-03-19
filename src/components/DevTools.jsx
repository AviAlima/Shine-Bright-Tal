import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function DevTools({ isBirthdayMode, forceBirthday, onToggle }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="fixed bottom-4 right-4 z-[100]">
      <AnimatePresence>
        {open && (
          <motion.div
            className="absolute bottom-12 right-0 bg-slate-800/95 backdrop-blur-sm border border-slate-600/50 rounded-xl p-4 w-56 shadow-xl"
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
          >
            <p className="text-slate-400 text-xs mb-3 uppercase tracking-wider">Dev Tools</p>
            <div className="flex items-center justify-between">
              <span className="text-slate-300 text-sm">Birthday Mode</span>
              <button
                onClick={onToggle}
                className={`w-12 h-6 rounded-full transition-colors relative ${
                  isBirthdayMode ? 'bg-rose-500' : 'bg-slate-600'
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-full bg-white absolute top-0.5 transition-transform ${
                    isBirthdayMode ? 'translate-x-6' : 'translate-x-0.5'
                  }`}
                />
              </button>
            </div>
            <p className="text-slate-500 text-[10px] mt-2">
              {forceBirthday ? 'Forced: March 25th' : 'Using real date'}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        className="w-10 h-10 rounded-full bg-slate-700/50 border border-slate-600/30 flex items-center justify-center text-slate-400 hover:text-slate-200 hover:bg-slate-700/80 transition-colors"
        onClick={() => setOpen(!open)}
        whileTap={{ scale: 0.9 }}
        title="Dev Tools"
      >
        <span className="text-sm">⚙️</span>
      </motion.button>
    </div>
  )
}
