import * as fs from "fs"
import * as path from "path"

const content = `
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
  },
})
`

export function createViteConfig(folderPath: string) {
  fs.writeFileSync(path.join(folderPath, "vite.config.ts"), content.trim())
}
