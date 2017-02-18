/* This is a sample production webpack config document
  // In package.json..."build": "webpack -p --config webpack.config.js"
  // This creates an index.html page for you
  // It also allows CSS and even SCSS to work

  // You need the follow devdependencies in your package.json (as well as the ones manually included in the file)
      "resolve-url-loader"
      "sass-loader"
      "style-loader"
      "url-loader"
      
      "autoprefixer"
      "css-loader"
      "file-loader"
      "postcss-loader"
*/


/*
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');


module.exports = {
  
  entry: [
    './src/index.js',
  ],
  
  output : {
    path : path.join(__dirname, './build'),
    filename: 'build.min.js'
  },
  
  devtool: '#sourcemap',
  
  module : {
    loaders: [{
      exclude: /node_modules/,
      loader : 'babel',
      query  : {
        presets: ['react', 'es2015', 'stage-1']
      }
    },
      
      {
        test  : /\.css$/,
        loader: ExtractTextPlugin.extract('style', 'css')
      },
 
     {
     test: /\.scss$/,
     loader: ExtractTextPlugin.extract('style', 'css', 'resolve-url', 'sass')
     }
    
    ]
  },
  
  postcss: [
    autoprefixer({browsers: ['last 2 versions']})
  ],
  
  resolve: {
    extensions: ['', '.js', '.jsx', '.css']
  },
  
  plugins: [
    new HtmlWebpackPlugin({
      title : 'City Info App',
      inject: 'body',
    }),
    new webpack.DefinePlugin({
      'process.env.VARIABLE': JSON.stringify(process.env.VARIABLE || 'development')
    }),
    new ExtractTextPlugin("style.css")
  ]
};
 */
