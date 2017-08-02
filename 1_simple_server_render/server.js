'use strict';
require('babel-polyfill');
require('babel-register')({
    presets: ['es2015', 'react', 'stage-0'],
    plugins: ['add-module-exports']
});
const koa = require('./koa'),
    convert = require('koa-convert'),
    webpack = require('webpack'),
    fs = require('fs'),
    path = require('path'),
    devMiddleware = require('koa-webpack-dev-middleware'), //koa开发中间件
    hotMiddleware = require('koa-webpack-hot-middleware'), //热部署中间件
    views = require('koa-views'), //页面模板工具
    config = require('./webpack/server-dev'), //webpack的静态配置
    middleware = require('./middleware'),
    port = 8080,
    compiler = webpack(config) //webpack打包执行


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

koa.use(views(path.resolve(__dirname, './dist'), {map: {html: 'ejs'}}))
koa.use(middleware)
koa.use(convert(devMiddleware(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath
})))
koa.use(convert(hotMiddleware(compiler))) //热部署webpack
koa.listen(port) //启动服务
console.log(`\n Open up http://localhost:${port}/ in your browser.\n`)