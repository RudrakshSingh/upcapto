'use client'

import { motion } from 'framer-motion'
import useScrollAnimation from '@/lib/useScrollAnimation'
import { useCredAnimations, useTextAnimation, useStaggerAnimation, useHoverAnimation } from '@/lib/useCredAnimations'
import { scrollToForm } from '@/lib/scrollToForm'

const solutions = [
  {
    title: "Unified Business Platform",
    description: "Seamless POS, CRM, Inventory management in one powerful ecosystem.",
    icon: "🛍️",
    gradient: "from-neon-cyan to-blue-500"
  },
  {
    title: "Back-Office Cloud",
    description: "HR, Finance, Operations powered by intelligent automation.",
    icon: "☁️",
    gradient: "from-neon-purple to-purple-500"
  },
  {
    title: "AI Insights Engine",
    description: "Data-driven intelligence that scales with your business growth.",
    icon: "🧠",
    gradient: "from-cyan-400 to-neon-cyan"
  },
  {
    title: "Enterprise-Grade Security",
    description: "Trust, Compliance & Scalability for Fortune 500 companies.",
    icon: "🔒",
    gradient: "from-purple-400 to-neon-purple"
  }
]

export default function SolutionsSection() {
  // CRED-style animations
  const { containerRef } = useCredAnimations()
  const headingRef = useTextAnimation('fadeUp')
  const solutionsRef = useStaggerAnimation(0.15)

  return (
    <section ref={containerRef} id="solutions" className="relative py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div ref={headingRef} className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Core Solutions
          </h2>
          <p className="text-xl text-white/80 max-w-3xl mx-auto">
            Comprehensive IT solutions designed for the modern enterprise
          </p>
        </div>

        {/* Solutions Grid */}
        <div ref={solutionsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {solutions.map((solution, index) => (
            <motion.div
              key={solution.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <motion.div
                whileHover={{ y: -10 }}
                className="relative group"
              >
                  {/* Glassmorphic Card */}
                  <div className="relative bg-glass backdrop-blur-lg border border-glass-border rounded-2xl p-8 h-full hover:border-neon-cyan/50 transition-all duration-500 overflow-hidden">
                    {/* Gradient Overlay */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${solution.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-2xl`} />
                    
                    {/* Content */}
                    <div className="relative z-10">
                      {/* Icon */}
                      <motion.div
                        whileHover={{ scale: 1.2, rotate: 10 }}
                        className="text-4xl mb-6 inline-block"
                      >
                        {solution.icon}
                      </motion.div>
                      
                      {/* Title */}
                      <h3 className="text-xl font-bold text-white mb-4 group-hover:text-neon-cyan transition-colors duration-300">
                        {solution.title}
                      </h3>
                      
                      {/* Description */}
                      <p className="text-white/80 leading-relaxed">
                        {solution.description}
                      </p>
                    </div>

                    {/* Hover Effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-neon-cyan/0 to-neon-purple/0 group-hover:from-neon-cyan/5 group-hover:to-neon-purple/5 transition-all duration-500 rounded-2xl" />
                  </div>
                </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={scrollToForm}
            className="bg-gradient-to-r from-neon-cyan to-neon-purple text-black px-8 py-4 rounded-full font-bold text-lg shadow-2xl shadow-neon-cyan/25 hover:shadow-neon-cyan/40 transition-all duration-300"
          >
            Explore All Solutions
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}
