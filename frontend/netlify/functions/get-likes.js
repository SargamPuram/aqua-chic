import { getLikes } from './likes.js';

export const handler = async function(event, context) {
  const { photoId } = event.queryStringParameters;
  try {
    const likes = await getLikes(photoId);
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
