import {isRoutes} from '../util/url'
import {reducers} from '../config'
import {build} from '../util/store'
import {requestList} from '../component/details/reducer'

/**
 * 组装redux的数据
 * @param ctx
 * @param next
 * @returns {Promise.<*>}
 */
async function reduxStore(ctx, next) {
    ctx.isRoutes = isRoutes(ctx.url) //判断当前请求是否属于路由列表
    if (ctx.isRoutes) {
        try {
            ctx.store = await new Promise((resolve, reject) => {
                processStore(resolve, build(reducers), ctx.url) //使用process组装列表页面的数据
            })
        } catch (err) {
            console.error('process fluxStore error', err)
        }
        return next()
    } else {
        return next()
    }
}

const processStore = (resolve, store, url) => {
    const prefix = '/p/details/', //用于判断是否是列表页面
        paramStr = url.replace(prefix, '')
    url.startsWith(prefix) && '' !== paramStr ? (()=>{
        const params = paramStr.split('/')
        if(2 < params.length){
            store.subscribe(()=>{ //监听store的数据变更
                const list = store.getState().detailList
                list && 0 < list.length && resolve(store) //list获取数据后，执行next()
            })
            store.dispatch(requestList(params[0],params[1],params[2])) //调用action更新数据
        } else {
            resolve(store)
        }
    })():resolve(store)
}

module.exports = reduxStore
module.exports.default = module.exports