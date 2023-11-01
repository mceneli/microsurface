const path = require('path');

module.exports = {
  // ...diğer ayarlar buraya gelecek

  resolve: {
    fallback: {
      "crypto": require.resolve("crypto-browserify"),
      "stream": require.resolve("stream-browserify")
      // Diğer eksik modülleri de ekleyebilirsiniz.
    }
  }
};


// bu dosyayı görmüyorsa D:\microsurface\microsurface\node_modules\react-scripts\config konumundakini editle orjinalinde fallback yok
// target: 'web',  yap orjinali  target: ['browserslist'],