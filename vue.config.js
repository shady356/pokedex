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
  css: {
    loaderOptions: {
      sass: {
        prependData: `@import '@/styles/main.scss';`
      }
    }
  },
  publicPath: process.env.NODE_ENV === 'production'
    ? '/pokeview/'
    : '/',
  pwa: {
    name: 'PokéView',
    themeColor: '#93EDE4',
    msTileColor: '#93EDE4',
    manifestOptions: {
      background_color: '#FFFFFF'
    }
  }
}
