import React from 'react'

const cn = require('classnames/bind').bind(require('./result.scss'))

/**
 *
 * @param {object} props {list}
 * @constructor
 */
const Result = props =>
    <div className={cn('list')}>
        {props.list.map(i => <ResultItem key={i.id}
                                   name={i.name}
                                   description={i.description}
                                   url={i.html_url}
                                   owner={i.owner.login}
                                   avatar={i.owner.avatar_url}
        />)}
    </div>


/**
 *
 * @param {object} props {
 *      name //name
 *      description //description
 *      url //html_url
 *      owner // owner.login
 *      avatar // owner.avatar_url
 * }
 * @constructor
 */
const ResultItem = props =>
    <div className={cn('item')}>
        <Label name="Name" value={props.name}/>
        <Label name="Git Site" value={props.url}/>
        <Label name="Owner" value={props.owner}/>
        <ImgLabel name="Avatar" value={props.avatar}/>
        <Label name="Description" value={props.description}/>
    </div>

/**
 *
 * @param {object} props {
 *      name:
 *      value
 * }
 */
const Label = props =>
    <div className={cn('label')}>
        <p className={cn('key')}>{props.name}</p>
        <p className={cn('value')}>{props.value}</p>
    </div>

const ImgLabel = props =>
    <div className={cn('label')}>
        <p className={cn('key')}>{props.name}</p>
        <div className={cn('value')}><img className={cn('img')} src={props.value} /></div>
    </div>

export default Result