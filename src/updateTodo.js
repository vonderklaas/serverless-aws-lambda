'use strict';

const AWS = require('aws-sdk');
const middy = require('@middy/core');
const httpJsonBodyParser = require('@middy/http-json-body-parser');

const updateTodo = async (event) => {
  // Get access to DynamoDB
  const dynamodb = new AWS.DynamoDB.DocumentClient();

  // Get 'completed' property from 'todo'
  const { completed } = event.body;
  const { id } = event.pathParameters;

  // Save todo
  await dynamodb
    .update({
      TableName: 'TodoTable',
      Key: { id },
      // Setting of value
      UpdateExpression: 'set completed = :completed',
      ExpressionAttributeValues: {
        ':completed': completed,
      },
      // Return all modified objects
      ReturnValues: 'ALL_NEW',
    })
    .promise();

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Todo was updated',
    }),
  };
};

module.exports = {
  handler: middy(updateTodo).use(httpJsonBodyParser()),
};
