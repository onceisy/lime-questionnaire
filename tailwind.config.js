module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      animation: {
        'bounce-5': 'bounce 8s infinite',
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
