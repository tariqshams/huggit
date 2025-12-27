import { Command } from 'commander';
import { theme } from './utils/theme.js';
import { initCommand } from './commands/init.js';
import { pushCommand } from './commands/push.js';
import fs from 'fs-extra';
import { fileURLToPath } from 'url';
import path from 'path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const packageJson = fs.readJsonSync(path.join(__dirname, '../package.json'));

const program = new Command();

program
  .name('huggit')
  .description('Push code to Hugging Face and GitHub in one command')
  .version(packageJson.version);

program
  .command('init')
  .description('Initialize huggit in the current repository')
  .action(initCommand);

program
  .command('push')
  .description('Push changes to both Hugging Face and GitHub')
  .action(pushCommand);

program.parse(process.argv);

if (!process.argv.slice(2).length) {
  program.outputHelp();
}
