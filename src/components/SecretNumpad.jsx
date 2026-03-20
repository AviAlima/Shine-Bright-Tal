import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const SECRET_CODE = '391600'
const CODE_LENGTH = 6

function NumpadButton({ label, onPress, variant }) {
  const base = 'flex items-center justify-center rounded-2xl text-lg font-medium select-none active:scale-90 transition-all duration-150'
  const styles = {
    digit: `${base} w-20 h-16 bg-white/[0.07] border border-white/[0.08] text-white hover:bg-white/[0.12] active:bg-white/[0.18]`,
    clear: `${base} w-20 h-16 text-rose-300/60 text-sm tracking-wider hover:text-rose-300`,
    close: `${base} w-20 h-16 text-slate-400/60 text-sm tracking-wider hover:text-slate-300`,
  }

  return (
    <motion.button
      className={styles[variant || 'digit']}
      onClick={onPress}
      whileTap={{ scale: 0.88 }}
      type="button"
    >
      {label}
    </motion.button>
  )
}

export default function SecretNumpad({ open, onClose, onSuccess }) {
  const [digits, setDigits] = useState('')
  const [shaking, setShaking] = useState(false)

  const handleDigit = useCallback((d) => {
    setDigits(prev => {
      const next = prev + d
      if (next.length === CODE_LENGTH) {
        if (next === SECRET_CODE) {
          // Delay slightly so the last dot fills visually
          setTimeout(() => {
            onSuccess()
            setDigits('')
          }, 200)
        } else {
          setShaking(true)
          setTimeout(() => {
            setShaking(false)
            setDigits('')
          }, 500)
        }
      }
      return next.length <= CODE_LENGTH ? next : prev
    })
  }, [onSuccess])

  const handleClear = useCallback(() => setDigits(''), [])

  const handleClose = useCallback(() => {
    setDigits('')
    onClose()
  }, [onClose])

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[300] flex flex-col items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-[#0d1117]/95 backdrop-blur-xl"
            onClick={handleClose}
          />

          {/* Content */}
          <motion.div
            className="relative z-10 flex flex-col items-center gap-8"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 30, opacity: 0 }}
            transition={{ delay: 0.05, duration: 0.3 }}
          >
            {/* Title */}
            <p className="text-white/40 text-sm uppercase tracking-[0.25em]">
              Enter Secret Code
            </p>

            {/* Dot indicators */}
            <motion.div
              className="flex gap-3"
              animate={shaking ? { x: [0, -12, 12, -8, 8, -4, 4, 0] } : {}}
              transition={{ duration: 0.45 }}
            >
              {Array.from({ length: CODE_LENGTH }, (_, i) => (
                <div
                  key={i}
                  className={`w-4 h-4 rounded-full border-2 transition-all duration-200 ${
                    i < digits.length
                      ? 'bg-rose-400 border-rose-400 shadow-[0_0_12px_rgba(251,113,133,0.5)]'
                      : 'border-white/20 bg-transparent'
                  }`}
                />
              ))}
            </motion.div>

            {/* Numpad grid */}
            <div className="grid grid-cols-3 gap-3 mt-2">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(n => (
                <NumpadButton key={n} label={n} onPress={() => handleDigit(String(n))} />
              ))}
              <NumpadButton label="CLR" onPress={handleClear} variant="clear" />
              <NumpadButton label={0} onPress={() => handleDigit('0')} />
              <NumpadButton label="✕" onPress={handleClose} variant="close" />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
