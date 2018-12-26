const path = require('path');

const scope = {
  include: [
    path.resolve('src'),
  ],
  exclude: [
    path.resolve('node_modules'),
  ],
};

const cssLoaders = {
  test: /\.css$/,
  use: [
    require.resolve('style-loader'),
    require.resolve('css-loader'),
    require.resolve('postcss-loader'),
  ],
  include: [
    path.resolve('src'),
    path.resolve('node_modules'),
  ],
};

const lessLoaders = {
  test: /\.less$/,
  use: [
    require.resolve('style-loader'),
    {
      loader: require.resolve('css-loader'),
      options: {
        modules: true,
      },
    },
    require.resolve('postcss-loader'),
    require.resolve('less-loader'),
  ],
  ...scope,
};

module.exports = {
  entry: path.resolve('src/examples/index.tsx'),
  output: {
    filename: 'bundle.js',
    path: path.resolve('examples'),
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        enforce: 'pre',
        loader: require.resolve('tslint-loader'),
      },
      // {
      //   test: [/\.css$/, /\.less$/],
      //   enforce: 'pre',
      //   loader: require.resolve('typed-css-modules-loader'),
      // },
      {
        oneOf: [
          {
            test: /\.tsx?$/,
            use: [
              require.resolve('babel-loader'),
              require.resolve('awesome-typescript-loader'),
            ],
            ...scope,
          },
          {
            // babel-loader转义node_mdoules, 来修复html-webpack-plugin报错
            test: /\.jsx?$/,
            loader: require.resolve('babel-loader'),
            include: [
              path.resolve('node_modules'),
            ],
          },
          cssLoaders,
          lessLoaders,
          {
            test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
            loader: require.resolve('url-loader'),
            options: {
              limit: 10000,
              name: 'example/dist/assets/[name].[hash:8].[ext]',
            },
            ...scope,
          },
          {
            exclude: [/\.html$/, /\.json$/, /\.(ts|tsx)$/],
            loader: require.resolve('file-loader'),
            options: {
              name: 'example/dist/assets/[name].[hash:8].[ext]',
            },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json', '.css', '.less']
  },
};
