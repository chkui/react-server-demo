import React from 'react'
import Select from '../common/select'
const cn = require('classnames/bind').bind(require('./searchInput.scss'))

const Conf_Language = [{id:'javascript',name:'JavaScript'},{id:'java',name:'Java'}],
    Conf_Order = [{id:'stars',name:'Stars'},{id:'forks',name:'Forks'}],
    Conf_Text = 'react'

/**
 * @param onSubmit(text, language, order)
 */
class SearchInput extends React.Component{
    constructor(...props){
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

    componentDidMount(){
        this.submit()
    }

    keyUpHandle(e) {
        e && e.keyCode === 13 && this.submit()
    }

    submit(){
        const inputValue = this.ref.input.value
        this.props.onSubmit(inputValue && '' !== inputValue ? inputValue : Conf_Text,
            this.ref.language.getCurId(),
            this.ref.order.getCurId())
    }

    render(){
        return(<div className={cn('search-box')}>
            <input ref={(ref)=>{this.ref.input = ref}} onKeyDown={this.keyUpHandle} className={cn('search')} type="text" placeholder={Conf_Text}/>
            <Select ref={(ref)=>{this.ref.language = ref}} list={Conf_Language}/>
            <Select ref={(ref)=>{this.ref.order = ref}} list={Conf_Order}/>
        </div>)
    }
}

export default SearchInput