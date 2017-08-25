'use strict';
import matchRoute from '../util/matchRoute'

/**
 * 生成页面组件
 * @param ctx
 * @param next
 * @returns {Promise.<*>}
 */
async function page(ctx, next) {
    if (ctx.isRoutes) {
        //matchRoute方法根据当前访问的url从路由列表中获取对应的route
        const {id, name, component} = matchRoute(ctx.url),
            Comp = await new Promise((res, rej) => {
                component((Comp) => { //异步获取组件
                    res(Comp)
                })
            })
        //将获取的结果赋值到请求的上下文交由下一个中间件处理
        ctx.page = {id, name, component: Comp}
        return next()
    } else {
        return next()
    }
}

module.exports = page
module.exports.default = module.exports