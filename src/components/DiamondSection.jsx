import { motion } from 'framer-motion'

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

        <p className="text-rose-200/50 text-sm leading-relaxed">
          Like a diamond, you sparkle in ways that light up everything around you.
          <br />
          This is just the beginning...
        </p>
      </motion.div>
    </motion.section>
  )
}
