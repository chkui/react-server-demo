import {routes, isInitComponent} from '../config'

/**
 * 用于匹配路由器材
 * 这样写仅仅用于实例，请在实际应用中使用正则表达式判断
 * 可以参考"https://github.com/palmg/pwfe-server/blob/master/src/lib/common/routes.js"中路由匹配的代码
 * @param url 当前访问路径
 * @returns {boolean}
 */
const matchRoute = url => {
    for (let i of matchPrefix) {
        if (url.startsWith(i.url)) {
            for (let j of routes) {
                if (i.id === j.id) {
                    return j
                }
            }
        }
    }
    return false
}
const matchPrefix = [{
    url: '/',
    id: 'home'
}, {
    url: '/p/details/',
    id: 'details'
}, {
    url: '/p/ext/',
    id: 'extPage'
}]

/**
 * 生成页面组件
 * @param ctx
 * @param next
 * @returns {Promise.<*>}
 */
async function page(ctx, next) {
    if (isInitComponent && ctx.isRoutes) {
        const route = matchRoute(ctx.url),
            component = await new Promise((res, rej) => {
                route.component((Comp) => { //异步获取组件
                    res(Comp)
                })
            })
        ctx.page = {
            id: route.id,
            name: route.name,
            component: component
        }
        return next()
    } else {
        return next()
    }
}
module.exports = page
module.exports.default = module.exports