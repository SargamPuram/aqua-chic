import AWS from 'aws-sdk';

AWS.config.update({
  region: process.env.AWS_REGION,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

const dynamoDb = new AWS.DynamoDB.DocumentClient();

export const handler = async function(event, context) {
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
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Could not retrieve leaderboard data' }),
    };
  }
};
