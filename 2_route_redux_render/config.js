import Home from './component/home'
import Page1 from './component/page1'
import Page2 from './component/page2'

export const routes = [{
    id:'home',
    name:'home',
    url:'/',
    component:Home
},{
    id:'page1',
    name:'first',
    url:'/page1',
    component:Page1
},{
    id:'page2',
    name:'second',
    url:'/page2',
    component:Page2
}]