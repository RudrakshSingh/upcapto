// Production MongoDB service with connection pooling and error handling
import { MongoClient, Db, Collection, MongoError } from 'mongodb'

export interface WaitlistEntry {
  _id?: string
  name: string
  email: string
  phone: string
  status: 'active' | 'inactive'
  source: string
  createdAt: Date
  updatedAt: Date
}

export interface ContactEntry {
  _id?: string
  name: string
  email: string
  phone: string
  query: string
  category: string
  status: 'new' | 'in_progress' | 'resolved'
  source: string
  createdAt: Date
  updatedAt: Date
}

export interface DatabaseStats {
  waitlist: {
    total: number
    active: number
    inactive: number
  }
  contacts: {
    total: number
    new: number
    in_progress: number
    resolved: number
  }
}

class MongoDBService {
  private static instance: MongoDBService
  private client: MongoClient | null = null
  private db: Db | null = null
  private isConnected: boolean = false
  private connectionPromise: Promise<void> | null = null

  constructor() {
    // Don't connect immediately - wait for first use
  }

  static getInstance(): MongoDBService {
    if (!MongoDBService.instance) {
      MongoDBService.instance = new MongoDBService()
    }
    return MongoDBService.instance
  }

  private async connect(): Promise<void> {
    if (this.connectionPromise) {
      return this.connectionPromise
    }

    this.connectionPromise = this._connect()
    return this.connectionPromise
  }

  private async _connect(): Promise<void> {
    try {
      const mongoUri = process.env.MONGODB_URI
      if (!mongoUri) {
        // During build time or when MONGODB_URI is not set, don't throw error
        console.log('⚠️ MongoDB connection skipped - MONGODB_URI not set')
        return
      }

      this.client = new MongoClient(mongoUri, {
        maxPoolSize: parseInt(process.env.MONGODB_POOL_SIZE || '10'),
        serverSelectionTimeoutMS: parseInt(process.env.MONGODB_TIMEOUT || '10000'),
        socketTimeoutMS: parseInt(process.env.MONGODB_SOCKET_TIMEOUT || '45000'),
        connectTimeoutMS: parseInt(process.env.MONGODB_CONNECT_TIMEOUT || '10000'),
        retryWrites: true,
        retryReads: true,
        w: 'majority',
        compressors: ['zlib'],
        zlibCompressionLevel: 6,
      })

      await this.client.connect()
      this.db = this.client.db(process.env.MONGODB_DATABASE || 'upcapto')
      this.isConnected = true

      // Create indexes for better performance
      await this.createIndexes()
      
      console.log('✅ MongoDB connected successfully')
    } catch (error) {
      console.error('❌ MongoDB connection failed:', error)
      this.isConnected = false
      throw error
    }
  }

  private async createIndexes(): Promise<void> {
    if (!this.db) return

    try {
      // Waitlist collection indexes
      await this.db.collection('waitlist').createIndex({ email: 1 }, { unique: true })
      await this.db.collection('waitlist').createIndex({ status: 1 })
      await this.db.collection('waitlist').createIndex({ createdAt: -1 })
      await this.db.collection('waitlist').createIndex({ source: 1 })

      // Contact collection indexes
      await this.db.collection('contacts').createIndex({ email: 1 })
      await this.db.collection('contacts').createIndex({ status: 1 })
      await this.db.collection('contacts').createIndex({ category: 1 })
      await this.db.collection('contacts').createIndex({ createdAt: -1 })
      await this.db.collection('contacts').createIndex({ source: 1 })

      console.log('✅ MongoDB indexes created successfully')
    } catch (error) {
      console.error('❌ Failed to create indexes:', error)
      // Don't throw here as the app can still function without indexes
    }
  }

  private async ensureConnection(): Promise<void> {
    if (!this.isConnected || !this.client || !this.db) {
      await this.connect()
    }
    
    // If still not connected (e.g., during build time), throw a more descriptive error
    if (!this.isConnected || !this.client || !this.db) {
      throw new Error('Database not available - MONGODB_URI environment variable may not be set')
    }
  }

  // Waitlist operations
  async addWaitlistEntry(entry: Omit<WaitlistEntry, '_id' | 'createdAt' | 'updatedAt'>): Promise<WaitlistEntry> {
    await this.ensureConnection()
    if (!this.db) throw new Error('Database not connected')

    try {
      const now = new Date()
      const newEntry = {
        ...entry,
        createdAt: now,
        updatedAt: now
      }

      const result = await this.db.collection('waitlist').insertOne(newEntry)
      
      return {
        ...newEntry,
        _id: result.insertedId.toString()
      } as WaitlistEntry
    } catch (error) {
      if (error instanceof MongoError && error.code === 11000) {
        throw new Error('Email already exists in waitlist')
      }
      console.error('Failed to add waitlist entry:', error)
      throw new Error('Failed to add waitlist entry')
    }
  }

  async getWaitlistEntries(limit: number = 100, skip: number = 0): Promise<WaitlistEntry[]> {
    await this.ensureConnection()
    if (!this.db) throw new Error('Database not connected')

    try {
      const entries = await this.db.collection('waitlist')
        .find({})
        .sort({ createdAt: -1 })
        .limit(limit)
        .skip(skip)
        .toArray()

      return entries.map(entry => ({
        ...entry,
        _id: entry._id.toString()
      })) as WaitlistEntry[]
    } catch (error) {
      console.error('Failed to get waitlist entries:', error)
      throw new Error('Failed to get waitlist entries')
    }
  }

  async getWaitlistEntryById(id: string): Promise<WaitlistEntry | null> {
    await this.ensureConnection()
    if (!this.db) throw new Error('Database not connected')

    try {
      const { ObjectId } = await import('mongodb')
      const entry = await this.db.collection('waitlist').findOne({ _id: new ObjectId(id) })
      
      if (!entry) return null

      return {
        ...entry,
        _id: entry._id.toString()
      } as WaitlistEntry
    } catch (error) {
      console.error('Failed to get waitlist entry:', error)
      throw new Error('Failed to get waitlist entry')
    }
  }

  async updateWaitlistEntry(id: string, updates: Partial<WaitlistEntry>): Promise<WaitlistEntry | null> {
    await this.ensureConnection()
    if (!this.db) throw new Error('Database not connected')

    try {
      const { ObjectId } = await import('mongodb')
      const updateData = {
        ...updates,
        updatedAt: new Date()
      }

      const result = await this.db.collection('waitlist').findOneAndUpdate(
        { _id: new ObjectId(id) },
        { $set: updateData },
        { returnDocument: 'after' }
      )

      if (!result) return null

      return {
        ...result,
        _id: result._id.toString()
      } as WaitlistEntry
    } catch (error) {
      console.error('Failed to update waitlist entry:', error)
      throw new Error('Failed to update waitlist entry')
    }
  }

  // Contact operations
  async addContactEntry(entry: Omit<ContactEntry, '_id' | 'createdAt' | 'updatedAt'>): Promise<ContactEntry> {
    await this.ensureConnection()
    if (!this.db) throw new Error('Database not connected')

    try {
      const now = new Date()
      const newEntry = {
        ...entry,
        createdAt: now,
        updatedAt: now
      }

      const result = await this.db.collection('contacts').insertOne(newEntry)
      
      return {
        ...newEntry,
        _id: result.insertedId.toString()
      } as ContactEntry
    } catch (error) {
      console.error('Failed to add contact entry:', error)
      throw new Error('Failed to add contact entry')
    }
  }

  async getContactEntries(limit: number = 100, skip: number = 0): Promise<ContactEntry[]> {
    await this.ensureConnection()
    if (!this.db) throw new Error('Database not connected')

    try {
      const entries = await this.db.collection('contacts')
        .find({})
        .sort({ createdAt: -1 })
        .limit(limit)
        .skip(skip)
        .toArray()

      return entries.map(entry => ({
        ...entry,
        _id: entry._id.toString()
      })) as ContactEntry[]
    } catch (error) {
      console.error('Failed to get contact entries:', error)
      throw new Error('Failed to get contact entries')
    }
  }

  async getContactEntryById(id: string): Promise<ContactEntry | null> {
    await this.ensureConnection()
    if (!this.db) throw new Error('Database not connected')

    try {
      const { ObjectId } = await import('mongodb')
      const entry = await this.db.collection('contacts').findOne({ _id: new ObjectId(id) })
      
      if (!entry) return null

      return {
        ...entry,
        _id: entry._id.toString()
      } as ContactEntry
    } catch (error) {
      console.error('Failed to get contact entry:', error)
      throw new Error('Failed to get contact entry')
    }
  }

  async updateContactEntry(id: string, updates: Partial<ContactEntry>): Promise<ContactEntry | null> {
    await this.ensureConnection()
    if (!this.db) throw new Error('Database not connected')

    try {
      const { ObjectId } = await import('mongodb')
      const updateData = {
        ...updates,
        updatedAt: new Date()
      }

      const result = await this.db.collection('contacts').findOneAndUpdate(
        { _id: new ObjectId(id) },
        { $set: updateData },
        { returnDocument: 'after' }
      )

      if (!result) return null

      return {
        ...result,
        _id: result._id.toString()
      } as ContactEntry
    } catch (error) {
      console.error('Failed to update contact entry:', error)
      throw new Error('Failed to update contact entry')
    }
  }

  // Analytics
  async getDatabaseStats(): Promise<DatabaseStats> {
    await this.ensureConnection()
    if (!this.db) throw new Error('Database not connected')

    try {
      const [waitlistStats, contactStats] = await Promise.all([
        this.db.collection('waitlist').aggregate([
          {
            $group: {
              _id: null,
              total: { $sum: 1 },
              active: { $sum: { $cond: [{ $eq: ['$status', 'active'] }, 1, 0] } },
              inactive: { $sum: { $cond: [{ $eq: ['$status', 'inactive'] }, 1, 0] } }
            }
          }
        ]).toArray(),
        this.db.collection('contacts').aggregate([
          {
            $group: {
              _id: null,
              total: { $sum: 1 },
              new: { $sum: { $cond: [{ $eq: ['$status', 'new'] }, 1, 0] } },
              in_progress: { $sum: { $cond: [{ $eq: ['$status', 'in_progress'] }, 1, 0] } },
              resolved: { $sum: { $cond: [{ $eq: ['$status', 'resolved'] }, 1, 0] } }
            }
          }
        ]).toArray()
      ])

      return {
        waitlist: (waitlistStats[0] as any) || { total: 0, active: 0, inactive: 0 },
        contacts: (contactStats[0] as any) || { total: 0, new: 0, in_progress: 0, resolved: 0 }
      }
    } catch (error) {
      console.error('Failed to get database stats:', error)
      throw new Error('Failed to get database stats')
    }
  }

  // Health check
  async healthCheck(): Promise<boolean> {
    try {
      await this.ensureConnection()
      if (!this.db) return false
      
      await this.db.admin().ping()
      return true
    } catch (error) {
      console.error('MongoDB health check failed:', error)
      return false
    }
  }

  // Close connection
  async close(): Promise<void> {
    try {
      if (this.client) {
        await this.client.close()
        this.isConnected = false
        console.log('✅ MongoDB connection closed')
      }
    } catch (error) {
      console.error('Error closing MongoDB connection:', error)
    }
  }

  // Get connection status
  getConnectionStatus(): boolean {
    return this.isConnected
  }
}

export const mongoDB = MongoDBService.getInstance()

// Graceful shutdown
process.on('SIGINT', async () => {
  await mongoDB.close()
  process.exit(0)
})

process.on('SIGTERM', async () => {
  await mongoDB.close()
  process.exit(0)
})
