/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      backgroundColor: {
        primary: 'var(--bg-color-primary)',
        dark: 'var(--bg-color-dark)',
        body: 'var(--bg-color-body)',
        page: 'var(--bg-color-page)',
        green: 'var(--bg-color-green)',
        gray: 'var(--bg-color-gray)',
        drawer: 'var(--bg-color-drawer)',
        message: 'var(--bg-color-message)',
        input: 'var(--bg-color-input)',
        circle: 'var(--bg-color-circle)',
        off: 'var(--bg-color-off)'
      },
      borderColor: {
        primary: 'var(--border-color-primary)',
        dark: 'var(--border-color-dark)',
        white: 'var(--border-color-white)',
        block: 'var(--border-color-block)',
        gray: 'var(--border-color-gray)',
        line: 'var(--border-color-line)'
      },
      fontSize: {
        mini: 'var(--font-size-mini)',
        sl: 'var(--font-size-xs)'
      },
      textColor: {
        primary: 'var(--text-color-primary)',
        small: 'var(--text-color-small)',
        white: 'var(--text-color-white)',
        dark: 'var(--text-color-dark)',
        font: 'var(--text-color-font)',
        code: 'var(--text-color-code)',
        gray: 'var(--text-color-gray)',
        placehold: 'var(--text-color-placehold)',
        close: 'var(--text-color-close)',
        cap: 'var(--text-color-cap)',
        toast: 'var(--text-color-toast)',
        off: 'var(--text-color-off)'
      },
      fontFamily: {
        // SF Pro Display 字体系列 - Apple 设计语言字体
        'SFPro-Regular': ['SFPro-Regular'], // 常规字重
        'SFPro-Medium': ['SFPro-Medium'], // 中等字重
        'SFPro-Semi': ['SFPro-Semi'], // 半粗体字重
        'SFPro-Bold': ['SFPro-Bold'], // 粗体字重
        // DIN 字体系列 - 常用于数字显示，具有良好的可读性
        'DIN-Regular': ['DIN-Regular'], // DIN 常规字重
        'DIN-Medium': ['DIN-Medium'], // DIN 中等字重
        'DIN-Bold': ['DIN-Bold'] // DIN 粗体字重
      }
    }
  },
  plugins: []
}
