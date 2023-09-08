# CLI50

## Overview

CLI50 is a powerful command line toolkit designed to streamline the process of building TypeScript packages. It provides a collection of utility scripts to quickly scaffold Node.js packages, helping you focus more on logic and features rather than boilerplate setup.

## Features

- Create a TypeScript package with a single command
- Pre-configured TypeScript and Node.js settings
- Built-in test setup with Jest
- Pre-configured Prettier for code formatting

## Installation

Install the package globally using npm:

```bash
npm install -g cli50
```

Or with yarn:

```bash
yarn global add cli50
```

## Usage

Once the package is installed globally, you can use the following scripts to create new packages.

### Create a Node.js Package

To create a new Node.js package, run the following command:

```bash
create-node-package
```

This will generate a new directory with the specified package name, containing all the files necessary for a Node.js TypeScript package.

### Create a React Package

To create a new React package, run the following command:

```bash
create-react-package
```

This will generate a new directory with the specified package name, containing all the files necessary for a React TypeScript package.

## Directory Structure

After running the above commands, your project structure will look something like this:

```plaintext
<package-name>/
├── src/
│   ├── index.ts
│   └── index.test.ts
├── .gitignore
├── .prettierrc
├── package.json
├── tsconfig.json
└── README.md
```

## Scripts

The generated package will include the following npm scripts:

- `npm run build`: Compiles the TypeScript code
- `npm run test`: Runs Jest tests

## Contributing

If you'd like to contribute to CLI50, we'd love to have your help! You can open issues or submit pull requests on our GitHub repository.

## License

CLI50 is available under the MIT license. See the LICENSE file for more details.
