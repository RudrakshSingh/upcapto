# Upcapto Production Deployment Guide

## 🚀 Quick Start (Vercel - Recommended)

### 1. Prerequisites
- [ ] GitHub account
- [ ] Vercel account
- [ ] MongoDB Atlas database
- [ ] SendGrid account
- [ ] WhatsApp Business API access

### 2. Database Setup

#### MongoDB Atlas (Recommended)
1. Go to [MongoDB Atlas](https://cloud.mongodb.com)
2. Create new cluster
3. Create database user
4. Whitelist IP addresses (0.0.0.0/0 for Vercel)
5. Get connection string
6. Set as `MONGODB_URI` in environment variables

#### MongoDB Atlas Setup Steps:
1. **Create Cluster**
   - Choose AWS, Google Cloud, or Azure
   - Select region closest to your users
   - Choose M0 (Free) or M2+ (Production)

2. **Database Access**
   - Create database user
   - Set strong password
   - Grant read/write permissions

3. **Network Access**
   - Add IP address 0.0.0.0/0 for Vercel
   - Or add specific Vercel IP ranges

4. **Connection String**
   ```
   mongodb+srv://username:password@cluster.mongodb.net/upcapto?retryWrites=true&w=majority
   ```

### 3. WhatsApp Business API Setup

1. **Create Meta Business Account**
   - Go to [business.facebook.com](https://business.facebook.com)
   - Create business account
   - Verify business information

2. **Set up WhatsApp Business API**
   - Go to [developers.facebook.com](https://developers.facebook.com)
   - Create new app
   - Add WhatsApp product
   - Get access token
   - Get phone number ID

3. **Environment Variables**
   ```
   WHATSAPP_BUSINESS_ACCOUNT_ID=your_business_account_id
   WHATSAPP_ACCESS_TOKEN=your_access_token
   WHATSAPP_PHONE_NUMBER_ID=your_phone_number_id
   ADMIN_PHONE=+919876543210
   ```

### 4. Email Service Setup (SendGrid)

1. **Create SendGrid Account**
   - Go to [sendgrid.com](https://sendgrid.com)
   - Sign up for account
   - Verify email address

2. **Get API Key**
   - Go to Settings > API Keys
   - Create new API key
   - Copy the key

3. **Environment Variables**
   ```
   SENDGRID_API_KEY=your_sendgrid_api_key
   FROM_EMAIL=noreply@upcapto.com
   FROM_NAME=Upcapto Team
   ```

### 5. Deploy to Vercel

1. **Connect Repository**
   ```bash
   # Push your code to GitHub
   git add .
   git commit -m "Production ready with MongoDB"
   git push origin main
   ```

2. **Deploy on Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Configure environment variables
   - Deploy

3. **Environment Variables in Vercel**
   ```
   # MongoDB Configuration
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/upcapto?retryWrites=true&w=majority
   MONGODB_DATABASE=upcapto
   MONGODB_POOL_SIZE=10
   
   # WhatsApp Business API
   WHATSAPP_BUSINESS_ACCOUNT_ID=your_business_account_id
   WHATSAPP_ACCESS_TOKEN=your_access_token
   WHATSAPP_PHONE_NUMBER_ID=your_phone_number_id
   ADMIN_PHONE=+919876543210
   
   # Email Service
   SENDGRID_API_KEY=your_sendgrid_api_key
   FROM_EMAIL=noreply@upcapto.com
   FROM_NAME=Upcapto Team
   
   # Security
   JWT_SECRET=your_jwt_secret_key_here_minimum_32_characters
   ENCRYPTION_KEY=your_encryption_key_here_minimum_32_characters
   RATE_LIMIT_MAX=100
   RATE_LIMIT_WINDOW=900000
   
   # Monitoring
   SENTRY_DSN=your_sentry_dsn
   LOG_LEVEL=info
   
   # Application
   NODE_ENV=production
   NEXT_PUBLIC_APP_URL=https://upcapto.com
   ```

## 🔧 Alternative Deployment Options

### AWS Deployment

1. **Set up AWS Account**
2. **Create RDS PostgreSQL instance**
3. **Deploy using AWS Amplify or EC2**
4. **Configure load balancer and SSL**

### DigitalOcean Deployment

1. **Create Droplet**
2. **Install Node.js and PostgreSQL**
3. **Deploy application**
4. **Set up Nginx reverse proxy**

### Docker Deployment

```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
```

## 📊 Monitoring & Analytics

### 1. Sentry Setup
1. Go to [sentry.io](https://sentry.io)
2. Create new project
3. Get DSN
4. Add to environment variables

### 2. Uptime Monitoring
1. Go to [uptimerobot.com](https://uptimerobot.com)
2. Add your domain
3. Set up monitoring

### 3. Analytics
1. Add Google Analytics
2. Set up conversion tracking
3. Monitor user behavior

## 🔒 Security Checklist

- [ ] SSL certificate installed
- [ ] Environment variables secured
- [ ] Database access restricted
- [ ] Rate limiting enabled
- [ ] Input validation implemented
- [ ] CORS configured
- [ ] Security headers set
- [ ] Regular backups scheduled

## 📈 Performance Optimization

### 1. CDN Setup
- Configure Cloudflare or AWS CloudFront
- Enable caching for static assets
- Optimize images

### 2. Database Optimization
- Set up connection pooling
- Create proper indexes
- Monitor query performance

### 3. Caching
- Implement Redis for session storage
- Cache API responses
- Use Next.js built-in caching

## 🚨 Troubleshooting

### Common Issues

1. **Database Connection Failed**
   - Check DATABASE_URL format
   - Verify database is accessible
   - Check firewall settings

2. **WhatsApp Notifications Not Working**
   - Verify API credentials
   - Check phone number format
   - Test with WhatsApp API tester

3. **Email Not Sending**
   - Verify SendGrid API key
   - Check sender email verification
   - Review SendGrid logs

4. **Build Failures**
   - Check Node.js version
   - Verify all dependencies
   - Review build logs

### Support Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Next.js Documentation](https://nextjs.org/docs)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [SendGrid Documentation](https://docs.sendgrid.com/)
- [WhatsApp Business API Documentation](https://developers.facebook.com/docs/whatsapp)

## 💰 Cost Optimization

### Monthly Cost Breakdown
- **Vercel Pro**: $20/month (if needed)
- **Database**: $20-50/month
- **SendGrid**: $15-50/month
- **WhatsApp API**: $0.005 per message
- **Monitoring**: $0-20/month
- **Total**: ~$50-150/month

### Cost Saving Tips
1. Use Vercel's free tier initially
2. Start with smaller database plans
3. Monitor usage and scale accordingly
4. Use free monitoring tools when possible

## 📞 Support & Maintenance

### Regular Tasks
- [ ] Monitor application logs
- [ ] Check database performance
- [ ] Update dependencies
- [ ] Review security settings
- [ ] Backup data regularly

### Emergency Contacts
- **Technical Issues**: support@upcapto.com
- **WhatsApp Issues**: Check Meta Business Support
- **Email Issues**: Check SendGrid Support
- **Hosting Issues**: Check Vercel Support

## 🎯 Post-Deployment Checklist

- [ ] Domain configured and SSL active
- [ ] All forms working correctly
- [ ] WhatsApp notifications working
- [ ] Email automation working
- [ ] Admin dashboard accessible
- [ ] Database backups configured
- [ ] Monitoring set up
- [ ] Performance optimized
- [ ] Security measures in place
- [ ] Documentation updated

## 📋 Next Steps

1. **Test all functionality**
2. **Set up monitoring**
3. **Configure backups**
4. **Train team on admin dashboard**
5. **Plan for scaling**
6. **Set up analytics**
7. **Create maintenance schedule**
