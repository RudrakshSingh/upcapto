import React from 'react'

interface WelcomeEmailProps {
  firstName: string
  daysUntilLaunch: number
}

export const WelcomeEmail: React.FC<WelcomeEmailProps> = ({ firstName, daysUntilLaunch }) => {
  return (
    <div style={{ 
      fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
      maxWidth: '600px',
      margin: '0 auto',
      backgroundColor: '#ffffff',
      borderRadius: '12px',
      overflow: 'hidden',
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)'
    }}>
      {/* Header */}
      <div style={{
        background: 'linear-gradient(135deg, #66CC33, #0099CC, #003366)',
        padding: '40px 30px',
        textAlign: 'center',
        color: 'white'
      }}>
        <div style={{
          width: '60px',
          height: '60px',
          background: 'rgba(255, 255, 255, 0.2)',
          borderRadius: '16px',
          margin: '0 auto 20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '24px',
          fontWeight: 'bold'
        }}>
          U
        </div>
        <h1 style={{ 
          margin: '0 0 10px 0', 
          fontSize: '28px', 
          fontWeight: 'bold',
          letterSpacing: '-0.5px'
        }}>
          🚀 You're on the list for the future of retail
        </h1>
        <p style={{ 
          margin: '0', 
          fontSize: '16px', 
          opacity: 0.9,
          fontWeight: '500'
        }}>
          Welcome aboard!
        </p>
      </div>

      {/* Content */}
      <div style={{ padding: '40px 30px' }}>
        <h2 style={{ 
          fontSize: '24px', 
          fontWeight: 'bold', 
          color: '#1f2937',
          margin: '0 0 20px 0',
          lineHeight: '1.3'
        }}>
          Hi {firstName},
        </h2>

        <p style={{ 
          fontSize: '16px', 
          lineHeight: '1.6', 
          color: '#4b5563',
          margin: '0 0 20px 0'
        }}>
          Welcome aboard! You're now officially part of the Upcapto Early Access Waitlist.
        </p>

        <p style={{ 
          fontSize: '16px', 
          lineHeight: '1.6', 
          color: '#4b5563',
          margin: '0 0 20px 0'
        }}>
          For decades, retailers had to juggle 10+ tools just to keep their business running. We're changing that.
        </p>

        <div style={{
          background: 'linear-gradient(135deg, #f0fdf4, #f0f9ff)',
          padding: '24px',
          borderRadius: '12px',
          border: '1px solid #e5e7eb',
          margin: '24px 0'
        }}>
          <p style={{ 
            fontSize: '16px', 
            fontWeight: '600', 
            color: '#1f2937',
            margin: '0 0 16px 0'
          }}>
            👉 With Upcapto, you'll manage:
          </p>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(2, 1fr)', 
            gap: '8px',
            fontSize: '14px',
            color: '#4b5563'
          }}>
            <div>💰 Accounts</div>
            <div>📦 Inventory</div>
            <div>👩‍💼 HRMS</div>
            <div>🤝 CRM</div>
            <div>🖥️ POS</div>
            <div>📢 Marketing</div>
            <div>📊 Analytics</div>
            <div>🌍 Omnicommerce</div>
            <div>🤖 AI Forecasting</div>
          </div>
          <p style={{ 
            fontSize: '14px', 
            color: '#059669',
            margin: '16px 0 0 0',
            fontWeight: '600'
          }}>
            — all in one easy dashboard.
          </p>
        </div>

        <p style={{ 
          fontSize: '16px', 
          lineHeight: '1.6', 
          color: '#4b5563',
          margin: '0 0 20px 0'
        }}>
          We launch in <strong>{daysUntilLaunch} days</strong>, and as a waitlist member, you'll be the first to try it.
        </p>

        <p style={{ 
          fontSize: '16px', 
          lineHeight: '1.6', 
          color: '#4b5563',
          margin: '0 0 30px 0'
        }}>
          Stay tuned — we'll send you behind-the-scenes updates and sneak peeks.
        </p>

        {/* CTA Button */}
        <div style={{ textAlign: 'center', margin: '30px 0' }}>
          <a href="#" style={{
            display: 'inline-block',
            background: 'linear-gradient(135deg, #66CC33, #0099CC)',
            color: 'white',
            padding: '16px 32px',
            borderRadius: '8px',
            textDecoration: 'none',
            fontWeight: '600',
            fontSize: '16px',
            boxShadow: '0 4px 12px rgba(102, 204, 51, 0.3)',
            transition: 'all 0.3s ease'
          }}>
            Share & Get Priority Access
          </a>
        </div>

        <p style={{ 
          fontSize: '14px', 
          color: '#6b7280',
          margin: '30px 0 0 0',
          textAlign: 'center'
        }}>
          Cheers,<br />
          <strong>Team Upcapto</strong>
        </p>
      </div>

      {/* Footer */}
      <div style={{
        background: '#f8fafc',
        padding: '20px 30px',
        borderTop: '1px solid #e5e7eb',
        textAlign: 'center'
      }}>
        <p style={{ 
          fontSize: '12px', 
          color: '#6b7280',
          margin: '0'
        }}>
          © 2024 Upcapto. All rights reserved.
        </p>
      </div>
    </div>
  )
}
