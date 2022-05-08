import middy from '@middy/core';
import middyJsonBodyParser from '@middy/http-json-body-parser';
import { authMiddleware } from './auth.middleware';
import { EventParams, Handler } from './types';

export function createHandler<
  P extends EventParams,
  isProtected extends boolean = false
>(handler: Handler<P, isProtected>) {
  return middy(handler).use(middyJsonBodyParser());
}

export function createProtectedHandler<P extends EventParams>(
  handler: Handler<P>
) {
  return createHandler(handler).use(authMiddleware());
}
