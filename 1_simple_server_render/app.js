'use strict';
import React from 'react'

const s_contain = {
    width: '40rem',
    display: 'inline-block'
},s_h3 = {
    display: 'inline-block'
}

const App = props =>
    <div style={s_contain}>
        <h3 style={s_h3}>这是一个简单的服务器端渲染展示页面。</h3>
        <P />
        <P2 />
    </div>

class P extends React.Component{
    constructor(...props){
        super(...props)
    }

    render(){
        return(
            <p>这是用ES6的class实现的组件，当在服务器上运行时对其进行修改页面会同步进行更新。</p>
        )
    }
}

const P2 = props =>
    <p>这是用function实现的组件，当在服务器上运行时修改内容并不会刷新，需要手工F5。</p>

export default App