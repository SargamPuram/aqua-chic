import AWS from 'aws-sdk';
import 'dotenv/config';

AWS.config.update({
  region: process.env.MY_AWS_REGION,
  accessKeyId: process.env.MY_AWS_ACCESS_KEY,
  secretAccessKey: process.env.MY_AWS_SECRET_KEY,
});

const dynamoDb = new AWS.DynamoDB.DocumentClient();

export const handler = async () => {
  try {
    const params = { TableName: 'Likes' };
    const data = await dynamoDb.scan(params).promise();

    const transformedData = data.Items.map(item => {
      const photoId = item.photoId;
      const photoUrl = `https://aqua-chic.s3.amazonaws.com/${photoId}`;
      return {
        photoId,
        photoUrl,
        likes: item.likes,
      };
    });

    return {
      statusCode: 200,
      body: JSON.stringify(transformedData),
    };
  } catch (error) {
    console.error('Error retrieving leaderboard data:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Could not retrieve leaderboard data' }),
    };
  }
};
