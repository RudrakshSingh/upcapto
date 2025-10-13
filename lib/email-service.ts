// Production email service with SendGrid integration
import sgMail from '@sendgrid/mail'

export interface EmailTemplate {
  to: string
  from: string
  subject: string
  html: string
  text?: string
}

export interface EmailData {
  name: string
  email: string
  phone?: string
  [key: string]: any
}

class EmailService {
  private static instance: EmailService
  private isInitialized: boolean = false

  constructor() {
    if (process.env.SENDGRID_API_KEY) {
      sgMail.setApiKey(process.env.SENDGRID_API_KEY)
      this.isInitialized = true
    }
  }

  static getInstance(): EmailService {
    if (!EmailService.instance) {
      EmailService.instance = new EmailService()
    }
    return EmailService.instance
  }

  private async sendEmail(template: EmailTemplate): Promise<boolean> {
    if (!this.isInitialized) {
      console.log('Email service not initialized, logging email:', template.subject)
      return true
    }

    try {
      await sgMail.send(template)
      return true
    } catch (error) {
      console.error('Email sending failed:', error)
      return false
    }
  }

  // Welcome email for waitlist signup
  async sendWelcomeEmail(data: EmailData): Promise<boolean> {
    const template: EmailTemplate = {
      to: data.email,
      from: `${process.env.FROM_NAME || 'Upcapto Team'} <${process.env.FROM_EMAIL || 'noreply@upcapto.com'}>`,
      subject: '🚀 Welcome to Upcapto - You\'re on the list!',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Welcome to Upcapto</title>
        </head>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #0072CE; font-size: 28px; margin-bottom: 10px;">Welcome to Upcapto!</h1>
            <p style="font-size: 18px; color: #666;">The Operating System for Retail</p>
          </div>
          
          <div style="background: linear-gradient(135deg, #0072CE, #00C48C); color: white; padding: 30px; border-radius: 10px; margin-bottom: 30px;">
            <h2 style="margin: 0 0 15px 0; font-size: 24px;">Hi ${data.name}! 👋</h2>
            <p style="margin: 0; font-size: 16px;">You're now officially part of the Upcapto Early Access Waitlist.</p>
          </div>
          
          <div style="background: #f8f9fa; padding: 25px; border-radius: 10px; margin-bottom: 30px;">
            <h3 style="color: #0072CE; margin-top: 0;">What's Next?</h3>
            <ul style="padding-left: 20px;">
              <li>📧 You'll receive exclusive updates about our progress</li>
              <li>🎁 Early access to special launch offers</li>
              <li>🚀 Priority access when we launch in July 2025</li>
              <li>💬 Direct communication with our team</li>
            </ul>
          </div>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="https://upcapto.com" style="background: #0072CE; color: white; padding: 15px 30px; text-decoration: none; border-radius: 25px; font-weight: bold; display: inline-block;">
              Visit Our Website
            </a>
          </div>
          
          <div style="border-top: 1px solid #eee; padding-top: 20px; margin-top: 30px; text-align: center; color: #666; font-size: 14px;">
            <p>Thanks for joining us on this journey!</p>
            <p><strong>The Upcapto Team</strong></p>
            <p>📧 support@upcapto.com | 📱 +91 98765 43210</p>
          </div>
        </body>
        </html>
      `,
      text: `
        Welcome to Upcapto!
        
        Hi ${data.name},
        
        You're now officially part of the Upcapto Early Access Waitlist.
        
        What's Next?
        - You'll receive exclusive updates about our progress
        - Early access to special launch offers
        - Priority access when we launch in July 2025
        - Direct communication with our team
        
        Thanks for joining us on this journey!
        
        The Upcapto Team
        support@upcapto.com | +91 98765 43210
      `
    }

    return await this.sendEmail(template)
  }

  // Contact form acknowledgment
  async sendContactAcknowledgment(data: EmailData): Promise<boolean> {
    const template: EmailTemplate = {
      to: data.email,
      from: `${process.env.FROM_NAME || 'Upcapto Team'} <${process.env.FROM_EMAIL || 'noreply@upcapto.com'}>`,
      subject: '✅ We received your message - Upcapto Support',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Message Received</title>
        </head>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #0072CE; font-size: 28px; margin-bottom: 10px;">Message Received! ✅</h1>
            <p style="font-size: 18px; color: #666;">We got your message and we're on it</p>
          </div>
          
          <div style="background: linear-gradient(135deg, #0072CE, #00C48C); color: white; padding: 30px; border-radius: 10px; margin-bottom: 30px;">
            <h2 style="margin: 0 0 15px 0; font-size: 24px;">Hi ${data.name}! 👋</h2>
            <p style="margin: 0; font-size: 16px;">Thank you for reaching out to us. We've received your message and our team will get back to you within 24 hours.</p>
          </div>
          
          <div style="background: #f8f9fa; padding: 25px; border-radius: 10px; margin-bottom: 30px;">
            <h3 style="color: #0072CE; margin-top: 0;">What happens next?</h3>
            <ul style="padding-left: 20px;">
              <li>📧 Our team will review your message</li>
              <li>⏰ We'll respond within 24 hours</li>
              <li>💬 You'll receive a detailed response via email</li>
              <li>📱 We may also reach out via WhatsApp if needed</li>
            </ul>
          </div>
          
          <div style="border-top: 1px solid #eee; padding-top: 20px; margin-top: 30px; text-align: center; color: #666; font-size: 14px;">
            <p>Need immediate assistance?</p>
            <p><strong>📧 support@upcapto.com | 📱 +91 98765 43210</strong></p>
            <p>Thanks for your patience!</p>
            <p><strong>The Upcapto Team</strong></p>
          </div>
        </body>
        </html>
      `
    }

    return await this.sendEmail(template)
  }

  // Launch notification
  async sendLaunchNotification(data: EmailData): Promise<boolean> {
    const template: EmailTemplate = {
      to: data.email,
      from: `${process.env.FROM_NAME || 'Upcapto Team'} <${process.env.FROM_EMAIL || 'noreply@upcapto.com'}>`,
      subject: '🚀 Upcapto is Live! Your early access is here',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Upcapto is Live!</title>
        </head>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #0072CE; font-size: 32px; margin-bottom: 10px;">🚀 Upcapto is Live!</h1>
            <p style="font-size: 20px; color: #666;">Your early access is here</p>
          </div>
          
          <div style="background: linear-gradient(135deg, #0072CE, #00C48C); color: white; padding: 40px; border-radius: 10px; margin-bottom: 30px; text-align: center;">
            <h2 style="margin: 0 0 15px 0; font-size: 28px;">Hi ${data.name}! 🎉</h2>
            <p style="margin: 0; font-size: 18px;">The wait is over! Upcapto is now live and you have exclusive early access.</p>
          </div>
          
          <div style="background: #f8f9fa; padding: 25px; border-radius: 10px; margin-bottom: 30px;">
            <h3 style="color: #0072CE; margin-top: 0;">Your Early Access Benefits:</h3>
            <ul style="padding-left: 20px;">
              <li>🎁 50% off for early members (limited time)</li>
              <li>⚡ Priority support and onboarding</li>
              <li>🔧 Direct input on product features</li>
              <li>📊 Exclusive analytics and insights</li>
            </ul>
          </div>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="https://upcapto.com/launch" style="background: #0072CE; color: white; padding: 20px 40px; text-decoration: none; border-radius: 25px; font-weight: bold; display: inline-block; font-size: 18px;">
              🚀 Get Started Now
            </a>
          </div>
          
          <div style="background: #fff3cd; border: 1px solid #ffeaa7; padding: 20px; border-radius: 10px; margin: 30px 0;">
            <p style="margin: 0; color: #856404; font-weight: bold;">⏰ Limited Time Offer</p>
            <p style="margin: 5px 0 0 0; color: #856404;">This early access is available for 72 hours only. Don't miss out!</p>
          </div>
          
          <div style="border-top: 1px solid #eee; padding-top: 20px; margin-top: 30px; text-align: center; color: #666; font-size: 14px;">
            <p>Welcome to the future of retail management!</p>
            <p><strong>The Upcapto Team</strong></p>
            <p>📧 support@upcapto.com | 📱 +91 98765 43210</p>
          </div>
        </body>
        </html>
      `
    }

    return await this.sendEmail(template)
  }

  // Bulk email for announcements
  async sendBulkEmail(recipients: EmailData[], subject: string, html: string): Promise<{ success: number; failed: number }> {
    let success = 0
    let failed = 0

    for (const recipient of recipients) {
      try {
        const template: EmailTemplate = {
          to: recipient.email,
          from: `${process.env.FROM_NAME || 'Upcapto Team'} <${process.env.FROM_EMAIL || 'noreply@upcapto.com'}>`,
          subject: subject.replace('{name}', recipient.name),
          html: html.replace(/{name}/g, recipient.name)
        }

        const result = await this.sendEmail(template)
        if (result) success++
        else failed++
      } catch (error) {
        console.error(`Failed to send email to ${recipient.email}:`, error)
        failed++
      }
    }

    return { success, failed }
  }
}

export const emailService = EmailService.getInstance()
