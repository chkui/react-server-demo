import {moduleType, module} from '../module/reducer'
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

export const requestList = (text, language, order, fetch) => {
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

export const cleanList = () => {
    return {
        type: 'detailListClean',
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
        case 'detailListClean':
        case 'detailListLoading':
            return false
        case 'detailListLoaded':
            return action.list
        default :
            return state
    }
}