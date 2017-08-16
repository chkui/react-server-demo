import {moduleType, module} from '../module/reducer'
import fetch from '../../util/fetch'

const loading = () => {
    return {
        type: 'detailListLoading'
    }
}

const loaded = list => {
    return {
        type: 'detailListLoaded',
        list: list
    }
}

export const requestList = (text, language, order) => {
    return dispatch => {
        dispatch(loading())
        dispatch(module(moduleType.loading))
        const url = `https://api.github.com/search/repositories?q=${text}+language:${language}&sort=${order}&order=desc`,
            _this = this
        return fetch(url).then((res) => {
            return res.text()
        }).then((body) => {
            return JSON.parse(body)
        }).then((json) => {
            dispatch(loaded(json.items))
            dispatch(module(moduleType.none))
        })
    }
}

/**
 * reducer
 * @param state
 * @param action
 * @returns {*}
 */
export const detailList = (state = false, action) => {
    switch (action.type) {
        case 'detailListLoading':
            return false
        case 'detailListLoaded':
            return action.list
        default :
            return state
    }
}