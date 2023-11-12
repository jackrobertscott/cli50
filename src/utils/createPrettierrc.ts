import * as fs from "fs"
import * as path from "path"

export function createPrettierrc(folderPath: string) {
  const data = {
    semi: false,
    bracketSpacing: true,
    singleQuote: true,
    tabWidth: 2,
  }
  const content = JSON.stringify(data, null, 2)
  fs.writeFileSync(path.join(folderPath, ".prettierrc"), content)
}
