import { motion } from 'framer-motion'

export default function DiamondEarringsSVG({ size = 200 }) {
  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ shapeRendering: 'geometricPrecision' }}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, type: 'spring', damping: 12 }}
    >
      {/* Left earring */}
      <g>
        {/* Hook */}
        <path d="M55 30 Q55 20 65 20 Q75 20 75 30 L75 50" stroke="url(#hookGrad)" strokeWidth="2.5" strokeLinecap="round" fill="none" />
        {/* Setting prongs */}
        <line x1="60" y1="58" x2="55" y2="50" stroke="#cbd5e1" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="70" y1="58" x2="75" y2="50" stroke="#cbd5e1" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="65" y1="56" x2="65" y2="48" stroke="#cbd5e1" strokeWidth="1.5" strokeLinecap="round" />
        {/* Diamond */}
        <polygon points="65,58 52,72 65,92 78,72" fill="url(#diamondGrad1)" />
        <polygon points="65,58 52,72 65,74" fill="url(#diamondFacet1)" opacity="0.7" />
        <polygon points="65,58 78,72 65,74" fill="url(#diamondFacet2)" opacity="0.5" />
        <polygon points="52,72 65,92 65,74" fill="url(#diamondFacet3)" opacity="0.4" />
        <polygon points="78,72 65,92 65,74" fill="url(#diamondFacet4)" opacity="0.3" />
        {/* Sparkle on diamond */}
        <motion.circle cx="60" cy="66" r="2" fill="white" opacity="0.8"
          animate={{ opacity: [0.4, 1, 0.4], scale: [0.8, 1.3, 0.8] }}
          transition={{ duration: 1.8, repeat: Infinity }}
        />
        <motion.circle cx="70" cy="78" r="1.5" fill="white" opacity="0.6"
          animate={{ opacity: [0.3, 0.8, 0.3] }}
          transition={{ duration: 2.2, repeat: Infinity, delay: 0.5 }}
        />
      </g>

      {/* Right earring */}
      <g>
        {/* Hook */}
        <path d="M125 30 Q125 20 135 20 Q145 20 145 30 L145 50" stroke="url(#hookGrad)" strokeWidth="2.5" strokeLinecap="round" fill="none" />
        {/* Setting prongs */}
        <line x1="130" y1="58" x2="125" y2="50" stroke="#cbd5e1" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="140" y1="58" x2="145" y2="50" stroke="#cbd5e1" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="135" y1="56" x2="135" y2="48" stroke="#cbd5e1" strokeWidth="1.5" strokeLinecap="round" />
        {/* Diamond */}
        <polygon points="135,58 122,72 135,92 148,72" fill="url(#diamondGrad2)" />
        <polygon points="135,58 122,72 135,74" fill="url(#diamondFacet1)" opacity="0.7" />
        <polygon points="135,58 148,72 135,74" fill="url(#diamondFacet2)" opacity="0.5" />
        <polygon points="122,72 135,92 135,74" fill="url(#diamondFacet3)" opacity="0.4" />
        <polygon points="148,72 135,92 135,74" fill="url(#diamondFacet4)" opacity="0.3" />
        {/* Sparkle on diamond */}
        <motion.circle cx="130" cy="66" r="2" fill="white" opacity="0.8"
          animate={{ opacity: [0.4, 1, 0.4], scale: [0.8, 1.3, 0.8] }}
          transition={{ duration: 1.8, repeat: Infinity, delay: 0.3 }}
        />
        <motion.circle cx="140" cy="78" r="1.5" fill="white" opacity="0.6"
          animate={{ opacity: [0.3, 0.8, 0.3] }}
          transition={{ duration: 2.2, repeat: Infinity, delay: 0.8 }}
        />
      </g>

      {/* Ambient sparkles around earrings */}
      <motion.circle cx="45" cy="55" r="1.5" fill="#fcd34d"
        animate={{ opacity: [0, 0.7, 0], scale: [0.5, 1.5, 0.5] }}
        transition={{ duration: 2, repeat: Infinity, delay: 0.2 }}
      />
      <motion.circle cx="155" cy="60" r="1.5" fill="#fcd34d"
        animate={{ opacity: [0, 0.7, 0], scale: [0.5, 1.5, 0.5] }}
        transition={{ duration: 2, repeat: Infinity, delay: 1 }}
      />
      <motion.circle cx="100" cy="45" r="1" fill="#e2e8f0"
        animate={{ opacity: [0, 0.6, 0] }}
        transition={{ duration: 1.5, repeat: Infinity, delay: 0.7 }}
      />
      <motion.circle cx="85" cy="95" r="1" fill="#e2e8f0"
        animate={{ opacity: [0, 0.5, 0] }}
        transition={{ duration: 1.8, repeat: Infinity, delay: 1.2 }}
      />

      {/* Text below */}
      <text x="100" y="130" textAnchor="middle" fill="url(#textGrad)" fontSize="11" fontFamily="'Poppins', sans-serif" fontWeight="300" letterSpacing="0.15em">
        DIAMOND STUDS
      </text>

      <defs>
        <linearGradient id="hookGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#e2e8f0" />
          <stop offset="100%" stopColor="#94a3b8" />
        </linearGradient>
        <linearGradient id="diamondGrad1" x1="52" y1="58" x2="78" y2="92" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#e0f2fe" />
          <stop offset="40%" stopColor="#bae6fd" />
          <stop offset="100%" stopColor="#e0e7ff" />
        </linearGradient>
        <linearGradient id="diamondGrad2" x1="122" y1="58" x2="148" y2="92" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#e0e7ff" />
          <stop offset="40%" stopColor="#bae6fd" />
          <stop offset="100%" stopColor="#e0f2fe" />
        </linearGradient>
        <linearGradient id="diamondFacet1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="white" />
          <stop offset="100%" stopColor="#bae6fd" />
        </linearGradient>
        <linearGradient id="diamondFacet2" x1="100%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#e0e7ff" />
          <stop offset="100%" stopColor="#93c5fd" />
        </linearGradient>
        <linearGradient id="diamondFacet3" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#bae6fd" />
          <stop offset="100%" stopColor="#a5b4fc" />
        </linearGradient>
        <linearGradient id="diamondFacet4" x1="100%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#93c5fd" />
          <stop offset="100%" stopColor="#c7d2fe" />
        </linearGradient>
        <linearGradient id="textGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#94a3b8" />
          <stop offset="50%" stopColor="#e2e8f0" />
          <stop offset="100%" stopColor="#94a3b8" />
        </linearGradient>
      </defs>
    </motion.svg>
  )
}
