const path = require('path');

module.exports = {
  webpack: {
    alias: {
      '@': path.resolve(__dirname, 'src/'),
      '@assets': path.resolve(__dirname, 'src/assets/'),
      '@utils': path.resolve(__dirname, 'src/utils/'),
      '@views': path.resolve(__dirname, 'src/views/'),
      '@components': path.resolve(__dirname, 'src/components/'),
      '@hooks': path.resolve(__dirname, 'src/hooks/'),
    },
  },
  devServer: {
    proxy: {
      '/api': 'http://localhost:3001/'
    }
  }
}
