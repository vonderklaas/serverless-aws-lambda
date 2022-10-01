'use strict';

const AWS = require('aws-sdk');

const fetchTodo = async (event) => {
  // Get access to DynamoDB
  const dynamodb = new AWS.DynamoDB.DocumentClient();

  // Get id
  const { id } = event.pathParameters;

  let todo;

  // Get one todo (we use trycatch, it may not find the todo)
  try {
    const result = await dynamodb
      .get({
        TableName: 'TodoTable',
        Key: { id },
      })
      .promise();
    todo = result.Item;
  } catch (err) {
    // To view in CloudWatch
    console.log(err);
  }

  return {
    statusCode: 200,
    body: JSON.stringify(todo),
  };
};

module.exports = {
  handler: fetchTodo,
};
