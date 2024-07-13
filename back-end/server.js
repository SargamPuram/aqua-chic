import AWS from 'aws-sdk';
import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import multer from 'multer';
import { generateTheme } from './Themes.js';
import { uploadPhoto, listPhotos } from './s3.js';
import { likePhoto, getLikes } from './likes.js';

AWS.config.update({
  region: process.env.AWS_REGION,
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_KEY,
});

const dynamoDb = new AWS.DynamoDB.DocumentClient();

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json()); 

const upload = multer({ storage: multer.memoryStorage() });

app.get('/', (req, res) => {
  res.send('Welcome to the Theme Generator API');
});

app.get('/generate-theme', async (req, res) => {
  try {
    const theme = await generateTheme();
    res.json({ theme });
  } catch (error) {
    console.error('Error generating theme:', error);
    res.status(500).json({ error: error.message });
  }
});

app.post('/upload-photo', upload.single('photo'), async (req, res) => {
  try {
    const url = await uploadPhoto(req.file);
    res.json({ url });
  } catch (error) {
    console.error('Error uploading photo:', error);
    res.status(500).json({ error: error.message });
  }
});

app.get('/photos', async (req, res) => {
  try {
    const photos = await listPhotos();
    res.json({ photos });
  } catch (error) {
    console.error('Error listing photos:', error);
    res.status(500).json({ error: error.message });
  }
});

app.post('/like-photo', async (req, res) => {
  const { photoId } = req.body;
  if (!photoId) {
    return res.status(400).json({ error: 'photoId is required' });
  }
  try {
    const likes = await likePhoto(photoId);
    res.json({ likes });
  } catch (error) {
    console.error('Error liking photo:', error);
    res.status(500).json({ error: error.message });
  }
});

app.get('/likes/:photoId', async (req, res) => {
  const { photoId } = req.params;
  try {
    const likes = await getLikes(photoId);
    res.json({ likes });
  } catch (error) {
    console.error('Error getting likes:', error);
    res.status(500).json({ error: error.message });
  }
});

app.get('/leaderboard', async (req, res) => {
    try {
      const params = { TableName: 'Likes' };
      const data = await dynamoDb.scan(params).promise();
  
      const transformedData = data.Items.map(item => {
        const photoId = item.photoId;
        // Directly use photoId in URL without encoding
        const photoUrl = `https://aqua-chic.s3.amazonaws.com/${photoId}`;
        console.log(`Photo URL: ${photoUrl}`); // Log photo URL for debugging
        return {
          photoId,
          photoUrl,
          likes: item.likes,
        };
      });
  
      res.status(200).json(transformedData);
    } catch (error) {
      console.error('Error retrieving leaderboard data:', error);
      res.status(500).json({ error: 'Could not retrieve leaderboard data' });
    }
  });
  
  

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
