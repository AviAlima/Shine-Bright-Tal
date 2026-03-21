import { motion } from 'framer-motion'

function VolumeOnIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
      <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
      <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
    </svg>
  )
}

function VolumeOffIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
      <line x1="23" y1="9" x2="17" y2="15" />
      <line x1="17" y1="9" x2="23" y2="15" />
    </svg>
  )
}

export default function MuteToggle({ muted, onToggle }) {
  return (
    <motion.button
      className="fixed top-4 right-4 z-[100] w-10 h-10 rounded-full flex items-center justify-center text-white/40 hover:text-white/70 transition-colors bg-white/[0.04] border border-white/[0.06] backdrop-blur-sm"
      onClick={onToggle}
      whileTap={{ scale: 0.9 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1 }}
      title={muted ? 'Unmute' : 'Mute'}
    >
      {muted ? <VolumeOffIcon /> : <VolumeOnIcon />}
    </motion.button>
  )
}
