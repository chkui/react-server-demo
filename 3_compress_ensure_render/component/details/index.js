import React from 'react'
import SearchInput from '../common/searchInput'
import Result from './result'
import {connect} from '../../util/store'
import {requestList, cleanList} from './reducer'
import getFetch from '../../util/fetch'

const cn = require('classnames/bind').bind(require('./index.scss'))

const SelectList = [{
    id: 'language',
    options: [{id: 'javascript', name: 'JavaScript'}, {id: 'java', name: 'Java'}]
}, {
    id: 'order',
    options: [{id: 'stars', name: 'Stars'}, {id: 'forks', name: 'Forks'}]
}]


const Details = connect((state, props) => {
    return {
        list: state.detailList
    }
}, (dispatch, props) => {
    return {
        load: (data) => {
            getFetch((fetch)=>{
                dispatch(requestList(data.text, data.language, data.order, fetch))
            })
        },
        clean: () => {
            dispatch(cleanList())
        }
    }
})(class extends React.Component {
    constructor(...props) {
        super(...props)
    }

    componentDidMount() {
        const {load, match, list} = this.props,
            {text, language, order} = match.params
        !list && text && language && order && (load(match.params))
    }

    componentWillUnmount(){
        this.props.clean()
    }

    render() {
        const {load, list, match} = this.props,
            {text} = match.params
        return (<div className={cn('details')}>
            <SearchInput text="React" value={text} selecteds={SelectList} onSubmit={load}/>
            <br/>
            {list && <Result list={list}/>}
        </div>)
    }
});

const Item = props =>
    <div>Item</div>

//webpack的require.ensure对es6支持存在问题
module.exports = Details
module.exports.default = module.exports