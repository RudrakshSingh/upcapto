'use client'

import { motion } from 'framer-motion'

export default function VisionSection() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="space-y-8"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
            Why we built Etelios.
          </h2>
          
          <p className="text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
            Retailers have always been forced to stitch together dozens of tools. We asked: what if everything was in one place, designed to be easy, and smart enough to predict the future?
          </p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
            className="bg-blue-600 text-white rounded-2xl p-8 max-w-2xl mx-auto"
          >
            <p className="text-2xl font-bold">
              Etelios is more than software. It's the future of retail management.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
