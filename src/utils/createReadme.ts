import * as fs from 'fs'
import * as path from 'path'

export function createReadme(
  folderPath: string,
  options: {
    packageName: string
    description: string
  }
) {
  const content = ['# ' + options.packageName, options.description].join('\n\n')
  fs.writeFileSync(path.join(folderPath, 'README.md'), content)
}
