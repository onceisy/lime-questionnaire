module.exports = {
  content: [
    './public/**/*.html',
    './src/**/*.{js,jsx,ts,tsx,vue}',
  ],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    extend: {
      animation: {
        'bounce-5': 'bounce 8s infinite',
      },
      minHeight: {
        'content': 'calc(100vh - 64px - 70px)'
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
  corePlugins: {
    // 解决与antd样式冲突问题
    preflight: false
  }
}
