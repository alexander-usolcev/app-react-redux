const webpack = require('webpack');
const Config = require('webpack-config').default;
const replace = require('replace');
const SmartBannerPlugin = require('smart-banner-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const packageJson = require('../package.json');

replace({
    regex: /<!-- app-bundle -->[\s\S]*<!-- \/app-bundle -->/,
    replacement:
        `<!-- app-bundle -->
            <link rel="stylesheet" href="./app/assets/css/style.css?v=${packageJson.version}"/>
            <script src="./app/build/vendor.min.js?v=${packageJson.version}"></script>
            <script src="./app/build/app.min.js?v=${packageJson.version}"></script>
        <!-- \/app-bundle -->`,
    paths: ['./index.html'],
    silent: true,
});

module.exports = new Config().extend('./config/webpack.base.config.js').merge({
    output: {
        filename: '[name].min.js'
    },

    plugins: [
        // new BundleAnalyzerPlugin({
        //     analyzerMode: 'static'
        // }),

        new webpack.DefinePlugin({
            DEBUG: false,
            'process.env': {
                NODE_ENV: JSON.stringify('production')
            }
        }),

        new SmartBannerPlugin({
            banner: `${packageJson.name} v${packageJson.version}\n\nAuthor: ${packageJson.author}\nDate: ${new Date().toLocaleString()}\n`,
            raw: false,
            entryOnly: true
        }),

        new webpack.optimize.UglifyJsPlugin()
    ],
});