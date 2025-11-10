import type { Plugin } from 'vite'
import fs from 'node:fs'
import path from 'node:path'

export const moveHtmlPlugin = (): Plugin => {
  return {
    name: 'move-html-plugin',
    apply: 'build',
    closeBundle() {
      const distDir = path.resolve(process.cwd(), 'dist')
      const srcHtmlPath = path.resolve(distDir, 'src/renderer/index.html')
      const destHtmlPath = path.resolve(distDir, 'index.html')

      if (fs.existsSync(srcHtmlPath)) {
        fs.mkdirSync(path.dirname(destHtmlPath), { recursive: true })
        fs.renameSync(srcHtmlPath, destHtmlPath)

        const rendererDir = path.resolve(distDir, 'src/renderer')
        const srcDir = path.resolve(distDir, 'src')

        fs.rmSync(rendererDir, { recursive: true, force: true })
        if (fs.existsSync(srcDir) && fs.readdirSync(srcDir).length === 0) {
          fs.rmSync(srcDir, { recursive: true, force: true })
        }

        console.info(`✅ Moved index.html -> ${path.relative(process.cwd(), destHtmlPath)}`)
      } else {
        console.warn(`⚠️  index.html not found at ${srcHtmlPath}`)
      }
    }
  }
}
