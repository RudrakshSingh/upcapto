import React from 'react'

interface QueryFollowUpEmailProps {
  customerName: string
  query: string
  daysSinceQuery: number
}

export const QueryFollowUpEmail: React.FC<QueryFollowUpEmailProps> = ({ 
  customerName, 
  query,
  daysSinceQuery 
}) => {
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
        background: 'linear-gradient(135deg, #0099CC, #66CC33, #003366)',
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
          Following Up on Your Question 📞
        </h1>
        <p style={{ 
          margin: '0', 
          fontSize: '16px', 
          opacity: 0.9,
          fontWeight: '500'
        }}>
          We're still working on your inquiry
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
          Hi {customerName},
        </h2>

        <p style={{ 
          fontSize: '16px', 
          lineHeight: '1.6', 
          color: '#4b5563',
          margin: '0 0 20px 0'
        }}>
          We wanted to follow up on your question from {daysSinceQuery} day{daysSinceQuery > 1 ? 's' : ''} ago. Our team is still working on providing you with a comprehensive answer.
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
            🔍 Your Original Question:
          </h3>
          <p style={{ 
            fontSize: '16px', 
            lineHeight: '1.6', 
            color: '#4b5563',
            margin: '0 0 16px 0',
            fontStyle: 'italic'
          }}>
            "{query}"
          </p>
        </div>

        <p style={{ 
          fontSize: '16px', 
          lineHeight: '1.6', 
          color: '#4b5563',
          margin: '0 0 20px 0'
        }}>
          <strong>Why the delay?</strong> We want to give you the most accurate and helpful answer possible. Sometimes that means consulting with our technical team or gathering additional information.
        </p>

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
            ⚡ Need Immediate Help?
          </h3>
          <p style={{ 
            fontSize: '14px', 
            color: '#92400e',
            margin: '0'
          }}>
            If your question is urgent, please reach out to us directly on WhatsApp at +91 98765 43210 for instant support.
          </p>
        </div>

        <p style={{ 
          fontSize: '16px', 
          lineHeight: '1.6', 
          color: '#4b5563',
          margin: '0 0 30px 0'
        }}>
          We appreciate your patience and will have a detailed response for you soon. In the meantime, feel free to explore more about Upcapto!
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
            Learn More About Upcapto
          </a>
        </div>

        <p style={{ 
          fontSize: '14px', 
          color: '#6b7280',
          margin: '30px 0 0 0',
          textAlign: 'center'
        }}>
          Thanks for your patience,<br />
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
