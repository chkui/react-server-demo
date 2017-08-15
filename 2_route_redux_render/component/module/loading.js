import React from 'react'
import BaseMask from './baseMask'
const cn = require('classnames/bind').bind(require('./loading.scss'))

/**
 * 加载效果
 */
class Loading extends React.Component {
    constructor(...props) {
        super(...props)
        this.state = {
            dot:''
        }
        this.timer = false
    }

    componentDidMount(){
        this.timer = setInterval(()=>{
            const dot = this.state.dot
            this.setState({
                dot:dot.length > 6 ? '.':`${dot}.`
            })
        },500)
    }

    componentWillUnmount(){
        clearInterval(this.timer)
    }

    render() {
        return (
            <BaseMask>
                <div className={cn('loading')}>
                    <div className={cn('label')}>Loading</div>
                    <div className={cn('label')}>{this.state.dot}</div>
                </div>
            </BaseMask>
        )
    }
}

export default Loading