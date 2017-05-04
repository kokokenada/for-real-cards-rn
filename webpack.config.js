const webpack = require('webpack');
const path = require('path');
const isProdBuild = process.env.NODE_ENV === 'PRODUCTION';
let plugins = [];
if (isProdBuild) {
  plugins.push(new webpack.optimize.UglifyJsPlugin({
    compressor: {
      pure_getters: true,
      unsafe: true,
      unsafe_comps: true,
      screw_ie8: true,
      warnings: false,
    },
  }));
}

module.exports = {
//  context: path.join(__dirname, ''),
  entry: {
    'index.ios': ['./src/index.ios.tsx'],
    'index.android': ['./src/index.android.tsx'],
  },

  output: {
    path: path.join(__dirname, 'artifacts'),
    filename: isProdBuild ? '[name].min.js' : '[name].js'
  },
  // Currently we need to add '.ts' to the resolve.extensions array.
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx']
  },

  // Source maps support ('inline-source-map' also works)
  // devtool: 'source-map',

  // Add the loader for .ts files.
  module: {
    loaders: [
      {
        test: /\.tsx?$/,
        loader: 'awesome-typescript-loader',
        exclude: [/node_modules/],
//        include: ['src/*.ts']
      },
      {
        test: /\.(png|jpg)$/,
        loader: 'file-loader'
      }
    ]
  },
  plugins: plugins,

};


/*
 new CopyWebpackPlugin([ // An attempt at working around problem
 {from: 'src/action.interface.ts'},
 {from: 'src/state.interface.ts'}
 ])

 */