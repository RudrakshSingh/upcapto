# Netlify Deployment Guide for Etelios

## 🚀 Complete Netlify Setup

### 📋 What You Need
- GitHub repository with your code
- Netlify account (free)
- Domain name (optional)

---

## 🔧 Step 1: Deploy to Netlify

### 1.1 Connect GitHub Repository
1. **Go to [Netlify](https://netlify.com)**
2. **Click "New site from Git"**
3. **Connect to GitHub**
4. **Select your repository:** `upcapto`
5. **Configure build settings:**
   - **Build command:** `npm run build`
   - **Publish directory:** `out`
   - **Node version:** `18`

### 1.2 Environment Variables
Add these in Netlify dashboard → Site settings → Environment variables:
```
NODE_ENV=production
NEXT_PUBLIC_APP_URL=https://your-site-name.netlify.app
```

---

## 🔧 Step 2: Configure Netlify Functions

### 2.1 Functions Directory
Your `netlify/functions/` directory should contain:
```
netlify/
├── functions/
│   ├── waitlist.js     ✅ (Form submission)
│   └── joiners.js      ✅ (Recent joiners)
```

### 2.2 Function URLs
- **Waitlist:** `/.netlify/functions/waitlist`
- **Recent Joiners:** `/.netlify/functions/joiners`

---

## 🔧 Step 3: Build Configuration

### 3.1 netlify.toml
Your `netlify.toml` file should contain:
```toml
[build]
  publish = "out"
  command = "npm run build"

[build.environment]
  NODE_VERSION = "18"

[[redirects]]
  from = "/api/*"
  to = "/.netlify/functions/:splat"
  status = 200

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

### 3.2 Build Process
1. **Netlify automatically runs:** `npm run build`
2. **Generates static files** in `out/` directory
3. **Deploys functions** from `netlify/functions/`
4. **Sets up redirects** for SPA routing

---

## 🧪 Step 4: Testing

### 4.1 Test Your Website
1. **Visit your Netlify URL**
2. **Check:** Countdown timer is working
3. **Check:** Form is visible and functional
4. **Check:** Animations are working
5. **Check:** Mobile responsive

### 4.2 Test Form Submission
1. **Fill out the form**
2. **Submit**
3. **Check:** Success message appears
4. **Check:** No console errors
5. **Check:** Network tab shows successful API calls

### 4.3 Test Recent Joiners
1. **Check:** Popup appears with recent joiners
2. **Check:** Names and locations are realistic
3. **Check:** Popup auto-hides after 4 seconds

---

## 🚨 Troubleshooting

### Common Issues:

#### 1. **Build Fails**
- Check `package.json` has all dependencies
- Verify Node version is 18
- Check build logs in Netlify dashboard

#### 2. **Functions Not Working**
- Check `netlify/functions/` directory exists
- Verify function files have correct exports
- Check function logs in Netlify dashboard

#### 3. **Form Submission Errors**
- Check browser console for errors
- Verify API endpoints are correct
- Check CORS headers in functions

#### 4. **Animations Not Working**
- Check if JavaScript is enabled
- Verify CSS is loading correctly
- Check for console errors

#### 5. **Mobile Issues**
- Test on different devices
- Check viewport meta tag
- Verify responsive CSS

---

## 📊 Step 5: Monitoring

### 5.1 Netlify Dashboard
1. **Go to your site dashboard**
2. **Check Functions tab** for logs
3. **Check Deploys tab** for build status
4. **Check Analytics tab** for traffic

### 5.2 Function Logs
1. **Go to Functions → waitlist**
2. **Check logs** for form submissions
3. **Verify data** is being processed
4. **Check for errors**

---

## 🎯 Final Checklist

- [ ] ✅ Website loads correctly
- [ ] ✅ Countdown timer is working
- [ ] ✅ Form submission works
- [ ] ✅ Recent joiners popup works
- [ ] ✅ No console errors
- [ ] ✅ Mobile responsive
- [ ] ✅ Functions are deployed
- [ ] ✅ Redirects are working
- [ ] ✅ SSL certificate active
- [ ] ✅ All animations working

---

## 🚀 Custom Domain (Optional)

### 6.1 Add Custom Domain
1. **Go to Site settings → Domain management**
2. **Add your domain**
3. **Update DNS records**
4. **Wait for SSL certificate**

### 6.2 DNS Configuration
```
Type: CNAME
Name: www
Value: your-site-name.netlify.app

Type: A
Name: @
Value: 75.2.60.5
```

---

## 🎉 You're Done!

Your Etelios website is now live on Netlify! 

**Website URL:** `https://your-site-name.netlify.app`
**Custom Domain:** `https://yourdomain.com` (if configured)

**Congratulations! Your business website is ready to collect leads!** 🚀

---

## 📞 Support

If you need help:
1. **Check Netlify documentation**
2. **Check function logs**
3. **Test in different browsers**
4. **Contact Netlify support**
