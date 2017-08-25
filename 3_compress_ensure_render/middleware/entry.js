'use strict';
import React from 'react'
import {renderToString} from 'react-dom/server'
import {Provider} from 'react-redux'
import {StaticRouter} from 'react-router-dom'
import App from '../app'
import {isInitComponent} from '../config'

//用于生成页面的中间件
async function entry(ctx, next) {
    if (ctx.isRoutes) {
        const page = ctx.page
        console.log('page', page)
        console.log('component', page.component)
        //使用renderToString渲染<App />组件得到一个字符串
        const dom = renderToString(
            <Provider store={ctx.store}>
                <StaticRouter location={ctx.url} context={{}}>
                    <App id={page.id} component={page.component}/>
                </StaticRouter>
            </Provider>
        )
        //使用之前view中间件生成的模板渲染引擎生成HTML文本
        await ctx.render('index', {
            title: page.name,
            root: dom,
            state: ctx.store.getState(),
            page: {
                id: isInitComponent ? page.id : false,
            }
        })
    } else {//如果不是访问的根目录，则交由下一个中间件
        return next();
    }
}

module.exports = entry
module.exports.default = module.exports
