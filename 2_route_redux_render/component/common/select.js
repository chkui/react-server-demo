import React from 'react'

const cn = require('classnames/bind').bind(require('./select.scss'))

/**
 * 下拉菜单
 * @param {object} props {
 *      list:[{id,name},...]
 *      onSelected:(id,name,e)
 * }
 */
class Select extends React.Component {
    constructor(...props) {
        super(...props)
        const first = this.props.list[0]
        this.state = {
            dropShow: false //标记是否显示下拉选择框
        }
        this.curItem = {
            id: first.id,
            name: first.name
        }
        this.selectHandle = this.selectHandle.bind(this)
        this.clickHandle = this.clickHandle.bind(this)
    }

    getCurId(){
        return this.curItem.id
    }

    selectHandle(id, name, e) {
        this.curItem = {
            id: id,
            name: name
        }
        this.setState({
            dropShow: false
        })
    }

    clickHandle(e) {
        this.setState({
            dropShow: true
        })
    }

    render() {
        const dropShow = this.state.dropShow
        return (
            <div className={cn('select')}>
                <ShowItem act={dropShow} onClick={this.clickHandle} name={this.curItem.name}/>
                {dropShow && <DropList list={this.props.list} onSelected={this.selectHandle}/>}
            </div>
        )
    }
}

/**
 *
 * @param {object} props {
 *      name:
 *      act:
 *      onClick:
 * }
 * @constructor
 */
const ShowItem = props =>
    <div className={cn('show-item', props.act && 'active')} onClick={props.onClick}>
        <span>{props.name}</span>
        <div className={cn('arrow', props.act ? 'arrow-act' : 'arrow-def')}/>
    </div>

/**
 *
 * @param {object} props {
 *      list:[{id,name},...]
 *      onSelected:(id,name,e)
 * }
 * @constructor
 */
const DropList = props =>
    <ul className={cn('drop-list')}>{props.list.map(i => <DropItem key={i.id} id={i.id} name={i.name}
                                                                   onClick={props.onSelected}/>)}</ul>

/**
 *
 * @param {object} props {
 *      id:
 *      name:
 *      onClick: 点击回调 (id,name,event)
 * }
 * @constructor
 */
const DropItem = props =>
    <li className={cn('drop-item')} onClick={(e) => {
        props.onClick(props.id, props.name, e)
    }}>{props.name}</li>


export default Select