import { listPhotos } from './s3.js';

export const handler = async function(event, context) {
  try {
    const photos = await listPhotos();
    return {
      statusCode: 200,
      body: JSON.stringify({ photos }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};
