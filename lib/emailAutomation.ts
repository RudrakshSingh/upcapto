import { WelcomeEmail } from '../emails/templates/WelcomeEmail'
import { VisionEmail } from '../emails/templates/VisionEmail'

export interface EmailSubscriber {
  id: string
  email: string
  firstName: string
  lastName?: string
  phone?: string
  subscribedAt: Date
  lastEmailSent?: Date
  emailSequence: number
  isActive: boolean
}

export interface EmailSequence {
  id: number
  name: string
  delay: number // in days
  template: React.ComponentType<any>
  subject: string
  isActive: boolean
}

export const emailSequences: EmailSequence[] = [
  {
    id: 1,
    name: 'Welcome Email',
    delay: 0,
    template: WelcomeEmail,
    subject: 'Welcome to Upcapto! 🚀 You\'re officially on the waitlist',
    isActive: true
  },
  {
    id: 2,
    name: 'Vision Email',
    delay: 3,
    template: VisionEmail,
    subject: 'Why we built Upcapto 💡 The story behind the platform',
    isActive: true
  }
]

export class EmailAutomationService {
  private subscribers: EmailSubscriber[] = []
  private emailQueue: Array<{
    subscriber: EmailSubscriber
    sequence: EmailSequence
    scheduledFor: Date
  }> = []

  // Add new subscriber to the system
  addSubscriber(subscriberData: Omit<EmailSubscriber, 'id' | 'subscribedAt' | 'emailSequence' | 'isActive'>): EmailSubscriber {
    const newSubscriber: EmailSubscriber = {
      ...subscriberData,
      id: this.generateId(),
      subscribedAt: new Date(),
      emailSequence: 0,
      isActive: true
    }

    this.subscribers.push(newSubscriber)
    
    // Schedule welcome email immediately
    this.scheduleEmail(newSubscriber, emailSequences[0])
    
    return newSubscriber
  }

  // Schedule an email for a subscriber
  private scheduleEmail(subscriber: EmailSubscriber, sequence: EmailSequence): void {
    const scheduledFor = new Date()
    scheduledFor.setDate(scheduledFor.getDate() + sequence.delay)

    this.emailQueue.push({
      subscriber,
      sequence,
      scheduledFor
    })

    // Update subscriber's sequence
    subscriber.emailSequence = sequence.id
    subscriber.lastEmailSent = new Date()
  }

  // Process the email queue (should be called by a cron job)
  async processEmailQueue(): Promise<void> {
    const now = new Date()
    const emailsToSend = this.emailQueue.filter(
      email => email.scheduledFor <= now && email.subscriber.isActive
    )

    for (const email of emailsToSend) {
      try {
        await this.sendEmail(email.subscriber, email.sequence)
        
        // Remove from queue
        this.emailQueue = this.emailQueue.filter(e => e !== email)
        
        // Schedule next email if available
        const nextSequence = emailSequences.find(s => s.id === email.sequence.id + 1)
        if (nextSequence && nextSequence.isActive) {
          this.scheduleEmail(email.subscriber, nextSequence)
        }
      } catch (error) {
        console.error('Failed to send email:', error)
      }
    }
  }

  // Send an email to a subscriber
  private async sendEmail(subscriber: EmailSubscriber, sequence: EmailSequence): Promise<void> {
    // In a real implementation, this would integrate with an email service like SendGrid, Mailgun, etc.
    console.log(`Sending ${sequence.name} to ${subscriber.email}`)
    
    // For now, we'll just log the email content
    console.log('Email sequence:', sequence.name)
    console.log('Subscriber:', subscriber.email)
  }

  // Calculate days until launch
  private calculateDaysUntilLaunch(): number {
    const launchDate = new Date('2025-07-01') // July 1, 2025
    const now = new Date()
    const diffTime = launchDate.getTime() - now.getTime()
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  }

  // Generate unique ID
  private generateId(): string {
    return Math.random().toString(36).substr(2, 9)
  }

  // Get subscriber by email
  getSubscriber(email: string): EmailSubscriber | undefined {
    return this.subscribers.find(s => s.email === email)
  }

  // Get all subscribers
  getAllSubscribers(): EmailSubscriber[] {
    return this.subscribers
  }

  // Unsubscribe a user
  unsubscribe(email: string): boolean {
    const subscriber = this.getSubscriber(email)
    if (subscriber) {
      subscriber.isActive = false
      return true
    }
    return false
  }
}

// Export a singleton instance
export const emailAutomation = new EmailAutomationService()
