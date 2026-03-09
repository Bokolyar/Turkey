import express from 'express';
import cors from 'cors';
import { createClient } from '@supabase/supabase-js';
import multer from 'multer';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '../.env') });

const app = express();
const PORT = process.env.PORT || 3001;

// Supabase Setup
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

// Middlewares
app.use(cors());
app.use(express.json());

// Mock simple token for local use
const SECRET_TOKEN = 'admin-secret-token-2026';

// Multer Storage config (temporary local storage before Supabase upload)
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// --- Endpoints ---

// Login
app.post('/api/auth/login', (req, res) => {
    const { username, password } = req.body;

    if (username === process.env.ADMIN_USER && password === process.env.ADMIN_PASS) {
        res.json({ success: true, token: SECRET_TOKEN });
    } else {
        res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
});

// Middleware to protect routes
const requireAuth = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (token === SECRET_TOKEN) {
        next();
    } else {
        res.status(403).json({ success: false, message: 'Unauthorized' });
    }
};

// Get Content from Supabase
app.get('/api/content', async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('settings')
            .select('content')
            .eq('key', 'landing_page')
            .single();

        if (error) throw error;
        res.json({ success: true, data: data.content });
    } catch (error) {
        console.error(' Supabase Fetch Error:', error);
        res.status(500).json({ success: false, message: 'Failed to fetch content from Supabase' });
    }
});

// Update Content in Supabase
app.post('/api/content', requireAuth, async (req, res) => {
    try {
        const newContent = req.body;
        const { error } = await supabase
            .from('settings')
            .upsert({ key: 'landing_page', content: newContent }, { onConflict: 'key' });

        if (error) throw error;
        res.json({ success: true, message: 'Content updated successfully in Supabase' });
    } catch (error) {
        console.error(' Supabase Update Error:', error);
        res.status(500).json({ success: false, message: 'Failed to update content in Supabase' });
    }
});

// Upload image to Supabase Storage
app.post('/api/upload', requireAuth, upload.single('image'), async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ success: false, message: 'No file uploaded' });
    }

    try {
        const file = req.file;
        const fileExt = path.extname(file.originalname);
        const fileName = `${Date.now()}-${Math.round(Math.random() * 1E9)}${fileExt}`;
        const filePath = `${fileName}`;

        // Upload to Supabase Bucket 'uploads' (Make sure to create this bucket in Supabase)
        const { data, error } = await supabase.storage
            .from('uploads')
            .upload(filePath, file.buffer, {
                contentType: file.mimetype,
                upsert: true
            });

        if (error) {
            // Check if bucket doesn't exist
            if (error.message.includes('bucket not found') || error.error === 'Bucket not found') {
                return res.status(500).json({
                    success: false,
                    message: 'Supabase Storage Bucket "uploads" not found. Please create a public bucket named "uploads" in Supabase Storage.'
                });
            }
            throw error;
        }

        // Get Public URL
        const { data: { publicUrl } } = supabase.storage
            .from('uploads')
            .getPublicUrl(filePath);

        res.json({ success: true, filename: publicUrl });
    } catch (error) {
        console.error(' Supabase Storage Error:', error);
        res.status(500).json({ success: false, message: 'Failed to upload image to Supabase Storage' });
    }
});

// Start server ONLY in local development
if (process.env.NODE_ENV !== 'production' && !process.env.VERCEL) {
    app.listen(PORT, () => {
        console.log(`Backend server running on http://localhost:${PORT}`);
    });
}

export default app;
