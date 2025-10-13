'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'

interface WhatsAppMessage {
  id: string
  text: string
  timestamp: Date
  isFromUser: boolean
}

export default function WhatsAppIntegration() {
  const [messages, setMessages] = useState<WhatsAppMessage[]>([
    {
      id: '1',
      text: 'Hi! Welcome to Etelios. I\'m here to help you get started. What would you like to know?',
      timestamp: new Date(),
      isFromUser: false
    }
  ])
  const [newMessage, setNewMessage] = useState('')
  const [isTyping, setIsTyping] = useState(false)

  const handleSendMessage = () => {
    if (!newMessage.trim()) return

    const userMessage: WhatsAppMessage = {
      id: Date.now().toString(),
      text: newMessage,
      timestamp: new Date(),
      isFromUser: true
    }

    setMessages(prev => [...prev, userMessage])
    setNewMessage('')
    setIsTyping(true)

    // Simulate bot response
    setTimeout(() => {
      const botResponse: WhatsAppMessage = {
        id: (Date.now() + 1).toString(),
        text: 'Thanks for your message! I\'ll get back to you soon with more information about Etelios.',
        timestamp: new Date(),
        isFromUser: false
      }
      setMessages(prev => [...prev, botResponse])
      setIsTyping(false)
    }, 2000)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <div className="max-w-md mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-upcapto-green to-upcapto-teal p-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
            <span className="text-white text-xl">💬</span>
          </div>
          <div>
            <h3 className="text-white font-semibold">Etelios Support</h3>
            <p className="text-white/80 text-sm">Online now</p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="h-96 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <motion.div
            key={message.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex ${message.isFromUser ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`max-w-xs px-4 py-2 rounded-2xl ${
              message.isFromUser 
                ? 'bg-gradient-to-r from-upcapto-green to-upcapto-teal text-white' 
                : 'bg-slate-100 text-slate-800'
            }`}>
              <p className="text-sm">{message.text}</p>
              <p className={`text-xs mt-1 ${
                message.isFromUser ? 'text-white/70' : 'text-slate-500'
              }`}>
                {message.timestamp.toLocaleTimeString([], { 
                  hour: '2-digit', 
                  minute: '2-digit' 
                })}
              </p>
            </div>
          </motion.div>
        ))}

        {isTyping && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex justify-start"
          >
            <div className="bg-slate-100 text-slate-800 px-4 py-2 rounded-2xl">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Input */}
      <div className="p-4 border-t border-slate-200">
        <div className="flex space-x-2">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your message..."
            className="flex-1 px-4 py-2 border border-slate-300 rounded-full focus:outline-none focus:ring-2 focus:ring-upcapto-green focus:border-transparent"
          />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleSendMessage}
            className="bg-gradient-to-r from-upcapto-green to-upcapto-teal text-white px-4 py-2 rounded-full hover:shadow-lg transition-all duration-200"
          >
            Send
          </motion.button>
        </div>
      </div>
    </div>
  )
}
