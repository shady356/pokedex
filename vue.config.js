module.exports = {
  devServer: {
    proxy: 'https://fantasy.premierleague.com/'
  },
  css: {
    loaderOptions: {
      sass: {
        prependData: `@import '@/styles/main.scss';`
      }
    }
  }
}
