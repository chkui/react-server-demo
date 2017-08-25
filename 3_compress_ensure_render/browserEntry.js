'use strict';
import React from 'react'
import {render} from 'react-dom'
import {Provider} from 'react-redux'
import {BrowserRouter} from 'react-router-dom'
import {build} from './util/store'
import {reducers ,routes} from './config'
import App from './app'

//异步渲染，通过参数传入已经加载完成的组件
const pageRender = (id, component) =>{
    render(
        <Provider store={build(reducers, window.REDUX_STATE)}>
            <BrowserRouter>
                <App id={id} component={component}/>
            </BrowserRouter>
        </Provider>, document.getElementById('root'))
}

//获取当前页面对应的路由id
const id = window.Init_Page ? window.Init_Page.id : false
//id存在则从路由列表中找到对应的组件，id不存在则直接渲染
id ? (()=>{
    const route = routes.filter(i=>i.id === id)[0]
    route && route.component(cb=>{
        pageRender(id, cb)
    })
})(): pageRender()