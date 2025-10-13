'use client'

import { motion } from 'framer-motion'

const businessTypes = [
  {
    title: 'Small Business',
    subtitle: '1–2 stores',
    description: 'POS + Accounts + CRM → all you need to get organized.',
    color: 'blue',
    icon: 'small'
  },
  {
    title: 'Growing Retailer',
    subtitle: '3–20 outlets',
    description: 'Inventory sync + HRMS + Marketing automation → scale without chaos.',
    color: 'green',
    icon: 'growing'
  },
  {
    title: 'Large Chains',
    subtitle: '50+ stores',
    description: 'Omnicommerce + AI Forecasting + Enterprise Analytics → next-level control.',
    color: 'purple',
    icon: 'enterprise'
  }
]

export default function MadeForEveryoneSection() {
  return (
    <section className="py-24 bg-gradient-to-b from-white to-slate-50 relative overflow-hidden">
      {/* Premium Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-gradient-to-br from-blue-400/5 to-purple-600/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/3 left-1/4 w-80 h-80 bg-gradient-to-tr from-cyan-400/5 to-blue-600/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl md:text-6xl font-display font-bold text-slate-900 mb-8 leading-tight">
            From a local shop to a 
            <span className="gradient-text"> retail empire.</span>
          </h2>
        </motion.div>

        {/* Cread-style Business Type Panels */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {businessTypes.map((business, index) => (
            <motion.div
              key={business.title}
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ 
                duration: 0.8, 
                delay: index * 0.2,
                ease: "easeOut"
              }}
              viewport={{ once: true }}
              whileHover={{ 
                y: -16, 
                scale: 1.03,
                rotate: [0, -1, 1, 0]
              }}
              className="group"
            >
              <motion.div 
                className="bg-white/80 backdrop-blur-lg rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 border border-white/30 group-hover:border-upcapto-green/50 h-full hover-lift"
                whileHover={{ 
                  boxShadow: "0 25px 50px rgba(102, 204, 51, 0.2)"
                }}
              >
                <div className="text-center">
                  <motion.div 
                    className="relative mb-6"
                    whileHover={{ scale: 1.1 }}
                  >
                    <motion.div 
                      className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${
                        business.color === 'blue' ? 'from-upcapto-blue to-upcapto-teal' :
                        business.color === 'green' ? 'from-upcapto-green to-upcapto-teal' :
                        'from-upcapto-teal to-upcapto-blue'
                      } flex items-center justify-center mx-auto shadow-lg group-hover:shadow-xl transition-all duration-300`}
                      whileHover={{ 
                        rotate: [0, -5, 5, 0],
                        scale: 1.05
                      }}
                      animate={{ 
                        y: [0, -3, 0],
                      }}
                      transition={{ 
                        y: { duration: 3, repeat: Infinity, delay: index * 0.5 }
                      }}
                    >
                      <div className="w-10 h-10 rounded-xl bg-white/30 flex items-center justify-center relative overflow-hidden">
                        {business.icon === 'small' && (
                          <motion.div
                            className="relative w-full h-full flex items-center justify-center"
                            animate={{ 
                              rotateY: [0, 360],
                              scale: [1, 1.1, 1]
                            }}
                            transition={{ 
                              rotateY: { duration: 4, repeat: Infinity, ease: "linear" },
                              scale: { duration: 2, repeat: Infinity, ease: "easeInOut" }
                            }}
                          >
                            {/* Small Store Icon */}
                            <div className="relative">
                              <div className="w-4 h-3 bg-gradient-to-b from-blue-400 to-blue-600 rounded-sm shadow-lg"></div>
                              <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-1 bg-gradient-to-b from-yellow-300 to-yellow-500 rounded-full"></div>
                              <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-3 h-1 bg-gradient-to-b from-gray-300 to-gray-500 rounded"></div>
                            </div>
                          </motion.div>
                        )}
                        
                        {business.icon === 'growing' && (
                          <motion.div
                            className="relative w-full h-full flex items-center justify-center"
                            animate={{ 
                              rotateY: [0, 360],
                              scale: [1, 1.1, 1]
                            }}
                            transition={{ 
                              rotateY: { duration: 4, repeat: Infinity, ease: "linear" },
                              scale: { duration: 2, repeat: Infinity, ease: "easeInOut" }
                            }}
                          >
                            {/* Growing Store Icon */}
                            <div className="relative">
                              <div className="w-5 h-4 bg-gradient-to-b from-green-400 to-green-600 rounded-sm shadow-lg"></div>
                              <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-3 h-1 bg-gradient-to-b from-yellow-300 to-yellow-500 rounded-full"></div>
                              <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-4 h-1 bg-gradient-to-b from-gray-300 to-gray-500 rounded"></div>
                              <div className="absolute top-1 right-1 w-1 h-1 bg-green-500 rounded-full animate-pulse"></div>
                            </div>
                          </motion.div>
                        )}
                        
                        {business.icon === 'enterprise' && (
                          <motion.div
                            className="relative w-full h-full flex items-center justify-center"
                            animate={{ 
                              rotateY: [0, 360],
                              scale: [1, 1.1, 1]
                            }}
                            transition={{ 
                              rotateY: { duration: 4, repeat: Infinity, ease: "linear" },
                              scale: { duration: 2, repeat: Infinity, ease: "easeInOut" }
                            }}
                          >
                            {/* Enterprise Building Icon */}
                            <div className="relative">
                              <div className="w-4 h-5 bg-gradient-to-b from-purple-400 to-purple-600 rounded-sm shadow-lg"></div>
                              <div className="absolute top-1 left-1 w-1 h-1 bg-purple-300 rounded-full"></div>
                              <div className="absolute top-1 right-1 w-1 h-1 bg-purple-300 rounded-full"></div>
                              <div className="absolute top-3 left-1 w-1 h-1 bg-purple-300 rounded-full"></div>
                              <div className="absolute top-3 right-1 w-1 h-1 bg-purple-300 rounded-full"></div>
                              <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-3 h-1 bg-gradient-to-b from-gray-300 to-gray-500 rounded"></div>
                              <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-1 bg-gradient-to-b from-yellow-300 to-yellow-500 rounded-full"></div>
                            </div>
                          </motion.div>
                        )}
                      </div>
                    </motion.div>
                    <motion.div 
                      className="absolute inset-0 bg-gradient-to-br from-upcapto-green/20 to-upcapto-teal/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      animate={{ 
                        scale: [1, 1.1, 1],
                        opacity: [0, 0.3, 0]
                      }}
                      transition={{ 
                        duration: 2, 
                        repeat: Infinity, 
                        delay: index * 0.3 
                      }}
                    />
                  </motion.div>
                  
                  <motion.h3 
                    className="text-2xl font-display font-bold text-slate-900 mb-3 group-hover:text-upcapto-green transition-colors duration-300"
                    whileHover={{ scale: 1.05 }}
                  >
                    {business.title}
                  </motion.h3>
                  <motion.p 
                    className="text-slate-600 mb-6 font-semibold text-lg"
                    whileHover={{ scale: 1.02 }}
                  >
                    {business.subtitle}
                  </motion.p>
                  <motion.p 
                    className="text-slate-700 leading-relaxed font-body"
                    whileHover={{ scale: 1.01 }}
                  >
                    {business.description}
                  </motion.p>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Premium Bottom Copy */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="glass rounded-3xl p-8 max-w-5xl mx-auto shadow-premium">
            <p className="text-xl md:text-2xl text-slate-600 max-w-4xl mx-auto font-body leading-relaxed">
              Whether you're running a <span className="font-semibold text-slate-800">kirana</span>, a <span className="font-semibold text-slate-800">fashion brand</span>, or a <span className="font-semibold text-slate-800">supermarket chain</span> — 
              <span className="gradient-text font-semibold"> Etelios adapts to your size.</span>
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
