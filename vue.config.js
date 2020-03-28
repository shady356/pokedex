module.exports = {
  devServer: {
    proxy: 'https://pokeapi.co/api/v2'
  },
  css: {
    loaderOptions: {
      sass: {
        prependData: `@import '@/styles/main.scss';`
      }
    }
  }
}
