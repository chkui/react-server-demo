import React from 'react'
const cn = require('classnames/bind').bind(require('./baseMask.scss'))

/**
 *
 * @param {object} props {
 *      children: 显示子元素
 * }
 * @constructor
 */
const BaseMask = props =>
    <div className={cn('mask')}>
        <div className={cn('view')}/>
        {props.children}
    </div>

export default BaseMask