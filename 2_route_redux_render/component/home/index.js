import React from 'react'
import SearchInput from './searchInput'
import Result from './result'

const C_URL = 'https://api.github.com/search/repositories?q={text}+language:{language}&sort={sort}&order=desc'

class Home extends React.Component {
    constructor(...props) {
        super(...props)
        this.state = {
            list: false
        }
        this.searchHandle = this.searchHandle.bind(this)
    }

    searchHandle(text, language, order) {
        const url = `https://api.github.com/search/repositories?q=${text}+language:${language}&sort=${order}&order=desc`,
            _this = this
        fetch(url).then((res) => {
            return res.text()
        }).then((body) => {
            return JSON.parse(body)
        }).then((json) => {
            console.log(json)
            _this.setState({list: json.items})
        })
    }

    render() {
        const {list} = this.state
        return (<div>
            <div>
                <SearchInput onSubmit={this.searchHandle}/>
            </div>
            {list && <Result list={list}/>}
        </div>)
    }
}

const Item = props =>
    <div>Item</div>

export default Home