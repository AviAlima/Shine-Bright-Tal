import { useState, useRef } from 'react'
import { motion, AnimatePresence, useDragControls } from 'framer-motion'

export default function DevPanel({ visible, isBirthdayMode, forceBirthday, giftOpened, onToggle, onResetGift }) {
  const [collapsed, setCollapsed] = useState(true)
  const [dragging, setDragging] = useState(false)
  const constraintsRef = useRef(null)
  const dragControls = useDragControls()

  if (!visible) return null

  return (
    <>
      {/* Invisible full-viewport drag constraint boundary */}
      <div ref={constraintsRef} className="fixed inset-0 pointer-events-none z-[399]" />

      <motion.div
        className="fixed z-[400] select-none touch-none"
        style={{ bottom: 80, right: 16 }}
        drag
        dragControls={dragControls}
        dragMomentum={false}
        dragElastic={0.1}
        dragConstraints={constraintsRef}
        onDragStart={() => setDragging(true)}
        onDragEnd={() => setDragging(false)}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{
          opacity: 1,
          scale: 1,
          boxShadow: dragging
            ? '0 12px 40px rgba(0,0,0,0.5)'
            : '0 4px 20px rgba(0,0,0,0.3)',
        }}
        transition={{ type: 'spring', damping: 22 }}
      >
        <AnimatePresence mode="wait" initial={false}>
          {collapsed ? (
            /* Collapsed handle */
            <motion.button
              key="handle"
              className={`w-11 h-11 rounded-xl flex items-center justify-center transition-colors ${
                dragging
                  ? 'bg-slate-700/95 border-slate-500/60'
                  : 'bg-slate-800/70 border-slate-600/30'
              } border backdrop-blur-md`}
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.7 }}
              transition={{ duration: 0.15 }}
              onClick={() => setCollapsed(false)}
              style={{ touchAction: 'none' }}
            >
              <span className="text-slate-400 text-xs font-bold tracking-tight">D</span>
            </motion.button>
          ) : (
            /* Expanded panel */
            <motion.div
              key="panel"
              className={`w-56 rounded-2xl border backdrop-blur-md transition-colors ${
                dragging
                  ? 'bg-slate-700/95 border-slate-500/50'
                  : 'bg-slate-800/90 border-slate-600/40'
              }`}
              initial={{ opacity: 0, scale: 0.85, width: 44 }}
              animate={{ opacity: 1, scale: 1, width: 224 }}
              exit={{ opacity: 0, scale: 0.85, width: 44 }}
              transition={{ duration: 0.2 }}
            >
              {/* Drag handle bar + collapse button */}
              <div className="flex items-center justify-between px-3 pt-2.5 pb-1">
                <div className="flex items-center gap-1.5">
                  <div className="w-5 h-1 rounded-full bg-slate-600" />
                  <div className="w-3 h-1 rounded-full bg-slate-600" />
                </div>
                <button
                  onClick={() => setCollapsed(true)}
                  className="text-slate-500 hover:text-slate-300 text-[10px] transition-colors px-1"
                >
                  ✕
                </button>
              </div>

              <div className="px-3.5 pb-3.5 space-y-2.5">
                {/* Birthday mode toggle */}
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-slate-300 text-xs font-medium leading-tight">
                      March 25th
                    </p>
                    <p className="text-slate-500 text-[9px] mt-0.5">
                      {forceBirthday ? 'Active' : 'Real date'}
                    </p>
                  </div>
                  <button
                    onClick={onToggle}
                    className={`w-11 h-6 rounded-full transition-colors duration-300 relative flex-shrink-0 ${
                      isBirthdayMode ? 'bg-rose-500' : 'bg-slate-600'
                    }`}
                  >
                    <div
                      className={`w-5 h-5 rounded-full bg-white absolute top-0.5 transition-transform duration-300 shadow-sm ${
                        isBirthdayMode ? 'translate-x-5' : 'translate-x-0.5'
                      }`}
                    />
                  </button>
                </div>

                {/* Reset gift */}
                {isBirthdayMode && giftOpened && (
                  <button
                    onClick={onResetGift}
                    className="w-full py-1.5 rounded-lg bg-amber-500/15 border border-amber-400/20 text-amber-300 text-[11px] hover:bg-amber-500/25 transition-colors"
                  >
                    Reset Unboxing
                  </button>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </>
  )
}
