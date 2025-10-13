'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import useScrollAnimation from '@/lib/useScrollAnimation'
import { useSmoothScroll } from '@/lib/useCredAnimations'
import { scrollToForm } from '@/lib/scrollToForm'

export default function EteliosPreview() {
  // CRED-style scroll animations
  const { ref: welcomeRef, isVisible: welcomeVisible } = useScrollAnimation()
  const { ref: dashboardRef, isVisible: dashboardVisible } = useScrollAnimation()
  const { ref: featuresRef, isVisible: featuresVisible } = useScrollAnimation()
  const { ref: messageRef, isVisible: messageVisible } = useScrollAnimation()
  const { ref: ctaRef, isVisible: ctaVisible } = useScrollAnimation()
  const { scrollTo } = useSmoothScroll()

  return (
    <section className="relative py-20 bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-600/10 to-purple-600/10"></div>
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div
            ref={welcomeRef}
            className={`mb-8 scroll-trigger ${welcomeVisible ? 'animate' : ''}`}
          >
            <h2 className="text-4xl md:text-6xl font-black text-white mb-6 font-display">
              Welcome to{' '}
              <motion.span 
                animate={{
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "linear"
                }}
                className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent bg-[length:200%_100%]"
              >
                Etelios
              </motion.span>
            </h2>
            <p className="text-xl md:text-2xl text-blue-200 mb-8 font-body font-medium">
              Your Business Buddy - Digital Cofounder
            </p>
            <p className="text-lg text-gray-300 max-w-4xl mx-auto font-body">
              An AI-powered co-founder that works while you sleep. Your Business Has a Brain Now. Never miss a business opportunity again!
            </p>
          </div>
        </div>

        {/* Etelios Dashboard Preview */}
        <div
          ref={dashboardRef}
          className={`relative max-w-6xl mx-auto scroll-trigger-scale ${dashboardVisible ? 'animate' : ''}`}
          style={{ transitionDelay: '0.2s' }}
        >
          {/* Dashboard Container */}
          <div className="relative bg-slate-800/50 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white/10 overflow-hidden">
            {/* Dashboard Header */}
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
                  <span className="text-white font-bold text-xl">E</span>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white font-display">Etelios</h3>
                  <p className="text-blue-300 text-sm font-subheading">Digital Cofounder</p>
                </div>
              </div>
              <button 
                onClick={scrollToForm}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors font-heading"
              >
                Login
              </button>
            </div>

            {/* Welcome Section */}
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-black text-white mb-4 font-display">
                Welcome to{' '}
                <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  Etelios
                </span>
              </h1>
              <p className="text-xl text-blue-200 mb-8 font-body">Your Business Buddy</p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                <button 
                  onClick={scrollToForm}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-bold text-lg transition-colors font-heading"
                >
                  Get Started
                </button>
                <button 
                  onClick={scrollToForm}
                  className="border-2 border-white/30 text-white hover:bg-white/10 px-8 py-3 rounded-lg font-semibold text-lg transition-colors font-heading"
                >
                  View All Modules
                </button>
              </div>

              <p className="text-gray-300 max-w-3xl mx-auto font-body">
                An AI-powered co-founder that works while you sleep / Your Business Has a Brain Now. Never miss a business opportunity again!
              </p>

              {/* Feature Icons */}
              <div className="flex justify-center space-x-8 mt-8">
                <div className="text-center">
                  <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center mb-2">
                    <span className="text-2xl">🤖</span>
                  </div>
                  <p className="text-sm text-blue-300 font-subheading">AI-Powered</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center mb-2">
                    <span className="text-2xl">⚡</span>
                  </div>
                  <p className="text-sm text-green-300 font-subheading">Smart Automation</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center mb-2">
                    <span className="text-2xl">📊</span>
                  </div>
                  <p className="text-sm text-purple-300 font-subheading">Predictive Analytics</p>
                </div>
              </div>
            </div>

            {/* Core Features Grid */}
            <div
              ref={featuresRef}
              className={`scroll-trigger ${featuresVisible ? 'animate' : ''}`}
              style={{ transitionDelay: '0.4s' }}
            >
              <h2 className="text-3xl font-bold text-white mb-8 text-center font-display">Our Core Features</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {/* Feature Cards */}
                {[
                  { title: 'HRM & Payroll', desc: 'Human Resource Management and Payroll System', color: 'bg-blue-500', icon: '👥' },
                  { title: 'CRM & Marketing', desc: 'Customer Relationship Management', color: 'bg-green-500', icon: '📈' },
                  { title: 'Inventory & WMS', desc: 'Inventory and Warehouse Management', color: 'bg-purple-500', icon: '📦' },
                  { title: 'Finance & Accounting', desc: 'Financial Management and Accounting', color: 'bg-yellow-500', icon: '💰' },
                  { title: 'Sales & POS', desc: 'Sales and Point of Sale System', color: 'bg-red-500', icon: '🛒' },
                  { title: 'AI Business Brain', desc: 'AI-powered business intelligence and insights', color: 'bg-pink-500', icon: '🧠' },
                  { title: 'Smart Analytics', desc: 'AI-driven analytics and predictions', color: 'bg-indigo-500', icon: '🎯' },
                  { title: 'Reports & Analytics', desc: 'Business Intelligence and Reporting', color: 'bg-teal-500', icon: '📊' },
                  { title: 'Activity Feed', desc: 'System Activity and Notifications', color: 'bg-rose-500', icon: '📅' },
                  { title: 'Project Management', desc: 'Project Planning and Tracking', color: 'bg-emerald-500', icon: '📋' },
                  { title: 'Tenant Admin & Settings', desc: 'Administration and System Settings', color: 'bg-gray-500', icon: '⚙️' }
                ].map((feature, index) => (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ 
                      duration: 0.6, 
                      ease: "easeOut", 
                      delay: index * 0.1 
                    }}
                    className="bg-slate-700/50 backdrop-blur-sm rounded-xl overflow-hidden border border-white/10 hover:border-white/20 transition-all duration-300 hover:scale-105"
                  >
                    <div className={`${feature.color} p-4 text-center`}>
                      <div className="text-3xl mb-2">{feature.icon}</div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-bold text-white text-sm mb-2 font-subheading">{feature.title}</h3>
                      <p className="text-gray-400 text-xs font-body">{feature.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Floating Elements */}
          <div className="absolute -top-4 -right-4 w-24 h-24 bg-blue-500/20 rounded-full blur-xl animate-pulse"></div>
          <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-purple-500/20 rounded-full blur-xl animate-pulse"></div>
        </div>

        {/* Impactful Message - Only 40% */}
        <div
          ref={messageRef}
          className={`text-center mt-16 mb-12 scroll-trigger ${messageVisible ? 'animate' : ''}`}
          style={{ transitionDelay: '0.6s' }}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
            className="bg-gradient-to-r from-slate-800/50 to-blue-900/50 backdrop-blur-lg rounded-2xl p-8 border border-white/20 max-w-4xl mx-auto"
          >
            <div className="mb-8">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 font-display">
                Important Notice
              </h3>
              <h2 className="text-xl md:text-2xl font-semibold text-gray-300 mb-4 font-heading">
                If you think these are all the features...
              </h2>
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-6 font-display">
                You're <span className="text-blue-400">missing the bigger picture</span>
              </h1>
            </div>

            <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <div className="flex items-center justify-center mb-6">
                <div className="bg-gradient-to-r from-blue-500 to-purple-500 rounded-full p-4">
                  <span className="text-4xl font-black text-white">40%</span>
                </div>
                <div className="ml-4 text-left">
                  <p className="text-2xl font-bold text-white font-display">This is only</p>
                  <p className="text-lg text-gray-300 font-body">of what Etelios can do</p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-8 text-left">
                <div>
                  <h4 className="text-lg font-semibold text-white mb-4 font-heading">Current Features (40%)</h4>
                  <ul className="space-y-3 text-gray-300 font-body">
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span>Core business management modules</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span>Standard operational tools</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span>Traditional business software capabilities</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-white mb-4 font-heading">Advanced Capabilities (60%)</h4>
                  <ul className="space-y-3 text-gray-300 font-body">
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-green-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span>AI-powered automation and intelligence</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-green-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span>Predictive analytics and forecasting</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-green-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span>Machine learning decision support</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-green-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span>Advanced business intelligence</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <p className="text-xl font-semibold text-white mb-4 font-heading">
                The advanced capabilities represent the true value proposition
              </p>
              <p className="text-lg text-gray-300 font-body">
                Enterprise-grade AI capabilities, machine learning algorithms, predictive modeling, 
                and advanced business intelligence that will transform your business operations.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Call to Action */}
        <div
          ref={ctaRef}
          className={`text-center scroll-trigger ${ctaVisible ? 'animate' : ''}`}
          style={{ transitionDelay: '0.8s' }}
        >
          <p className="text-lg text-gray-300 mb-8 font-body">
            Ready to explore the complete Etelios platform?
          </p>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={scrollToForm}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 rounded-lg font-semibold text-lg transition-all duration-200 shadow-lg font-heading cursor-pointer"
          >
            Access Full Platform
          </motion.button>
        </div>
      </div>
    </section>
  )
}
