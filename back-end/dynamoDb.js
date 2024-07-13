import AWS from 'aws-sdk';
import 'dotenv/config';

// Load environment variables from .env file
const { MY_AWS_REGION, MY_AWS_ACCESS_KEY, MY_AWS_SECRET_KEY } = process.env;

// Configure AWS SDK for DynamoDB
AWS.config.update({
  region: MY_AWS_REGION,
  accessKeyId: MY_AWS_ACCESS_KEY_ID,
  secretAccessKey: MY_AWS_SECRET_ACCESS_KEY,
});

// Create DynamoDB DocumentClient instance
const dynamoDb = new AWS.DynamoDB.DocumentClient();

export default dynamoDb;

