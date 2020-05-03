module.exports = {
  devServer: {
    proxy: 'https://pokeapi.co/api/v2'
  },
  publicPath: '/pokedex',
  css: {
    loaderOptions: {
      sass: {
        prependData: `@import '@/styles/main.scss';`
      }
    }
  }
}
