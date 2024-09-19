import commander from 'commander';
import inquirer from 'inquirer';
import chalk from 'chalk';
import fs from 'fs-extra';
import path from 'path';
import { exec } from 'child_process';
import util from 'util';

const execPromise = util.promisify(exec);

const program = new commander.Command();

async function initGit(projectPath: string) {
  try {
    await execPromise('git init', { cwd: projectPath });
    console.log(chalk.green('Initialized Git repository'));

    // 可选：创建初始提交
    // await execPromise('git add .', { cwd: projectPath });
    // await execPromise('git commit -m "Initial commit"', { cwd: projectPath });
    // console.log(chalk.green('Created initial commit'));
  } catch (error) {
    console.error(chalk.yellow('Failed to initialize Git repository:'), error);
  }
}

program
  .version('1.0.0')
  .description('A CLI for creating TypeScript libraries')
  .argument('<project-name>', 'Name of the project')
  .action(async (projectName: string) => {
    const answers = await inquirer.prompt([
      {
        type: 'input',
        name: 'description',
        message: 'Enter a description for your project:',
      },
      {
        type: 'input',
        name: 'author',
        message: 'Enter the author name:',
      },
      {
        type: 'confirm',
        name: 'useJest',
        message: 'Do you want to use Jest for testing?',
        default: true,
      },
      {
        type: 'confirm',
        name: 'initGit',
        message: 'Do you want to initialize a Git repository?',
        default: true,
      },
    ]);

    const templateDir = path.join(__dirname, '..', 'src/templates');
    const targetDir = path.join(process.cwd(), projectName);

    try {
      await fs.copy(path.join(templateDir, 'base'), targetDir);
      await fs.copy(path.join(templateDir, 'src'), path.join(targetDir, 'src'));
      await fs.copy(path.join(templateDir, '.github'), path.join(targetDir, '.github'));

      const packageJsonPath = path.join(targetDir, 'package.json');
      const packageJson = await fs.readJson(packageJsonPath);

      packageJson.name = projectName;
      packageJson.description = answers.description;
      packageJson.author = answers.author;

      if (answers.useJest) {
        packageJson.scripts.test = 'jest';
        packageJson.devDependencies['jest'] = '^29.7.0';
        packageJson.devDependencies['ts-jest'] = '^29.7.0';
        packageJson.devDependencies['@types/jest'] = '^29.7.0';
      }

      await fs.writeJson(packageJsonPath, packageJson, { spaces: 2 });

      if (answers.initGit) {
        await initGit(targetDir);
      }

      console.log(chalk.green(`Project ${projectName} created successfully!`));
      console.log(chalk.yellow('To get started:'));
      console.log(chalk.yellow(`  cd ${projectName}`));
      console.log(chalk.yellow('  pnpm install'));
      console.log(chalk.yellow('  pnpm test'));
    } catch (error) {
      console.error(chalk.red('Error creating project:'), error);
    }
  });

program.parse(process.argv);
