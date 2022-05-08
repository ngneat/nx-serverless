import type {
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
  Callback,
  Context,
} from 'aws-lambda';

export interface BodyParams<
  T extends Record<string, unknown> = Record<string, unknown>
> {
  body: T;
}

export interface QueryParams<
  T extends Record<string, unknown> = Record<string, unknown>
> {
  queryStringParameters: T;
}

export interface PathParams<
  T extends Record<string, unknown> = Record<string, unknown>
> {
  pathParameters: T;
}

export type EventParams = BodyParams | QueryParams | PathParams;

export type Handler<
  P extends EventParams,
  isProtected extends boolean = true
> = (
  event: Omit<
    APIGatewayProxyEvent,
    'body' | 'pathParameters' | 'queryStringParameters'
  > & {
    body: P extends BodyParams ? P['body'] : null;
    pathParameters: P extends PathParams ? P['pathParameters'] : null;
    queryStringParameters: P extends QueryParams
      ? P['queryStringParameters']
      : null;
  },
  context: isProtected extends true ? Context & UserContext : Context,
  callback: Callback<APIGatewayProxyResult>
) => void | Promise<APIGatewayProxyResult>;

export type UserContext = {
  user: {
    id: string;
  };
};
