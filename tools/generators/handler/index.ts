import {
  Tree,
  formatFiles,
  installPackagesTask,
  names,
  generateFiles,
  joinPathFragments,
} from '@nrwl/devkit';

interface Schema {
  name: string;
  project: string;
}

export default async function (tree: Tree, schema: Schema) {
  const serviceRoot = `services/${schema.project}/src`;

  const { fileName } = names(schema.name);

  generateFiles(tree, joinPathFragments(__dirname, './files'), serviceRoot, {
    ...schema,
    tmpl: '',
    fileName,
  });
}
