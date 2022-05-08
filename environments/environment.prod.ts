import type { Environment } from './environment.types';

export const env: Environment = {
  name: 'prod',
  profile: '<PROFILE>',
  jwtSecret: '<SECRET>',
  dynamo: {
    tableName: `prod-AppTable`,
  },
  region: 'eu-west-1',
};
