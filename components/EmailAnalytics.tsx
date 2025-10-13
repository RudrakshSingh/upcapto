'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

interface EmailStats {
  totalSent: number
  openRate: number
  clickRate: number
  unsubscribeRate: number
  bounceRate: number
}

interface EmailCampaign {
  id: string
  name: string
  sent: number
  opened: number
  clicked: number
  unsubscribed: number
  bounced: number
  sentAt: Date
}

export default function EmailAnalytics() {
  const [stats, setStats] = useState<EmailStats>({
    totalSent: 0,
    openRate: 0,
    clickRate: 0,
    unsubscribeRate: 0,
    bounceRate: 0
  })

  const [campaigns, setCampaigns] = useState<EmailCampaign[]>([])
  const [selectedPeriod, setSelectedPeriod] = useState<'7d' | '30d' | '90d'>('30d')

  useEffect(() => {
    // Simulate loading analytics data
    const mockStats: EmailStats = {
      totalSent: 1250,
      openRate: 68.5,
      clickRate: 12.3,
      unsubscribeRate: 0.8,
      bounceRate: 2.1
    }

    const mockCampaigns: EmailCampaign[] = [
      {
        id: '1',
        name: 'Welcome Email',
        sent: 500,
        opened: 350,
        clicked: 45,
        unsubscribed: 2,
        bounced: 8,
        sentAt: new Date('2024-01-15')
      },
      {
        id: '2',
        name: 'Vision Email',
        sent: 450,
        opened: 280,
        clicked: 35,
        unsubscribed: 1,
        bounced: 5,
        sentAt: new Date('2024-01-18')
      }
    ]

    setStats(mockStats)
    setCampaigns(mockCampaigns)
  }, [selectedPeriod])

  const formatNumber = (num: number) => {
    return num.toLocaleString()
  }

  const formatPercentage = (num: number) => {
    return `${num.toFixed(1)}%`
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-display font-bold text-slate-900">
            Email Analytics
          </h2>
          <p className="text-slate-600">
            Track your email performance and engagement
          </p>
        </div>
        
        <div className="flex space-x-2">
          {(['7d', '30d', '90d'] as const).map((period) => (
            <button
              key={period}
              onClick={() => setSelectedPeriod(period)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                selectedPeriod === period
                  ? 'bg-gradient-to-r from-upcapto-green to-upcapto-teal text-white shadow-lg'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {period === '7d' ? '7 days' : period === '30d' ? '30 days' : '90 days'}
            </button>
          ))}
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        {[
          { label: 'Total Sent', value: formatNumber(stats.totalSent), color: 'blue', icon: '📧' },
          { label: 'Open Rate', value: formatPercentage(stats.openRate), color: 'green', icon: '👁️' },
          { label: 'Click Rate', value: formatPercentage(stats.clickRate), color: 'purple', icon: '🖱️' },
          { label: 'Unsubscribe Rate', value: formatPercentage(stats.unsubscribeRate), color: 'red', icon: '❌' },
          { label: 'Bounce Rate', value: formatPercentage(stats.bounceRate), color: 'orange', icon: '📤' }
        ].map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200 hover:shadow-xl transition-all duration-300 hover-lift"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${
                stat.color === 'blue' ? 'from-upcapto-blue to-upcapto-teal' :
                stat.color === 'green' ? 'from-upcapto-green to-upcapto-teal' :
                stat.color === 'purple' ? 'from-purple-400 to-purple-600' :
                stat.color === 'red' ? 'from-red-400 to-red-600' :
                'from-orange-400 to-orange-600'
              } flex items-center justify-center`}>
                <span className="text-white text-xl">{stat.icon}</span>
              </div>
            </div>
            <div>
              <p className="text-slate-600 text-sm font-medium mb-1">
                {stat.label}
              </p>
              <p className={`text-2xl font-bold ${
                stat.color === 'blue' ? 'text-upcapto-blue' :
                stat.color === 'green' ? 'text-upcapto-green' :
                stat.color === 'purple' ? 'text-purple-600' :
                stat.color === 'red' ? 'text-red-600' :
                'text-orange-600'
              }`}>
                {stat.value}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Campaigns Table */}
      <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-200">
          <h3 className="text-lg font-display font-bold text-slate-900">
            Campaign Performance
          </h3>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Campaign
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Sent
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Opened
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Clicked
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Open Rate
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Click Rate
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {campaigns.map((campaign, index) => (
                <motion.tr
                  key={campaign.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="hover:bg-slate-50 transition-colors duration-200"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-slate-900">
                      {campaign.name}
                    </div>
                    <div className="text-sm text-slate-500">
                      {campaign.sentAt.toLocaleDateString()}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                    {formatNumber(campaign.sent)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                    {formatNumber(campaign.opened)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                    {formatNumber(campaign.clicked)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                      {((campaign.opened / campaign.sent) * 100).toFixed(1)}%
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-purple-100 text-purple-800">
                      {((campaign.clicked / campaign.sent) * 100).toFixed(1)}%
                    </span>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
