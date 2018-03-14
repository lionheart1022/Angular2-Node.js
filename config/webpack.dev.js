const ngtools = require('@ngtools/webpack');
const html = require('html-webpack-plugin');
const copy = require('copy-webpack-plugin');
const path = require('path');
const webpack = require('webpack');
const compression = require('compression-webpack-plugin');
const extract = require('extract-text-webpack-plugin');
const checker = require('awesome-typescript-loader').CheckerPlugin;
const replacement = require('webpack/lib/ContextReplacementPlugin');
const dll = require('webpack-dll-bundles-plugin').DllBundlesPlugin;
const assethtml = require('add-asset-html-webpack-plugin');
const chunk = require('webpack/lib/optimize/CommonsChunkPlugin');
const portfinder = require('portfinder');
const autoprefixer = require('autoprefixer');

let config = {
  context: path.resolve(__dirname, '..'),
  resolve: { extensions: ['.ts', '.js', '.json'] },
  entry: {
    polyfills: './src/polyfills.ts',
    main: './src/main.ts'
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: '[name].bundle.js',
    sourceMapFilename: '[name].bundle.map',
    chunkFilename: '[id].chunk.js',
    library: 'ac_[name]',
    libraryTarget: 'var'
  },
  devtool: 'cheap-module-source-map',
  plugins: [
    new html({ template: './src/index.html' }),
    new copy([{ context: './public', from: '**/*' }]),
    new copy([{ context: './src/assets', from: '**/*'}]),
    new checker({ exclude: ['main.aot.ts'] }),
    new replacement(/angular(\\|\/)core(\\|\/)src(\\|\/)linker/, path.resolve(__dirname, '../src')),
    new dll({
      bundles: {
        polyfills: [
          'core-js',
          { name: 'zone.js', path: 'zone.js/dist/zone.js' },
          { name: 'zone.js', path: 'zone.js/dist/long-stack-trace-zone.js' }
        ],
        vendor: [
          '@angular/platform-browser', '@angular/platform-browser-dynamic', '@angular/core',
          '@angular/common', '@angular/forms', '@angular/http', '@angular/router', 'rxjs'
        ]
      },
      dllDir: path.resolve(__dirname, '../dist'),
      webpackConfig: { devtool: 'cheap-module-source-map', plugins: [] }
    }),
    new webpack.HotModuleReplacementPlugin(),
    new assethtml([
      { filepath: path.resolve(__dirname, `../dist/${dll.resolveFile('polyfills')}`) },
      { filepath: path.resolve(__dirname, `../dist/${dll.resolveFile('vendor')}`) }
    ]),
    new chunk({ name: 'polyfills', chunks: ['polyfills'] }),
    new chunk({ name: 'vendor', chunks: ['main'], minChunks: module => /node_modules/.test(module.resource) }),
    new chunk({ name: ['polyfills', 'vendor'].reverse() }),
    new webpack.LoaderOptionsPlugin({ options: { postcss: [ autoprefixer ] } })
  ],
  module: {
    rules: [
      { test: /\.ts$/, use: [ { loader: '@angularclass/hmr-loader' }, { loader: 'ng-router-loader', options: { loader: 'async-import', genDir: './src/ngfactory', aot: false } }, { loader: 'awesome-typescript-loader', options: { configFileName: 'config/tsconfig.dev.json' } }, { loader: 'angular2-template-loader' } ], exclude: [/\.aot\.ts$/] },
      { test: /\.css$/, use: ['style-loader', 'css-loader', 'postcss-loader'], exclude: [path.resolve(__dirname, '../src/app')] },
      { test: /\.css$/, use: ['to-string-loader', 'css-loader', 'postcss-loader'], exclude: [path.resolve(__dirname, '../src/styles')] },
      { test: /\.scss$|\.sass$/, use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader'], include: [path.resolve(__dirname, '../src/styles') ] },
      { test: /\.scss$|\.sass$/, use: ['to-string-loader', 'css-loader', 'postcss-loader', 'sass-loader'], exclude: [path.resolve(__dirname, '../src/styles')] },
      { test: /\.html$/, loader: 'raw-loader' },
      { test: /\.json$/, loader: 'json-loader' },
      { test: /\.(jp?g|png|gif)$/, loader: 'file-loader', options: { hash: 'sha512', digest: 'hex', name: 'images/[hash].[ext]' } },
      { test: /\.(eot|woff2?|svg|ttf|otf)([\?]?.*)$/, loader: 'file-loader', options: { hash: 'sha512', digest: 'hex', name: 'fonts/[hash].[ext]' } }
    ]
  },
  devServer: {
    historyApiFallback: true,
    port: 8000,
    open: true,
    hot: true,
    inline: true,
    stats: { colors: true, chunks: false },
    watchOptions: {
      aggregateTimeout: 300,
      poll: 1000
    }
  }
};

module.exports = () => {
  return portfinder.getPortPromise().then(port => {
    config.devServer.port = port;
    return config;
  });
};
