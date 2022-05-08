import { Tree } from '@nrwl/devkit';
import { jestProjectGenerator } from '@nrwl/jest';
import { JestProjectSchema } from '@nrwl/jest/src/generators/jest-project/schema';

export const addJest = async (host: Tree, projectName: string) => {
  await jestProjectGenerator(host, <JestProjectSchema>{
    project: projectName,
    setupFile: 'none',
    testEnvironment: 'node',
    skipSerializers: false,
    skipSetupFile: false,
    supportTsx: false,
    babelJest: false,
    skipFormat: true,
  });
};
