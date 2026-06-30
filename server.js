import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import emailHandler from './api/send-email.js';
import webpush from 'web-push';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const publicVapidKey = process.env.PUBLIC_VAPID_KEY || 'BEl62iUYgUivxIkv69yViEuiBIa-Ib9-SkvMeAtA3LFgDyepq73kcRS9v4-R9N8hYQ5mYJvV9Kk5tQ7tT-Lg-Zk';
const privateVapidKey = process.env.PRIVATE_VAPID_KEY || 'k_E4x0sX8x000000000000000000000000000000000';
// In a real application, you shouldn't hardcode these. Generate them and store in .env
try {
    webpush.setVapidDetails('mailto:test@example.com', publicVapidKey, privateVapidKey);
} catch (e) {
    console.error('Error setting VAPID details:', e.message);
}

// In-memory store for subscriptions (in production, use a database)
const subscriptions = [];

app.get('/api/vapidPublicKey', (req, res) => {
    res.send(publicVapidKey);
});

app.post('/api/subscribe', (req, res) => {
    const subscription = req.body;
    subscriptions.push(subscription);
    res.status(201).json({});
});

app.post('/api/test-notification', (req, res) => {
    const payload = JSON.stringify({
        title: 'Venthra Solutions',
        body: 'This is a test notification from VTS!',
        icon: '/vts-logo.jpeg'
    });

    const promises = subscriptions.map(sub => 
        webpush.sendNotification(sub, payload).catch(err => console.error('Push error:', err))
    );

    Promise.all(promises).then(() => res.status(200).json({ success: true }));
});


app.post('/api/send-email', async (req, res) => {
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] Incoming Lead: ${req.body.name} (${req.body.email})`);

    try {
        await emailHandler(req, res);
        console.log(`[${timestamp}] ✅ Email cycle completed for ${req.body.email}`);
    } catch (err) {
        console.error(`[${timestamp}] ❌ Critical Error in /api/send-email:`, err);
        res.status(500).json({
            success: false,
            message: 'Internal Server Error while sending inquiry',
            error: err.message
        });
    }
});

app.listen(port, () => {
    console.log(`🚀 VTS CRM Server active at http://localhost:${port}`);
    console.log(`📡 Ready to handle project inquiries...`);
});
