'use client'

import { motion } from 'framer-motion'
import { scrollToForm } from '@/lib/scrollToForm'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="md:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center space-x-3 mb-4">
                <img 
                  src="/logo.png" 
                  alt="Upcapto Logo" 
                  className="h-10 w-auto"
                  onError={(e) => {
                    // Fallback to gradient icon if logo fails to load
                    e.currentTarget.style.display = 'none';
                    const nextSibling = e.currentTarget.nextElementSibling as HTMLElement;
                    if (nextSibling) {
                      nextSibling.style.display = 'flex';
                    }
                  }}
                />
                <div className="h-10 w-10 bg-accent-gradient rounded-xl flex items-center justify-center shadow-lg hidden">
                  <span className="text-white font-display font-bold text-xl">U</span>
                </div>
              </div>
              <p className="text-gray-400 mb-4">
                The Operating System for Business. Launching December 2025.
              </p>
            </motion.div>
          </div>

          {/* Links */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2">
                <li><a href="#" onClick={(e) => { e.preventDefault(); scrollToForm(); }} className="text-gray-400 hover:text-white transition-colors">About</a></li>
                <li><a href="#" onClick={(e) => { e.preventDefault(); scrollToForm(); }} className="text-gray-400 hover:text-white transition-colors">Contact</a></li>
                <li><a href="#" onClick={(e) => { e.preventDefault(); scrollToForm(); }} className="text-gray-400 hover:text-white transition-colors">Privacy</a></li>
                <li><a href="#" onClick={(e) => { e.preventDefault(); scrollToForm(); }} className="text-gray-400 hover:text-white transition-colors">Terms</a></li>
              </ul>
            </motion.div>
          </div>

          {/* Social */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h3 className="font-semibold mb-4">Follow Us</h3>
              <div className="flex space-x-4">
                <a href="#" onClick={(e) => { e.preventDefault(); scrollToForm(); }} className="text-gray-400 hover:text-white transition-colors">LinkedIn</a>
                <a href="#" onClick={(e) => { e.preventDefault(); scrollToForm(); }} className="text-gray-400 hover:text-white transition-colors">Twitter</a>
                <a href="#" onClick={(e) => { e.preventDefault(); scrollToForm(); }} className="text-gray-400 hover:text-white transition-colors">Instagram</a>
              </div>
            </motion.div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400"
        >
          <p>&copy; 2025 All rights reserved.</p>
        </motion.div>
      </div>
    </footer>
  )
}
