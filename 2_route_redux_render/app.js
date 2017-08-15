'use strict';
import React from 'react'
import ModuleContain from './component/module/moduleContain'
import {Link, Route} from 'react-router-dom'
import {links, routes} from './config'
const cn = require('classnames/bind').bind(require('./app.scss'))

const App = props =>
    <div className={cn('app')}>
        {/*<NavList />*/}
        <Section />
        <ModuleContain />
    </div>

const NavList = props =>
    <nav>
        {links.map(i=><Nav key={i.id} to={i.url} name={i.name}/>)}
    </nav>

/**
 *
 * @param props {object} {
 *     {string} to:跳转地址
 *     {string} name:名称
 * }
 * @constructor
 */
const Nav = props =>
    <Link to={props.to}><p className={cn('nav')}>{props.name}</p></Link>

const Section = props =>
    <section>
        {routes.map(i=><Context key={i.id} path={i.url} component={i.component}/>)}
    </section>

/**
 *
 * @param props {object} {
 *     {string} path:地址
 *     {object} component:对应的组件
 * }
 * @constructor
 */
const Context = props =>
    <Route exact path={props.path} component={props.component}/>
export default App