import * as fs from "fs";
import * as path from "path";

export function createPackageJson(
  folderPath: string,
  answers: {
    appName: string;
    description: string;
    author: string;
  }
) {
  const packageData = {
    name: answers.appName,
    description: answers.description,
    author: answers.author,
    version: "0.0.0",
    license: "MIT",
    type: "module",
    main: "dist/index.js",
    types: "dist/index.d.ts",
    scripts: {
      build: "tsc",
      test: "jest",
      prepublishOnly: "npm run build",
    },
  };
  const packageJsonContent = JSON.stringify(packageData, null, 2);
  fs.writeFileSync(path.join(folderPath, "package.json"), packageJsonContent);
}
