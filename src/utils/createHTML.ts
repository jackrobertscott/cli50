import * as fs from 'fs'
import * as path from 'path'

const createContent = (title: string) => `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <!-- <meta name="mobile-web-app-capable" content="yes"> -->
    <!-- <meta name="apple-mobile-web-app-capable" content="yes"> -->
    <!-- <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent"> -->
    <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />
    <link rel="icon" type="image/x-icon" href="/favicon.ico" />
    <title>${title}</title>
  </head>
  <body style="color: #FF0000; background: #000;">
    <div id="root"></div>
    <script type="module" src="/demo/main.ts"></script>
  </body>
</html>
`

export function createHTML(
  folderPath: string,
  options: { packageName: string }
) {
  fs.writeFileSync(
    path.join(folderPath, 'vite.config.ts'),
    createContent(options.packageName).trim()
  )
}
