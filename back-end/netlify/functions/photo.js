import { listPhotos } from '../../s3.js';

export const handler = async (event) => {
  try {
    const photos = await listPhotos();
    return {
      statusCode: 200,
      body: JSON.stringify({ photos }),
    };
  } catch (error) {
    console.error('Error listing photos:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};
