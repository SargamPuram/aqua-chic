import { uploadPhoto } from '../../s3.js';
import Busboy from 'busboy';
import { createHandler } from '@netlify/functions';

export const handler = createHandler(async (event) => {
  return new Promise((resolve, reject) => {
    const busboy = new Busboy({ headers: event.headers });
    let uploadData;

    busboy.on('file', (fieldname, file, filename, encoding, mimetype) => {
      const fileChunks = [];

      file.on('data', (chunk) => {
        fileChunks.push(chunk);
      });

      file.on('end', async () => {
        const fileBuffer = Buffer.concat(fileChunks);
        try {
          const url = await uploadPhoto({
            buffer: fileBuffer,
            originalname: filename,
            mimetype: mimetype
          });
          resolve({
            statusCode: 200,
            body: JSON.stringify({ url }),
          });
        } catch (error) {
          console.error('Error uploading photo:', error);
          resolve({
            statusCode: 500,
            body: JSON.stringify({ error: error.message }),
          });
        }
      });
    });

    busboy.on('error', (error) => {
      console.error('Error parsing form data:', error);
      resolve({
        statusCode: 500,
        body: JSON.stringify({ error: 'Error parsing form data' }),
      });
    });

    busboy.end(Buffer.from(event.body, 'base64'));
  });
});
