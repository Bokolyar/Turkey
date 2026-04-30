import express from 'express';
import cors from 'cors';
import { createClient } from '@supabase/supabase-js';
import multer from 'multer';
import sharp from 'sharp';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import rateLimit from 'express-rate-limit';
import cookieParser from 'cookie-parser';
import xss from 'xss-clean';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '../.env') });

const app = express();
const PORT = process.env.PORT || 3001;

// Supabase Setup
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

// Rate Limiting
const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: { success: false, message: 'Too many requests, please try again later.' },
    standardHeaders: true,
    legacyHeaders: false,
});

// Middlewares
app.use(cors({ origin: true, credentials: true }));
app.use(express.json({ limit: '10kb' }));
app.use(cookieParser());
app.use(xss());
app.use('/api', apiLimiter);

// Serve local uploads folder
app.use('/api/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Mock token
const SECRET_TOKEN = 'admin-secret-token-2026';

// Multer Storage
const storage = multer.memoryStorage();
const upload = multer({
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 }
});

// --- Endpoints ---

// Login with HttpOnly Cookie
app.post('/api/auth/login', (req, res) => {
    const { username, password } = req.body;
    if (username === process.env.ADMIN_USER && password === process.env.ADMIN_PASS) {
        res.cookie('admin_token', SECRET_TOKEN, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 3600000
        });
        res.json({ success: true, message: 'Logged in' });
    } else {
        res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
});

app.post('/api/auth/logout', (req, res) => {
    res.clearCookie('admin_token');
    res.json({ success: true });
});

app.get('/api/auth/check', (req, res) => {
    if (req.cookies.admin_token === SECRET_TOKEN) {
        res.json({ success: true });
    } else {
        res.status(401).json({ success: false });
    }
});

// Middleware to protect routes
const requireAuth = (req, res, next) => {
    const token = req.cookies.admin_token || req.headers.authorization?.split(' ')[1];
    if (token === SECRET_TOKEN) {
        next();
    } else {
        res.status(403).json({ success: false, message: 'Unauthorized' });
    }
};

app.get('/api/content', async (req, res) => {
    try {
        const { data, error } = await supabase.from('settings').select('content').eq('key', 'landing_page').single();
        if (error) throw error;
        res.json({ success: true, data: data.content });
    } catch (error) {
        console.error(' Supabase Fetch Error:', error);
        res.status(500).json({ success: false });
    }
});

app.post('/api/content', requireAuth, async (req, res) => {
    try {
        const { error } = await supabase.from('settings').upsert({ key: 'landing_page', content: req.body }, { onConflict: 'key' });
        if (error) throw error;
        res.json({ success: true });
    } catch (error) {
        console.error(' Supabase Update Error:', error);
        res.status(500).json({ success: false });
    }
});

app.post('/api/upload', requireAuth, upload.single('image'), async (req, res) => {
    if (!req.file) return res.status(400).json({ success: false });
    try {
        const webpBuffer = await sharp(req.file.buffer).webp({ quality: 80 }).toBuffer();
        const fileName = `${Date.now()}.webp`;
        const { error } = await supabase.storage.from('uploads').upload(fileName, webpBuffer, { contentType: 'image/webp' });
        if (error) throw error;
        const { data: { publicUrl } } = supabase.storage.from('uploads').getPublicUrl(fileName);
        res.json({ success: true, filename: publicUrl });
    } catch (error) {
        console.error(' Upload Error:', error);
        res.status(500).json({ success: false });
    }
});

if (process.env.NODE_ENV !== 'production' || !process.env.VERCEL) {
    app.listen(PORT, '0.0.0.0', () => console.log(`Backend running on port ${PORT}`));
}

export default app;
