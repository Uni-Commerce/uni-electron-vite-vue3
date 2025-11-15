import type { App } from 'vue'

export const autoImportComponents = {
  install(app: App) {
    const components = import.meta.glob('../components/**/*.vue', {
      eager: true, // 非懒加载
      import: 'default' // 直接拿到default中的数据
    })

    Object.entries(components).forEach((item: any) => {
      const [path, component] = item
      const name = path.replace('../components/', '').replace('/index.vue', '')
      app.component(`App${name}`, component)
    })
  }
}
