import Details from './component/details'

import {detailList} from './component/details/reducer'
import {moduleShow} from './component/module/reducer'

export const links = [{
    id:'home',
    name:'搜索首页',
    url:'/'
},{
    id:'details',
    name:'搜索详情',
    url:'/p/details'
}]


//解决服务端未打包时没有ensure方法的问题，直接用源生的require替换
if (typeof require.ensure !== 'function') {
    require.ensure = function(dependencies, callback) {
        callback(require)
    }
}

export const routes = [{
    id:'home',
    name:'home',
    url:'/',
    component: (call)=> { //加载组件的回调
        require.ensure([], require => {
            call(require('./component/home'))
        }, 'home')
    }
},{
    id:'details',
    name:'details',
    url:'/p/details/:text/:language/:order',
    component: (call)=> { //加载组件的回调
        require.ensure([], require => {
            call(require('./component/details'))
        }, 'details')
    }
},{
    id:'extPage',
    name:'extPage',
    url:'/p/ext/page',
    component: (call)=> { //加载组件的回调
        require.ensure([], require => {
            call(require('./component/extPage'))
        }, 'extPage')
    }
}]

export const reducers = {
    detailList,
    moduleShow
}

/**
 * 初始化加载页面的开关，仅用于说明区别
 * @type {boolean}
 */
export const isInitComponent = true