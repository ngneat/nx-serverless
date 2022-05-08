import { addProjectConfiguration, Tree } from '@nrwl/devkit';

const buildRunCommandConfig = (dir: string, command: string) => ({
  executor: '@nrwl/workspace:run-commands',
  options: {
    cwd: dir,
    color: true,
    command: command,
  },
});

export const addWorkspaceConfig = (
  host: Tree,
  projectName: string,
  serviceRoot: string
) => {
  addProjectConfiguration(host, projectName, {
    root: serviceRoot,
    projectType: 'application',
    sourceRoot: `${serviceRoot}/src`,
    targets: {
      build: {
        ...buildRunCommandConfig(serviceRoot, 'sls package'),
      },
      serve: {
        ...buildRunCommandConfig(serviceRoot, 'sls offline start'),
      },
      deploy: {
        ...buildRunCommandConfig(serviceRoot, 'sls deploy --verbose'),
        dependsOn: [
          {
            target: 'deploy',
            projects: 'dependencies',
          },
        ],
      },
      remove: {
        ...buildRunCommandConfig(serviceRoot, 'sls remove'),
      },
      lint: {
        executor: '@nrwl/linter:eslint',
        options: {
          lintFilePatterns: [`${serviceRoot}/**/*.ts`],
        },
      },
    },
    tags: ['service'],
    implicitDependencies: ['core'],
  });
};
