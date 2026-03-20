import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import WordleGame from './WordleGame'

const vouchers = [
  { id: 'hand', emoji: '🤝', title: 'Hand Holding', description: 'Valid for 120 years, include upgrade to petting.', color: 'from-rose-400 to-pink-500', hex: ['#fb7185', '#ec4899'] },
  { id: 'double-hand', emoji: '🤝🤝', title: 'Double Hand Holding', description: 'Full body powerful hug. Include protection from wind and cold.', color: 'from-pink-400 to-rose-500', hex: ['#f472b6', '#f43f5e'] },
  { id: 'hug', emoji: '🤗', title: 'Hug', description: 'Valid forever. Redeemable with a smile.', color: 'from-amber-400 to-orange-500', hex: ['#fbbf24', '#f97316'] },
  { id: 'kiss', emoji: '💋', title: 'Kiss', description: 'Warning: Addictive.', color: 'from-red-400 to-rose-600', hex: ['#f87171', '#e11d48'] },
  { id: 'cuddle', emoji: '☁️', title: 'Cuddling', description: 'Usage: requires blanket and minimum 15 minutes.', color: 'from-purple-400 to-pink-500', hex: ['#c084fc', '#ec4899'] },
]

function VoucherCard({ voucher, onClose }) {
  const [redeemed, setRedeemed] = useState(false)
  const [showPulse, setShowPulse] = useState(false)

  const handleRedeem = () => {
    if (redeemed) return
    setRedeemed(true)
    setShowPulse(true)
    setTimeout(() => setShowPulse(false), 800)
  }

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      {/* Backdrop — onPointerDown for instant mobile response */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onPointerDown={onClose}
      />

      <motion.div
        className="relative max-w-sm w-full z-10"
        initial={{ scale: 0.5, rotate: -8, opacity: 0 }}
        animate={{ scale: 1, rotate: 0, opacity: 1 }}
        exit={{ scale: 0.5, rotate: 8, opacity: 0 }}
        transition={{ type: 'spring', damping: 14 }}
      >
        {/* Coupon card with tear-off styling */}
        <div className="relative rounded-3xl overflow-hidden" onPointerDown={e => e.stopPropagation()}>
          {/* Top gradient bar — voucher-specific color */}
          <div
            className="h-2"
            style={{ background: `linear-gradient(to right, ${voucher.hex[0]}, ${voucher.hex[1]})` }}
          />

          {/* Main card body */}
          <div className="bg-gradient-to-b from-[#1e1e3a] to-[#16162e] px-8 py-8 sm:px-10 sm:py-10 relative">
            {/* Dashed tear-off line on the left */}
            <div className="absolute left-5 top-0 bottom-0 border-l-2 border-dashed border-white/[0.08]" />
            {/* Semi-circle cutouts */}
            <div className="absolute left-[14px] -top-3 w-6 h-6 rounded-full bg-black/60" />
            <div className="absolute left-[14px] -bottom-3 w-6 h-6 rounded-full bg-black/60" />

            {/* Redemption pulse overlay */}
            <AnimatePresence>
              {showPulse && (
                <motion.div
                  className="absolute inset-0 rounded-b-3xl pointer-events-none"
                  style={{ background: `radial-gradient(circle at 50% 60%, ${voucher.hex[0]}33 0%, transparent 70%)` }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: [0, 0.8, 0], scale: [0.8, 1.3, 1.5] }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.7 }}
                />
              )}
            </AnimatePresence>

            <div className="text-center pl-4">
              {/* Label */}
              <p className="text-white/30 text-[10px] uppercase tracking-[0.35em] mb-4">
                Affection Voucher
              </p>

              {/* Emoji */}
              <motion.div
                className="text-6xl sm:text-7xl mb-5"
                animate={redeemed ? { rotate: [0, -10, 10, 0], scale: [1, 1.15, 1] } : { scale: [1, 1.1, 1] }}
                transition={{ duration: 1.5, repeat: redeemed ? 0 : Infinity }}
              >
                {voucher.emoji}
              </motion.div>

              {/* Title */}
              <h3
                className="text-3xl sm:text-4xl text-rose-50 mb-1"
                style={{ fontFamily: "'Dancing Script', cursive" }}
              >
                {voucher.title}
              </h3>

              {/* Presented to */}
              <p className="text-white/25 text-[11px] tracking-wider mb-5" style={{ fontFamily: "Georgia, serif" }}>
                Presented to: <span className="text-white/40">Tal</span>
              </p>

              {/* Description */}
              <p className="text-rose-200/60 text-sm leading-relaxed mb-6 max-w-[260px] mx-auto">
                {voucher.description}
              </p>

              {/* Redeem button */}
              <motion.button
                className={`px-8 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                  redeemed
                    ? 'bg-emerald-500/20 border border-emerald-400/40 text-emerald-300'
                    : 'border text-white hover:bg-white/10'
                }`}
                style={!redeemed ? { borderColor: `${voucher.hex[0]}55` } : undefined}
                whileHover={!redeemed ? { scale: 1.05 } : {}}
                whileTap={!redeemed ? { scale: 0.95 } : {}}
                onClick={handleRedeem}
              >
                {redeemed ? (
                  <motion.span
                    className="flex items-center gap-2"
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="inline">
                      <path d="M3 8.5L6.5 12L13 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    Redeemed!
                  </motion.span>
                ) : 'Redeem Voucher'}
              </motion.button>

              {/* Divider */}
              <div className="border-t border-white/[0.06] mt-6 pt-4">
                <p className="text-white/20 text-[10px] tracking-wider" style={{ fontFamily: "Georgia, serif" }}>
                  Valid forever &bull; For Tal only
                </p>
                <p className="text-white/30 text-xs mt-1.5 italic" style={{ fontFamily: "Georgia, serif" }}>
                  With Love, Avi
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Close button below card */}
        <motion.button
          className="mt-4 w-full text-center text-white/30 text-xs hover:text-white/50 transition-colors py-3"
          whileTap={{ scale: 0.95 }}
          onPointerDown={(e) => { e.stopPropagation(); onClose() }}
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
            className="voucher-btn p-4 sm:p-6 rounded-2xl backdrop-blur-sm flex flex-col items-center gap-2 relative overflow-hidden"
            style={{
              background: `linear-gradient(135deg, ${voucher.hex[0]}18, ${voucher.hex[1]}0a)`,
              border: `1px solid ${voucher.hex[0]}25`,
            }}
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

      <AnimatePresence mode="wait">
        {selectedVoucher && (
          <VoucherCard
            key={selectedVoucher.id}
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
