# rampad-electric
# 📊 Analytics Dashboard

A beautiful, real-time analytics dashboard that integrates **Google Analytics 4** and **Jetpack** to visualize your website's performance with interactive charts and detailed metrics.

![Dashboard Preview](screenshot.png)
*Replace screenshot.png with an actual screenshot of your dashboard*

## ✨ Features

- 📈 **Real-time Analytics** - Connect directly to Google Analytics 4 and Jetpack APIs
- 🎨 **Modern UI** - Clean, dark-themed interface with smooth animations
- 📊 **Interactive Charts** - Visualize traffic trends and sources with Chart.js
- 🔒 **Secure** - All credentials stored locally in your browser
- 📱 **Responsive** - Works perfectly on desktop, tablet, and mobile
- ⚡ **Fast** - Pure HTML/CSS/JavaScript, no build process required

## 🎯 What You'll See

### Key Metrics Cards
- Total Visitors
- Page Views
- Bounce Rate
- Average Session Duration

### Visual Analytics
- **Traffic Overview Chart** - Daily visitors and page views over the last 7 days
- **Traffic Sources Chart** - Visual breakdown of where your visitors come from

### Detailed Data
- **Top Pages Table** - Your most popular content with views, visitors, time on page, and traffic sources

## 🚀 Quick Start

1. **Download the dashboard**
   ```bash
   git clone https://github.com/YOUR-USERNAME/analytics-dashboard.git
   cd analytics-dashboard
   ```

2. **Open the dashboard**
   - Simply open `reporting-dashboard-integrated.html` in your web browser
   - No server or build process needed!

3. **Configure your APIs**
   - Follow the [detailed setup instructions](SETUP-INSTRUCTIONS.md)
   - Enter your Google Analytics and Jetpack credentials
   - Click "Save Configuration"

4. **View your analytics**
   - Click "Refresh Data" to load your real analytics
   - Your configuration is saved for future visits

## 🔑 Prerequisites

You'll need:
- A **Google Analytics 4** property with the Data API enabled
- A **WordPress site** with Jetpack installed
- API credentials from both services (detailed instructions provided)

## 📖 Documentation

For detailed setup instructions, see [SETUP-INSTRUCTIONS.md](SETUP-INSTRUCTIONS.md)

The guide covers:
- How to enable Google Analytics Data API
- How to get your GA4 Property ID and API Key
- How to generate Jetpack access tokens
- Troubleshooting common issues

## 🎨 Customization

### Change Colors
Edit the CSS variables at the top of the HTML file:
```css
:root {
    --bg-primary: #0a0e1a;
    --accent-primary: #00d9ff;
    --accent-secondary: #7c3aed;
    /* ... more colors ... */
}
```

### Adjust Date Range
Modify the date calculation in the `fetchGoogleAnalytics()` function:
```javascript
// Change from 7 days to 30 days
startDate.setDate(startDate.getDate() - 30);
```

### Add More Metrics
Extend the GA4 API request to include additional metrics like conversions, events, or custom dimensions.

## 🔒 Security

- **Credentials are stored locally** in your browser's localStorage
- **No backend required** - API calls go directly from browser to Google/Jetpack
- **Never shared** - Your credentials are only sent to official Google/Jetpack APIs
- For production use, consider implementing a backend proxy for enhanced security

## 🛠️ Tech Stack

- **HTML5** - Structure
- **CSS3** - Styling with custom properties and animations
- **Vanilla JavaScript** - No frameworks, pure JS
- **Chart.js** - Data visualization
- **Google Analytics Data API** - GA4 metrics
- **Jetpack Stats API** - WordPress analytics

## 📱 Browser Support

Works on all modern browsers:
- Chrome/Edge (recommended)
- Firefox
- Safari
- Opera

## 🐛 Troubleshooting

### "GA4 API error" or "Jetpack API error"
- Verify your credentials are correct
- Check that APIs are enabled in Google Cloud Console
- Ensure proper permissions for your API key/token

### No data showing
- Confirm your GA4 property has data for the last 7 days
- Verify Property ID format: `properties/123456789`
- Check that Jetpack is active and collecting stats

### CORS errors
- Google Analytics Data API supports direct browser requests
- If issues persist, consider implementing a backend proxy

See [SETUP-INSTRUCTIONS.md](SETUP-INSTRUCTIONS.md) for more detailed troubleshooting.

## 🎯 Roadmap

Future enhancements:
- [ ] Export data to CSV/Excel
- [ ] Custom date range selector
- [ ] Email reports
- [ ] Traffic alerts and notifications
- [ ] Comparison with previous periods
- [ ] E-commerce conversion tracking
- [ ] Backend proxy for enhanced security
- [ ] Multiple site support

## 🤝 Contributing

Contributions are welcome! Feel free to:
- Report bugs
- Suggest features
- Submit pull requests

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👤 Author Rudy Murillo

**Your Name**
- GitHub: [@your-username](https://github.com/your-username)
- Website: [your-website.com](https://your-website.com)

## 🙏 Acknowledgments

- [Chart.js](https://www.chartjs.org/) - Beautiful JavaScript charts
- [Google Analytics](https://analytics.google.com/) - Web analytics platform
- [Jetpack](https://jetpack.com/) - WordPress analytics and security

---

⭐ **Star this repo** if you find it useful!

📫 **Questions?** Open an issue or check the [setup guide](SETUP-INSTRUCTIONS.md)
