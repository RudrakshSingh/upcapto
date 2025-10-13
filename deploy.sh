#!/bin/bash

# 🚀 Etelios Vercel Deployment Script
echo "🚀 Starting Etelios deployment to Vercel..."

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "📦 Installing Vercel CLI..."
    npm install -g vercel
fi

# Check if user is logged in
if ! vercel whoami &> /dev/null; then
    echo "🔐 Please login to Vercel first:"
    vercel login
fi

# Build the project
echo "🔨 Building the project..."
npm run build

# Deploy to Vercel
echo "🚀 Deploying to Vercel..."
vercel --prod

echo "✅ Deployment complete!"
echo "📋 Next steps:"
echo "1. Set environment variables in Vercel dashboard"
echo "2. Test your deployment"
echo "3. Configure custom domain (optional)"
echo ""
echo "🔧 Environment variables to set:"
echo "MONGODB_URI=mongodb+srv://upcapto:sdDND99mRkP8WVmc@leads.8f0y71y.mongodb.net/?retryWrites=true&w=majority&appName=leads"
echo "MONGODB_DATABASE=upcapto"
echo "JWT_SECRET=your-super-secure-jwt-secret-key-here"
echo "ENCRYPTION_KEY=your-32-character-encryption-key-here"
echo "SESSION_SECRET=your-session-secret-key-here"
