import { useState, useEffect, useCallback } from 'react'

const BIRTHDAY_MONTH = 2 // March (0-indexed)
const BIRTHDAY_DAY = 25

function isBirthday(date) {
  return date.getMonth() === BIRTHDAY_MONTH && date.getDate() === BIRTHDAY_DAY
}

function getTimeUntilBirthday(now) {
  const year = now.getFullYear()
  let birthday = new Date(year, BIRTHDAY_MONTH, BIRTHDAY_DAY)

  if (now > birthday) {
    birthday = new Date(year + 1, BIRTHDAY_MONTH, BIRTHDAY_DAY)
  }

  const diff = birthday - now
  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
  const seconds = Math.floor((diff % (1000 * 60)) / 1000)

  return { days, hours, minutes, seconds, total: diff }
}

export function useDateEngine() {
  const [now, setNow] = useState(new Date())
  const [forceBirthday, setForceBirthday] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      if (!forceBirthday) {
        setNow(new Date())
      }
    }, 1000)
    return () => clearInterval(interval)
  }, [forceBirthday])

  const toggleBirthdayMode = useCallback(() => {
    setForceBirthday(prev => {
      if (!prev) {
        setNow(new Date(2026, BIRTHDAY_MONTH, BIRTHDAY_DAY, 12, 0, 0))
        return true
      } else {
        setNow(new Date())
        return false
      }
    })
  }, [])

  const isBirthdayMode = forceBirthday || isBirthday(now)
  const countdown = isBirthdayMode ? null : getTimeUntilBirthday(now)

  return {
    now,
    isBirthdayMode,
    forceBirthday,
    countdown,
    toggleBirthdayMode,
  }
}
