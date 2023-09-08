import * as fs from "fs";
import * as path from "path";

export function createTSConfigJson(
  folderPath: string,
  options: { react?: boolean } = {}
) {
  const tsconfigData = {
    compilerOptions: {
      target: "ES6",
      module: options.react ? "CommonJS" : "ESNext",
      outDir: "dist",
      rootDir: "src",
      strict: true,
      declaration: true,
      skipLibCheck: true,
      esModuleInterop: true,
      forceConsistentCasingInFileNames: true,
    },
    include: ["src/**/*.ts"],
    exclude: ["node_modules", "tests"],
  };
  if (options.react) {
    Object.assign(tsconfigData.compilerOptions, { jsx: "react" });
    tsconfigData.include.push("src/**/*.tsx");
  }
  const tsconfigContent = JSON.stringify(tsconfigData, null, 2);
  fs.writeFileSync(path.join(folderPath, "tsconfig.json"), tsconfigContent);
}
