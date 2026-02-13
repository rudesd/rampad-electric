# Analytics Dashboard - Setup Instructions

## 📋 Overview
This dashboard integrates with **Google Analytics 4 (GA4)** and **Jetpack** to display:
- Page views and visitor counts
- Traffic sources and referrals
- Daily traffic trends
- Top performing pages

## 🔑 Step 1: Get Your Google Analytics API Credentials

### A. Enable Google Analytics Data API

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Navigate to **APIs & Services** → **Library**
4. Search for "Google Analytics Data API"
5. Click **Enable**

### B. Create API Key

1. Go to **APIs & Services** → **Credentials**
2. Click **Create Credentials** → **API Key**
3. Copy your API key (you'll need this for the dashboard)
4. (Optional but recommended) Click **Restrict Key** and limit it to Google Analytics Data API only

### C. Get Your Property ID

1. Go to [Google Analytics](https://analytics.google.com/)
2. Select your property
3. Go to **Admin** (bottom left)
4. Under **Property**, click **Property Settings**
5. Copy your **Property ID** (format: `properties/123456789`)

**Alternative method:** The Property ID is visible in the URL when viewing reports:
```
https://analytics.google.com/analytics/web/#/p123456789/...
                                              ^^^^^^^^^^^
                                           This is your ID
```
Your Property ID is: `properties/123456789`

## 🔑 Step 2: Get Your Jetpack Credentials

### A. Get Your Site ID

Your Jetpack Site ID is simply your domain name:
- Example: `yourdomain.com` or `example.wordpress.com`

### B. Create Access Token

1. Go to [WordPress.com Developer Applications](https://developer.wordpress.com/apps/)
2. Click **Create New Application**
3. Fill in the details:
   - **Name**: Analytics Dashboard
   - **Description**: Personal analytics dashboard
   - **Website URL**: Your site URL
   - **Redirect URL**: `http://localhost` (not used but required)
   - **Type**: Web
4. Click **Create**
5. You'll receive a **Client ID** and **Client Secret**

### C. Generate Token

1. Use the OAuth flow or use this simplified method:
2. Go to: `https://public-api.wordpress.com/oauth2/authorize?client_id=YOUR_CLIENT_ID&response_type=token&redirect_uri=http://localhost`
3. Replace `YOUR_CLIENT_ID` with your actual Client ID
4. Authorize the application
5. After redirect, copy the access token from the URL

**Alternative: Use Jetpack API Token**
1. In your WordPress admin, go to **Jetpack** → **Settings**
2. Navigate to **Security** tab
3. Find **WordPress.com API** section
4. Generate a new API token
5. Copy the token

## 🚀 Step 3: Configure the Dashboard

1. Open `index.html` in your browser
2. Fill in the configuration fields:
   - **Google Analytics Property ID**: `properties/123456789`
   - **Google Analytics API Key**: Your API key from Step 1
   - **Jetpack Site ID**: `yourdomain.com`
   - **Jetpack Access Token**: Your token from Step 2
3. Click **Save Configuration**
4. Click **Refresh Data** to load your analytics

## 🔒 Security Notes

- Your credentials are stored **locally** in your browser's localStorage
- They are **never sent** to any server except Google/Jetpack APIs
- For production use, consider implementing a backend proxy to keep credentials server-side

## 🛠️ Troubleshooting

### "GA4 API error" or "Jetpack API error"
- Verify your credentials are correct
- Check that the APIs are enabled in Google Cloud Console
- Ensure your API key has the correct permissions
- For Jetpack, verify your site is connected to WordPress.com

### "No data available"
- Make sure your GA4 property has data for the last 7 days
- Check that you're using the correct Property ID format (`properties/123456789`)
- Verify your Jetpack site has recent statistics

### CORS Errors in Console
- Google Analytics Data API supports direct browser requests with API keys
- If you see CORS errors, you may need to implement a backend proxy
- Contact me if you need help setting up a simple proxy server

## 🔄 Using the Dashboard

1. **Metrics Cards**: Shows total visitors, page views, bounce rate, and session duration
2. **Traffic Overview Chart**: Line chart showing daily visitors and page views over 7 days
3. **Traffic Sources Chart**: Pie chart showing where your visitors come from
4. **Top Pages Table**: Lists your most popular pages with detailed metrics
5. **Refresh Button**: Click to fetch the latest data from your analytics

## 📊 Data Refresh

- Data is fetched when you click "Refresh Data"
- Your configuration is saved in the browser
- The dashboard will auto-load data on subsequent visits if configured

## 🆘 Need Help?

If you encounter issues:
1. Check the browser console (F12) for error messages
2. Verify all credentials are correctly entered
3. Ensure both APIs are properly enabled
4. Try the "Refresh Data" button again

## 🎨 Customization

You can customize the dashboard by editing:
- **Colors**: Change CSS variables at the top of the file (lines 10-24)
- **Date Range**: Modify the date calculation in `fetchGoogleAnalytics()` function
- **Metrics**: Add/remove metrics in the API request body
- **Charts**: Customize Chart.js options for different visualizations

## 📝 Next Steps

1. **Add More Metrics**: Extend the GA4 API request to include conversions, events, etc.
2. **Backend Proxy**: For better security, create a backend to handle API calls
3. **Scheduled Refreshes**: Add automatic data refresh every X minutes
4. **Export Data**: Add functionality to export data to CSV/Excel
5. **Alerts**: Set up notifications for traffic spikes or drops
