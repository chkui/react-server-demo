/**
 * Created by chkui on 2017/7/28.
 */

import React from 'react'
import {render} from 'react-dom'
import {Link, HashRouter}from 'react-router-dom'

const App = props =>
    <div>
        <nav>
            <Link to="/">首页</Link>
        </nav>
        <section>
            123
        </section>
    </div>

const Chapter1 = props =>
    <HashRouter>
        <App />
    </HashRouter>

render(<Chapter1 />, document.getElementById('root'))
