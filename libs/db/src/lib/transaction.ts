import { DynamoDB } from 'aws-sdk';

type executeTransactWriteInput = {
  client: DynamoDB;
  params: DynamoDB.Types.TransactWriteItemsInput;
};

export async function executeTransactWrite({
  client,
  params,
}: executeTransactWriteInput) {
  const transactionRequest = client.transactWriteItems(params);

  let cancellationReasons: any;

  transactionRequest.on('extractError', (response) => {
    try {
      cancellationReasons = JSON.parse(
        response.httpResponse.body.toString()
      ).CancellationReasons;
    } catch (err) {
      // suppress this just in case some types of errors aren't JSON parseable
      console.error('Error extracting cancellation error', err);
    }
  });

  return new Promise((resolve, reject) => {
    transactionRequest.send((err, response) => {
      if (err) {
        /* tslint:disable-next-line */
        (err as any).cancellationReasons = cancellationReasons;
        return reject(err);
      }
      return resolve(response);
    });
  });
}
