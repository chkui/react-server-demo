/**
 * 模式框类型
 * @type {{none: number, loading: number}}
 */
export const moduleType = {
    none:0,
    loading:1
}

export const module = (type) => {
    return {
        type:'moduleType',
        mask:type
    }
}

export const moduleShow = (state=false, action) =>{
    switch (action.type){
        case 'moduleType':
            return action.mask
        default:
            return state
    }
}