import { motion } from 'framer-motion'

function TimeUnit({ value, label }) {
  return (
    <motion.div
      className="flex flex-col items-center mx-2 sm:mx-4"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: 'spring', damping: 12 }}
    >
      <div className="relative">
        <div className="w-16 h-16 sm:w-24 sm:h-24 rounded-2xl bg-white/5 backdrop-blur-sm border border-rose-300/20 flex items-center justify-center pulse-glow">
          <motion.span
            key={value}
            className="text-3xl sm:text-5xl font-bold countdown-number"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ type: 'spring', damping: 15 }}
          >
            {String(value).padStart(2, '0')}
          </motion.span>
        </div>
      </div>
      <span className="text-rose-200/60 text-xs sm:text-sm mt-2 uppercase tracking-wider">
        {label}
      </span>
    </motion.div>
  )
}

export default function Countdown({ countdown }) {
  if (!countdown) return null

  return (
    <motion.div
      className="flex flex-col items-center justify-center min-h-[80vh] px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.8 }}
    >
      <motion.div
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <h1 className="font-script text-4xl sm:text-6xl text-rose-200 mb-2 text-center">
          Something Special
        </h1>
        <h2 className="font-script text-2xl sm:text-3xl text-rose-300/60 mb-12 text-center">
          is coming...
        </h2>
      </motion.div>

      <div className="flex items-center justify-center mb-12">
        <TimeUnit value={countdown.days} label="Days" />
        <span className="text-rose-300/40 text-2xl sm:text-4xl font-light mt-[-20px]">:</span>
        <TimeUnit value={countdown.hours} label="Hours" />
        <span className="text-rose-300/40 text-2xl sm:text-4xl font-light mt-[-20px]">:</span>
        <TimeUnit value={countdown.minutes} label="Minutes" />
        <span className="text-rose-300/40 text-2xl sm:text-4xl font-light mt-[-20px] hidden sm:block">:</span>
        <div className="hidden sm:block">
          <TimeUnit value={countdown.seconds} label="Seconds" />
        </div>
      </div>

      {/* TODO: Add warm greeting/message here */}
      <motion.p
        className="text-rose-200/40 text-sm text-center max-w-md"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        Every moment until then is just a little more anticipation...
      </motion.p>
    </motion.div>
  )
}
