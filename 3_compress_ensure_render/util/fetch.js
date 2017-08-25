import isServerEvn from './isServerEvn'
//解决服务端未打包时没有ensure方法的问题，直接用源生的require替换
if (typeof require.ensure !== 'function') {
    require.ensure = function(dependencies, callback) {
        callback(require)
    }
}
export default (callback) =>{
    isServerEvn() ? require.ensure([], require => {
        const nodeFetch = require('node-fetch')
        callback(nodeFetch)
    }, 'node-fetch'):callback(fetch)
}