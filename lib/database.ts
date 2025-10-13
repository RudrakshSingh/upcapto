// Database utility for storing user submissions
// In production, replace with a real database like PostgreSQL, MongoDB, etc.

export interface WaitlistEntry {
  id: string
  name: string
  email: string
  phone: string
  submittedAt: string
  status: 'active' | 'inactive'
  source: string
}

export interface ContactEntry {
  id: string
  name: string
  email: string
  phone: string
  query: string
  category: string
  submittedAt: string
  status: 'new' | 'in_progress' | 'resolved'
  source: string
}

class Database {
  private static instance: Database
  private waitlist: WaitlistEntry[] = []
  private contacts: ContactEntry[] = []

  static getInstance(): Database {
    if (!Database.instance) {
      Database.instance = new Database()
    }
    return Database.instance
  }

  // Waitlist operations
  async addWaitlistEntry(entry: Omit<WaitlistEntry, 'id' | 'submittedAt'>): Promise<WaitlistEntry> {
    const newEntry: WaitlistEntry = {
      ...entry,
      id: Date.now().toString(),
      submittedAt: new Date().toISOString()
    }
    
    this.waitlist.push(newEntry)
    await this.saveToStorage()
    return newEntry
  }

  async getWaitlistEntries(): Promise<WaitlistEntry[]> {
    return this.waitlist
  }

  async getWaitlistEntryById(id: string): Promise<WaitlistEntry | null> {
    return this.waitlist.find(entry => entry.id === id) || null
  }

  async updateWaitlistEntry(id: string, updates: Partial<WaitlistEntry>): Promise<WaitlistEntry | null> {
    const index = this.waitlist.findIndex(entry => entry.id === id)
    if (index === -1) return null

    this.waitlist[index] = { ...this.waitlist[index], ...updates }
    await this.saveToStorage()
    return this.waitlist[index]
  }

  // Contact operations
  async addContactEntry(entry: Omit<ContactEntry, 'id' | 'submittedAt'>): Promise<ContactEntry> {
    const newEntry: ContactEntry = {
      ...entry,
      id: Date.now().toString(),
      submittedAt: new Date().toISOString()
    }
    
    this.contacts.push(newEntry)
    await this.saveToStorage()
    return newEntry
  }

  async getContactEntries(): Promise<ContactEntry[]> {
    return this.contacts
  }

  async getContactEntryById(id: string): Promise<ContactEntry | null> {
    return this.contacts.find(entry => entry.id === id) || null
  }

  async updateContactEntry(id: string, updates: Partial<ContactEntry>): Promise<ContactEntry | null> {
    const index = this.contacts.findIndex(entry => entry.id === id)
    if (index === -1) return null

    this.contacts[index] = { ...this.contacts[index], ...updates }
    await this.saveToStorage()
    return this.contacts[index]
  }

  // Storage operations
  private async saveToStorage(): Promise<void> {
    if (typeof window !== 'undefined') {
      localStorage.setItem('upcapto_waitlist', JSON.stringify(this.waitlist))
      localStorage.setItem('upcapto_contacts', JSON.stringify(this.contacts))
    }
  }

  private async loadFromStorage(): Promise<void> {
    if (typeof window !== 'undefined') {
      const waitlistData = localStorage.getItem('upcapto_waitlist')
      const contactsData = localStorage.getItem('upcapto_contacts')
      
      this.waitlist = waitlistData ? JSON.parse(waitlistData) : []
      this.contacts = contactsData ? JSON.parse(contactsData) : []
    }
  }

  // Initialize database
  async initialize(): Promise<void> {
    await this.loadFromStorage()
  }
}

export const database = Database.getInstance()

// Initialize database on import
if (typeof window !== 'undefined') {
  database.initialize()
}
