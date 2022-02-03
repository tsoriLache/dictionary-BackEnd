require('dotenv').config();

const AWS = require('aws-sdk');

AWS.config.update({
  region: 'us-east-1',
  accessKeyId: process.env.aws_access_key_id,
  accessSecretKey: process.env.aws_secret_access_key,
});

const client = new AWS.DynamoDB.DocumentClient();

module.exports = client;
