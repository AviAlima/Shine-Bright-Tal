import { useRef, useState, useCallback, useEffect } from 'react'

const MUSIC_PATH = import.meta.env.BASE_URL + 'music.mp3'
const FADE_DELAY_MS = 2000
const FADE_DURATION_MS = 2500
const TARGET_VOLUME = 0.35
const FADE_STEPS = 50

export function useBackgroundMusic() {
  const audioRef = useRef(null)
  const [muted, setMuted] = useState(false)
  const [started, setStarted] = useState(false)
  const fadeRef = useRef(null)
  const delayRef = useRef(null)
  const mutedRef = useRef(false) // track muted without stale closures

  // Initialize audio element once
  useEffect(() => {
    const audio = new Audio(MUSIC_PATH)
    audio.loop = true
    audio.volume = 0
    audio.muted = true
    audio.preload = 'auto'
    audioRef.current = audio

    return () => {
      audio.pause()
      audio.src = ''
      if (delayRef.current) clearTimeout(delayRef.current)
      if (fadeRef.current) clearInterval(fadeRef.current)
    }
  }, [])

  const fadeIn = useCallback(() => {
    const audio = audioRef.current
    if (!audio) return

    // Unmute and start from silent — volume prop works on desktop,
    // muted prop handles iOS
    audio.muted = false
    audio.volume = 0

    const stepSize = TARGET_VOLUME / FADE_STEPS
    const stepInterval = FADE_DURATION_MS / FADE_STEPS
    let current = 0

    fadeRef.current = setInterval(() => {
      // If user muted during fade, stop fading and set to 0
      if (mutedRef.current) {
        if (fadeRef.current) clearInterval(fadeRef.current)
        audio.volume = 0
        return
      }

      current += stepSize
      if (current >= TARGET_VOLUME) {
        audio.volume = TARGET_VOLUME
        if (fadeRef.current) clearInterval(fadeRef.current)
      } else {
        audio.volume = current
      }
    }, stepInterval)
  }, [])

  const playingRef = useRef(false)

  // Secure iOS audio permission — call directly from a user gesture handler.
  // Plays muted so the browser unlocks the AudioContext (iOS ignores volume prop).
  const securePermission = useCallback(() => {
    const audio = audioRef.current
    if (!audio || playingRef.current) return
    audio.muted = true
    audio.volume = 0
    audio.play().then(() => {
      playingRef.current = true
    }).catch(() => {})
  }, [])

  // Begin the audible fade-in — safe to call from a timeout / non-gesture context
  // because the audio element is already playing (unlocked by securePermission).
  const startMusic = useCallback(() => {
    if (started) return
    setStarted(true)
    delayRef.current = setTimeout(fadeIn, FADE_DELAY_MS)
  }, [started, fadeIn])

  // Toggle mute — immediately overrides any ongoing fade
  const toggleMute = useCallback(() => {
    setMuted(prev => {
      const next = !prev
      mutedRef.current = next
      const audio = audioRef.current
      if (!audio) return next

      if (next) {
        // Muting — kill any fade, set volume to 0
        if (fadeRef.current) clearInterval(fadeRef.current)
        audio.volume = 0
      } else {
        // Unmuting — restore target volume
        audio.volume = TARGET_VOLUME
      }
      return next
    })
  }, [])

  return { muted, started, securePermission, startMusic, toggleMute }
}
