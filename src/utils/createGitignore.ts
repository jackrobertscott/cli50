import * as fs from "fs"
import * as path from "path"

export function createGitignore(folderPath: string) {
  const content = [
    ".DS_Store",
    "*.local",
    "*.log*",
    "*.env*",
    "!.env.example",
    "*.suo",
    "*.ntvs*",
    "*.njsproj",
    "*.sln",
    "*.sw?",
    "*.lock",
    "package-lock.json",
    "node_modules",
    "coverage",
    "build",
    "dist",
    "logs",
    "lib",
    ".docz",
    ".cache",
    ".vercel",
    ".vscode",
    ".idea",
    ".yarn",
  ].join("\n")
  fs.writeFileSync(path.join(folderPath, ".gitignore"), content)
}
