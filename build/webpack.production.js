/**
 * 
 * External dependencies.
 * 
 */
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

/**
 * 
 * Internal dependencies.
 * 
 */
const { srcPath, tests, assetFilename, srcFonts } = require('./lib/utils');
const postcss = require('./postcss');

/**
 * 
 * Setup Babel loader.
 * 
 */
const babelLoader = {
  loader: 'babel-loader',
  options: {
    cacheDirectory: true,
    comments: false,
    presets: ['@babel/preset-env']
  }
};

/**
 * 
 * Webpack Configuration.
 * 
 */
const plugins = [
  new CleanWebpackPlugin(),
  new HtmlWebpackPlugin({
    minify: false,
    title: 'Fuerza Studio',
    template: srcPath('index.html'),
    filename: 'index.html'
  }),
  new MiniCssExtractPlugin({
    filename: 'styles/styles.css',
  })
];

module.exports = {
  /**
   * 
   * The input.
   * 
   */
  entry: require('./webpack/entry'),

  /**
   * 
   * The output.
   * 
   */
  output: {
    ...require('./webpack/output')
  },

  /**
   * 
   * Resolve utilities.
   * 
   */
  resolve: require('./webpack/resolve'),

  /**
   * 
   * Setup the transformations.
   * 
   */
  module: {
    rules: [
      /**
       * Add support for blogs in import statements.
       */
      {
        enforce: 'pre',
        test: /\.(js|jsx|css|scss|sass)$/,
        use: 'import-glob',
      },

      /**
       * Handle scripts.
       */
      {
        test: tests.scripts,
        exclude: /node_modules/,
        use: babelLoader,
      },

      /**
       * Handle styles.
       */
      {
        test: tests.styles,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: '../',
            }
          },
          'css-loader',
          {
            loader: 'postcss-loader',
            options: postcss
          },
          {
            loader: 'sass-loader',
            options: {
              sassOptions: {
                outputStyle: 'compact'
              },
            },
          },
        ]
      },

      /**
       * Handle images.
       */
      {
        test: tests.images,
        type: 'asset/resource',
        generator: {
          filename: 'images/[name][ext]'
        },
      },

      /**
       * Handle fonts.
       */
      {
        test: tests.fonts,
        type: 'asset/resource',
        generator: {
          filename: 'fonts/[name][ext]'
        },
      },
    ]
  },

  /**
   * 
   * Plugins.
   * 
   */
  plugins,

  /**
   * 
   * Setup optimizations.
   * 
   */
  // optimization: {
  //   minimize: true
  // },

  /**
   * 
   * Setup the development tools.
   * 
   */
  mode: 'production',
  cache: false,
  bail: false,
  watch: false,
  devtool: false,
};