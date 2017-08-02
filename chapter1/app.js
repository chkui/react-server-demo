/**
 * Created by chkui on 2017/7/28.
 * 用于演示构架简单的后台渲染
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
