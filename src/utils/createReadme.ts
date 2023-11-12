import * as fs from "fs"
import * as path from "path"

export function createReadme(
  folderPath: string,
  options: {
    packageName: string
    description: string
  }
) {
  const content = [
    "# " + options.packageName,
    "\n",
    "\n",
    options.description,
    "\n",
  ].join("")
  fs.writeFileSync(path.join(folderPath, "readme.md"), content)
}
