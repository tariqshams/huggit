import inquirer from 'inquirer';
import fs from 'fs-extra';
import path from 'path';
import { theme, orangeBold } from '../utils/theme.js';
import { execa } from 'execa';

export async function initCommand() {
  theme.header('INITIALIZING HUGGIT');

  try {
    // Check if git is initialized
    try {
      await execa('git', ['rev-parse', '--is-inside-work-tree']);
    } catch (error) {
      theme.error('Git is not initialized in this directory. Run "git init" first.');
      return;
    }

    const answers = await inquirer.prompt([
      {
        type: 'input',
        name: 'hfRepo',
        message: 'Enter your Hugging Face repository URL:',
        validate: (input) => input.includes('huggingface.co') || 'Please enter a valid Hugging Face URL',
      },
      {
        type: 'input',
        name: 'githubRepo',
        message: 'Enter your GitHub repository URL:',
        validate: (input) => input.includes('github.com') || 'Please enter a valid GitHub repository URL',
      },
    ]);

    const config = {
      hfRepo: answers.hfRepo,
      githubRepo: answers.githubRepo,
      updatedAt: new Date().toISOString(),
    };

    const configPath = path.join(process.cwd(), '.huggit');
    await fs.writeJson(configPath, config, { spaces: 2 });
    theme.success('.huggit configuration file created.');

    const { addToGitignore } = await inquirer.prompt([
      {
        type: 'confirm',
        name: 'addToGitignore',
        message: 'Would you like to add .huggit to your .gitignore?',
        default: true,
      },
    ]);

    if (addToGitignore) {
      const gitignorePath = path.join(process.cwd(), '.gitignore');
      let gitignoreContent = '';
      
      if (await fs.pathExists(gitignorePath)) {
        gitignoreContent = await fs.readFile(gitignorePath, 'utf8');
      }

      if (!gitignoreContent.includes('.huggit')) {
        const separator = gitignoreContent.length > 0 && !gitignoreContent.endsWith('\n') ? '\n' : '';
        await fs.appendFile(gitignorePath, `${separator}.huggit\n`);
        theme.success('.huggit added to .gitignore');
      } else {
        theme.info('.huggit is already in .gitignore');
      }
    }

    theme.success('Huggit initialized successfully!');
    theme.info(`Use ${orangeBold('huggit push')} to sync your changes.`);
  } catch (error) {
    if (error.isTtyError) {
      theme.error('Prompt could not be rendered in the current environment.');
    } else {
      theme.error(`An error occurred: ${error.message}`);
    }
  }
}
