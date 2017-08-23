/**
 * Created by chkui on 2017/6/10.
 */

import React from 'react'

/**
 * 页面分片高阶组件。该组件配合`routes`用于实现页面分片。
 * @param initComponent
 * @param getComponent
 * @return {{new(...[*]): {async: (function(*=)), render: (function()), componentWillMount: (function())}}}
 */
const bundle = (initComponent, getComponent)=> {
    return class extends React.Component {
        constructor(...props) {
            super(...props)
            this.state = {
                Comp: initComponent
            }
            this.async = this.async.bind(this)
        }

        async(Comp) {
            this.setState({
                Comp: Comp
            })
        }

        componentWillMount() {
            !this.state.Comp && getComponent(this.async)
        }

        render() {
            const {Comp} = this.state;
            return Comp ? (<Comp {...this.props}/>) : null;
        }
    }
}

module.exports = bundle
module.exports.default = module.exports