import React from 'react'
import SearchInput from '../common/searchInput'
import Result from './result'
import {connect} from '../../util/store'
import {requestList} from './reducer'

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
        list: state.homeList
    }
}, (dispatch, props) => {
    return {
        load: (data) => {
            dispatch(requestList(data.text, data.language, data.order))
        }
    }
})(class extends React.Component {
    constructor(...props) {
        super(...props)
    }

    componentDidMount() {
        const {load, match} = this.props,
            {text, language, order} = match.params
        text && language && order && (load(match.params))
    }

    render() {
        const {load, list, match} = this.props,
            {text} = match.params
        return (<div className={cn('details')}>
            <SearchInput text="React" value={text} selecteds={SelectList} onSubmit={load}/>
            {list && <Result list={list}/>}
        </div>)
    }
});

const Item = props =>
    <div>Item</div>

export default Details