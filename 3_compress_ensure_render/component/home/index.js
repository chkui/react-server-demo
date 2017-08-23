import React from 'react'
import SearchInput from '../common/searchInput'
import logoImg from '../../res/logo.jpg'

const cn = require('classnames/bind').bind(require('./index.scss')),
    SelectList = [{
        id: 'language',
        options: [{id: 'javascript', name: 'JavaScript'}, {id: 'java', name: 'Java'}]
    }, {
        id: 'order',
        options: [{id: 'stars', name: 'Stars'}, {id: 'forks', name: 'Forks'}]
    }, {
        id: 'render',
        options: [{id: 'native', name: '前端'}, {id: 'server', name: '服务器'}]
    }],
    tipText = '请输入github.com搜索内容，点击Enrty搜索'

class Home extends React.Component {
    constructor(...props) {
        super(...props)
        this.sumbitHandle = this.sumbitHandle.bind(this)
    }

    sumbitHandle(data) {
        if(data.text !== tipText) {
            const url = `/p/details/${data.text}/${data.language}/${data.order}`
            'native' === data.render ? this.props.history.push(url) :
                window.location.href = url
        }
    }

    render() {
        return (
            <div className={cn('home')}>
                <img className={cn('img')} src={logoImg}/>
                <br/>
                <SearchInput selecteds={SelectList} text={tipText} onSubmit={this.sumbitHandle}/>
            </div>
        )
    }
}

//webpack的require.ensure对es6支持存在问题
module.exports = Home
module.exports.default = module.exports