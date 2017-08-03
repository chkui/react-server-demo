'use strict';
import React from 'react'
import {renderToString} from 'react-dom/server'
import App from './app'

//用于生成页面的中间件
async function middleware(ctx, next) {
    if(ctx.url === '/'){
        //使用renderToString渲染<App />组件得到一个字符串
        const dom = renderToString(<App/>)
        //使用之前view中间件生成的模板渲染引擎生成HTML文本
        await ctx.render('index', {
            root: dom
        })
    }else {//如果不是访问的根目录，则交由下一个中间件
        return next();
    }
}

module.exports = middleware
module.exports.default = module.exports
