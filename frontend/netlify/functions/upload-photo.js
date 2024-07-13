import { uploadPhoto } from './s3.js';

export const handler = async function(event, context) {
  try {
    const file = event.body; // Assuming the file is in the body
    const url = await uploadPhoto(file);
    return {
      statusCode: 200,
      body: JSON.stringify({ url }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};
