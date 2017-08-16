const path = require('path'),
    fs = require('fs'),
    webpack = require('webpack'),
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    ProgressBarWebpackPlugin = require('progress-bar-webpack-plugin'),
    ExtractTextPlugin = require('extract-text-webpack-plugin'),
    externals = () => {
        return fs.readdirSync(path.resolve(__dirname, '../../node_modules'))
            .filter(filename => !filename.includes('.bin'))
            .reduce((externals, filename) => {
                externals[filename] = `commonjs ${filename}`
                return externals
            }, {})
    }

const clientConfig = {
    devtool: false,
    context: path.resolve(__dirname, '..'),
    entry: {
        bundle: ['./browserEntry.js'],
        vendor: ['react', 'react-dom']
    },
    output: {
        path: path.resolve(__dirname, '..', './dist/client'),
        filename: '[name].js',
        chunkFilename: 'chunk.[name].js',
        publicPath: '/'
    },
    module: {
        rules: [{
            test: /\.js$/,
            use: [{
                loader: 'babel-loader',
                options: {
                    presets: ['es2015', 'stage-0', 'react'],
                    plugins: ['transform-runtime', 'add-module-exports'],
                    cacheDirectory: true
                }
            }],
            exclude: /node_modules/
        }, {
            test: /\.scss$/,
            use: ExtractTextPlugin.extract({
                fallback: 'style-loader',
                use: [
                    'css-loader?modules&camelCase&importLoaders=1&localIdentName=[local][hash:base64:5]',
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: function () {
                                return [
                                    require('autoprefixer')()
                                ];
                            }
                        }
                    },
                    'sass-loader']
            })
        }, {
            test: /\.(png|jpg|svg)$/,
            use: ['url-loader?limit=25000']
        }, {
            test: /\.html$/,
            use: ['html-loader?minimize=false']
        }]
    },
    plugins: [
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            filename: '[name][chunkhash:8].js', //开启webpack-dev-server后无法使用chunkHash，至webpack3.0依然未修复该问题
            children: true
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'manifest'
        }),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
        }),
        new HtmlWebpackPlugin({
            filename: path.resolve(__dirname, '../dist/views/index.html'),
            template: path.resolve(__dirname, '../index.html'),
        }),
        new webpack.optimize.UglifyJsPlugin({ //压缩js
            compress: {warnings: false},
            comments: false
        }),
        new ProgressBarWebpackPlugin(),
        new ExtractTextPlugin({
            filename: '[name][contenthash:8].css',
            allChunks: true
        }),
        new webpack.NormalModuleReplacementPlugin( //解决node-fetch的警告
            /\/iconv-loader$/, 'node-noop'
        )
    ]
}
const serverConfig = {
    context: path.resolve(__dirname, '..'),
    entry: './build.js',
    output: {
        path: path.resolve(__dirname, '..', './dist/server'),
        filename: '[name].js', //由于是在本地使用，固定按照文件名称输出
        chunkFilename: 'chunk.[name].js' //固定按照分片名字输出
    },
    target: 'node', //指定服务器运行环境为node
    node: {
        __filename: true, //使用相对于本地的路径
        __dirname: true
    },
    module: {
        rules: [{
            test: /\.js$/,
            use: [{
                loader: 'babel-loader',
                options: {
                    presets: ['es2015', 'stage-0', 'react'],
                    plugins: ['transform-runtime', 'add-module-exports'],
                    cacheDirectory: true
                }
            }],
            exclude: /node_modules/
        }, {
            test: /\.scss$/,
            use: ExtractTextPlugin.extract({
                fallback: 'style-loader',
                use: [
                    'css-loader?modules&camelCase&importLoaders=1&localIdentName=[local][hash:base64:5]',
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: function () {
                                return [
                                    require('autoprefixer')()
                                ];
                            }
                        }
                    },
                    'sass-loader']
            })
        }, {
            test: /\.(png|jpg|svg)$/,
            use: ['url-loader?limit=25000']
        }, {
            test: /\.html$/,
            use: ['html-loader?minimize=false']
        }]
    },
    externals: externals(),
    plugins: [
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
        }),
        new webpack.optimize.UglifyJsPlugin({ //压缩js
            compress: {warnings: false},
            comments: false
        }),
        new ProgressBarWebpackPlugin(),
        new ExtractTextPlugin({
            filename: '[name][contenthash:8].css',
            allChunks: true
        }),
        new webpack.NormalModuleReplacementPlugin( //解决node-fetch的警告
            /\/iconv-loader$/, 'node-noop'
        )
    ]
}

module.exports = [clientConfig, serverConfig]
