'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { scrollToForm } from '@/lib/scrollToForm'

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200/50 shadow-sm"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Upcapto Logo */}
          <motion.a
            href="#"
            onClick={(e) => {
              e.preventDefault()
              scrollToForm()
            }}
            whileHover={{ scale: 1.05 }}
            className="flex items-center space-x-3"
          >
            <img 
              src="/logo.png" 
              alt="Upcapto Logo" 
              className="h-12 w-auto"
              onError={(e) => {
                // Fallback to gradient icon if logo fails to load
                e.currentTarget.style.display = 'none';
                const nextSibling = e.currentTarget.nextElementSibling as HTMLElement;
                if (nextSibling) {
                  nextSibling.style.display = 'flex';
                }
              }}
            />
            <div className="h-12 w-12 bg-accent-gradient rounded-xl flex items-center justify-center shadow-lg hidden">
              <span className="text-white font-display font-bold text-xl">U</span>
            </div>
          </motion.a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a 
              href="#"
              onClick={(e) => {
                e.preventDefault()
                scrollToForm()
              }}
              className="text-primary-navy hover:text-accent-blue transition-colors duration-300 font-medium"
            >
              Solutions
            </a>
            <a 
              href="#"
              onClick={(e) => {
                e.preventDefault()
                scrollToForm()
              }}
              className="text-primary-navy hover:text-accent-blue transition-colors duration-300 font-medium"
            >
              Why Etelios
            </a>
            <a 
              href="#"
              onClick={(e) => {
                e.preventDefault()
                scrollToForm()
              }}
              className="text-primary-navy hover:text-accent-blue transition-colors duration-300 font-medium"
            >
              Contact
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-primary-navy hover:text-accent-blue transition-colors duration-300"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden pb-4"
          >
            <div className="flex flex-col space-y-4">
              <a 
                href="#"
                onClick={(e) => {
                  e.preventDefault()
                  scrollToForm()
                  setIsMenuOpen(false)
                }}
                className="text-primary-navy hover:text-accent-blue transition-colors duration-300 font-medium"
              >
                Solutions
              </a>
              <a 
                href="#"
                onClick={(e) => {
                  e.preventDefault()
                  scrollToForm()
                  setIsMenuOpen(false)
                }}
                className="text-primary-navy hover:text-accent-blue transition-colors duration-300 font-medium"
              >
                Why Etelios
              </a>
              <a 
                href="#"
                onClick={(e) => {
                  e.preventDefault()
                  scrollToForm()
                  setIsMenuOpen(false)
                }}
                className="text-primary-navy hover:text-accent-blue transition-colors duration-300 font-medium"
              >
                Contact
              </a>
            </div>
          </motion.div>
        )}
      </div>
    </motion.nav>
  )
}
