import React from 'react'
import Select from './select'

const cn = require('classnames/bind').bind(require('./searchInput.scss'))

/**
 * @param {string} value: 设定当前搜索内容，仅仅是设定文本，不会触发搜索动作
 * @param {string} text: 设定默认搜索内容
 * @param {array} selecteds:[{ //下拉菜单扩展
 *     id:'language', 回调标记id
 *     options:[{id: 'javascript', name: 'JavaScript'}, {id: 'java', name: 'Java'}] 下拉列表
 * }]
 * @param onSubmit: (params)=>{
 *      params.text 文本框输入的内容
 *      params[selecteds[0~n].id] 每个下拉菜单的值
 * }
 */
class SearchInput extends React.Component {
    constructor(...props) {
        super(...props)
        /**
         * input 文本输入框
         * language 语言选择结果
         * order 排序选择结果
         * @type {{}}
         */
        this.ref = {}
        this.keyUpHandle = this.keyUpHandle.bind(this)
    }

    keyUpHandle(e) {
        e && e.keyCode === 13 && this.submit()
    }

    submit() {
        const inputValue = this.ref.input.value,
            selecteds = this.props.selecteds,
            submitData = {
                text: inputValue && '' !== inputValue ? inputValue : this.props.text
            }
        selecteds.map(i => submitData[i.id] = this.ref[i.id].getCurId())
        this.props.onSubmit(submitData)
    }

    componentDidMount(){
        const value = this.props.value
        value && '' !== value.trim(' ') && (this.ref.input.value = value)
    }

    render() {
        const {selecteds, text, value} = this.props
        return (<div className={cn('search-box')}>
            <input ref={(ref) => {
                this.ref.input = ref
            }} onKeyDown={this.keyUpHandle} className={cn('search')} type="text" placeholder={text ? text : ''} />
            {selecteds && selecteds.map(i =>
                <Select key={i.id} ref={(ref) => {
                    this.ref[i.id] = ref
                }} list={i.options}/>
            )}
        </div>)
    }
}

SearchInput.defaultProps = {
    text: 'react'
};

export default SearchInput