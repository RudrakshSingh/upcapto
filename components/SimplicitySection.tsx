'use client'

import { motion } from 'framer-motion'
import { scrollToForm } from '@/lib/scrollToForm'

export default function SimplicitySection() {
  return (
    <section className="py-24 bg-gradient-to-b from-slate-50 to-white relative overflow-hidden">
      {/* Premium Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-br from-blue-400/5 to-purple-600/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-tr from-cyan-400/5 to-blue-600/5 rounded-full blur-3xl"></div>
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
            If you can use WhatsApp, 
            <span className="gradient-text"> you can run Etelios.</span>
          </h2>
          <p className="text-xl md:text-2xl text-slate-600 max-w-5xl mx-auto leading-relaxed font-body">
            No training. No IT team. Just log in and run your entire business from one clean, intuitive dashboard.
          </p>
        </motion.div>

        {/* Indian Business Market Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
        >
          {/* Stat 1 */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="text-center bg-white rounded-2xl p-8 shadow-lg border border-gray-100"
          >
            <div className="text-4xl font-bold text-blue-600 mb-2">63M+</div>
            <div className="text-lg font-semibold text-gray-800 mb-2">MSMEs in India</div>
            <div className="text-gray-600 text-sm">Contributing 30% to GDP</div>
          </motion.div>

          {/* Stat 2 */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            viewport={{ once: true }}
            className="text-center bg-white rounded-2xl p-8 shadow-lg border border-gray-100"
          >
            <div className="text-4xl font-bold text-green-600 mb-2">₹3.5T</div>
            <div className="text-lg font-semibold text-gray-800 mb-2">Digital Commerce</div>
            <div className="text-gray-600 text-sm">Expected by 2025</div>
          </motion.div>

          {/* Stat 3 */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            viewport={{ once: true }}
            className="text-center bg-white rounded-2xl p-8 shadow-lg border border-gray-100"
          >
            <div className="text-4xl font-bold text-purple-600 mb-2">85%</div>
            <div className="text-lg font-semibold text-gray-800 mb-2">Still Manual</div>
            <div className="text-gray-600 text-sm">Business operations</div>
          </motion.div>
        </motion.div>


        {/* Global Business Leaders Quotes */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          viewport={{ once: true }}
          className="mt-20"
        >
          <div className="text-center mb-12">
            <h3 className="text-3xl md:text-4xl font-display font-bold text-slate-900 mb-4">
              Voices from Global Business Revolution
            </h3>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              Insights from legendary leaders who transformed business worldwide
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Quote 1 - Jeff Bezos */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.9 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 relative"
            >
              <div className="absolute top-4 left-4 text-4xl text-orange-500 opacity-20">"</div>
              <blockquote className="text-lg font-body text-gray-700 italic leading-relaxed mb-6 mt-4">
                "Your margin is my opportunity. We're not competitor obsessed, we're customer obsessed."
              </blockquote>
              <div className="border-t border-gray-100 pt-4">
                <div className="font-semibold text-gray-900">Jeff Bezos</div>
                <div className="text-sm text-gray-600">Founder & CEO, Amazon</div>
              </div>
            </motion.div>

            {/* Quote 2 - Sam Walton */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 1.0 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 relative"
            >
              <div className="absolute top-4 left-4 text-4xl text-blue-500 opacity-20">"</div>
              <blockquote className="text-lg font-body text-gray-700 italic leading-relaxed mb-6 mt-4">
                "There is only one boss. The customer. And he can fire everybody in the company from the chairman on down, simply by spending his money somewhere else."
              </blockquote>
              <div className="border-t border-gray-100 pt-4">
                <div className="font-semibold text-gray-900">Sam Walton</div>
                <div className="text-sm text-gray-600">Founder, Walmart</div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Etelios Motivation Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.1 }}
          viewport={{ once: true }}
          className="mt-24"
        >
          <div className="bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 rounded-3xl p-12 md:p-16 text-white relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-cyan-600/10"></div>
            <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-blue-500/20 to-transparent rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-purple-500/20 to-transparent rounded-full blur-3xl"></div>
            
            <div className="relative z-10">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.2 }}
                viewport={{ once: true }}
                className="text-center mb-12"
              >
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6 leading-tight">
                  This is where half the motivation of 
                  <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"> Etelios</span> comes from
                </h2>
                <p className="text-xl md:text-2xl text-blue-100 max-w-4xl mx-auto leading-relaxed">
                  We've witnessed the struggles of Indian businesses firsthand
                </p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                {/* Left Column - The Problem */}
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 1.3 }}
                  viewport={{ once: true }}
                  className="space-y-8"
                >
                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                    <h3 className="text-2xl font-bold text-red-300 mb-4">The Reality We Saw</h3>
                    <ul className="space-y-4 text-blue-100">
                      <li className="flex items-start">
                        <span className="text-red-400 mr-3 mt-1">•</span>
                        <span>63 million MSMEs struggling with manual processes</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-red-400 mr-3 mt-1">•</span>
                        <span>85% of businesses still using pen and paper</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-red-400 mr-3 mt-1">•</span>
                        <span>Average business owner spending 6+ hours daily on admin</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-red-400 mr-3 mt-1">•</span>
                        <span>₹3.5 trillion digital commerce opportunity being missed</span>
                      </li>
                    </ul>
                  </div>
                </motion.div>

                {/* Right Column - The Solution */}
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 1.4 }}
                  viewport={{ once: true }}
                  className="space-y-8"
                >
                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                    <h3 className="text-2xl font-bold text-green-300 mb-4">Our Vision</h3>
                    <ul className="space-y-4 text-blue-100">
                      <li className="flex items-start">
                        <span className="text-green-400 mr-3 mt-1">•</span>
                        <span>Democratize enterprise-grade technology for every business</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-green-400 mr-3 mt-1">•</span>
                        <span>Make complex business operations as simple as WhatsApp</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-green-400 mr-3 mt-1">•</span>
                        <span>Empower 63 million MSMEs to compete globally</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-green-400 mr-3 mt-1">•</span>
                        <span>Bridge the digital divide in Indian business</span>
                      </li>
                    </ul>
                  </div>
                </motion.div>
              </div>

              {/* Bottom CTA */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.5 }}
                viewport={{ once: true }}
                className="text-center mt-12"
              >
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                  <h3 className="text-2xl font-bold text-white mb-4">
                    Join the Digital Revolution
                  </h3>
                  <p className="text-blue-100 text-lg mb-6">
                    Be part of the transformation that's reshaping Indian business
                  </p>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={scrollToForm}
                    className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    Start Your Journey
                  </motion.button>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
