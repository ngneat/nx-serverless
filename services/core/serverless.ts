import { env } from '../../environments/environment.serverless';
import type { Serverless } from 'serverless/aws';
import { baseServerlessConfigProvider } from '../../serverless.base';

const serverlessConfig: Partial<Serverless> = {
  provider: baseServerlessConfigProvider,
  plugins: ['serverless-localstack'],
  service: 'core',
  custom: {
    localstack: {
      stages: ['local'],
      lambda: {
        mountCode: 'True',
      },
    },
  },
  resources: {
    Resources: {
      AppApiGW: {
        Type: 'AWS::ApiGateway::RestApi',
        Properties: {
          Name: `${env.name}-AppApiGW`,
        },
      },
      AppTable: {
        Type: 'AWS::DynamoDB::Table',
        Properties: {
          TableName: env.dynamo.tableName,
          AttributeDefinitions: [
            {
              AttributeName: 'PK',
              AttributeType: 'S',
            },
            {
              AttributeName: 'SK',
              AttributeType: 'S',
            },
          ],
          KeySchema: [
            {
              AttributeName: 'PK',
              KeyType: 'HASH',
            },
            {
              AttributeName: 'SK',
              KeyType: 'RANGE',
            },
          ],
          ProvisionedThroughput: {
            ReadCapacityUnits: 1,
            WriteCapacityUnits: 1,
          },
        },
      },
    },
    Outputs: {
      ApiGatewayRestApiId: {
        Value: {
          Ref: 'AppApiGW',
        },
        Export: {
          Name: `${env.name}-AppApiGW-restApiId`,
        },
      },
      ApiGatewayRestApiRootResourceId: {
        Value: {
          'Fn::GetAtt': ['AppApiGW', 'RootResourceId'],
        },
        Export: {
          Name: `${env.name}-AppApiGW-rootResourceId`,
        },
      },
    },
  },
};

module.exports = serverlessConfig;
