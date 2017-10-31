const webpack = require('webpack');
const Config = require('webpack-config').default;
const replace = require('replace');

replace({
    regex: /<!-- app-bundle -->[\s\S]*<!-- \/app-bundle -->/,
    replacement:
        `<!-- app-bundle -->
            <script src="http://localhost:8080/manifest.js"></script>
            <script src="http://localhost:8080/vendor.min.js"></script>
            <script src="http://localhost:8080/app.js"></script>
        <!-- \/app-bundle -->`,
    paths: ['./index.html'],
    silent: true,
});

module.exports = new Config().extend('./config/webpack.base.config.js').merge({
    plugins: [
        new webpack.DefinePlugin({
            DEBUG: true
        }),

        new webpack.optimize.CommonsChunkPlugin({
            name: 'manifest'
        }),
    ],

    devtool: 'eval-source-map'
});