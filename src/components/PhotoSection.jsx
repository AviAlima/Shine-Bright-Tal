import { motion } from 'framer-motion'

// TODO: Replace placeholder images with actual photos
const placeholders = [
  { id: 1, label: 'Our first date' },
  { id: 2, label: 'That sunset' },
  { id: 3, label: 'Our adventure' },
  { id: 4, label: 'Laughing together' },
  { id: 5, label: 'Us being us' },
  { id: 6, label: 'A favorite moment' },
]

export default function PhotoSection() {
  return (
    <motion.section
      className="px-4 sm:px-8 py-12"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.5 }}
    >
      <h3 className="font-script text-3xl sm:text-4xl text-center text-rose-200 mb-8">
        Our Memories
      </h3>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 max-w-3xl mx-auto">
        {placeholders.map((photo, index) => (
          <motion.div
            key={photo.id}
            className="aspect-square rounded-2xl bg-white/5 backdrop-blur-sm border border-rose-300/10 flex flex-col items-center justify-center cursor-pointer overflow-hidden group"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5 + index * 0.1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            {/* TODO: Replace with actual <img> tags */}
            <span className="text-4xl mb-2 group-hover:scale-125 transition-transform">📸</span>
            <span className="text-rose-200/40 text-xs text-center px-2">{photo.label}</span>
          </motion.div>
        ))}
      </div>
    </motion.section>
  )
}
