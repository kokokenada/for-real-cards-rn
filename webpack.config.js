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

//https://gist.github.com/pilwon/7a57624ddde9e6a3bd06
//https://gist.github.com/alexesDev/071f8935c82ca87a5b46
var reactNativeExternalsPromise = (function () {
  var reactNativeRoot = path.dirname(require.resolve('react-native/package'));
  var blacklist = require('react-native/packager/blacklist');
  var ReactPackager = require('react-native/packager/react-packager');
  var reactNativePackage = require('react-native/package');

  return ReactPackager.getDependencies({
    assetRoots: [reactNativeRoot],
    blacklistRE: blacklist(false),
    projectRoots: [reactNativeRoot],
    transformModulePath: require.resolve('react-native/packager/transformer')
  }, reactNativePackage.main)
    .then(function (dependencies) {
      return dependencies.filter(function (dependency) {
        return !dependency.isPolyfill;
      });
    })
    .then(function (dependencies) {
      return dependencies.map(function (dependency) {
        return dependency.id;
      });
    });
}());


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
  externals: [
    function (context, request, cb) {
      reactNativeExternalsPromise.then(function (reactNativeExternals) {
        if (['react-native'].concat(reactNativeExternals).indexOf(request) != -1) {
          cb(null, request);
        } else {
          cb();
        }
      });
    }
  ],

  // Source maps support ('inline-source-map' also works)
  // devtool: 'source-map',

  // Add the loader for .ts files.
  module: {
    loaders: [
      {
        test: /\.(tsx|ts)?$/,
        loader: 'awesome-typescript-loader',
        exclude: [/node_modules/],
//        include: ['src/*.ts']
      },
      {
        test: /\.(png|jpg)$/,
        loader: 'file-loader'
      },

      {test: /\.js$/, loader: 'babel?blacklist[]=react', exclude: /node_modules\//},
      {test: /\.jsx$/, loader: 'imports?React=react-native!babel'}
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