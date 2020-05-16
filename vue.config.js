module.exports = {
  devServer: {
    proxy: {
      '/api/v2': {
        target: 'https://pokeapi.co', 
      },
      '/moves':{
        target: 'https://henriko.no'
      } 
    }
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
