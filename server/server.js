import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import multer from 'multer';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '../.env') });

const app = express();
const PORT = 3001;

// Middlewares
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Data file path
const DATA_FILE = path.join(__dirname, 'data.json');

// Mock simple token for local use
const SECRET_TOKEN = 'admin-secret-token-2026';

// Multer Storage config
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, 'uploads'))
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, uniqueSuffix + path.extname(file.originalname))
    }
});
const upload = multer({ storage: storage });

// Helper to read data
function readData() {
    const data = fs.readFileSync(DATA_FILE, 'utf8');
    return JSON.parse(data);
}

// Helper to write data
function writeData(data) {
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
}

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

// Get Content
app.get('/api/content', (req, res) => {
    try {
        const data = readData();
        res.json({ success: true, data });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to read data' });
    }
});

// Update Content
app.post('/api/content', requireAuth, (req, res) => {
    try {
        const newContent = req.body;
        writeData(newContent);
        res.json({ success: true, message: 'Content updated successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to save data' });
    }
});

// Upload image
app.post('/api/upload', requireAuth, upload.single('image'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ success: false, message: 'No file uploaded' });
    }
    // Return the filename so the frontend can save it in the JSON config
    res.json({ success: true, filename: req.file.filename });
});

app.listen(PORT, () => {
    console.log(`Backend server running on http://localhost:${PORT}`);
});
