#!/usr/bin/env node

import { input, select } from "@inquirer/prompts"
import { execSync } from "child_process"
import * as fs from "fs"
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
  const packageType = await select({
    message: "What type of package do you want to create?",
    choices: [{ value: "node" }, { value: "react" }],
  })
  let packageName = await input({
    message: "What is the name of your library?",
  })
  packageName = toKebabCase(packageName)
  const description = await input({
    message: "Provide a description for your library:",
  })
  const author = await input({
    message: "Author name:",
  })
  const packageDir = await input({
    message: "Where would you like to generate the code?",
    default: "./",
  })
  const isReact = packageType === "react"

  // Create folder
  const folderPath = path.join(packageDir, packageName)
  fs.mkdirSync(folderPath, { recursive: true })

  // Create core files
  createGitignore(folderPath)
  createPrettierrc(folderPath)
  createTSConfig(folderPath, { react: isReact })
  createReadme(folderPath, { packageName, description })
  createPackage(folderPath, { isReact, packageName, description, author })

  // Create src folder and index.ts
  const srcFolderPath = path.join(folderPath, "src")
  fs.mkdirSync(srcFolderPath, { recursive: true })
  fs.writeFileSync(path.join(srcFolderPath, "index.ts"), "// todo\n")
  fs.writeFileSync(path.join(srcFolderPath, "index.test.ts"), "// todo\n")

  // Create files for demo
  if (isReact) {
    createDemo(folderPath, { packageName })
    createHTML(folderPath, { packageName })
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
