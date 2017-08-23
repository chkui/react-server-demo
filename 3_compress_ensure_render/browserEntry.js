'use strict';
import React from 'react'
import {render} from 'react-dom'
import {Provider} from 'react-redux'
import {BrowserRouter} from 'react-router-dom'
import {build} from './util/store'
import {reducers ,routes} from './config'
import App from './app'

const pageRender = component =>{
    render(
        <Provider store={build(reducers, window.REDUX_STATE)}>
            <BrowserRouter>
                <App component={component}/>
            </BrowserRouter>
        </Provider>, document.getElementById('root'))
}

const id = window.Init_Page ? window.Init_Page.id : false
id ? (()=>{
    const route = routes.filter(i=>i.id === id)[0]
    route && route.component(cb=>{
        pageRender(cb)
    })
})(): pageRender(false)