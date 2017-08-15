import React from 'react'
import SearchInput from '../common/searchInput'
const cn = require('classnames/bind').bind(require('./index.scss'))

const SelectList = [{
    id: 'language',
    options: [{id: 'javascript', name: 'JavaScript'}, {id: 'java', name: 'Java'}]
}, {
    id: 'order',
    options: [{id: 'stars', name: 'Stars'}, {id: 'forks', name: 'Forks'}]
}, {
    id: 'render',
    options: [{id: 'native', name: '前端'}, {id:'server', name:'服务器'}]
}]

class Home extends React.Component{
    constructor(...props){
        super(...props)
        this.sumbitHandle = this.sumbitHandle.bind(this)
    }

    sumbitHandle(data){
        this.props.history.push(`/details/${data.text}/${data.language}/${data.order}`)
    }

    render(){
        return(
            <div className={cn('home')}>
                <p>请输入github.com搜索内容，点击Enrty搜索</p>
                <SearchInput selecteds={SelectList} onSubmit={this.sumbitHandle}/>
            </div>
        )
    }
}

export default Home