# Vercel Deployment Guide for Etelios

## 🚀 Quick Deploy to Vercel

### Step 1: Environment Variables Setup

Add these environment variables in your Vercel dashboard:

#### Required Variables:
```
MONGODB_URI=mongodb+srv://upcapto:sdDND99mRkP8WVmc@leads.8f0y71y.mongodb.net/?retryWrites=true&w=majority&appName=leads
MONGODB_DATABASE=upcapto
JWT_SECRET=your-super-secure-jwt-secret-key-here
ENCRYPTION_KEY=your-32-character-encryption-key-here
SESSION_SECRET=your-session-secret-key-here
```

#### Optional Variables:
```
API_KEY=your-api-key-here
RATE_LIMIT_BLOCK_DURATION=3600000
MAX_REQUEST_SIZE=1048576
MAX_CONCURRENT_REQUESTS=100
CORS_ORIGINS=https://your-domain.vercel.app
SECURITY_HEADERS=true
CSP_POLICY=default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'
HSTS_MAX_AGE=31536000
HEALTH_CHECK_INTERVAL=300000
CACHE_TTL=3600
PORT=3000
```

### Step 2: Deploy Commands

#### Option A: Deploy via Vercel CLI
```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy
vercel --prod
```

#### Option B: Deploy via GitHub
1. Push your code to GitHub
2. Connect your GitHub repo to Vercel
3. Vercel will automatically deploy

### Step 3: Build Configuration

The project is already configured for Vercel with:
- ✅ Next.js 14 App Router
- ✅ TypeScript support
- ✅ MongoDB Atlas integration
- ✅ Security headers
- ✅ API routes optimization
- ✅ Edge Runtime compatibility

### Step 4: Post-Deployment

1. **Test your deployment**: Visit your Vercel URL
2. **Check API endpoints**: 
   - `/api/debug` - Health check
   - `/api/waitlist-working` - Form submission
   - `/api/recent-joiners` - Real-time data
3. **Verify MongoDB connection**: Check logs in Vercel dashboard

### Step 5: Custom Domain (Optional)

1. Go to your Vercel dashboard
2. Navigate to your project settings
3. Add your custom domain
4. Update CORS_ORIGINS with your domain

## 🔧 Troubleshooting

### Common Issues:

1. **Build Failures**: Check that all dependencies are in package.json
2. **Environment Variables**: Ensure all required vars are set in Vercel dashboard
3. **MongoDB Connection**: Verify your Atlas connection string
4. **API Timeouts**: Check function timeout settings

### Performance Optimization:

- ✅ Edge Runtime for middleware
- ✅ Optimized API routes
- ✅ Security headers
- ✅ Caching configuration

## 📊 Monitoring

Monitor your deployment:
- Vercel Analytics
- Function logs
- MongoDB Atlas monitoring
- Performance metrics

## 🔒 Security

Your deployment includes:
- ✅ Security headers
- ✅ CORS protection
- ✅ Rate limiting
- ✅ Input validation
- ✅ MongoDB security

## 🎉 Success!

Your Etelios website is now live on Vercel with:
- ⏰ Real-time countdown timer
- 📱 Responsive design
- 🔄 Live data updates
- 🛡️ Production security
- 🚀 Global CDN
