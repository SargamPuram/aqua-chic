import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import multer from 'multer';
import { generateTheme } from './Themes.js';
import { uploadPhoto, listPhotos } from './s3.js';

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

const upload = multer({ storage: multer.memoryStorage() });

// Root route to handle the root URL
app.get('/', (req, res) => {
    res.send('Welcome to the Theme Generator API');
});

app.get('/generate-theme', async (req, res) => {
    try {
        const theme = await generateTheme();
        res.json({ theme });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Route for uploading photos
app.post('/upload-photo', upload.single('photo'), async (req, res) => {
    try {
        console.log('Received file:', req.file); // Log received file
        const url = await uploadPhoto(req.file);
        res.json({ url });
    } catch (error) {
        console.error('Error uploading photo:', error.message); // Log error message
        res.status(500).json({ error: 'Failed to upload photo' });
    }
});


// Route for listing photos
app.get('/list-photos', async (req, res) => {
    try {
        const photos = await listPhotos();
        res.json({ photos });
    } catch (error) {
        res.status(500).json({ error: 'Failed to list photos' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
