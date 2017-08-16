import {isRoutes} from '../util/url'
import {reducers} from '../config'
import {build} from '../util/store'
import {requestList} from '../component/details/reducer'

async function reduxStore(ctx, next) {
    ctx.isRoutes = isRoutes(ctx.url) //判断当前请求是否属于路由列表
    if (ctx.isRoutes) {
        try {
            ctx.store = await new Promise((resolve, reject) => {
                processStore(resolve, build(reducers), ctx.url)
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
    const prefix = '/p/details/',
        paramStr = url.replace(prefix, '')
    url.startsWith(prefix) && '' !== paramStr ? (()=>{
        const params = paramStr.split('/')
        if(2 < params.length){
            store.subscribe(()=>{
                const list = store.getState().detailList
                list && 0 < list.length && resolve(store)
            })
            store.dispatch(requestList(params[0],params[1],params[2]))
        } else {
            resolve(store)
        }
    })():resolve(store)
}

module.exports = reduxStore