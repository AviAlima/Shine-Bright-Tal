import { useRef, useCallback } from 'react'

const REQUIRED_TAPS = 5
const TAP_WINDOW_MS = 3000

export default function HiddenTapZone({ onUnlock }) {
  const tapsRef = useRef([])

  const handleTap = useCallback(() => {
    const now = Date.now()
    tapsRef.current.push(now)

    // Keep only taps within the time window
    tapsRef.current = tapsRef.current.filter(t => now - t <= TAP_WINDOW_MS)

    if (tapsRef.current.length >= REQUIRED_TAPS) {
      tapsRef.current = []
      onUnlock()
    }
  }, [onUnlock])

  return (
    <div
      className="fixed bottom-0 right-0 w-[60px] h-[60px] z-[200]"
      onClick={handleTap}
      aria-hidden="true"
    />
  )
}
