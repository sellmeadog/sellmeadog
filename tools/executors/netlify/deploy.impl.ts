import { ExecutorContext } from '@nrwl/devkit';
import { spawn } from 'child_process';

export interface EchoExecutorOptions {
  dir: string;
  prod?: boolean;
  site?: string;
}

export default async function echoExecutor(
  {
    dir,
    prod = false,
    site = process.env.NETLIFY_SITE_ID,
  }: EchoExecutorOptions,
  context: ExecutorContext
) {
  const command = prod
    ? `netlify deploy --dir=${dir} --prod --site=${site}`
    : `netlify deploy --dir=${dir} --site=${site}`;

  console.info(`Executing command: ${command}`);

  const { success, reason } = await execute(command);

  if (reason) {
    console.error(reason);
  }

  return { success };
}

async function execute(command: string) {
  return new Promise<{ success: boolean; reason?: string }>(
    (resolve, reject) => {
      const child = spawn('npx', command.split(' '), {
        stdio: [process.stdin, process.stdout, process.stderr],
      });

      child.once('exit', (code) => {
        if (code === 0) {
          resolve({ success: true });
        } else {
          reject({
            success: false,
            reason: `Command: "${command}" exited with code ${code}`,
          });
        }
      });

      child.once('error', (err) => {
        reject({ success: false, reason: err.message });
      });
    }
  );
}
