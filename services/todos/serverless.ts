import { tableResource } from '../../environments/environment.serverless';
import type { Serverless } from 'serverless/aws';
import { baseServerlessConfig } from '../../serverless.base';

const serverlessConfig: Partial<Serverless> = {
  ...baseServerlessConfig,
  service: `todos`,
  provider: {
    ...baseServerlessConfig.provider,
    iam: {
      role: {
        statements: [
          {
            Effect: 'Allow',
            Action: [
              'dynamodb:Query',
              'dynamodb:GetItem',
              'dynamodb:PutItem',
              'dynamodb:UpdateItem',
            ],
            Resource: tableResource,
          },
        ],
      },
    },
  },
  custom: {
    ...baseServerlessConfig.custom,
    'serverless-offline': {
      lambdaPort: 3004,
      httpPort: 3005,
    },
  },
  functions: {
    'get-todos': {
      handler: 'src/get-todos/get-todos-handler.main',
      events: [
        {
          http: {
            method: 'get',
            path: 'todos',
          },
        },
      ],
    },
    'get-todo': {
      handler: 'src/get-todo/get-todo-handler.main',
      events: [
        {
          http: {
            method: 'get',
            path: 'todos/{id}',
          },
        },
      ],
    },
    'create-todo': {
      handler: 'src/create-todo/create-todo-handler.main',
      events: [
        {
          http: {
            method: 'post',
            path: 'todos',
          },
        },
      ],
    },
    'update-todo': {
      handler: 'src/update-todo/update-todo-handler.main',
      events: [
        {
          http: {
            method: 'put',
            path: 'todos/{id}',
          },
        },
      ],
    },
  },
};

module.exports = serverlessConfig;
