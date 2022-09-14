import {
  Tree,
  names,
  generateFiles,
  joinPathFragments,
  getProjects,
  logger
} from '@nrwl/devkit';

import {
  Project,
  ScriptTarget,
  SyntaxKind,
  ObjectLiteralExpression,
  Writers,
  PropertyAssignment,
} from 'ts-morph';

const project = new Project({
  compilerOptions: {
    target: ScriptTarget.ES2020,
  },
});

interface Schema {
  name: string;
  project: string;
  method: string;
  path: string;
}

export default async function (tree: Tree, schema: Schema) {
  if (!getProjects(tree).has(schema.project)) {
    logger.error(`Project ${schema.project} does not exist.`);

    return;
  }

  const root = `services/${schema.project}`;
  const serviceSource = joinPathFragments(root, 'src');

  const n = names(schema.name);
  const serverlessPath = joinPathFragments(`services/${schema.project}`, 'serverless.ts');
  const serverless = tree.read(serverlessPath).toString()

  generateFiles(tree, joinPathFragments(__dirname, './files'), serviceSource, {
    ...schema,
    tmpl: '',
    fileName: n.fileName,
  });

  const sourceFile = project.createSourceFile('serverless.ts', serverless);
  const dec = sourceFile.getVariableDeclaration('serverlessConfig');
  const objectLiteralExpression = dec!.getInitializerIfKindOrThrow(
    SyntaxKind.ObjectLiteralExpression
  ) as ObjectLiteralExpression;

  const funcProp = objectLiteralExpression.getProperty(
    'functions'
  ) as PropertyAssignment;

  const funcValue = funcProp.getInitializer() as ObjectLiteralExpression;

  funcValue.addPropertyAssignment({
    initializer: (writer) => {
      return Writers.object({
        handler: `'src/${n.fileName}/${n.fileName}-handler.main'`,
        events: (writer) => {
          writer.write('[');
          Writers.object({
            http: Writers.object({
              method: `'${schema.method.toLowerCase()}'`,
              path: `'${schema.path}'`,
            }),
          })(writer);
          writer.write(']');
        },
      })(writer);
    },
    name: `'${n.fileName}'`,
  });

  sourceFile.formatText({ indentSize: 2 });

  tree.write(serverlessPath, sourceFile.getText());
}
