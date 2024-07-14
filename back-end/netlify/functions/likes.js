import { getLikes } from '../../likes.js';

export const handler = async (event) => {
  const { photoId } = event.pathParameters;
  try {
    const likes = await getLikes(photoId);
    return {
      statusCode: 200,
      body: JSON.stringify({ likes }),
    };
  } catch (error) {
    console.error('Error getting likes:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};
