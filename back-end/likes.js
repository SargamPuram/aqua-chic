import AWS from 'aws-sdk';
import 'dotenv/config';

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION
});

const dynamodb = new AWS.DynamoDB.DocumentClient();

const TABLE_NAME = process.env.DYNAMODB_TABLE_NAME || 'Likes';

// Function to like a photo
const likePhoto = async (photoId) => {
  const params = {
    TableName: TABLE_NAME,
    Key: { photoId: photoId },
    UpdateExpression: 'ADD likes :inc',
    ExpressionAttributeValues: { ':inc': 1 },
    ReturnValues: 'UPDATED_NEW'
  };

  try {
    const data = await dynamodb.update(params).promise();
    return data.Attributes.likes;
  } catch (error) {
    console.error('Failed to like photo:', error);
    throw new Error(`Failed to like photo: ${error.message}`);
  }
};

// Function to get the number of likes for a photo
const getLikes = async (photoId) => {
  const params = {
    TableName: TABLE_NAME,
    Key: { photoId: photoId }
  };

  try {
    const data = await dynamodb.get(params).promise();
    return data.Item ? data.Item.likes : 0;
  } catch (error) {
    console.error('Failed to get likes:', error);
    throw new Error(`Failed to get likes: ${error.message}`);
  }
};

export { likePhoto, getLikes };


