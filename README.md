Certainly. Here's the README.md content in English:

# ts-lib-scaffold

ts-lib-scaffold is a command-line interface (CLI) tool for creating TypeScript libraries. It helps developers quickly set up the basic structure of a TypeScript library project and configure common development tools.

## Features

- Quickly create TypeScript library project structure
- Automatically configure TypeScript, ESLint, Prettier, Jest, and other development tools
- Support for monorepo structure
- Integrated GitHub Actions for continuous integration
- Use Rollup for building, supporting multiple output formats (ESM, CommonJS, UMD)

## Installation

```bash
npm install -g ts-lib-scaffold
```

## Usage

```bash
ts-lib-cli <project-name>
```

After running the command, the CLI will guide you through the project creation process, including:

1. Entering project description
2. Entering author name
3. Choosing whether to use Jest for testing
4. Choosing whether to initialize a Git repository

## Project Structure

The created project will contain the following main files and directories:

```
<project-name>/
├── .github/
│   └── workflows/
│       ├── lint-and-type.yml
│       └── test.yml
├── src/
│   └── hello.ts
├── .gitignore
├── babel.config.js
├── eslint.config.mjs
├── jest.config.ts
├── package.json
├── rollup.config.js
├── tsconfig.json
└── README.md
```

## Development Scripts

The project includes the following common npm scripts:

```json
"scripts": {
  "typecheck": "tsc",
  "typecheck:ci": "pnpm -r --parallel run typecheck",
  "build": "concurrently 'pnpm:build:*'",
  "build:zustand": "rollup -c --package zustand",
  "test": "jest --passWithNoTests --config jest.config.ts",
  "prettier": "prettier '**/{examples,src,__tests__,website}/**/*.{js,jsx,ts,tsx,md}' --write",
  "prettier:ci": "prettier '**/{examples,src,__tests__,website}/**/*.{js,jsx,ts,tsx,md}' --list-different",
  "eslint": "eslint '**/src/*.{js,jsx,ts,tsx}'",
  "eslint:ci": "eslint '**/src/*.{js,jsx,ts,tsx}'"
}
```

## Configuration Files

The project includes the following main configuration files:

- `tsconfig.json`: TypeScript configuration
- `eslint.config.mjs`: ESLint configuration
- `babel.config.js`: Babel configuration
- `rollup.config.js`: Rollup build configuration
- `jest.config.ts` and `jest.preset.js`: Jest test configuration

## GitHub Actions

The project automatically configures two GitHub Actions workflows:

1. Test workflow: Runs tests on push to main branch or PR creation
2. Code check workflow: Runs lint and type checking on push to main branch or PR creation

## Contributing

Issues and pull requests are welcome to improve this project.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

This README.md provides basic information about the project, installation and usage instructions, project structure, development scripts, and an overview of the main configuration files. You can further refine or modify this README file as needed.