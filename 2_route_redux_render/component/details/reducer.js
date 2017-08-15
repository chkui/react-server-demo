import {moduleType, module} from '../module/reducer'

const loading = () => {
    return {
        type: 'homeListLoading'
    }
}

const loaded = list => {
    return {
        type: 'homeListLoaded',
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
export const homeList = (state = false, action) => {
    switch (action.type) {
        case 'homeListLoading':
            return false
        case 'homeListLoaded':
            return action.list
        default :
            return state
    }
}