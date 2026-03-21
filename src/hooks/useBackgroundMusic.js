import { useRef, useState, useCallback, useEffect } from 'react'

// TODO: Replace with the actual MP3 file path in /public
// Drop your MP3 into public/music.mp3 and it will work automatically
const MUSIC_PATH = import.meta.env.BASE_URL + 'music.mp3'
const START_DELAY_MS = 5000

export function useBackgroundMusic() {
  const audioRef = useRef(null)
  const [muted, setMuted] = useState(false)
  const [started, setStarted] = useState(false)
  const delayRef = useRef(null)

  // Initialize audio element once
  useEffect(() => {
    const audio = new Audio(MUSIC_PATH)
    audio.loop = true
    audio.volume = 0.35
    audio.preload = 'auto'
    audioRef.current = audio

    return () => {
      audio.pause()
      audio.src = ''
      if (delayRef.current) clearTimeout(delayRef.current)
    }
  }, [])

  // Start music with delay — call this after user interaction (e.g., unboxing)
  const startMusic = useCallback(() => {
    if (started) return
    setStarted(true)
    delayRef.current = setTimeout(() => {
      const audio = audioRef.current
      if (!audio) return
      audio.play().catch(() => {
        // Autoplay blocked — will retry on next user interaction
        setStarted(false)
      })
    }, START_DELAY_MS)
  }, [started])

  // Toggle mute
  const toggleMute = useCallback(() => {
    setMuted(prev => {
      const next = !prev
      if (audioRef.current) {
        audioRef.current.muted = next
      }
      return next
    })
  }, [])

  return { muted, started, startMusic, toggleMute }
}
