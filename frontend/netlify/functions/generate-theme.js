import { generateTheme } from './Themes.js';

export const handler = async function(event, context) {
  try {
    const theme = await generateTheme();
    return {
      statusCode: 200,
      body: JSON.stringify({ theme }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};
