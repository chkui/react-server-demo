'use strict';
import React from 'react'
import {render} from 'react-dom'
import {Provider} from 'react-redux'
import {BrowserRouter} from 'react-router-dom'
import {build} from './util/store'
import {reducers} from './config'
import App from './app'

render(<Provider store={build(reducers, window.REDUX_STATE)}>
    <BrowserRouter><App/></BrowserRouter></Provider>, document.getElementById('root'))