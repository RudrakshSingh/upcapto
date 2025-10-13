'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { emailAutomation, EmailSubscriber } from '@/lib/emailAutomation'

export default function EmailDashboard() {
  const [subscribers, setSubscribers] = useState<EmailSubscriber[]>([])
  const [stats, setStats] = useState({
    total: 0,
    active: 0,
    inactive: 0,
    recent: 0
  })

  useEffect(() => {
    // Load subscribers from the automation service
    const allSubscribers = emailAutomation.getAllSubscribers()
    setSubscribers(allSubscribers)
    
    // Calculate stats
    const now = new Date()
    const recentThreshold = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000) // 7 days ago
    
    setStats({
      total: allSubscribers.length,
      active: allSubscribers.filter(s => s.isActive).length,
      inactive: allSubscribers.filter(s => !s.isActive).length,
      recent: allSubscribers.filter(s => s.subscribedAt >= recentThreshold).length
    })
  }, [])

  const handleUnsubscribe = (email: string) => {
    const success = emailAutomation.unsubscribe(email)
    if (success) {
      setSubscribers(emailAutomation.getAllSubscribers())
      setStats(prev => ({
        ...prev,
        active: prev.active - 1,
        inactive: prev.inactive + 1
      }))
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-display font-bold text-slate-900 mb-4">
            Email Dashboard
          </h1>
          <p className="text-slate-600 text-lg">
            Manage your email subscribers and automation sequences
          </p>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {[
            { label: 'Total Subscribers', value: stats.total, color: 'blue' },
            { label: 'Active', value: stats.active, color: 'green' },
            { label: 'Inactive', value: stats.inactive, color: 'red' },
            { label: 'Recent (7 days)', value: stats.recent, color: 'purple' }
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`bg-white rounded-2xl p-6 shadow-lg border border-slate-200 hover:shadow-xl transition-all duration-300 hover-lift`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-600 text-sm font-medium mb-1">
                    {stat.label}
                  </p>
                  <p className={`text-3xl font-bold ${
                    stat.color === 'blue' ? 'text-upcapto-blue' :
                    stat.color === 'green' ? 'text-upcapto-green' :
                    stat.color === 'red' ? 'text-red-500' :
                    'text-purple-500'
                  }`}>
                    {stat.value}
                  </p>
                </div>
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${
                  stat.color === 'blue' ? 'from-upcapto-blue to-upcapto-teal' :
                  stat.color === 'green' ? 'from-upcapto-green to-upcapto-teal' :
                  stat.color === 'red' ? 'from-red-400 to-red-600' :
                  'from-purple-400 to-purple-600'
                } flex items-center justify-center`}>
                  <span className="text-white text-xl">
                    {stat.color === 'blue' ? '👥' :
                     stat.color === 'green' ? '✅' :
                     stat.color === 'red' ? '❌' : '📈'}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Subscribers Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden"
        >
          <div className="px-6 py-4 border-b border-slate-200">
            <h2 className="text-xl font-display font-bold text-slate-900">
              Subscribers
            </h2>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Phone
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Subscribed
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {subscribers.map((subscriber, index) => (
                  <motion.tr
                    key={subscriber.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="hover:bg-slate-50 transition-colors duration-200"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-gradient-to-br from-upcapto-green to-upcapto-teal rounded-full flex items-center justify-center text-white font-semibold">
                          {subscriber.firstName.charAt(0)}
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-slate-900">
                            {subscriber.firstName} {subscriber.lastName || ''}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                      {subscriber.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                      {subscriber.phone || 'N/A'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        subscriber.isActive 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {subscriber.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                      {subscriber.subscribedAt.toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      {subscriber.isActive && (
                        <button
                          onClick={() => handleUnsubscribe(subscriber.email)}
                          className="text-red-600 hover:text-red-800 font-medium transition-colors duration-200"
                        >
                          Unsubscribe
                        </button>
                      )}
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
