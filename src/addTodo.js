'use strict';

const AWS = require('aws-sdk');
const { v4 } = require('uuid');

const addTodo = async (event) => {
  // Get access to DynamoDB
  const dynamodb = AWS.DynamoDB.DocumentClient;

  // Get information from body (client)
  const { todo } = JSON.parse(event.body);
  const createdAt = new Date();
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
  await dynamodb.put({
    TableName: 'TodoTable',
    Item: newTodo,
  });

  return {
    statusCode: 200,
    body: JSON.stringify(newTodo),
  };
};

module.exports = {
  handler: addTodo,
};
