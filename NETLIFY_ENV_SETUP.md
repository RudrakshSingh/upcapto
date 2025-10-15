# Netlify Environment Variables Setup

## 🔧 MongoDB Atlas Configuration for Netlify

### Step 1: Add Environment Variables in Netlify

1. **Go to your Netlify dashboard**
2. **Click on your site**
3. **Go to Site settings → Environment variables**
4. **Add these variables:**

```
MONGODB_URI=mongodb+srv://upcapto:sdDND99mRkP8WVmc@leads.8f0y71y.mongodb.net/?retryWrites=true&w=majority&appName=leads
NODE_ENV=production
```

### Step 2: MongoDB Atlas IP Whitelist

1. **Go to MongoDB Atlas Dashboard**
2. **Click on "Network Access"**
3. **Add IP Address:**
   - **Add Current IP Address** (for testing)
   - **Add 0.0.0.0/0** (for Netlify functions)

### Step 3: Test Database Connection

Your functions will now:
- ✅ **Save form data to MongoDB Atlas**
- ✅ **Fetch real data for recent joiners**
- ✅ **Handle duplicate email errors**
- ✅ **Show proper success/error messages**

### Step 4: Verify Data is Being Saved

1. **Submit a test form**
2. **Check Netlify Function logs:**
   - Go to Functions → waitlist
   - Check logs for "New waitlist entry saved to database"
3. **Check MongoDB Atlas:**
   - Go to Collections
   - Check `upcapto-dev` database
   - Check `waitlist` collection

---

## 🎯 What's Fixed Now:

### ✅ Form Submission
- **Real database storage** in MongoDB Atlas
- **Duplicate email detection**
- **Proper validation**
- **Success/error messages**

### ✅ Recent Joiners
- **Real data from database**
- **Fallback to dummy data**
- **Random locations and businesses**

### ✅ Error Handling
- **Network error handling**
- **Database connection errors**
- **Validation errors**

---

## 🚀 Deploy Instructions:

1. **Push code to GitHub**
2. **Netlify will auto-deploy**
3. **Add environment variables**
4. **Test form submission**
5. **Check database for data**

**Your form data will now be properly saved to MongoDB Atlas!** 🎉
