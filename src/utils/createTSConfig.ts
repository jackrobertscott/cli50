import * as fs from 'fs'
import * as path from 'path'

export function createTSConfig(
  folderPath: string,
  options: { react?: boolean } = {}
) {
  const data = {
    compilerOptions: {
      target: 'ES6',
      module: options.react ? 'CommonJS' : 'ESNext',
      outDir: 'dist',
      rootDir: 'src',
      strict: true,
      declaration: true,
      skipLibCheck: true,
      esModuleInterop: true,
      forceConsistentCasingInFileNames: true,
    },
    include: ['src/**/*.ts'],
    exclude: ['node_modules', 'src/**/*.test.ts'],
  }
  if (options.react) {
    Object.assign(data.compilerOptions, { jsx: 'react' })
    data.include.push('src/**/*.tsx')
  }
  const content = JSON.stringify(data, null, 2)
  fs.writeFileSync(path.join(folderPath, 'tsconfig.json'), content)
}
