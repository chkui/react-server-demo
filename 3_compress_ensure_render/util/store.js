import {createStore, combineReducers, applyMiddleware} from 'redux'
import {connect as co} from 'react-redux'
import thunkMiddleware from 'redux-thunk'
import logger from 'redux-logger'

let store
/**
 * store的构造器
 */
export class storeBuilder {
    add(reducer, name) {
        !this.reducer && (this.reducer = {})
        name ? this.reducer[name] = reducer : this.reducer = Object.assign(this.reducer, reducer)
    }

    build(initStore) {
        build(this.reducer, initStore)
    }
}

/**
 * 构建store
 * @param reducers
 * @param initStore
 */
export const build = (reducers, initStore) => {
    store = createStore(
        combineReducers(reducers),
        initStore,
        applyMiddleware(thunkMiddleware,logger())
    );
    return store
}

/**
 * 获取值
 * @param reducerName
 * @returns {*}
 */
export const get = (reducerName) => {
    return store ? store.getState()[reducerName] : (()=>{
        console.warn('Store has not init.')
        return null
    })()
}

/**
 * 执行一个action
 * @param action
 */
export const dispatch = (action) => {
    store.dispatch(action)
}

/**
 * 增加一个数据变动的监听器
 * @param {function} listener ()=>{const value = get(reducerName)}
 */
export const subscribe = (listener) =>{
    store.dispatch(listener)
}

/**
 * 执行connect方法
 * @param params
 * @returns {*}
 */
export const connect = (...params) =>{
    return co(...params)
}