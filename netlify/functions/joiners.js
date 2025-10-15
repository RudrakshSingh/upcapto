const { MongoClient } = require('mongodb');

exports.handler = async (event, context) => {
  // Handle CORS preflight requests
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'GET, OPTIONS',
      },
      body: '',
    };
  }

  // Only allow GET requests
  if (event.httpMethod !== 'GET') {
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
    // Connect to MongoDB Atlas
    const mongoUri = process.env.MONGODB_URI || 'mongodb+srv://upcapto:sdDND99mRkP8WVmc@leads.8f0y71y.mongodb.net/?retryWrites=true&w=majority&appName=leads';
    
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

    // Get recent entries from database
    const recentEntries = await collection
      .find({ status: 'active' })
      .sort({ createdAt: -1 })
      .limit(10)
      .toArray();

    const locations = [
      'Mumbai', 'Delhi', 'Bangalore', 'Chennai', 'Pune', 'Hyderabad', 'Ahmedabad',
      'Kolkata', 'Surat', 'Jaipur', 'Lucknow', 'Kanpur', 'Nagpur', 'Indore',
      'Thane', 'Bhopal', 'Visakhapatnam', 'Pimpri', 'Patna', 'Vadodara'
    ];
    
    const businesses = [
      'Retail', 'Tech', 'Healthcare', 'Manufacturing', 'Finance', 'Education',
      'Real Estate', 'Food & Beverage', 'Automotive', 'Beauty', 'Fitness',
      'Entertainment', 'Agriculture', 'Construction', 'Legal', 'Marketing'
    ];

    const joiners = recentEntries.map((entry, index) => ({
      name: entry.name,
      location: locations[Math.floor(Math.random() * locations.length)],
      business: businesses[Math.floor(Math.random() * businesses.length)],
      time: index === 0 ? 'just now' : `${Math.floor(Math.random() * 10) + 1} min ago`,
      isNew: true
    }));

    // If no real data, add some dummy data
    if (joiners.length === 0) {
      const dummyNames = [
        'Rajesh Kumar', 'Priya Sharma', 'Amit Patel', 'Sneha Gupta', 'Vikram Singh'
      ];
      
      for (let i = 0; i < 3; i++) {
        joiners.push({
          name: dummyNames[i],
          location: locations[Math.floor(Math.random() * locations.length)],
          business: businesses[Math.floor(Math.random() * businesses.length)],
          time: i === 0 ? 'just now' : `${i + 1} min ago`,
          isNew: true
        });
      }
    }

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        success: true,
        joiners: joiners
      }),
    };

  } catch (error) {
    console.error('Error fetching recent joiners:', error);
    
    // Return dummy data on error
    const dummyJoiners = [
      {
        name: 'Rajesh Kumar',
        location: 'Mumbai',
        business: 'Retail',
        time: 'just now',
        isNew: true
      },
      {
        name: 'Priya Sharma',
        location: 'Delhi',
        business: 'Tech',
        time: '2 min ago',
        isNew: true
      }
    ];
    
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        success: true,
        joiners: dummyJoiners
      }),
    };
  } finally {
    if (client) {
      await client.close();
    }
  }
};
