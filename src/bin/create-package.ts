#!/usr/bin/env node

import { execSync } from "child_process"
import * as fs from "fs"
import inquirer from "inquirer"
import * as path from "path"
import { createDemo } from "../utils/createDemo.js"
import { createGitignore } from "../utils/createGitignore.js"
import { createHTML } from "../utils/createHTML.js"
import { createPackage } from "../utils/createPackage.js"
import { createPrettierrc } from "../utils/createPrettierrc.js"
import { createReadme } from "../utils/createReadme.js"
import { createTSConfig } from "../utils/createTSConfig.js"
import { createViteConfig } from "../utils/createViteConfig.js"
import { toKebabCase } from "../utils/toKebabCase.js" // .js required

async function main() {
  const answers: any = await inquirer.prompt([
    {
      type: "list",
      name: "packageType",
      message: "What type of package do you want to create?",
      choices: ["Node", "React"],
    },
    {
      type: "input",
      name: "packageName",
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
  ])
  const isReact = answers.packageType === "React"

  // Create folder
  answers.packageName = toKebabCase(answers.packageName)
  const folderPath = path.join(answers.folderPath, answers.packageName)
  fs.mkdirSync(folderPath, { recursive: true })

  // Create core files
  createPackage(folderPath, { ...answers, react: isReact })
  createTSConfig(folderPath, { react: isReact })
  createGitignore(folderPath)
  createReadme(folderPath, answers)
  createPrettierrc(folderPath)

  // Create src folder and index.ts
  const srcFolderPath = path.join(folderPath, "src")
  fs.mkdirSync(srcFolderPath, { recursive: true })
  fs.writeFileSync(path.join(srcFolderPath, "index.ts"), "// todo\n")
  fs.writeFileSync(path.join(srcFolderPath, "index.test.ts"), "// todo\n")

  // Create files for demo
  if (isReact) {
    createDemo(folderPath, answers)
    createHTML(folderPath, answers)
    createViteConfig(folderPath)
  }

  // Install dependencies
  let devDeps = ["typescript", "jest", "@types/jest", "@types/node"]
  if (isReact)
    devDeps = devDeps.concat([
      "@types/react",
      "@types/react-dom",
      "@vitejs/plugin-react",
      "vite",
    ])
  execSync("npm i --save-dev " + devDeps.join(" "), {
    cwd: folderPath,
    stdio: "inherit",
  })
  if (isReact) {
    const peerDeps = ["react", "react-dom", "@emotion/css"]
    execSync("npm i --save-peer " + peerDeps.join(" "), {
      cwd: folderPath,
      stdio: "inherit",
    })
  }
}

main().catch((error) => {
  console.error("Error:", error)
})
