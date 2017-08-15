import Home from './component/home'
import Details from './component/details'

import {homeList} from './component/details/reducer'
import {moduleShow} from './component/module/reducer'

export const links = [{
    id:'home',
    name:'搜索首页',
    url:'/'
},{
    id:'details',
    name:'搜索详情',
    url:'/details'
}]

export const routes = [{
    id:'home',
    name:'home',
    url:'/',
    component:Home
},{
    id:'detailsStatic',
    name:'detailsStatic',
    url:'/details',
    component:Details
},{
    id:'detailsDynamic',
    name:'detailsDynamic',
    url:'/details/:text/:language/:order',
    component:Details
}]

export const reducers = {
    homeList,
    moduleShow
}