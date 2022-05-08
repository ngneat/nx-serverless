export interface Environment {
  name: 'dev' | 'stg' | 'prod';
  region: string;
  profile: string;
  jwtSecret: string;
  dynamo: {
    endpoint?: string;
    tableName: string;
  };
}
