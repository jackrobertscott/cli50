import * as fs from 'fs'
import * as path from 'path'

export function createPackage(
  folderPath: string,
  options: {
    packageName: string
    description: string
    author: string
    react: boolean
  }
) {
  const data = {
    name: options.packageName,
    description: options.description,
    author: options.author,
    version: '0.1.0',
    license: 'MIT',
    main: 'dist/index.js',
    types: 'dist/index.d.ts',
    scripts: {
      build: 'tsc',
      test: 'jest',
      prepublishOnly: 'npm run build',
    },
  }
  if (options.react) {
    Object.assign(data, { type: 'module' })
    Object.assign(data.scripts, { dev: 'vite' })
  }
  const content = JSON.stringify(data, null, 2)
  fs.writeFileSync(path.join(folderPath, 'package.json'), content)
}
