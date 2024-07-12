import AWS from 'aws-sdk';
import 'dotenv/config';

// Load environment variables from .env file
const { AWS_REGION, AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY } = process.env;

// Configure AWS SDK for DynamoDB
AWS.config.update({
  region: AWS_REGION,
  accessKeyId: AWS_ACCESS_KEY_ID,
  secretAccessKey: AWS_SECRET_ACCESS_KEY,
});

// Create DynamoDB DocumentClient instance
const dynamoDb = new AWS.DynamoDB.DocumentClient();

export default dynamoDb;

