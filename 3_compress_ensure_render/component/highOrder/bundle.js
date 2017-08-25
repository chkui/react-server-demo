/**
 * Created by chkui on 2017/6/10.
 */
import React from 'react'
import matchRoute from '../../util/matchRoute'

/**
 * 分片加载组件
 * @param {string} initId
 * @param {object} initComponent
 * @param {function} getComponentFoo
 * @return {{new(...[*]): {async: (function(*=)), render: (function()), componentWillMount: (function())}}}
 */
const bundle = (initId, initComponent, getComponentFoo) => {
    return class extends React.Component {
        constructor(...props) {
            super(...props)
            //----------------
            //这一段用于初始化渲染，解决第一次打开网站时服务端完成渲染前端再异步加载闪现的问题
            //获取当前url对应的路由
            const route = matchRoute(this.props.match.url),
                //根据判断规则获取初始化组件
                //规则1：initId是否存在
                //规则2：当前路由的id是否等于initId
                Comp = initId && route && initId === route.id ? initComponent : false
            //设定初始化组件，如果组件存在则不会进行异步加载
            this.state = {Comp: Comp}
            //----------------
            this.async = this.async.bind(this)
        }

        async(Comp) {
            //组件获取成功后，将其设置到state中触发渲染
            this.setState({Comp: Comp})
        }

        componentWillMount() {
            //装载完成后，调用routes中配置的异步方法获取组件
            !this.state.Comp && getComponentFoo(this.async)
        }

        render() {
            const {Comp} = this.state
            //如果组件已加载则渲染组件，如果未加载则不添加任何Dom
            return Comp ? (<Comp {...this.props}/>) : null
        }
    }
}

module.exports = bundle
module.exports.default = module.exports