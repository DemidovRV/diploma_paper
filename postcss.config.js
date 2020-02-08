module.exports = {
  plugins: [
      require('autoprefixer'), // Подключили autoprefixer
      require('cssnano')({ // Подключили cssnano
          preset: 'default', // Выбрали настройки по умолчанию
  })
]
}
