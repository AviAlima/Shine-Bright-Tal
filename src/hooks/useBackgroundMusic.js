import { useRef, useState, useCallback, useEffect } from 'react'

const MUSIC_PATH = import.meta.env.BASE_URL + 'music.mp3'
const FADE_DELAY_MS = 2000
const FADE_DURATION_MS = 2500
const TARGET_VOLUME = 0.35
const FADE_STEPS = 50

export function useBackgroundMusic() {
  const audioRef = useRef(null)
  const [started, setStarted] = useState(false)
  const fadeRef = useRef(null)
  const delayRef = useRef(null)

  // Initialize audio element once
  useEffect(() => {
    const audio = new Audio(MUSIC_PATH)
    audio.loop = true
    audio.volume = 0
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

    const stepSize = TARGET_VOLUME / FADE_STEPS
    const stepInterval = FADE_DURATION_MS / FADE_STEPS
    let current = 0

    fadeRef.current = setInterval(() => {
      current += stepSize
      if (current >= TARGET_VOLUME) {
        audio.volume = TARGET_VOLUME
        if (fadeRef.current) clearInterval(fadeRef.current)
      } else {
        audio.volume = current
      }
    }, stepInterval)
  }, [])

  // Call directly from a user gesture (touch/click handler).
  // Plays audio and schedules fade-in after delay.
  const startMusic = useCallback(() => {
    if (started) return
    const audio = audioRef.current
    if (!audio) return

    setStarted(true)
    audio.volume = 0
    audio.play().then(() => {
      delayRef.current = setTimeout(fadeIn, FADE_DELAY_MS)
    }).catch(() => {
      setStarted(false)
    })
  }, [started, fadeIn])

  return { started, startMusic }
}
