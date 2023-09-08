#!/usr/bin/env node

import { execSync } from 'child_process'
import * as fs from 'fs'
import inquirer from 'inquirer'
import * as path from 'path'
import { createGitignore } from '../utils/createGitignore.js'
import { createPackage } from '../utils/createPackage.js'
import { createPrettierrc } from '../utils/createPrettierrc.js'
import { createReadme } from '../utils/createReadme.js'
import { createTSConfig } from '../utils/createTSConfig.js'
import { toKebabCase } from '../utils/toKebabCase.js' // .js required

async function main() {
  const answers: any = await inquirer.prompt([
    {
      type: 'input',
      name: 'appName',
      message: 'What is the name of your library?',
    },
    {
      type: 'input',
      name: 'description',
      message: 'Provide a description for your library:',
    },
    {
      type: 'input',
      name: 'author',
      message: 'Author name:',
    },
    {
      type: 'input',
      name: 'folderPath',
      message: 'Where would you like to generate the code?',
      default: './',
    },
  ])

  // Create folder
  answers.appName = toKebabCase(answers.appName)
  const folderPath = path.join(answers.folderPath, answers.appName)
  fs.mkdirSync(folderPath, { recursive: true })

  // Create core files
  createPackage(folderPath, answers)
  createTSConfig(folderPath)
  createGitignore(folderPath)
  createReadme(folderPath, answers)
  createPrettierrc(folderPath)

  // Create src folder and index.ts
  const srcFolderPath = path.join(folderPath, 'src')
  fs.mkdirSync(srcFolderPath, { recursive: true })
  fs.writeFileSync(path.join(srcFolderPath, 'index.ts'), '// todo\n')

  // Create test file
  fs.writeFileSync(path.join(srcFolderPath, 'index.test.ts'), '// todo\n')

  // Install dependencies
  execSync('npm i --save-dev @types/node typescript jest', {
    cwd: folderPath,
    stdio: 'inherit',
  })
}

main().catch((error) => {
  console.error('Error:', error)
})
