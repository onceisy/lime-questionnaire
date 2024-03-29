module.exports = {
  content: [
    './public/**/*.html',
    './src/**/*.{js,jsx,ts,tsx,vue}',
  ],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: '#00b96b',
      },
      animation: {
        'bounce-5': 'bounce 8s infinite',
      },
      minHeight: {
        'content': 'calc(100vh - 64px - 70px)',
      },
      maxHeight: {
        'content': 'calc(100vh - 64px - 70px)',
        'content-list': 'calc(100vh - 64px - 70px - 100px)',
      },
      width: {
        '1200': '1200px',
      },
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
