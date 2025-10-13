import { emailAutomation, EmailSubscriber } from './emailAutomation'

export interface QueryData {
  id: string
  customerEmail: string
  customerName: string
  customerPhone?: string
  query: string
  category: 'general' | 'technical' | 'billing' | 'support'
  priority: 'low' | 'medium' | 'high'
  status: 'new' | 'in_progress' | 'resolved' | 'closed'
  createdAt: Date
  resolvedAt?: Date
}

export interface AutomationRule {
  id: string
  name: string
  trigger: 'signup' | 'query' | 'email_opened' | 'email_clicked' | 'whatsapp_message'
  conditions: any
  actions: {
    email?: {
      template: string
      delay?: number // in minutes
    }
    whatsapp?: {
      message: string
      delay?: number // in minutes
    }
  }
  isActive: boolean
}

export class AutomationService {
  private queries: QueryData[] = []
  private automationRules: AutomationRule[] = []

  constructor() {
    this.initializeAutomationRules()
  }

  // Initialize default automation rules
  private initializeAutomationRules() {
    this.automationRules = [
      // Email Sequence for Signups
      {
        id: 'welcome_email',
        name: 'Welcome Email (Immediate)',
        trigger: 'signup',
        conditions: {},
        actions: {
          email: {
            template: 'welcome',
            delay: 0 // Immediate
          },
          whatsapp: {
            message: 'Welcome to Upcapto 👋 You\'re on the waitlist for the future of retail. Launching soon. Stay tuned!',
            delay: 0
          }
        },
        isActive: true
      },
      {
        id: 'vision_email',
        name: 'Vision & Hype Email (Day 3)',
        trigger: 'signup',
        conditions: {},
        actions: {
          email: {
            template: 'vision',
            delay: 4320 // 3 days in minutes
          }
        },
        isActive: true
      },
      {
        id: 'teaser_email',
        name: 'Teaser Features Email (Day 10)',
        trigger: 'signup',
        conditions: {},
        actions: {
          email: {
            template: 'teaser',
            delay: 14400 // 10 days in minutes
          },
          whatsapp: {
            message: '👀 Sneak peek: Your entire store in one screen. POS + Accounts + AI Forecasting → all in one. Launch in [X] days.',
            delay: 14400
          }
        },
        isActive: true
      },
      {
        id: 'social_proof_email',
        name: 'Social Proof Email (Day 20)',
        trigger: 'signup',
        conditions: {},
        actions: {
          email: {
            template: 'social_proof',
            delay: 28800 // 20 days in minutes
          }
        },
        isActive: true
      },
      {
        id: 'countdown_email',
        name: 'Launch Countdown Email (1 week before)',
        trigger: 'signup',
        conditions: {},
        actions: {
          email: {
            template: 'countdown',
            delay: 60480 // 42 days (1 week before launch)
          }
        },
        isActive: true
      },
      {
        id: 'launch_email',
        name: 'Launch Day Email',
        trigger: 'signup',
        conditions: {},
        actions: {
          email: {
            template: 'launch',
            delay: 69120 // 48 days (launch day)
          },
          whatsapp: {
            message: '🚀 Upcapto is live! Your early access link: [link]. 72 hours priority access only.',
            delay: 69120
          }
        },
        isActive: true
      },
      // Query Handling
      {
        id: 'query_acknowledgment',
        name: 'Query Acknowledgment',
        trigger: 'query',
        conditions: {},
        actions: {
          email: {
            template: 'query_acknowledgment',
            delay: 0
          },
          whatsapp: {
            message: 'Hi! We received your query and will get back to you within 24 hours. Thanks for your patience! 🙏',
            delay: 0
          }
        },
        isActive: true
      },
      {
        id: 'query_follow_up',
        name: 'Query Follow-up',
        trigger: 'query',
        conditions: {},
        actions: {
          email: {
            template: 'query_follow_up',
            delay: 1440 // 24 hours
          }
        },
        isActive: true
      }
    ]
  }

  // Handle new signup
  async handleSignup(subscriberData: Omit<EmailSubscriber, 'id' | 'subscribedAt' | 'emailSequence' | 'isActive'>) {
    console.log('🚀 New signup detected:', subscriberData.email)
    
    // Add to email automation
    const subscriber = emailAutomation.addSubscriber(subscriberData)
    
    // Trigger signup automations
    await this.triggerAutomations('signup', { subscriber })
    
    return subscriber
  }

  // Handle new query
  async handleQuery(queryData: Omit<QueryData, 'id' | 'createdAt' | 'status'>) {
    console.log('❓ New query detected:', queryData.customerEmail)
    
    const newQuery: QueryData = {
      ...queryData,
      id: this.generateId(),
      createdAt: new Date(),
      status: 'new'
    }
    
    this.queries.push(newQuery)
    
    // Trigger query automations
    await this.triggerAutomations('query', { query: newQuery })
    
    return newQuery
  }

  // Trigger automations based on event
  private async triggerAutomations(trigger: string, data: any) {
    const relevantRules = this.automationRules.filter(
      rule => rule.trigger === trigger && rule.isActive
    )

    for (const rule of relevantRules) {
      await this.executeRule(rule, data)
    }
  }

  // Execute a specific automation rule
  private async executeRule(rule: AutomationRule, data: any) {
    console.log(`⚡ Executing automation: ${rule.name}`)
    
    if (rule.actions.email) {
      await this.sendAutomatedEmail(rule.actions.email, data)
    }
    
    if (rule.actions.whatsapp) {
      await this.sendWhatsAppMessage(rule.actions.whatsapp, data)
    }
  }

  // Send automated email
  private async sendAutomatedEmail(emailAction: any, data: any) {
    const delay = emailAction.delay || 0
    
    setTimeout(async () => {
      console.log(`📧 Sending ${emailAction.template} email to ${data.subscriber?.email || data.query?.customerEmail}`)
      
      // In a real implementation, this would:
      // 1. Render the email template
      // 2. Send via email service (SendGrid, Mailgun, etc.)
      // 3. Track email events
      
      // For now, we'll just log the action
      console.log(`✅ Email sent: ${emailAction.template}`)
    }, delay * 60 * 1000) // Convert minutes to milliseconds
  }

  // Send WhatsApp message
  private async sendWhatsAppMessage(whatsappAction: any, data: any) {
    const delay = whatsappAction.delay || 0
    
    setTimeout(async () => {
      console.log(`💬 Sending WhatsApp message to ${data.subscriber?.phone || data.query?.customerPhone}`)
      
      // In a real implementation, this would:
      // 1. Send via WhatsApp Business API
      // 2. Track message delivery
      // 3. Handle responses
      
      // For now, we'll just log the action
      console.log(`✅ WhatsApp message sent: ${whatsappAction.message}`)
    }, delay * 60 * 1000) // Convert minutes to milliseconds
  }

  // Get all queries
  getAllQueries(): QueryData[] {
    return this.queries
  }

  // Get queries by status
  getQueriesByStatus(status: QueryData['status']): QueryData[] {
    return this.queries.filter(query => query.status === status)
  }

  // Update query status
  updateQueryStatus(queryId: string, status: QueryData['status']) {
    const query = this.queries.find(q => q.id === queryId)
    if (query) {
      query.status = status
      if (status === 'resolved') {
        query.resolvedAt = new Date()
      }
    }
  }

  // Generate unique ID
  private generateId(): string {
    return Math.random().toString(36).substr(2, 9)
  }
}

// Export singleton instance
export const automationService = new AutomationService()
