'use client'

import { motion } from 'framer-motion'

export default function WhyUpcaptoSection() {
  const benefits = [
    {
      icon: '🚀',
      title: 'All-in-One Platform',
      description: 'Replace 10+ tools with one simple dashboard. Everything you need in one place.',
      color: 'blue'
    },
    {
      icon: '⚡',
      title: 'Lightning Fast',
      description: 'Built for speed. No more switching between apps or waiting for data to sync.',
      color: 'teal'
    },
    {
      icon: '🧠',
      title: 'AI-Powered Insights',
      description: 'Smart forecasting and analytics that help you make better business decisions.',
      color: 'purple'
    },
    {
      icon: '📱',
      title: 'Mobile First',
      description: 'Access your entire business from anywhere. Works on any device, anytime.',
      color: 'green'
    },
    {
      icon: '🔒',
      title: 'Enterprise Security',
      description: 'Bank-level security with 99.9% uptime. Your data is always safe.',
      color: 'orange'
    },
    {
      icon: '🎯',
      title: 'Easy to Use',
      description: 'If you can use WhatsApp, you can run Etelios. No training required.',
      color: 'pink'
    }
  ]

  return (
    <section id="why-upcapto" className="py-24 bg-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 -right-20 w-96 h-96 bg-gradient-to-br from-accent-blue/5 to-secondary-teal/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 -left-20 w-96 h-96 bg-gradient-to-tr from-secondary-teal/5 to-accent-blue/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <motion.h2 
            className="text-5xl md:text-6xl lg:text-7xl font-display font-bold text-primary-navy mb-6 leading-tight"
            animate={{ 
              color: ["#051622", "#0072CE", "#051622"]
            }}
            transition={{ 
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            Why Etelios?
          </motion.h2>
          <motion.p 
            className="text-xl md:text-2xl text-primary-navy-light max-w-4xl mx-auto leading-relaxed"
            animate={{ 
              opacity: [0.7, 1, 0.7]
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            The future of retail management is here. Experience the difference.
          </motion.p>
        </motion.div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 30, rotateX: -15 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{ 
                delay: index * 0.1,
                type: "spring",
                stiffness: 100
              }}
              viewport={{ once: true }}
              whileHover={{ 
                scale: 1.05,
                rotateX: 5,
                rotateY: 2,
                transition: { duration: 0.3 }
              }}
              className="relative group"
              style={{
                perspective: '1000px'
              }}
            >
              {/* 3D Background */}
              <div className="absolute inset-0 bg-gradient-to-br from-accent-blue/10 to-secondary-teal/10 rounded-3xl blur-lg scale-105 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <motion.div
                className="relative z-10 bg-white rounded-3xl p-8 shadow-2xl border border-gray-100 text-center h-full"
                style={{
                  background: 'linear-gradient(145deg, #ffffff, #f8f9fa)',
                  boxShadow: '20px 20px 60px rgba(0, 114, 206, 0.15), -20px -20px 60px #ffffff, inset 0 1px 0 rgba(255, 255, 255, 0.8)'
                }}
                whileHover={{
                  boxShadow: '25px 25px 80px rgba(0, 114, 206, 0.2), -25px -25px 80px #ffffff, inset 0 1px 0 rgba(255, 255, 255, 0.9)'
                }}
                transition={{ duration: 0.3 }}
              >
                {/* Icon */}
                <motion.div
                  className={`w-16 h-16 rounded-2xl mx-auto mb-6 shadow-lg ${
                    benefit.color === 'blue' ? 'bg-gradient-to-br from-accent-blue to-accent-blue-dark' :
                    benefit.color === 'teal' ? 'bg-gradient-to-br from-secondary-teal to-secondary-teal-dark' :
                    benefit.color === 'purple' ? 'bg-gradient-to-br from-purple-500 to-purple-700' :
                    benefit.color === 'green' ? 'bg-gradient-to-br from-green-500 to-green-700' :
                    benefit.color === 'orange' ? 'bg-gradient-to-br from-orange-500 to-orange-700' :
                    'bg-gradient-to-br from-pink-500 to-pink-700'
                  }`}
                  animate={{ 
                    rotateY: [0, 360],
                    scale: [1, 1.05, 1]
                  }}
                  transition={{ 
                    rotateY: { duration: 4, repeat: Infinity, ease: "linear" },
                    scale: { duration: 2, repeat: Infinity, ease: "easeInOut" }
                  }}
                >
                  <div className="w-full h-full flex items-center justify-center">
                    <span className="text-2xl">{benefit.icon}</span>
                  </div>
                </motion.div>
                
                <h3 className="text-2xl font-display font-bold text-primary-navy mb-4">
                  {benefit.title}
                </h3>
                <motion.p 
                  className="text-primary-navy-light leading-relaxed"
                  whileHover={{ scale: 1.02 }}
                >
                  {benefit.description}
                </motion.p>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <motion.div
            className="relative inline-block"
            whileHover={{ 
              scale: 1.05,
              rotateX: 5,
              transition: { duration: 0.3 }
            }}
            style={{
              perspective: '1000px'
            }}
          >
            {/* 3D Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-accent-blue/20 to-secondary-teal/20 rounded-3xl blur-xl scale-110 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            <motion.div
              className="relative z-10 bg-gradient-to-r from-accent-blue to-secondary-teal text-white rounded-3xl p-8 shadow-2xl"
              style={{
                background: 'linear-gradient(145deg, #0072CE, #00C48C)',
                boxShadow: '20px 20px 60px rgba(0, 114, 206, 0.3), -20px -20px 60px rgba(255, 255, 255, 0.8), inset 0 1px 0 rgba(255, 255, 255, 0.2)'
              }}
              whileHover={{
                boxShadow: '25px 25px 80px rgba(0, 114, 206, 0.4), -25px -25px 80px rgba(255, 255, 255, 0.9), inset 0 1px 0 rgba(255, 255, 255, 0.3)'
              }}
              transition={{ duration: 0.3 }}
            >
              <motion.h3 
                className="text-3xl md:text-4xl font-display font-bold mb-4"
                animate={{ 
                  color: ["#ffffff", "#f0f9ff", "#ffffff"]
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                Ready to Transform Your Business?
              </motion.h3>
              <motion.p 
                className="text-xl opacity-90"
                animate={{ 
                  opacity: [0.7, 1, 0.7]
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                Join thousands of retailers who are already using Etelios to grow their business.
              </motion.p>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}