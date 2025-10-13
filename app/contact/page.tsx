'use client'

import React from 'react'
import { motion } from 'framer-motion'
import QueryForm from '@/components/QueryForm'
import Navbar from '@/components/Navbar'

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 -right-20 w-96 h-96 bg-gradient-to-br from-accent-blue/5 to-secondary-teal/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 -left-20 w-96 h-96 bg-gradient-to-tr from-secondary-teal/5 to-accent-blue/5 rounded-full blur-3xl"></div>
      </div>

      {/* Navigation */}
      <Navbar />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-20"
        >
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-display font-bold text-primary-navy mb-6 leading-tight">
            Get in Touch
          </h1>
          <p className="text-xl md:text-2xl text-primary-navy-light max-w-4xl mx-auto leading-relaxed">
            Have questions about Etelios? We're here to help! 
            <br />
            <span className="font-semibold text-primary-navy">Ask us anything and we'll get back to you within 24 hours.</span>
          </p>
        </motion.div>

        {/* 3D Contact Options */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {[
            {
              title: 'Email Support',
              description: 'Get detailed answers via email',
              contact: 'support@etelios.com',
              color: 'blue'
            },
            {
              title: 'WhatsApp Chat',
              description: 'Instant support on WhatsApp',
              contact: '+91 98765 43210',
              color: 'teal'
            },
            {
              title: 'Phone Support',
              description: 'Speak with our team directly',
              contact: '+91 98765 43210',
              color: 'purple'
            }
          ].map((option, index) => (
            <motion.div
              key={option.title}
              initial={{ opacity: 0, y: 30, rotateX: -15 }}
              animate={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{ delay: index * 0.2, type: "spring", stiffness: 100 }}
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
                className="relative z-10 bg-white rounded-3xl p-8 shadow-2xl border border-gray-100 text-center"
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
                    option.color === 'blue' ? 'bg-gradient-to-br from-accent-blue to-accent-blue-dark' :
                    option.color === 'teal' ? 'bg-gradient-to-br from-secondary-teal to-secondary-teal-dark' :
                    'bg-gradient-to-br from-purple-500 to-purple-700'
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
                    <div className={`w-8 h-8 rounded-lg ${
                      option.color === 'blue' ? 'bg-white/80' :
                      option.color === 'teal' ? 'bg-white/80' :
                      'bg-white/80'
                    }`}></div>
                  </div>
                </motion.div>
                
                <h3 className="text-2xl font-display font-bold text-primary-navy mb-3">
                  {option.title}
                </h3>
                <p className="text-primary-navy-light mb-4 text-lg">
                  {option.description}
                </p>
                <motion.p 
                  className={`font-semibold text-lg ${
                    option.color === 'blue' ? 'text-accent-blue' :
                    option.color === 'teal' ? 'text-secondary-teal' :
                    'text-purple-600'
                  }`}
                  whileHover={{ scale: 1.05 }}
                >
                  {option.contact}
                </motion.p>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Query Form */}
        <QueryForm />

        {/* 3D FAQ Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-20"
        >
          <motion.h2 
            className="text-4xl md:text-5xl font-display font-bold text-primary-navy text-center mb-16"
            animate={{ 
              color: ["#051622", "#0072CE", "#051622"]
            }}
            transition={{ 
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            Frequently Asked Questions
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {[
              {
                question: 'When will Etelios launch?',
                answer: 'We\'re launching in July 2025. Join our waitlist to be the first to know!'
              },
              {
                question: 'What makes Etelios different?',
                answer: 'Etelios replaces 10+ tools with one simple dashboard. Everything in one place.'
              },
              {
                question: 'Is there a free trial?',
                answer: 'Yes! Early members get priority access and special launch offers.'
              },
              {
                question: 'Do you offer support?',
                answer: 'Absolutely! We provide 24/7 support via email, WhatsApp, and phone.'
              }
            ].map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20, rotateX: -10 }}
                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                transition={{ 
                  delay: 0.4 + index * 0.1,
                  type: "spring",
                  stiffness: 100
                }}
                whileHover={{ 
                  scale: 1.02,
                  rotateX: 2,
                  transition: { duration: 0.2 }
                }}
                className="relative group"
                style={{
                  perspective: '1000px'
                }}
              >
                {/* 3D Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-accent-blue/5 to-secondary-teal/5 rounded-2xl blur-lg scale-105 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <motion.div
                  className="relative z-10 bg-white rounded-2xl p-8 shadow-xl border border-gray-100"
                  style={{
                    background: 'linear-gradient(145deg, #ffffff, #f8f9fa)',
                    boxShadow: '15px 15px 40px rgba(0, 114, 206, 0.1), -15px -15px 40px #ffffff, inset 0 1px 0 rgba(255, 255, 255, 0.8)'
                  }}
                  whileHover={{
                    boxShadow: '20px 20px 50px rgba(0, 114, 206, 0.15), -20px -20px 50px #ffffff, inset 0 1px 0 rgba(255, 255, 255, 0.9)'
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.h3 
                    className="text-xl font-semibold text-primary-navy mb-4"
                    whileHover={{ scale: 1.02 }}
                  >
                    {faq.question}
                  </motion.h3>
                  <motion.p 
                    className="text-primary-navy-light leading-relaxed"
                    whileHover={{ scale: 1.01 }}
                  >
                    {faq.answer}
                  </motion.p>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
