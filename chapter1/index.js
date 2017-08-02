
import React from 'react'
import {render} from 'react-dom'
import App from './app.js'

const Chapter1 = props =>
    <HashRouter>
        <App />
    </HashRouter>

render(<Chapter1 />, document.getElementById('root'))