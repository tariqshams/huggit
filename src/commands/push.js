import fs from 'fs-extra';
import path from 'path';
import { theme } from '../utils/theme.js';
import { execa } from 'execa';

export async function pushCommand() {
  theme.header('PUSHING TO HF & GITHUB');

  const configPath = path.join(process.cwd(), '.huggit');

  if (!(await fs.pathExists(configPath))) {
    theme.error('No .huggit configuration found. Run "huggit init" first.');
    return;
  }

  const config = await fs.readJson(configPath);

  try {
    theme.step('Determining current branch...');
    const { stdout: branch } = await execa('git', ['rev-parse', '--abbrev-ref', 'HEAD']);
    theme.info(`Current branch: ${branch}`);

    theme.step(`Pushing to Hugging Face: ${config.hfRepo}`);
    await execa('git', ['push', config.hfRepo, branch], { stdio: 'inherit' });
    theme.success('Successfully pushed to Hugging Face');

    theme.step(`Pushing to GitHub: ${config.githubRepo}`);
    await execa('git', ['push', config.githubRepo, branch], { stdio: 'inherit' });
    theme.success('Successfully pushed to GitHub');

    theme.header('ALL SYNCED UP!');
  } catch (error) {
    theme.error(`Failed to push: ${error.message}`);
    if (error.stderr) {
      console.log(error.stderr);
    }
  }
}
