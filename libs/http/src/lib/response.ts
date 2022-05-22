import { APIGatewayProxyResult } from 'aws-lambda';

const corsHeaders = {
  // Change this to your domains
  'Access-Control-Allow-Origin': '*',
  // Change this to your headers
  'Access-Control-Allow-Headers': '*',
  'Access-Control-Max-Age': 86400,
}

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
    headers: {
      ...rest.headers,
      ...corsHeaders
    },
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
    headers: {
      ...rest.headers,
      ...corsHeaders
    },
  };
}
