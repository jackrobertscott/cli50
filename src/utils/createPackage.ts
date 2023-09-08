import * as fs from 'fs'
import * as path from 'path'

export function createPackage(
  folderPath: string,
  options: {
    appName: string
    description: string
    author: string
  }
) {
  const data = {
    name: options.appName,
    description: options.description,
    author: options.author,
    version: '0.0.0',
    license: 'MIT',
    type: 'module',
    main: 'dist/index.js',
    types: 'dist/index.d.ts',
    scripts: {
      build: 'tsc',
      test: 'jest',
      prepublishOnly: 'npm run build',
    },
  }
  const content = JSON.stringify(data, null, 2)
  fs.writeFileSync(path.join(folderPath, 'package.json'), content)
}
