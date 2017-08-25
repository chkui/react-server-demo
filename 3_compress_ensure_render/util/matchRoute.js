import {routes} from '../config'
/**
 * 用于匹配路由器材
 * 这样写仅仅用于示例，请在实际应用中使用正则表达式判断
 * 可以参考"https://github.com/palmg/pwfe-server/blob/master/src/lib/common/routes.js"中路由匹配的代码
 * @param url 当前访问路径
 * @returns {boolean}
 */
const matchRoute = url => {
    let id;
    if(-1 !== url.indexOf('/p/details/')){
        id = 'details'
    }else if(-1 !== url.indexOf('/p/ext/')){
        id = 'extPage'
    }else {
        id = 'home'
    }
    for (let i of routes) {
        if (i.id === id) {
            return i
        }
    }
    return false
}

export default matchRoute