'use strict';

const AWS = require('aws-sdk');
const { v4 } = require('uuid');

const addTodo = async (event) => {
  // Get access to DynamoDB
  const dynamodb = new AWS.DynamoDB.DocumentClient();

  // Get information from body (client)
  const { todo } = JSON.parse(event.body);
  const createdAt = new Date().toISOString();
  const id = v4();

  // Debugging
  console.log('This is an id', id);

  // Create new todo
  const newTodo = {
    id,
    todo,
    createdAt,
    completed: false,
  };

  // Save todo
  await dynamodb
    .put({
      TableName: 'TodoTable',
      Item: newTodo,
    })
    .promise();

  return {
    statusCode: 201,
    body: JSON.stringify(newTodo),
  };
};

module.exports = {
  handler: addTodo,
};
