import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import WordleGame from './WordleGame'

const vouchers = [
  { id: 'hand', emoji: '🤝', title: 'Hand Holding', description: 'One unlimited hand-holding session, redeemable anytime, anywhere.', color: 'from-rose-400 to-pink-500' },
  { id: 'double-hand', emoji: '🫶', title: 'Double Hand Holding', description: 'Both hands. Full commitment. Maximum warmth guaranteed.', color: 'from-pink-400 to-rose-500' },
  { id: 'hug', emoji: '🤗', title: 'Hug', description: 'One premium, extra-long, soul-warming hug. No time limit.', color: 'from-amber-400 to-orange-500' },
  { id: 'kiss', emoji: '💋', title: 'Kiss', description: 'One magical kiss, delivered with all the love in the world.', color: 'from-red-400 to-rose-600' },
  { id: 'cuddle', emoji: '🥰', title: 'Cuddling', description: 'One full cuddling session. Movie optional. Snacks included.', color: 'from-purple-400 to-pink-500' },
]

function VoucherCard({ voucher, onClose }) {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      <motion.div
        className="relative gift-card-bg rounded-3xl p-8 sm:p-12 max-w-md w-full text-center z-10"
        initial={{ scale: 0.5, rotate: -10, opacity: 0 }}
        animate={{ scale: 1, rotate: 0, opacity: 1 }}
        exit={{ scale: 0.5, rotate: 10, opacity: 0 }}
        transition={{ type: 'spring', damping: 12 }}
        onClick={e => e.stopPropagation()}
      >
        <div className="absolute top-0 left-0 right-0 h-2 rounded-t-3xl bg-gradient-to-r from-rose-400 via-gold-300 to-rose-400" />

        <motion.div
          className="text-7xl mb-6"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          {voucher.emoji}
        </motion.div>

        <p className="text-rose-300/60 text-xs uppercase tracking-[0.3em] mb-2">
          Affection Voucher
        </p>
        <h3 className="font-script text-4xl text-rose-100 mb-4">
          {voucher.title}
        </h3>
        <p className="text-rose-200/70 text-sm leading-relaxed mb-8">
          {voucher.description}
        </p>

        <div className="border-t border-rose-300/20 pt-4">
          <p className="text-rose-300/40 text-xs">
            Valid forever &bull; For Tal only &bull; With all my love
          </p>
        </div>

        <motion.button
          className="mt-6 px-6 py-2 rounded-full bg-rose-500/20 border border-rose-400/30 text-rose-200 text-sm hover:bg-rose-500/30 transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onClose}
        >
          Close
        </motion.button>
      </motion.div>
    </motion.div>
  )
}

export default function GiftZone() {
  const [selectedVoucher, setSelectedVoucher] = useState(null)
  const [wordleOpen, setWordleOpen] = useState(false)

  return (
    <motion.section
      className="px-4 sm:px-8 py-12"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 2 }}
    >
      <h3 className="font-script text-3xl sm:text-4xl text-center text-rose-200 mb-4">
        Gift Zone
      </h3>

      {/* Big Surprise — opens Wordle minigame */}
      <motion.div
        className="max-w-md mx-auto mb-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.2 }}
      >
        <motion.button
          className="w-full py-6 rounded-2xl bg-gradient-to-r from-gold-400 via-gold-300 to-gold-400 text-slate-900 font-bold text-lg relative overflow-hidden group"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setWordleOpen(true)}
        >
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
            animate={{ x: ['-100%', '100%'] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
          />
          <span className="relative z-10">
            💎 The Big Surprise 💎
          </span>
        </motion.button>
        <p className="text-center text-rose-300/30 text-xs mt-2">Can you guess what it is?</p>
      </motion.div>

      {/* Affection Vouchers */}
      <h4 className="text-center text-rose-200/60 text-sm uppercase tracking-[0.2em] mb-6">
        Affection Vouchers
      </h4>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 max-w-lg mx-auto">
        {vouchers.map((voucher, index) => (
          <motion.button
            key={voucher.id}
            className={`voucher-btn p-4 sm:p-6 rounded-2xl bg-gradient-to-br ${voucher.color} bg-opacity-10 backdrop-blur-sm border border-white/10 flex flex-col items-center gap-2`}
            style={{ background: `linear-gradient(135deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))` }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 2.3 + index * 0.1 }}
            whileHover={{ scale: 1.08, y: -4 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setSelectedVoucher(voucher)}
          >
            <span className="text-3xl sm:text-4xl">{voucher.emoji}</span>
            <span className="text-rose-100 text-xs sm:text-sm font-medium">{voucher.title}</span>
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {selectedVoucher && (
          <VoucherCard
            voucher={selectedVoucher}
            onClose={() => setSelectedVoucher(null)}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {wordleOpen && (
          <WordleGame open={wordleOpen} onClose={() => setWordleOpen(false)} />
        )}
      </AnimatePresence>
    </motion.section>
  )
}
