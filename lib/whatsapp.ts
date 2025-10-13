// WhatsApp notification service
// In production, integrate with WhatsApp Business API

export interface WhatsAppMessage {
  to: string
  message: string
  type: 'waitlist' | 'contact'
}

export interface NotificationData {
  type: 'waitlist' | 'contact'
  name: string
  email: string
  phone: string
  query?: string
  category?: string
}

class WhatsAppService {
  private static instance: WhatsAppService
  private adminPhone: string
  private apiToken: string

  constructor() {
    this.adminPhone = process.env.ADMIN_PHONE || '+919876543210'
    this.apiToken = process.env.WHATSAPP_TOKEN || ''
  }

  static getInstance(): WhatsAppService {
    if (!WhatsAppService.instance) {
      WhatsAppService.instance = new WhatsAppService()
    }
    return WhatsAppService.instance
  }

  async sendNotification(data: NotificationData): Promise<boolean> {
    try {
      const message = this.formatMessage(data)
      
      // In development, log the message
      if (process.env.NODE_ENV === 'development') {
        console.log('📱 WhatsApp Notification:', message)
        return true
      }

      // In production, send actual WhatsApp message
      return await this.sendWhatsAppMessage({
        to: this.adminPhone,
        message,
        type: data.type
      })
    } catch (error) {
      console.error('WhatsApp notification error:', error)
      return false
    }
  }

  private formatMessage(data: NotificationData): string {
    const timestamp = new Date().toLocaleString('en-IN', {
      timeZone: 'Asia/Kolkata',
      dateStyle: 'medium',
      timeStyle: 'short'
    })

    if (data.type === 'waitlist') {
      return `🎉 *New Waitlist Signup!*

👤 *Name:* ${data.name}
📧 *Email:* ${data.email}
📱 *Phone:* ${data.phone}
🕐 *Time:* ${timestamp}

🚀 *Action Required:* Follow up with welcome email sequence`

    } else {
      return `📧 *New Contact Form Submission!*

👤 *Name:* ${data.name}
📧 *Email:* ${data.email}
📱 *Phone:* ${data.phone}
📂 *Category:* ${data.category || 'General'}
❓ *Query:* ${data.query}
🕐 *Time:* ${timestamp}

⚡ *Action Required:* Respond within 24 hours`
    }
  }

  private async sendWhatsAppMessage(message: WhatsAppMessage): Promise<boolean> {
    try {
      if (!this.apiToken || !process.env.WHATSAPP_PHONE_NUMBER_ID) {
        console.log('WhatsApp API not configured, logging message:', message.message)
        return true
      }

      const response = await fetch(`https://graph.facebook.com/v17.0/${process.env.WHATSAPP_PHONE_NUMBER_ID}/messages`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          messaging_product: 'whatsapp',
          to: message.to,
          type: 'text',
          text: { body: message.message }
        })
      })

      if (!response.ok) {
        const error = await response.text()
        console.error('WhatsApp API error:', error)
        return false
      }

      return true
    } catch (error) {
      console.error('WhatsApp API error:', error)
      return false
    }
  }

  // Send bulk notifications (for marketing campaigns)
  async sendBulkNotification(recipients: string[], message: string): Promise<{ success: number, failed: number }> {
    let success = 0
    let failed = 0

    for (const recipient of recipients) {
      try {
        const result = await this.sendWhatsAppMessage({
          to: recipient,
          message,
          type: 'waitlist'
        })
        
        if (result) success++
        else failed++
      } catch (error) {
        console.error(`Failed to send to ${recipient}:`, error)
        failed++
      }
    }

    return { success, failed }
  }

  // Send launch notification to all waitlist members
  async sendLaunchNotification(waitlistMembers: Array<{ name: string, phone: string }>): Promise<void> {
    const message = `🚀 *Upcapto is Live!*

Hi! Your early access to Upcapto is now available.

🔗 *Get Started:* https://upcapto.com/launch
⏰ *Priority Access:* 72 hours only
🎁 *Special Offer:* 50% off for early members

Welcome to the future of retail! 🎉`

    for (const member of waitlistMembers) {
      if (member.phone) {
        await this.sendWhatsAppMessage({
          to: member.phone,
          message: message.replace('Hi!', `Hi ${member.name}!`),
          type: 'waitlist'
        })
      }
    }
  }
}

export const whatsappService = WhatsAppService.getInstance()
