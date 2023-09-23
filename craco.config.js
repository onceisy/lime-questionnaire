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
    configure(webpackConfig, { env }) {
      if (env === 'production') {
        if (!webpackConfig.optimization) {
          webpackConfig.optimization = {};
        }
        const cacheGroups = {};
        const chunks = ['antd', 'react-dom', 'lodash', 'dnd-kit', 'i18next', 'recharts', 'ant-design'];
        chunks.forEach((chunkName, i) => {
          cacheGroups[chunkName] = {
            name: `${chunkName}-chunk`,
            test: new RegExp(chunkName),
            priority: chunks.length - i + 1,
          }
        });
        webpackConfig.optimization.splitChunks = {
          chunks: 'all',
          cacheGroups: {
            ...cacheGroups,
            vendors: {
              name: 'vendors-chunk',
              test: /node_modules/,
              priority: 1,
            },
          },
        }
      }
      return webpackConfig;
    }
  },
  devServer: {
    proxy: {
      '/api': 'http://localhost:3001/'
    }
  }
}
