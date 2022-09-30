'use strict';

module.exports.lambdaFunction = async (event) => {
  // Lambda is just a function, it takes an event from API Gateway
  console.log(event);

  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: 'Lambda executed successfully!',
        statusCode: 200,
        input: event,
      },
      null,
      2
    ),
  };
};
