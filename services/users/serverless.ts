import type { Serverless } from 'serverless/aws';
import { baseServerlessConfig } from '../../serverless.base';
import { tableResource } from '../../environments/environment.serverless';

const serverlessConfig: Partial<Serverless> = {
  ...baseServerlessConfig,
  service: 'users',
  provider: {
    ...baseServerlessConfig.provider,
    iam: {
      role: {
        statements: [
          {
            Effect: 'Allow',
            Action: ['dynamodb:GetItem'],
            Resource: tableResource,
          },
        ],
      },
    },
  },
  custom: {
    ...baseServerlessConfig.custom,
    'serverless-offline': {
      lambdaPort: 3002,
      httpPort: 3003,
    },
  },
  functions: {
    'get-user': {
      handler: 'src/get-user/get-user-handler.main',
      events: [
        {
          http: {
            method: 'get',
            path: 'user',
          },
        },
      ],
    },
  },
};

module.exports = serverlessConfig;
