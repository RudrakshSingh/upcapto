const { MongoClient } = require('mongodb');

exports.handler = async (event, context) => {
  // Handle CORS preflight requests
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
      },
      body: '',
    };
  }

  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  let client;
  
  try {
    const data = JSON.parse(event.body);
    
    // Validate required fields
    const requiredFields = ['name', 'email', 'phone', 'businessSize', 'natureOfBusiness'];
    for (const field of requiredFields) {
      if (!data[field]) {
        return {
          statusCode: 400,
          headers: {
            'Access-Control-Allow-Origin': '*',
          },
          body: JSON.stringify({ error: `Field '${field}' is required` }),
        };
      }
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      return {
        statusCode: 400,
        headers: {
          'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify({ error: 'Invalid email format' }),
      };
    }

    // Validate phone number (Indian format)
    const phoneRegex = /^[6-9]\d{9}$/;
    if (!phoneRegex.test(data.phone)) {
      return {
        statusCode: 400,
        headers: {
          'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify({ error: 'Invalid phone number format' }),
      };
    }

    // Connect to MongoDB Atlas
    const mongoUri = process.env.MONGODB_URI;
    
    if (!mongoUri) {
      console.error('MONGODB_URI environment variable is not set');
      return {
        statusCode: 500,
        headers: {
          'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify({ error: 'Database configuration error' }),
      };
    }
    
    client = new MongoClient(mongoUri, {
      serverSelectionTimeoutMS: 10000,
      connectTimeoutMS: 10000,
      socketTimeoutMS: 10000,
      retryWrites: true,
      w: 'majority'
    });

    await client.connect();
    const db = client.db('upcapto-dev');
    const collection = db.collection('waitlist');

    // Check if email already exists
    const existingEntry = await collection.findOne({ email: data.email });
    if (existingEntry) {
      return {
        statusCode: 409,
        headers: {
          'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify({ error: 'Email already registered' }),
      };
    }

    // Create new entry
    const newEntry = {
      name: data.name,
      email: data.email,
      phone: data.phone,
      businessSize: data.businessSize,
      natureOfBusiness: data.natureOfBusiness,
      createdAt: new Date(),
      ipAddress: event.headers['x-forwarded-for'] || event.headers['client-ip'] || 'unknown',
      userAgent: event.headers['user-agent'] || 'unknown',
      status: 'active'
    };

    const result = await collection.insertOne(newEntry);
    
    console.log('New waitlist entry saved to database:', {
      id: result.insertedId,
      name: data.name,
      email: data.email,
      phone: data.phone,
      businessSize: data.businessSize,
      natureOfBusiness: data.natureOfBusiness,
      timestamp: new Date().toISOString()
    });

    // Send success response
    return {
      statusCode: 201,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        success: true,
        message: 'Successfully added to waitlist',
        id: result.insertedId.toString()
      }),
    };

  } catch (error) {
    console.error('Error processing waitlist submission:', error);
    
    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({ 
        error: 'Internal server error',
        details: process.env.NODE_ENV === 'development' ? error.message : undefined
      }),
    };
  } finally {
    if (client) {
      await client.close();
    }
  }
};
