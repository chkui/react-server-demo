import React from 'react'
import Loading from './loading'
import {connect} from '../../util/store'
import {moduleType} from './reducer'


const ModuleContain = connect((state, props)=>{
    return{
        type:state.moduleShow
    }
})(props =>{
    switch (props.type){
        case moduleType.loading:
            return (<Loading />)
        default:
            return null
    }
})

export default ModuleContain