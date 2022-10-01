'use strict';

const AWS = require('aws-sdk');

const fetchTodos = async () => {
  // Get access to DynamoDB
  const dynamodb = new AWS.DynamoDB.DocumentClient();

  let todos;

  // Get all records (may return an error, so use trycatch)
  try {
    const results = await dynamodb
      .scan({
        TableName: 'TodoTable',
      })
      .promise();
    todos = results.Items;
  } catch (err) {
    // To view in CloudWatch
    console.log(err);
  }

  return {
    statusCode: 200,
    body: JSON.stringify(todos),
  };
};

module.exports = {
  handler: fetchTodos,
};
