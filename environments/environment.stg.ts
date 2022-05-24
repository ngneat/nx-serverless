import type { Environment } from './environment.types';

export const env: Environment = {
  name: 'stg',
  profile: '',
  jwtSecret: 'secret',
  dynamo: {
    tableName: `stg-AppTable`,
  },
  region: 'eu-west-1',
};
