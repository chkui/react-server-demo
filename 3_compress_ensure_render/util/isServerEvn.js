export default () => {
    return (typeof global == 'object') && (global.global === global);
}