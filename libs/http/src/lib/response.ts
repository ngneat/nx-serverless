import { APIGatewayProxyResult } from 'aws-lambda';

export function httpResponse(
  data: Record<string, any>,
  { statusCode = 200, ...rest }: Omit<APIGatewayProxyResult, 'body'> = {
    statusCode: 200,
  }
): APIGatewayProxyResult {
  return {
    body: JSON.stringify({ data }),
    statusCode,
    ...rest,
  };
}

export function httpError(
  error: any,
  { statusCode = 400, ...rest }: Omit<APIGatewayProxyResult, 'body'> = {
    statusCode: 200,
  }
): APIGatewayProxyResult {
  return {
    body: JSON.stringify({ error }),
    statusCode,
    ...rest,
  };
}
