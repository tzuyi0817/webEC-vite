const path = require('path')

module.exports = {
  alias: {
    '/@/': path.resolve(__dirname, './src')
  },
  cssPreprocessOptions: {
    scss: {
      additionalData: "@import './src/scss/var.scss';"
    }
  },
  port: '8080'
}
