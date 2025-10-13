'use client'

import { motion } from 'framer-motion'
import useScrollAnimation from '@/lib/useScrollAnimation'
import { useCredAnimations, useTextAnimation, useStaggerAnimation, useHoverAnimation } from '@/lib/useCredAnimations'

const modules = [
  { icon: '💰', name: 'Accounts' },
  { icon: '📦', name: 'Inventory' },
  { icon: '👩‍💼', name: 'HRMS' },
  { icon: '🤝', name: 'CRM' },
  { icon: '🖥️', name: 'POS' },
  { icon: '📢', name: 'Marketing' },
  { icon: '📊', name: 'Analytics' },
  { icon: '🌍', name: 'Omnicommerce' },
  { icon: '🤖', name: 'AI Forecasting' }
]

export default function PromiseSection() {
  // CRED-style animations
  const { containerRef } = useCredAnimations()
  const headingRef = useTextAnimation('fadeUp')
  const descriptionRef = useTextAnimation('fadeUp')
  const modulesRef = useStaggerAnimation(0.1)
  const ctaRef = useTextAnimation('scaleIn')

  return (
    <section ref={containerRef} id="solutions" className="py-24 bg-cred-white relative">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 -right-20 w-96 h-96 bg-gradient-to-br from-accent-blue/5 to-secondary-teal/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 -left-20 w-96 h-96 bg-gradient-to-tr from-secondary-teal/5 to-accent-blue/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={headingRef} className="text-center mb-20">
          <motion.h2 
            className="text-5xl md:text-6xl lg:text-7xl font-display font-bold text-cred-black mb-8 leading-tight"
            animate={{ 
              color: ["#051622", "#0072CE", "#051622"]
            }}
            transition={{ 
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            One Platform. 
            <span className="bg-gradient-to-r from-cred-blue-600 to-cred-green-600 bg-clip-text text-transparent">
              Every Function.
            </span>
          </motion.h2>
          <div ref={descriptionRef}>
            <p className="text-xl md:text-2xl text-cred-gray-600 max-w-5xl mx-auto leading-relaxed">
              Retailers today juggle 5–10 different tools: accounting, POS, HR, inventory, e-commerce, marketing… 
              <span className="font-semibold text-cred-black"> Etelios replaces them all with one simple screen.</span>
            </p>
          </div>
        </div>

        {/* Cread-style Modules Grid */}
        <div ref={modulesRef} className="grid grid-cols-3 md:grid-cols-9 gap-6 mb-16">
          {modules.map((module, index) => (
            <motion.div
              key={module.name}
              initial={{ opacity: 0, y: 30, scale: 0.8 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ 
                duration: 0.6, 
                delay: index * 0.1,
                ease: "easeOut"
              }}
              viewport={{ once: true }}
              whileHover={{ 
                y: -12, 
                scale: 1.08,
                rotate: [0, -2, 2, 0]
              }}
              className="text-center group cursor-pointer"
            >
              <motion.div 
                className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 group-hover:border-accent-blue/50 hover-lift flex flex-col justify-center items-center p-6 min-h-[120px]"
                style={{
                  background: 'linear-gradient(145deg, #ffffff, #f8f9fa)',
                  boxShadow: '15px 15px 40px rgba(0, 114, 206, 0.1), -15px -15px 40px #ffffff, inset 0 1px 0 rgba(255, 255, 255, 0.8)'
                }}
                whileHover={{ 
                  boxShadow: "20px 20px 50px rgba(0, 114, 206, 0.2), -20px -20px 50px #ffffff, inset 0 1px 0 rgba(255, 255, 255, 0.9)"
                }}
              >
                <motion.div 
                  className="group-hover:scale-110 transition-transform duration-300 text-4xl mb-4"
                  whileHover={{ 
                    rotate: [0, -10, 10, 0],
                    scale: 1.2
                  }}
                  animate={{ 
                    y: [0, -5, 0],
                  }}
                  transition={{ 
                    y: { duration: 2, repeat: Infinity, delay: index * 0.2 }
                  }}
                >
                  {module.icon}
                </motion.div>
                <motion.div 
                  className={`font-semibold text-primary-navy group-hover:text-accent-blue transition-colors duration-300 ${
                    module.name === 'AI Forecasting' || module.name === 'Omnicommerce' || module.name === 'Analytics' 
                      ? 'text-xs leading-tight' 
                      : 'text-sm'
                  }`}
                  whileHover={{ scale: 1.05 }}
                >
                  {module.name}
                </motion.div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Premium Tagline */}
        <div ref={ctaRef} className="text-center">
          <motion.div 
            className="bg-gradient-to-r from-accent-blue/10 to-secondary-teal/10 rounded-2xl p-8 max-w-4xl mx-auto border border-accent-blue/20"
            style={{
              background: 'linear-gradient(145deg, rgba(0, 114, 206, 0.1), rgba(0, 196, 140, 0.1))',
              boxShadow: '15px 15px 40px rgba(0, 114, 206, 0.1), -15px -15px 40px #ffffff, inset 0 1px 0 rgba(255, 255, 255, 0.8)'
            }}
            whileHover={{
              boxShadow: "20px 20px 50px rgba(0, 114, 206, 0.15), -20px -20px 50px #ffffff, inset 0 1px 0 rgba(255, 255, 255, 0.9)"
            }}
            transition={{ duration: 0.3 }}
          >
            <motion.p 
              className="text-3xl md:text-4xl font-display font-bold text-cred-black"
              animate={{ 
                color: ["#051622", "#0072CE", "#051622"]
              }}
              transition={{ 
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              Everything. Together. For the first time.
            </motion.p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
