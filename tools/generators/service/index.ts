import {
  formatFiles,
  generateFiles,
  installPackagesTask,
  joinPathFragments,
  names,
  Tree,
} from '@nrwl/devkit';
import { Schema } from './schema';
import { addJest } from './jest-config';
import { addWorkspaceConfig } from './workspace-config';

export default async (host: Tree, schema: Schema) => {
  const serviceRoot = `services/${schema.name}`;

  const { fileName } = names(schema.name);

  generateFiles(host, joinPathFragments(__dirname, './files'), serviceRoot, {
    ...schema,
    tmpl: '',
    fileName,
  });

  addWorkspaceConfig(host, schema.name, serviceRoot);

  await addJest(host, schema.name);

  await formatFiles(host);

  return () => {
    installPackagesTask(host);
  };
};
