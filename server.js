const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Enable CORS for your GitHub Pages site
app.use(cors({
    origin: ['https://rudesd.github.io', 'http://localhost:3000'],
    credentials: true
}));

app.use(express.json());

// Health check endpoint
app.get('/', (req, res) => {
    res.json({ status: 'Analytics API Server Running' });
});

// ==========================================
// GOOGLE ANALYTICS 4 ENDPOINT
// ==========================================

app.post('/api/ga4', async (req, res) => {
    const { propertyId, apiKey, startDate, endDate } = req.body;

    if (!propertyId || !apiKey) {
        return res.status(400).json({ error: 'Missing propertyId or apiKey' });
    }

    try {
        const response = await fetch(
            `https://analyticsdata.googleapis.com/v1beta/${propertyId}:runReport?key=${apiKey}`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    dateRanges: [
                        {
                            startDate: startDate || '7daysAgo',
                            endDate: endDate || 'today'
                        }
                    ],
                    dimensions: [
                        { name: 'date' },
                        { name: 'sessionDefaultChannelGroup' },
                        { name: 'pagePath' }
                    ],
                    metrics: [
                        { name: 'activeUsers' },
                        { name: 'screenPageViews' },
                        { name: 'bounceRate' },
                        { name: 'averageSessionDuration' }
                    ]
                })
            }
        );

        const data = await response.json();

        if (!response.ok) {
            console.error('GA4 API Error:', data);
            return res.status(response.status).json({ 
                error: data.error?.message || 'GA4 API error',
                details: data
            });
        }

        res.json(data);
    } catch (error) {
        console.error('Server error fetching GA4 data:', error);
        res.status(500).json({ error: 'Server error', message: error.message });
    }
});

// ==========================================
// JETPACK ENDPOINT
// ==========================================

app.get('/api/jetpack/:siteId', async (req, res) => {
    const { siteId } = req.params;
    const { token } = req.query;

    if (!siteId || !token) {
        return res.status(400).json({ error: 'Missing siteId or token' });
    }

    try {
        // Fetch all Jetpack stats in parallel
        // Try different endpoints to get the data Jetpack shows
        const [statsResponse, postsResponse, referrersResponse, summaryResponse] = await Promise.all([
            fetch(`https://public-api.wordpress.com/rest/v1.1/sites/${siteId}/stats`, {
                headers: { 'Authorization': `Bearer ${token}` }
            }),
            fetch(`https://public-api.wordpress.com/rest/v1.1/sites/${siteId}/stats/top-posts?max=10`, {
                headers: { 'Authorization': `Bearer ${token}` }
            }),
            fetch(`https://public-api.wordpress.com/rest/v1.1/sites/${siteId}/stats/referrers?max=10`, {
                headers: { 'Authorization': `Bearer ${token}` }
            }),
            fetch(`https://public-api.wordpress.com/rest/v1.1/sites/${siteId}/stats/summary`, {
                headers: { 'Authorization': `Bearer ${token}` }
            })
        ]);

        const [statsData, postsData, referrersData, summaryData] = await Promise.all([
            statsResponse.json(),
            postsResponse.json(),
            referrersResponse.json(),
            summaryResponse.json()
        ]);

        if (!statsResponse.ok) {
            console.error('Jetpack Stats API Error:', statsData);
            return res.status(statsResponse.status).json({ 
                error: statsData.error || 'Jetpack API error',
                message: statsData.message
            });
        }

        // Combine all data
        const combinedData = {
            ...statsData,
            top_posts: postsData,
            top_referrers: referrersData,
            summary: summaryData
        };

        res.json(combinedData);
    } catch (error) {
        console.error('Server error fetching Jetpack data:', error);
        res.status(500).json({ error: 'Server error', message: error.message });
    }
});

// ==========================================
// MULTI-CLIENT ENDPOINT (For future use)
// ==========================================

// Store client configs (in production, use a database)
const clientConfigs = {};

app.post('/api/client/config', (req, res) => {
    const { clientId, config } = req.body;
    
    if (!clientId || !config) {
        return res.status(400).json({ error: 'Missing clientId or config' });
    }

    // In production, encrypt these and store in database
    clientConfigs[clientId] = config;
    
    res.json({ success: true, message: 'Client config saved' });
});

app.get('/api/client/:clientId/analytics', async (req, res) => {
    const { clientId } = req.params;
    const config = clientConfigs[clientId];

    if (!config) {
        return res.status(404).json({ error: 'Client config not found' });
    }

    try {
        // Fetch both GA4 and Jetpack data
        const [ga4Response, jetpackResponse] = await Promise.all([
            fetch(`http://localhost:${PORT}/api/ga4`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    propertyId: config.gaPropertyId,
                    apiKey: config.gaApiKey
                })
            }),
            fetch(`http://localhost:${PORT}/api/jetpack/${config.jetpackSiteId}?token=${config.jetpackToken}`)
        ]);

        const [ga4Data, jetpackData] = await Promise.all([
            ga4Response.json(),
            jetpackResponse.json()
        ]);

        res.json({
            ga4: ga4Data,
            jetpack: jetpackData
        });
    } catch (error) {
        console.error('Error fetching client analytics:', error);
        res.status(500).json({ error: 'Server error', message: error.message });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Analytics API Server running on http://localhost:${PORT}`);
    console.log(`📊 Ready to serve analytics data`);
});
