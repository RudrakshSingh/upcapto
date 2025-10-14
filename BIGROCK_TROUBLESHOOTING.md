# BigRock Troubleshooting Guide

## 🚨 Common Issues & Solutions

### 1. "Index of /" Page Shows Instead of Website

**Problem**: Directory listing instead of website
**Solution**: 
- Check if `index.html` is in `public_html` folder
- Verify file permissions (should be 644)
- Make sure `.htaccess` is uploaded

### 2. Website Not Loading

**Check These:**
1. **File Location**: 
   - Files must be in `public_html` folder
   - Not in subfolders

2. **File Names**:
   - Must be exactly `index.html` (not `Index.html`)
   - Must be exactly `.htaccess` (not `.htaccess.txt`)

3. **File Permissions**:
   - `index.html`: 644
   - `.htaccess`: 644

### 3. CSS/JS Not Loading

**Problem**: Website loads but looks broken
**Solution**:
- Check if all files are in `public_html`
- Clear browser cache
- Check file permissions

### 4. SSL Certificate Issues

**Problem**: HTTPS not working
**Solution**:
- Enable SSL in BigRock control panel
- Wait 24-48 hours for SSL to activate
- Check if domain is pointing to BigRock

## 🔧 Step-by-Step Fix

### Step 1: Check File Upload
1. Login to BigRock control panel
2. Go to File Manager
3. Navigate to `public_html`
4. Check if these files exist:
   - `index.html`
   - `.htaccess`
   - `favicon.ico`

### Step 2: Fix File Permissions
1. Right-click on `index.html`
2. Select "Permissions"
3. Set to 644
4. Do the same for `.htaccess`

### Step 3: Test Website
1. Go to your domain (e.g., `https://yourdomain.com`)
2. If still not working, try:
   - `https://yourdomain.com/index.html`
   - Clear browser cache
   - Try incognito mode

### Step 4: Enable SSL
1. Go to SSL/TLS in control panel
2. Enable "Let's Encrypt SSL"
3. Force HTTPS redirect
4. Wait 24-48 hours

## 📞 BigRock Support

If still not working:
1. **Call BigRock Support**: Check their website for phone number
2. **Live Chat**: Use their live chat support
3. **Email Support**: Send them a support ticket

## 🎯 Quick Checklist

- [ ] Files uploaded to `public_html`
- [ ] File names are correct (case-sensitive)
- [ ] File permissions set to 644
- [ ] SSL certificate enabled
- [ ] Domain pointing to BigRock
- [ ] Browser cache cleared

## 🚀 Alternative: Use Netlify

If BigRock continues to have issues:
1. Go to [netlify.com](https://netlify.com)
2. Connect your GitHub repository
3. Deploy automatically
4. Get a free `.netlify.app` domain
