import middy from '@middy/core';
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import jwt from 'jsonwebtoken';
import { env } from '@app/env';
import { httpError } from './response';
import { Handler, UserContext } from './types';

export function authMiddleware(): middy.MiddlewareObj<
  Parameters<Handler<any>>[0],
  APIGatewayProxyResult
> {
  const before: middy.MiddlewareFn<
    APIGatewayProxyEvent,
    APIGatewayProxyResult
  > = async (request) => {
    const authHeader = request.event.headers['Authorization'];

    if (authHeader) {
      const token = authHeader.split(' ')[1];

      try {
        const data = jwt.verify(token, env.jwtSecret);
        (request.context as unknown as UserContext).user =
          data as UserContext['user'];

        return Promise.resolve();
      } catch (error) {
        return httpError(error, { statusCode: 401 });
      }
    }

    return httpError('Missing token', { statusCode: 401 });
  };

  return {
    before,
  };
}
