import * as fs from 'fs'
import * as path from 'path'

const createContent = (title: string) => `
import { createElement } from 'react'
import { createRoot } from 'react-dom/client'

const root = createElement('div', { style: { color: 'green' } }, ${title})

createRoot(document.getElementById('root')!).render(root)
`

export function createDemo(
  folderPath: string,
  options: { packageName: string }
) {
  const demoFolderPath = path.join(folderPath, 'demo')
  fs.mkdirSync(demoFolderPath, { recursive: true })
  fs.writeFileSync(
    path.join(demoFolderPath, 'main.ts'),
    createContent(options.packageName).trim()
  )
}
