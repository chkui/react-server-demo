import {routes} from '../config'

/**
 * 判断当前的url是否属于路由列表
 * @param url
 */
export const isRoutes = (url)=>{
    return '/' === url || url.startsWith('/p/')
}

