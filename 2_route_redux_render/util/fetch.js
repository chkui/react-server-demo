const isServerEvn = () =>{
    return (typeof global == 'object') && (global.global === global);
}
const ins = isServerEvn()? require('node-fetch') : fetch
export default ins