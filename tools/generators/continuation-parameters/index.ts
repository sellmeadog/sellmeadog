import { Tree, writeJsonFile } from '@nrwl/devkit';
import { exec } from 'child_process';
import { resolve } from 'path';
import { promisify } from 'util';

interface GeneratorSchema {
  base?: string;
  head?: string;
}

export default async function (
  _: Tree,
  { base = process.env.NX_BASE, head = process.env.NX_HEAD }: GeneratorSchema
) {
  if (!base) {
    console.warn('No base SHA provided; defaulting to HEAD~1');
    base = 'HEAD~1';
  }

  if (!head) {
    console.warn('No head SHA specified; defaulting to HEAD');
    head = 'HEAD';
  }

  const command = `npx nx affected:apps --base=${base} --head=${head} --plain`;
  console.log('\nExecuting command:', command, '\n');

  const { stderr, stdout } = await promisify(exec)(command);

  if (stderr) {
    console.error('Command failed:', stderr, '\n');
  }

  if (stdout) {
    const path = resolve('tmp', 'continuation-parameters.json');
    const parameters = stdout
      .split(' ')
      .reduce((map, key) => ({ ...map, [key.trim()]: true }), {});

    console.log(
      'Generating continuation parameters for affected apps:',
      stdout
    );

    console.log(JSON.stringify(parameters, undefined, 2) + '\n');
    console.log('Writing parameters to', path, '\n');

    writeJsonFile(path, parameters);
  } else {
    console.warn(
      'No affected apps were detected in the workspace. No continuation parameters generated.\n'
    );
  }
}
