#!/usr/bin/env node

import { execSync } from "child_process";
import * as fs from "fs";
import inquirer from "inquirer";
import * as path from "path";
import { createGitignore } from "../utils/createGitignore.js";
import { createPackageJson } from "../utils/createPackageJson.js";
import { createTSConfigJson } from "../utils/createTSConfigJson.js";
import { toKebabCase } from "../utils/toKebabCase.js"; // .js required

async function main() {
  const answers: any = await inquirer.prompt([
    {
      type: "input",
      name: "appName",
      message: "What is the name of your library?",
    },
    {
      type: "input",
      name: "description",
      message: "Provide a description for your library:",
    },
    {
      type: "input",
      name: "author",
      message: "Author name:",
    },
    {
      type: "input",
      name: "folderPath",
      message: "Where would you like to generate the code?",
      default: "./",
    },
  ]);
  answers.appName = toKebabCase(answers.appName);
  const folderPath = path.join(answers.folderPath, answers.appName);

  // Create folder
  fs.mkdirSync(folderPath, { recursive: true });

  // Create package.json
  createPackageJson(folderPath, answers);

  // Create tsconfig.json
  createTSConfigJson(folderPath, { react: true });

  // Create .gitignore
  createGitignore(folderPath);

  // Create src folder and index.ts
  const srcFolderPath = path.join(folderPath, "src");
  fs.mkdirSync(srcFolderPath, { recursive: true });
  fs.writeFileSync(path.join(srcFolderPath, "index.ts"), "// todo\n");

  // Create test file
  fs.writeFileSync(path.join(srcFolderPath, "index.test.ts"), "// todo\n");

  // Install dependencies
  execSync("npm i --save-dev @types/react typescript jest", {
    cwd: folderPath,
    stdio: "inherit",
  });
  execSync("npm i --save-peer react", {
    cwd: folderPath,
    stdio: "inherit",
  });
}

main().catch((error) => {
  console.error("Error:", error);
});
