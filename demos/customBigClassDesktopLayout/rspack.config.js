const rspack = require('@rspack/core');
const { VueLoaderPlugin } = require('vue-loader');

/** @type {import('@rspack/cli').Configuration} */
console.log('rspack.config.js', process.env.NODE_ENV);
const config = {
  context: __dirname,
  entry: {
    main: './src/main.js',
  },
  output: {
    filename: "custom.js"
  },
  devServer: {
		port: 3000,
		allowedHosts: 'all',
    historyApiFallback: true,
    client: {
      overlay: false,
    },
	},

  devtool: process.env.NODE_ENV === 'development' ? 'source-map' : false,
  
  experiments: {
    css: false,
  },
  
  plugins: [
    new VueLoaderPlugin(),
    new rspack.DefinePlugin({
      __VUE_OPTIONS_API__: JSON.stringify(true),
      __VUE_PROD_DEVTOOLS__: JSON.stringify(false),
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['vue-style-loader', 'css-loader'],
        type: 'javascript/auto',
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          experimentalInlineMatchResource: true,
        },
      },
      {
        test: /\.ts$/,
        loader: 'builtin:swc-loader',
        options: {
          sourceMap: true,
          jsc: {
            parser: {
              syntax: 'typescript',
            },
          },
        },
        type: 'javascript/auto',
      },
      {
        test: /\.less$/,
        use: ['vue-style-loader', 'css-loader', 'less-loader'],
        type: 'javascript/auto', 
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg)$/,
        parser: {
          dataUrlCondition: {
            maxSize: 8 * 1024 // 小于 8KB 的图片会被内联处理
          }
        },
        type: 'asset',
      },
    ],
  },
};
module.exports = config;