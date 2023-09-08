import * as fs from 'fs'
import * as path from 'path'

export function createReadme(
  folderPath: string,
  options: {
    appName: string
    description: string
  }
) {
  const content = ['# ' + options.appName, options.description].join('\n\n')
  fs.writeFileSync(path.join(folderPath, 'README.md'), content)
}
