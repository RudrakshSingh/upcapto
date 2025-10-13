# BigRock Deployment Guide

## Files to Upload to BigRock

### 1. Main Files
- `index.html` - Main website file
- `.htaccess` - Server configuration
- `favicon.ico` - Website icon (if you have one)

### 2. Upload Instructions

1. **Login to BigRock Control Panel**
2. **Go to File Manager**
3. **Navigate to public_html folder**
4. **Upload these files:**
   - `index.html`
   - `.htaccess`
   - `favicon.ico` (optional)

### 3. File Structure on BigRock
```
public_html/
├── index.html
├── .htaccess
└── favicon.ico (optional)
```

### 4. SSL Certificate Setup

#### Option A: BigRock SSL (Recommended)
1. **Login to BigRock Control Panel**
2. **Go to SSL/TLS**
3. **Enable Let's Encrypt SSL** (Free)
4. **Force HTTPS** - Enable

#### Option B: Cloudflare SSL
1. **Sign up for Cloudflare** (Free)
2. **Add your domain**
3. **Change nameservers** to Cloudflare
4. **SSL/TLS** → **Full (Strict)**

### 5. DNS Configuration

#### If using BigRock DNS:
- **A Record**: `@` → Your server IP
- **CNAME**: `www` → `yourdomain.com`

#### If using Cloudflare:
- **A Record**: `@` → Your server IP
- **CNAME**: `www` → `yourdomain.com`
- **Proxy Status**: Proxied (Orange cloud)

### 6. Testing

1. **Visit your domain**: `https://yourdomain.com`
2. **Check SSL**: Look for lock icon in browser
3. **Test form**: Submit the contact form
4. **Mobile test**: Check on mobile devices

### 7. Troubleshooting

#### If you see "Index of /" instead of website:
1. **Check file permissions** (644 for files, 755 for folders)
2. **Ensure index.html is in public_html**
3. **Check .htaccess is uploaded**
4. **Clear browser cache**

#### If SSL is not working:
1. **Wait 24-48 hours** for SSL to propagate
2. **Check DNS settings**
3. **Contact BigRock support**

### 8. Performance Optimization

#### Enable Gzip Compression:
- Already configured in `.htaccess`

#### Set Cache Headers:
- Already configured in `.htaccess`

#### Use CDN (Optional):
- Cloudflare provides free CDN
- Improves loading speed globally

### 9. Contact Form Setup

The current form sends emails to `contact@etelios.com`. To change:

1. **Edit index.html**
2. **Find**: `action="mailto:contact@etelios.com"`
3. **Change to**: `action="mailto:your-email@domain.com"`

### 10. Backup

1. **Download your files** regularly
2. **Keep .htaccess** file safe
3. **Document any custom changes**

## Quick Checklist

- [ ] Upload `index.html` to `public_html`
- [ ] Upload `.htaccess` to `public_html`
- [ ] Upload `favicon.ico` (optional)
- [ ] Enable SSL certificate
- [ ] Test website loads correctly
- [ ] Test SSL certificate works
- [ ] Test contact form
- [ ] Test on mobile devices

## Support

If you need help:
1. **BigRock Support**: Contact their support team
2. **Cloudflare Support**: If using Cloudflare
3. **Check BigRock Knowledge Base**

## Success!

Once deployed, your website will be available at:
- `https://yourdomain.com`
- `https://www.yourdomain.com`

Both will redirect to HTTPS automatically!
