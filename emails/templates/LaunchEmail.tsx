import React from 'react'

interface LaunchEmailProps {
  firstName: string
  accessLink: string
}

export const LaunchEmail: React.FC<LaunchEmailProps> = ({ firstName, accessLink }) => {
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
          🚀 Upcapto is live. Your early access link inside.
        </h1>
        <p style={{ 
          margin: '0', 
          fontSize: '16px', 
          opacity: 0.9,
          fontWeight: '500'
        }}>
          Today's the day
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
          Today's the day.
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
            🎯 Click below to activate your Early Access Account:
          </h3>
          <div style={{ textAlign: 'center', margin: '20px 0' }}>
            <a href={accessLink} style={{
              display: 'inline-block',
              background: 'linear-gradient(135deg, #66CC33, #0099CC)',
              color: 'white',
              padding: '20px 40px',
              borderRadius: '12px',
              textDecoration: 'none',
              fontWeight: '700',
              fontSize: '18px',
              boxShadow: '0 8px 20px rgba(102, 204, 51, 0.4)',
              transition: 'all 0.3s ease'
            }}>
              👉 Activate My Account Now
            </a>
          </div>
        </div>

        <div style={{
          background: 'linear-gradient(135deg, #fef3c7, #fef7cd)',
          padding: '20px',
          borderRadius: '12px',
          border: '1px solid #f59e0b',
          margin: '20px 0'
        }}>
          <h3 style={{ 
            fontSize: '16px', 
            fontWeight: '600', 
            color: '#92400e',
            margin: '0 0 12px 0'
          }}>
            ⚡ Important: Your spot is reserved for the next 72 hours before we open it to the public.
          </h3>
          <p style={{ 
            fontSize: '14px', 
            color: '#92400e',
            margin: '0'
          }}>
            Don't miss out on your priority access!
          </p>
        </div>

        <p style={{ 
          fontSize: '16px', 
          lineHeight: '1.6', 
          color: '#4b5563',
          margin: '0 0 20px 0'
        }}>
          Welcome to the future of retail. Welcome to Upcapto.
        </p>

        <p style={{ 
          fontSize: '16px', 
          lineHeight: '1.6', 
          color: '#4b5563',
          margin: '0 0 30px 0'
        }}>
          Ready to transform your retail business? Let's get started!
        </p>

        {/* CTA Button */}
        <div style={{ textAlign: 'center', margin: '30px 0' }}>
          <a href={accessLink} style={{
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
            Get Started Now
          </a>
        </div>

        <p style={{ 
          fontSize: '14px', 
          color: '#6b7280',
          margin: '30px 0 0 0',
          textAlign: 'center'
        }}>
          – Shivansh & Team Upcapto
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
