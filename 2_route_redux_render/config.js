import Home from './component/home'
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

export const routes = [{
    id:'home',
    name:'home',
    url:'/',
    component:Home
},{
    id:'detailsStatic',
    name:'detailsStatic',
    url:'/p/details',
    component:Details
},{
    id:'detailsDynamic',
    name:'detailsDynamic',
    url:'/p/details/:text/:language/:order',
    component:Details
}]

export const reducers = {
    detailList,
    moduleShow
}