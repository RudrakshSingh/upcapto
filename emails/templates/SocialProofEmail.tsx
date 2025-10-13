import React from 'react'

interface SocialProofEmailProps {
  firstName: string
  totalSubscribers: number
}

export const SocialProofEmail: React.FC<SocialProofEmailProps> = ({ firstName, totalSubscribers }) => {
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
        background: 'linear-gradient(135deg, #003366, #0099CC, #66CC33)',
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
          Who's already waiting with you? 👥
        </h1>
        <p style={{ 
          margin: '0', 
          fontSize: '16px', 
          opacity: 0.9,
          fontWeight: '500'
        }}>
          You're not alone in this journey
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
          You're not alone. Over <strong>{totalSubscribers.toLocaleString()} retailers</strong> have already joined the Upcapto waitlist. From local kiranas to fashion chains — everyone wants the future of retail in one place.
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
            🎯 And here's the best part: you're early.
          </h3>
          <p style={{ 
            fontSize: '16px', 
            lineHeight: '1.6', 
            color: '#4b5563',
            margin: '0 0 16px 0'
          }}>
            That means you'll get:
          </p>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(1, 1fr)', 
            gap: '8px',
            fontSize: '14px',
            color: '#4b5563'
          }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <span style={{ marginRight: '8px', fontSize: '16px' }}>🔥</span>
              <span>Early beta invites</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <span style={{ marginRight: '8px', fontSize: '16px' }}>🔥</span>
              <span>Exclusive launch pricing</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <span style={{ marginRight: '8px', fontSize: '16px' }}>🔥</span>
              <span>Direct input on shaping the platform</span>
            </div>
          </div>
        </div>

        <p style={{ 
          fontSize: '16px', 
          lineHeight: '1.6', 
          color: '#4b5563',
          margin: '0 0 20px 0'
        }}>
          We're not just building software. We're building a community of forward-thinking retailers.
        </p>

        <p style={{ 
          fontSize: '16px', 
          lineHeight: '1.6', 
          color: '#4b5563',
          margin: '0 0 30px 0'
        }}>
          Glad you're in it. 🙌
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
            Join the Community
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
