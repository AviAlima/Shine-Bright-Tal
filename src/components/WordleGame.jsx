import { useState, useCallback, useMemo, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import DiamondEarringsSVG from './DiamondEarringsSVG'

const LEVELS = [
  { word: 'EARRINGS', hint: 'Something you wear on your ears...' },
  { word: 'STUDDED', hint: 'A type that sits right on the lobe...' },
  { word: 'DIAMOND', hint: 'The most brilliant stone of all...' },
]

const KEYBOARD_ROWS = [
  ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
  ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
  ['DEL', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'ENTER'],
]

function evaluateGuess(guess, answer) {
  const result = Array(answer.length).fill('absent')
  const answerChars = answer.split('')
  const guessChars = guess.split('')
  const used = Array(answer.length).fill(false)

  // First pass: correct positions
  for (let i = 0; i < answer.length; i++) {
    if (guessChars[i] === answerChars[i]) {
      result[i] = 'correct'
      used[i] = true
    }
  }
  // Second pass: present but wrong position
  for (let i = 0; i < answer.length; i++) {
    if (result[i] === 'correct') continue
    for (let j = 0; j < answer.length; j++) {
      if (!used[j] && guessChars[i] === answerChars[j]) {
        result[i] = 'present'
        used[j] = true
        break
      }
    }
  }
  return result
}

const TILE_COLORS = {
  correct: 'bg-emerald-500/90 border-emerald-400/80',
  present: 'bg-amber-500/90 border-amber-400/80',
  absent: 'bg-slate-700/80 border-slate-500/40',
  empty: 'border-slate-500/30 bg-white/[0.03]',
  active: 'border-rose-400/60 bg-white/[0.06]',
}

const KEY_COLORS = {
  correct: 'bg-emerald-500/90 text-white border border-emerald-400/50',
  present: 'bg-amber-500/90 text-white border border-amber-400/50',
  absent: 'bg-slate-800/80 text-slate-500 border border-slate-600/30',
  unused: 'bg-[#1e293b]/70 text-white border border-white/[0.12] backdrop-blur-sm',
}

function KeyboardKey({ label, status, onPress }) {
  const isWide = label === 'ENTER' || label === 'DEL'
  return (
    <motion.button
      className={`${KEY_COLORS[status || 'unused']} rounded-lg font-semibold select-none flex items-center justify-center ${
        isWide ? 'px-3 sm:px-4 text-[10px] sm:text-xs min-w-[52px] sm:min-w-[60px]' : 'text-sm sm:text-base min-w-[28px] sm:min-w-[34px]'
      } h-[44px] sm:h-12 active:brightness-125 active:scale-95 transition-all duration-75`}
      onClick={() => onPress(label)}
      whileTap={{ scale: 0.92, brightness: 1.3 }}
      type="button"
    >
      {label}
    </motion.button>
  )
}

export default function WordleGame({ open, onClose }) {
  const [level, setLevel] = useState(0)
  const [guesses, setGuesses] = useState([])
  const [currentGuess, setCurrentGuess] = useState('')
  const [shaking, setShaking] = useState(false)
  const [completed, setCompleted] = useState(false)
  const [showHint, setShowHint] = useState(false)

  const currentLevel = LEVELS[level]
  const wordLength = currentLevel.word.length

  // Build letter status map for keyboard coloring
  const letterStatuses = useMemo(() => {
    const map = {}
    for (const { guess, result } of guesses) {
      for (let i = 0; i < guess.length; i++) {
        const letter = guess[i]
        const status = result[i]
        if (map[letter] === 'correct') continue
        if (status === 'correct' || (status === 'present' && map[letter] !== 'correct')) {
          map[letter] = status
        } else if (!map[letter]) {
          map[letter] = status
        }
      }
    }
    return map
  }, [guesses])

  const handleKey = useCallback((key) => {
    if (completed) return

    if (key === 'DEL') {
      setCurrentGuess(prev => prev.slice(0, -1))
      return
    }

    if (key === 'ENTER') {
      if (currentGuess.length !== wordLength) {
        setShaking(true)
        setTimeout(() => setShaking(false), 400)
        return
      }

      const result = evaluateGuess(currentGuess, currentLevel.word)
      const newGuesses = [...guesses, { guess: currentGuess, result }]
      setGuesses(newGuesses)
      setCurrentGuess('')
      setShowHint(false)

      if (currentGuess === currentLevel.word) {
        // Level won
        setTimeout(() => {
          if (level < LEVELS.length - 1) {
            setLevel(prev => prev + 1)
            setGuesses([])
            setShowHint(false)
          } else {
            setCompleted(true)
          }
        }, 1200)
      } else if (newGuesses.length >= 5 && !showHint) {
        setShowHint(true)
      }
      return
    }

    // Letter key
    if (currentGuess.length < wordLength) {
      setCurrentGuess(prev => prev + key)
    }
  }, [currentGuess, currentLevel, wordLength, guesses, level, completed, showHint])

  const resetGame = useCallback(() => {
    setLevel(0)
    setGuesses([])
    setCurrentGuess('')
    setCompleted(false)
    setShowHint(false)
  }, [])

  // Body scroll lock
  useEffect(() => {
    if (!open) return
    const scrollY = window.scrollY
    document.body.style.position = 'fixed'
    document.body.style.top = `-${scrollY}px`
    document.body.style.left = '0'
    document.body.style.right = '0'
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.position = ''
      document.body.style.top = ''
      document.body.style.left = ''
      document.body.style.right = ''
      document.body.style.overflow = ''
      window.scrollTo(0, scrollY)
    }
  }, [open])

  if (!open) return null

  return (
    <motion.div
      className="fixed inset-0 z-[250] flex flex-col overscroll-none"
      style={{ touchAction: 'none' }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onTouchMove={e => e.stopPropagation()}
    >
      <div className="absolute inset-0 bg-[#0f172a]/[0.97] backdrop-blur-xl" />

      <div className="relative z-10 flex flex-col h-full max-w-lg mx-auto w-full px-3 sm:px-4">
        {/* Header */}
        <div className="flex items-center justify-between pt-4 pb-2">
          <button
            onClick={() => { resetGame(); onClose() }}
            className="text-slate-500 text-sm hover:text-slate-300 transition-colors px-2 py-1"
          >
            Close
          </button>
          <div className="text-center">
            <p className="text-white/80 text-sm font-medium">
              {completed ? 'You did it!' : `Level ${level + 1} of ${LEVELS.length}`}
            </p>
            <p className="text-slate-500 text-[10px] tracking-wider uppercase">
              {completed ? '' : `${wordLength} letters`}
            </p>
          </div>
          <div className="w-12" />
        </div>

        <AnimatePresence mode="wait">
          {completed ? (
            /* Final reveal */
            <motion.div
              key="reveal"
              className="flex-1 flex flex-col items-center justify-center gap-6 pb-20"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <DiamondEarringsSVG size={220} />
              <motion.p
                className="text-2xl sm:text-3xl text-center leading-relaxed"
                style={{ fontFamily: "'Dancing Script', cursive", color: '#e2e8f0' }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                You found them!
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-200 via-white to-sky-200">
                  Shine bright, Tal!
                </span>
              </motion.p>
              <motion.p
                className="text-slate-500 text-xs mt-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2 }}
              >
                💎 Your real gift is waiting for you 💎
              </motion.p>
            </motion.div>
          ) : (
            /* Game board */
            <motion.div
              key={`level-${level}`}
              className="flex-1 flex flex-col"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.3 }}
            >
              {/* Hint */}
              <AnimatePresence>
                {showHint && (
                  <motion.p
                    className="text-amber-400/70 text-xs text-center py-2"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                  >
                    Hint: {currentLevel.hint}
                  </motion.p>
                )}
              </AnimatePresence>

              {/* Grid */}
              <div className="flex-1 flex flex-col items-center justify-center gap-1.5 py-2 min-h-0 overflow-y-auto">
                {/* Submitted guesses */}
                {guesses.map(({ guess, result }, gi) => (
                  <div key={gi} className="flex gap-1.5">
                    {guess.split('').map((letter, li) => (
                      <motion.div
                        key={li}
                        className={`w-9 h-10 sm:w-11 sm:h-12 rounded-lg flex items-center justify-center text-white font-bold text-base sm:text-lg border ${TILE_COLORS[result[li]]}`}
                        initial={{ rotateX: 0 }}
                        animate={{ rotateX: [0, 90, 0] }}
                        transition={{ duration: 0.4, delay: li * 0.1 }}
                      >
                        {letter}
                      </motion.div>
                    ))}
                  </div>
                ))}

                {/* Current guess row */}
                {!guesses.some(g => g.guess === currentLevel.word) && (
                  <motion.div
                    className="flex gap-1.5"
                    animate={shaking ? { x: [0, -8, 8, -6, 6, -3, 3, 0] } : {}}
                    transition={{ duration: 0.35 }}
                  >
                    {Array.from({ length: wordLength }, (_, i) => {
                      const letter = currentGuess[i]
                      return (
                        <motion.div
                          key={i}
                          className={`w-9 h-10 sm:w-11 sm:h-12 rounded-lg flex items-center justify-center font-bold text-base sm:text-lg border transition-colors ${
                            letter ? TILE_COLORS.active : TILE_COLORS.empty
                          }`}
                          animate={letter ? { scale: [1, 1.1, 1] } : {}}
                          transition={{ duration: 0.15 }}
                        >
                          <span className="text-white">{letter || ''}</span>
                        </motion.div>
                      )
                    })}
                  </motion.div>
                )}
              </div>

              {/* Keyboard */}
              <div className="pb-4 pt-2 space-y-1.5">
                {KEYBOARD_ROWS.map((row, ri) => (
                  <div key={ri} className="flex justify-center gap-1 sm:gap-1.5">
                    {row.map(key => (
                      <KeyboardKey
                        key={key}
                        label={key}
                        status={key.length === 1 ? letterStatuses[key] : undefined}
                        onPress={handleKey}
                      />
                    ))}
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}
