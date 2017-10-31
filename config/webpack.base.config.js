const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const extractLess = new ExtractTextPlugin({
    filename: '../assets/css/style.css',
    disable: process.env.NODE_ENV === 'development'
});

module.exports = {
    context: path.join(__dirname + '/../app/source'),

    entry: {
        'app': [
            'react-hot-loader/patch', // RHL patch
            'babel-polyfill',
            './app.js'
        ]
    },

    output: {
        path: path.join(__dirname + '/../app/build'),
        filename: '[name].js',
        publicPath: '/'
    },

    resolve: {
        extensions: ['.js'],
        unsafeCache: true
    },

    resolveLoader: {
        modules: ['node_modules'],
        extensions: ['.js']
    },

    plugins: [
        new webpack.NoEmitOnErrorsPlugin(),

        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            filename: 'vendor.min.js',
            minChunks(module) {
                let context = module.context;
                return context && context.indexOf('node_modules') >= 0;
            },
        }),

        extractLess
    ],

    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel-loader?cacheDirectory=true'
            },

            {
                test: /\.less$/,
                use: extractLess.extract({
                    use: [{
                        loader: 'css-loader'
                    }, {
                        loader: 'less-loader'
                    }],
                    // use style-loader in development
                    fallback: 'style-loader'
                })
            },
        ],
    },

};
