'use strict';
require('babel-polyfill');
require('babel-register')({
    presets: ['es2015', 'react', 'stage-0'],
    plugins: ['add-module-exports']
});

// Css require hook
require('css-modules-require-hook')({
    extensions: ['.scss'],
    preprocessCss: (data, filename) =>
        require('node-sass').renderSync({
            data,
            file: filename
        }).css,
    camelCase: true,
    generateScopedName: '[name]-[local]'
})

// Image require hook
require('asset-require-hook')({
    name: '/[hash].[ext]',
    extensions: ['jpg', 'png', 'gif', 'svg'],
    limit: 25000
})

    //启动一个koa实例
const koa = require('./koa'),
    // koa的垫片，将旧的generator模式替换为promise模式
    convert = require('koa-convert'),
    //webpack工具
    webpack = require('webpack'),
    //文件读写工具
    fs = require('fs'),
    //路径处理工具
    path = require('path'),
    //koa开发中间件
    devMiddleware = require('koa-webpack-dev-middleware'),
    //koa热部署中间件
    hotMiddleware = require('koa-webpack-hot-middleware'),
    //页面模板工具
    views = require('koa-views'),
    //webpack配置
    config = require('./webpack/server-dev'),
    //自己实现用于渲染app.js的中间件
    entry = require('./middleware/entry'),
    //redux仓库
    store = require('./middleware/store'),
    //端口
    port = 8080,
    //获取打包处理器的实例
    compiler = webpack(config)

//将HTML文件生成到磁盘上，否则ejs模板无法使用。
//koa-webpack-dev-middleware导致webpack打包不会生成到磁盘
compiler.plugin('emit', (compilation, callback) => {
    const assets = compilation.assets
    let file, data
    Object.keys(assets).forEach(key => {
        if (key.match(/\.html$/)) {
            file = path.resolve(__dirname, './dist', 'index.html')
            data = assets[key].source()
            fs.writeFileSync(file, data)
        }
    })
    callback()
})

/**
 * views使用ejs模板进行页面中的内容替换。
 * 第一个参数是模板的文件夹地址，第二个参数指明使用ejs模板替换html文件
 */
koa.use(views(path.resolve(__dirname, './dist'), {map: {html: 'ejs'}}))
//创建redux-store
koa.use(store)
//自定义中间件
koa.use(entry)
//开发工具
koa.use(convert(devMiddleware(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath
})))
//热部署webpack
koa.use(convert(hotMiddleware(compiler)))
//启动服务
koa.listen(port)
console.log(`\n Open up http://localhost:${port}/ in your browser.\n`)