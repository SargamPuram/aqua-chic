import { likePhoto } from './likes.js';

export const handler = async function(event, context) {
  const { photoId } = JSON.parse(event.body);
  if (!photoId) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'photoId is required' }),
    };
  }
  try {
    const likes = await likePhoto(photoId);
    return {
      statusCode: 200,
      body: JSON.stringify({ likes }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};
