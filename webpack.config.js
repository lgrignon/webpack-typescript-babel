const _ = require('lodash');
const webpack = require('webpack');
const path = require('path');
const HappyPack = require('happypack');

const happyThreadPool = HappyPack.ThreadPool({ size: 8 });
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

const babelOptions = {
    presets: [
        ["env"]
    ],
    plugins: []
};

function isVendor(module) {
    return module.context && module.context.indexOf('node_modules') !== -1;
}

const entries = {
    index: ['babel-polyfill', './src/index.ts'],
    other: ['babel-polyfill', './src/other.ts']
};

const plugins = [
    new HappyPack({
        id: 'ts',
        threadPool: happyThreadPool,
        loaders: [
            {
                path: 'babel-loader',
                query: babelOptions
            },
            {
                path: 'ts-loader',
                query: { happyPackMode: true }
            }]
    }),
    new ForkTsCheckerWebpackPlugin({
        checkSyntacticErrors: true
    }),
    new webpack.optimize.CommonsChunkPlugin({
        names: ['vendor'],
        minChunks: function (module, count) {
            // creates a common vendor js file for libraries in node_modules
            return isVendor(module);
        }
    }),
    new webpack.optimize.CommonsChunkPlugin({
        name: "commons",
        chunks: _.keys(entries),
        minChunks: function (module, count) {
            // creates a common vendor js file for libraries in node_modules
            return !isVendor(module) && count > 1;
        }
    })
];

module.exports = {
    entry: entries,
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'js')
    },
    module: {
        rules: [{
            // Webpack loader for TypeScript + Babel
            test: /\.ts(x?)$/,
            exclude: /node_modules\/@types\/node/,
            use: 'happypack/loader?id=ts'
        }]
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js"]
    },
    plugins: plugins,
    stats: { children: false }
}
