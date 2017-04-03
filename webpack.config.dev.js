// var webpack = require('webpack');
// var cssnext = require('postcss-cssnext');
// var postcssFocus = require('postcss-focus');
// var postcssReporter = require('postcss-reporter');
// var path = require('path');
// module.exports = {
//   devtool: 'cheap-module-eval-source-map',
//   cache: true,
//   entry: {
//     app: [
//       'eventsource-polyfill',
//       'webpack-hot-middleware/client?http://localhost:4001',
//       'webpack/hot/only-dev-server',
//       'react-hot-loader/patch',
//       './client/index.js',
//     ],
//   },
//   devServer: {
//     hot: true,
//     //enable  hmr on the server
//     contentBase: path.resolve(__dirname, 'dist'),
//     // match the output path
//     publicPath: '/'
//     // match the output `publicPath`
//   },
//   output: {
//     path: __dirname,
//     filename: 'app.js',
//     publicPath: 'http://0.0.0.0:4001/',
//   },

//   resolve: {
//     extensions: ['', '.js', '.jsx'],
//     modules: [
//       'client',
//       'node_modules',
//     ],
//   },

//   module: {
//     loaders: [
//       {
//         test: /\.css$/,
//         exclude: /node_modules/,
//         loader: 'style-loader!css-loader?localIdentName=[name]__[local]__[hash:base64:5]&modules&importLoaders=1&sourceMap!postcss-loader',
//         // loader: 'style-loader!css-loader?modules=true&importLoaders=1&sourceMap!postcss-loader',
//       }, {
//         test: /\.css$/,
//         include: /node_modules/,
//         loaders: ['style-loader', 'css-loader'],
//       }, {
//         test: /\.jsx*$/,
//         exclude: [/node_modules/, /.+\.config.js/],
//         loader: 'babel',
//       }, {
//         test: /\.(jpe?g|gif|png)$/i,
//         loader: 'url-loader?limit=10000',
//       }, {
//         test: /\.json$/,
//         loader: 'json-loader',
//       },
//       {
//         test: /\.woff($|\?)|\.woff2($|\?)|\.ttf($|\?)|\.eot($|\?)|\.svg($|\?)/,
//         loader: 'url-loader'
//       }
//     ],
//   },

//   plugins: [
//     new webpack.HotModuleReplacementPlugin(),
//     new webpack.DllReferencePlugin({
//       context: path.join(__dirname, 'src'),
//       manifest: require('./dist/vendor-manifest.json')
//     }),
//     new webpack.DefinePlugin({
//       'process.env': {
//         CLIENT: JSON.stringify(true),
//         'NODE_ENV': JSON.stringify('development'),
//       }
//     }),
//   ],

//   postcss: () => [
//     postcssFocus(),
//     cssnext({
//       browsers: ['last 2 versions', 'IE > 10'],
//     }),
//     postcssReporter({
//       clearMessages: true,
//     }),
//   ],
// };


const path = require('path');
const webpack = require('webpack');
module.exports = {
  cache: true,
  devtool: 'cheap-module-eval-source-map',
  // context: resolve(__dirname, 'client'),
  entry:
  {
    app: [
      'react-hot-loader/patch',
      // active hmr for react
      'webpack-dev-server/client?http://localhost:8080',
      // bundle the client for webpack-dev-server
      // and connect to the provided endpoint
      'webpack/hot/only-dev-server',
      // bundle the client for hot reloading
      // only means to only hot reload for successful updates
      './client/index.js']
  }
  // the entry point of out app
  ,
  output: {
    filename: '[name].js',
    // the output bundle
    path: path.resolve(__dirname, 'dist-dev'),
    chunkFilename: '[name].js',
    publicPath: '/'
    // necessary for hmr to know where to load the hot update chunks
  },
  devtool: 'inline-source-map',
  devServer: {
    hot: true,
    //enable  hmr on the server
    contentBase: path.resolve(__dirname, 'dist-dev'),
    // match the output path
    publicPath: '/'
    // match the output `publicPath`
  },
  module: {
    rules: [
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        include: [
          path.join(__dirname, 'client')
        ],
        use: [
          {
            loader: 'babel-loader',
            query: {
              cacheDirectory: true,
              plugins: ["transform-decorators-legacy"],
              presets: ['react', 'es2015', 'stage-0']
            }
          }
        ]
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        loader: 'style-loader!css-loader?localIdentName=[name]__[local]__[hash:base64:5]&modules&importLoaders=1&sourceMap!postcss-loader',
        // loader: 'style-loader!css-loader?modules=true&importLoaders=1&sourceMap!postcss-loader',
      }, {
        test: /\.css$/,
        include: /node_modules/,
        loaders: ['style-loader', 'css-loader'],
      }, {
        test: /\.jsx*$/,
        exclude: [/node_modules/, /.+\.config.js/],
        include: [
          path.join(__dirname, 'client')
        ],
        use: [
          {
            loader: 'babel-loader',
            query: {
              cacheDirectory: true,
              plugins: ["transform-decorators-legacy"],
              presets: ['react', 'es2015', 'stage-0']
            }
          }
        ]
      }, {
        test: /\.(jpe?g|gif|png)$/i,
        loader: 'url-loader?limit=10000',
      }, {
        test: /\.json$/,
        loader: 'json-loader',
      },
      {
        test: /\.woff($|\?)|\.woff2($|\?)|\.ttf($|\?)|\.eot($|\?)|\.svg($|\?)/,
        loader: 'url-loader'
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development')
      }
    }),
    new webpack.HotModuleReplacementPlugin(),
    // enable HRM globally
    new webpack.NamedModulesPlugin(),
    // prints more readable module names in the browser console on hmr updates
    new webpack.DllReferencePlugin({
      context: path.join(__dirname, 'client'),
      manifest: require('./dist-dev/vendor-manifest.json')
    })
  ]

}