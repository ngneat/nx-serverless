// We don't want to expose these errors to the client.
// We only log them to see them in our debug/monitor tool.
export function dbErrorLogger(err: any) {
  if (!err) {
    console.log('Encountered error object was empty');
    return;
  }

  if (!err.code) {
    console.log(
      `An exception occurred, investigate and configure retry strategy. Error: ${JSON.stringify(
        err
      )}`
    );

    return;
  }

  switch (err.code) {
    case 'ConditionalCheckFailedException':
      console.log(
        `Condition check specified in the operation failed, review and update the condition check before retrying. Error: ${err.message}`
      );
      return;
    case 'TransactionConflictException':
      console.log(`Operation was rejected because there is an ongoing transaction for the item, generally safe to retry ' +
       'with exponential back-off. Error: ${err.message}`);
      return;
    case 'ItemCollectionSizeLimitExceededException':
      console.log(
        `An item collection is too large, you're using Local Secondary Index and exceeded size limit of` +
          `items per partition key. Consider using Global Secondary Index instead. Error: ${err.message}`
      );
      return;
    case 'InternalServerError':
      console.log(
        `Internal Server Error, generally safe to retry with exponential back-off. Error: ${err.message}`
      );
      return;
    case 'ProvisionedThroughputExceededException':
      console.log(
        `Request rate is too high. If you're using a custom retry strategy make sure to retry with exponential back-off. ` +
          `Otherwise consider reducing frequency of requests or increasing provisioned capacity for your table or secondary index. Error: ${err.message}`
      );
      return;
    case 'ResourceNotFoundException':
      console.log(
        `One of the tables was not found, verify table exists before retrying. Error: ${err.message}`
      );
      return;
    case 'ServiceUnavailable':
      console.log(
        `Had trouble reaching DynamoDB. generally safe to retry with exponential back-off. Error: ${err.message}`
      );
      return;
    case 'ThrottlingException':
      console.log(
        `Request denied due to throttling, generally safe to retry with exponential back-off. Error: ${err.message}`
      );
      return;
    case 'UnrecognizedClientException':
      console.log(
        `The request signature is incorrect most likely due to an invalid AWS access key ID or secret key, fix before retrying. ` +
          `Error: ${err.message}`
      );
      return;
    case 'ValidationException':
      console.log(
        `The input fails to satisfy the constraints specified by DynamoDB, ` +
          `fix input before retrying. Error: ${err.message}`
      );
      return;
    case 'RequestLimitExceeded':
      console.log(
        `Throughput exceeds the current throughput limit for your account, ` +
          `increase account level throughput before retrying. Error: ${err.message}`
      );
      return;
    default:
      console.log(
        `An exception occurred, investigate and configure retry strategy. Error: ${err.message}`
      );
      return;
  }
}
