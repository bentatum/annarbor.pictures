const routes = [
  '/',
  '/better-react-spinkit/',
  '/better-react-spinkit/chasing-dots/',
  '/better-react-spinkit/circle/',
  '/better-react-spinkit/cube-grid/',
  '/better-react-spinkit/double-bounce/',
  '/better-react-spinkit/pulse/',
  '/better-react-spinkit/rotating-plane/',
  '/better-react-spinkit/three-bounce/',
  '/better-react-spinkit/wandering-cubes/',
  '/better-react-spinkit/wave/',
  '/better-react-spinkit/wordpress/',
  '/contact/',
  '/contact/failure/',
  '/contact/success/',
  '/portfolio/',
  '/redux-simplestorage/',
  '/resume/'
]

const path = require('path')
const webpack = require('webpack')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const StaticSiteGeneratorPlugin = require('static-site-generator-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const SitemapPlugin = require('sitemap-webpack-plugin')

module.exports = {

  devtool: 'source-map',

  entry: {
    main: path.resolve('./src/index.js')
  },

  output: {
    filename: 'package.js',
    path: path.resolve('./dist'),
    libraryTarget: 'umd'
  },

  module: {
    preLoaders: [
      {
        test: /\.js$/,
        include: path.resolve('./src'),
        loader: 'standard'
      }
    ],
    loaders: [
      {
        // this tests for these specific node modules which are not transpiled already
        // and transpiles them for us
        test: /\/node_modules\/(joi\/lib\/|isemail\/lib\/|hoek\/lib\/|topo\/lib\/)/,
        loader: 'babel'
      },
      {
        test: /\.js$/,
        include: path.resolve('./src'),
        loaders: ['babel']
      },
      {
        test: /\.(png|jpg)$/,
        loader: 'url-loader?limit=8192'
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract('css?sourceMap!sass?sourceMap')
      }
    ]
  },

  resolve: {
    root: [
      path.resolve('./src'),
      path.resolve('./node_modules')
    ],
    modulesDirectories: [
      'src',
      'src/components',
      'node_modules'
    ],
    extensions: ['', '.js', '.jsx', '.json']
  },

  node: {
    net: 'empty',
    tls: 'empty',
    crypto: 'empty',
    dns: 'empty'
  },

  plugins: [
    new ExtractTextPlugin('style.css'),
    new StaticSiteGeneratorPlugin('main', routes),
    new SitemapPlugin('http://benjamintatum.com', routes, 'sitemap.xml'),
    new webpack.NormalModuleReplacementPlugin(/^(net|dns|crypto)$/, function () { return {} }),
    new CleanWebpackPlugin(['dist'], {
      root: __dirname,
      verbose: true,
      dry: false
    }),
    new webpack.DefinePlugin({
      'process.env': {
        'API_ENDPOINT': JSON.stringify(process.env.API_ENDPOINT),
        'DEVELOPMENT': JSON.stringify(process.env.DEVELOPMENT),
        'DEVTOOLS': JSON.stringify(process.env.DEVTOOLS),
        'NODE_ENV': JSON.stringify(process.env.NODE_ENV),
        'SEGMENT_KEY': JSON.stringify(process.env.SEGMENT_KEY)
      }
    })
  ]
}
