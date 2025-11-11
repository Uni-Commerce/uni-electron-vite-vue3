import type { Plugin } from 'vite'
import fs from 'node:fs'
import path from 'node:path'

export const replaceAssetsPlugin = (): Plugin => {
  return {
    name: 'replace-assets-plugin',
    apply: 'build',
    closeBundle() {
      const distDir = path.resolve(process.cwd(), 'dist')
      const srcHtmlPath = path.resolve(distDir, 'src/renderer')
      // 递归遍历 dist 目录中的所有 HTML 文件
      const walk = (dir: string) => {
        const files = fs.readdirSync(dir)
        for (const file of files) {
          const fullPath = path.join(dir, file)
          const stat = fs.statSync(fullPath)

          if (stat.isDirectory()) {
            walk(fullPath)
          } else if (file.endsWith('.html')) {
            let html = fs.readFileSync(fullPath, 'utf-8')

            // 你可以根据实际情况调整这里的正则
            html = html.replace(/\/assets\//g, './assets/')

            fs.writeFileSync(fullPath, html, 'utf-8')
            console.info(`✅ 替换完成: ${path.relative(distDir, fullPath)}`)
          }
        }
      }

      walk(srcHtmlPath)
    }
  }
}
