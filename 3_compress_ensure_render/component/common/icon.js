import React from 'react'

let res
require.ensure([], require => {
    res = require('../../res')
}, 'details')

const Icon = props =>{
    const params = Object.assign({}, props)
    params.src = res[params.src]
    return(<img {...params}/>)
}

export default Icon