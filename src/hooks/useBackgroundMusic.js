import { useRef, useState, useCallback, useEffect } from 'react'

const MUSIC_PATH = import.meta.env.BASE_URL + 'music.mp3'
const FADE_DELAY_MS = 2000
const FADE_DURATION_MS = 2500
const TARGET_VOLUME = 0.35
const FADE_STEPS = 50

export function useBackgroundMusic() {
  const audioRef = useRef(null)
  const gainRef = useRef(null)
  const ctxRef = useRef(null)
  const [muted, setMuted] = useState(false)
  const [started, setStarted] = useState(false)
  const fadeRef = useRef(null)
  const delayRef = useRef(null)
  const mutedRef = useRef(false)
  const playingRef = useRef(false)

  // Initialize audio element once
  useEffect(() => {
    const audio = new Audio(MUSIC_PATH)
    audio.loop = true
    audio.preload = 'auto'
    audioRef.current = audio

    return () => {
      audio.pause()
      audio.src = ''
      if (delayRef.current) clearTimeout(delayRef.current)
      if (fadeRef.current) clearInterval(fadeRef.current)
      if (ctxRef.current) ctxRef.current.close()
    }
  }, [])

  const fadeIn = useCallback(() => {
    const gain = gainRef.current
    if (!gain) return

    gain.gain.value = 0

    const stepSize = TARGET_VOLUME / FADE_STEPS
    const stepInterval = FADE_DURATION_MS / FADE_STEPS
    let current = 0

    fadeRef.current = setInterval(() => {
      if (mutedRef.current) {
        if (fadeRef.current) clearInterval(fadeRef.current)
        gain.gain.value = 0
        return
      }

      current += stepSize
      if (current >= TARGET_VOLUME) {
        gain.gain.value = TARGET_VOLUME
        if (fadeRef.current) clearInterval(fadeRef.current)
      } else {
        gain.gain.value = current
      }
    }, stepInterval)
  }, [])

  // Secure iOS audio permission — must be called directly from a user gesture.
  // Creates Web Audio API context + GainNode (gain at 0) and starts playback.
  const securePermission = useCallback(() => {
    const audio = audioRef.current
    if (!audio || playingRef.current) return

    // Create Web Audio context and route audio through a GainNode
    const ctx = new (window.AudioContext || window.webkitAudioContext)()
    const source = ctx.createMediaElementSource(audio)
    const gain = ctx.createGain()
    gain.gain.value = 0 // silent — GainNode volume works on iOS
    source.connect(gain)
    gain.connect(ctx.destination)
    ctxRef.current = ctx
    gainRef.current = gain

    // Resume context (required on iOS) and play
    ctx.resume().then(() => audio.play()).then(() => {
      playingRef.current = true
    }).catch(() => {})
  }, [])

  // Begin the audible fade-in — safe to call from a timeout
  // because audio is already playing through the unlocked AudioContext.
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
      const gain = gainRef.current
      if (!gain) return next

      if (next) {
        if (fadeRef.current) clearInterval(fadeRef.current)
        gain.gain.value = 0
      } else {
        gain.gain.value = TARGET_VOLUME
      }
      return next
    })
  }, [])

  return { muted, started, securePermission, startMusic, toggleMute }
}
