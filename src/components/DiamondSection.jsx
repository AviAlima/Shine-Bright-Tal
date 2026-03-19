import { motion } from 'framer-motion'

// TODO: Integrate specific song player here
// TODO: Add diamond earrings reveal animation

export default function DiamondSection() {
  return (
    <motion.section
      className="px-4 sm:px-8 py-16 text-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 2.8 }}
    >
      <motion.div
        className="max-w-md mx-auto"
        initial={{ y: 30 }}
        animate={{ y: 0 }}
        transition={{ delay: 3 }}
      >
        <motion.div
          className="text-6xl mb-6"
          animate={{
            rotate: [0, 5, -5, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          💎
        </motion.div>

        <h3 className="font-script text-3xl sm:text-4xl text-rose-200 mb-4">
          Shine Bright
        </h3>

        <p className="text-rose-200/50 text-sm leading-relaxed mb-8">
          Like a diamond, you sparkle in ways that light up everything around you.
          <br />
          This is just the beginning...
        </p>

        {/* TODO: Song player integration */}
        <motion.div
          className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-white/5 border border-rose-300/20"
          whileHover={{ scale: 1.05 }}
        >
          <span className="text-xl">🎵</span>
          <span className="text-rose-200/60 text-sm">A special song awaits...</span>
          {/* TODO: Add play button and audio integration */}
        </motion.div>
      </motion.div>
    </motion.section>
  )
}
