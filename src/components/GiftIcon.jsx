export default function GiftIcon({ size = 120, className = '' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ shapeRendering: 'geometricPrecision' }}
    >
      {/* Ribbon vertical */}
      <rect x="52" y="8" width="16" height="112" rx="2" fill="url(#ribbonGrad)" />
      {/* Ribbon horizontal */}
      <rect x="8" y="42" width="104" height="16" rx="2" fill="url(#ribbonGrad)" />

      {/* Box lid */}
      <rect x="8" y="36" width="104" height="28" rx="6" fill="url(#lidGrad)" stroke="url(#lidStroke)" strokeWidth="1.5" />
      {/* Box body */}
      <rect x="14" y="64" width="92" height="48" rx="6" fill="url(#boxGrad)" stroke="url(#boxStroke)" strokeWidth="1.5" />

      {/* Ribbon center overlay on lid */}
      <rect x="52" y="36" width="16" height="28" fill="url(#ribbonGrad)" opacity="0.9" />
      {/* Ribbon center overlay on body */}
      <rect x="52" y="64" width="16" height="48" fill="url(#ribbonGrad)" opacity="0.9" />

      {/* Bow left */}
      <ellipse cx="44" cy="28" rx="18" ry="14" fill="url(#bowGrad)" opacity="0.9" />
      {/* Bow right */}
      <ellipse cx="76" cy="28" rx="18" ry="14" fill="url(#bowGrad)" opacity="0.9" />
      {/* Bow center knot */}
      <circle cx="60" cy="30" r="8" fill="url(#knotGrad)" />

      {/* Sparkle accents */}
      <circle cx="30" cy="80" r="1.5" fill="white" opacity="0.5" />
      <circle cx="90" cy="75" r="1" fill="white" opacity="0.4" />
      <circle cx="75" cy="95" r="1.2" fill="white" opacity="0.35" />

      <defs>
        <linearGradient id="boxGrad" x1="14" y1="64" x2="106" y2="112" gradientUnits="userSpaceOnUse">
          <stop stopColor="#f43f5e" />
          <stop offset="1" stopColor="#e11d48" />
        </linearGradient>
        <linearGradient id="boxStroke" x1="14" y1="64" x2="106" y2="112" gradientUnits="userSpaceOnUse">
          <stop stopColor="#fb7185" stopOpacity="0.6" />
          <stop offset="1" stopColor="#be123c" stopOpacity="0.4" />
        </linearGradient>
        <linearGradient id="lidGrad" x1="8" y1="36" x2="112" y2="64" gradientUnits="userSpaceOnUse">
          <stop stopColor="#fb7185" />
          <stop offset="1" stopColor="#f43f5e" />
        </linearGradient>
        <linearGradient id="lidStroke" x1="8" y1="36" x2="112" y2="64" gradientUnits="userSpaceOnUse">
          <stop stopColor="#fda4af" stopOpacity="0.5" />
          <stop offset="1" stopColor="#e11d48" stopOpacity="0.3" />
        </linearGradient>
        <linearGradient id="ribbonGrad" x1="52" y1="8" x2="68" y2="120" gradientUnits="userSpaceOnUse">
          <stop stopColor="#fcd34d" />
          <stop offset="1" stopColor="#f59e0b" />
        </linearGradient>
        <linearGradient id="bowGrad" x1="30" y1="14" x2="90" y2="42" gradientUnits="userSpaceOnUse">
          <stop stopColor="#fcd34d" />
          <stop offset="1" stopColor="#fbbf24" />
        </linearGradient>
        <linearGradient id="knotGrad" x1="52" y1="22" x2="68" y2="38" gradientUnits="userSpaceOnUse">
          <stop stopColor="#fde68a" />
          <stop offset="1" stopColor="#f59e0b" />
        </linearGradient>
      </defs>
    </svg>
  )
}
