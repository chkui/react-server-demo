const path = require('path'),
    webpack = require('webpack'),
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    ProgressBarPlugin = require('progress-bar-webpack-plugin')
module.exports = {
    devtool: 'source-map',
    context: path.resolve(__dirname, '..'),
    entry: {
        bundle: ['./browserEntry.js',
            'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000'
        ],
        vendor: ['react', 'react-dom']
    },
    output: {
        path: path.resolve(__dirname, '..', './dist'),
        filename: '[name].js',
        chunkFilename: 'chunk.[name].js',
        publicPath: '/'
    },
    module: {
        rules: [{
            test: /\.js$/,
            use: [{
                loader: 'babel-loader',
                options: {presets: ['es2015', 'stage-0', 'react']}
            }],
            exclude: /node_modules/
        }, {
            test: /\.scss$/,
            use: [
                'style-loader',
                'css-loader?modules&camelCase&importLoaders=1&localIdentName=[name]-[local]',
                {
                    loader:'postcss-loader',
                    options: {
                        plugins: function() {
                            return [
                                require('autoprefixer')()
                            ];
                        }
                    }
                },
                'sass-loader'
            ]
        }, {
            test: /\.(png|jpg|svg)$/,
            use:['url-loader?limit=25000']
        }, {
            test: /\.html$/,
            use: ['html-loader?minimize=false']
        }]
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            names: ['vendor', 'manifest'],
            filename: '[name][hash:8].js', //开启webpack-dev-server后无法使用chunkHash，至webpack3.0依然未修复该问题
            children: true
        }),
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
            filename: path.resolve(__dirname, '../dist/index.html'),
            template: path.resolve(__dirname, '../index.html'),
        }),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
        }),
        new ProgressBarPlugin({summary: false}),
        new webpack.NormalModuleReplacementPlugin( //解决node-fetch的警告
            /\/iconv-loader$/, 'node-noop'
        )
    ]
}
