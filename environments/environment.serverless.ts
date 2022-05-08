// Serverless configuration files don't work with esbuild,
// so this workaround must be used when environment variables are needed in the serverless configuration files.
export const envName = process.env.NODE_ENV;
const envFile = process.env.NODE_ENV ? `.${process.env.NODE_ENV}` : '';

export const { env } = require(`./environment${envFile}.ts`);

export const tableResource = `arn:aws:dynamodb:${env.region}:*:table/${env.dynamo.tableName}`;
