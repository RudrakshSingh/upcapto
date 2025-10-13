import React from 'react'

interface CountdownEmailProps {
  firstName: string
  daysUntilLaunch: number
}

export const CountdownEmail: React.FC<CountdownEmailProps> = ({ firstName, daysUntilLaunch }) => {
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
          {daysUntilLaunch} days until retail gets an upgrade ⏳
        </h1>
        <p style={{ 
          margin: '0', 
          fontSize: '16px', 
          opacity: 0.9,
          fontWeight: '500'
        }}>
          The wait is almost over
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
          The wait is almost over. In just {daysUntilLaunch} days, you'll get first access to Upcapto.
        </p>

        <div style={{
          background: 'linear-gradient(135deg, #f0fdf4, #f0f9ff)',
          padding: '24px',
          borderRadius: '12px',
          border: '1px solid #e5e7eb',
          margin: '24px 0'
        }}>
          <h3 style={{ 
            fontSize: '18px', 
            fontWeight: '600', 
            color: '#1f2937',
            margin: '0 0 16px 0'
          }}>
            🎯 What to expect:
          </h3>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(1, 1fr)', 
            gap: '12px',
            fontSize: '14px',
            color: '#4b5563'
          }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <span style={{ marginRight: '8px', fontSize: '16px' }}>🔗</span>
              <span>Priority login link for waitlist members</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <span style={{ marginRight: '8px', fontSize: '16px' }}>📹</span>
              <span>Walkthrough demo video</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <span style={{ marginRight: '8px', fontSize: '16px' }}>📝</span>
              <span>Exclusive founder's note on how to maximize Upcapto for your store</span>
            </div>
          </div>
        </div>

        <p style={{ 
          fontSize: '16px', 
          lineHeight: '1.6', 
          color: '#4b5563',
          margin: '0 0 20px 0'
        }}>
          Keep an eye on your inbox. The future of retail is about to land there. 🚀
        </p>

        <p style={{ 
          fontSize: '16px', 
          lineHeight: '1.6', 
          color: '#4b5563',
          margin: '0 0 30px 0'
        }}>
          Get ready to transform your retail business!
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
            Get Ready for Launch
          </a>
        </div>

        <p style={{ 
          fontSize: '14px', 
          color: '#6b7280',
          margin: '30px 0 0 0',
          textAlign: 'center'
        }}>
          – Team Upcapto
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
