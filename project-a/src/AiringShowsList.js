import React, {Component} from 'react'
const _ = require('lodash')
const days = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"]
class AiringShowsList extends Component{
    constructor(){
        super()
        this.state = {
            loading: true,
            jikanResponse: {}
        }
    }

    componentDidMount(){
        this.setState({loading: true})
        fetch('https://api.jikan.moe/v3/schedule')
            .then(response => response.json())
            .then(data => {
                console.log(data)
                this.setState({
                    loading: false,
                    jikanResponse: _.cloneDeep(data)
                })
                console.log(this.state.jikanResponse)
            })
    }
    checkJikanCall (){
        if(this.state.loading)
            return 'loading...'
        else{
            const returnArr = [];
            for(let i = 0; i < days.length; i++){
                console.log(this.state.jikanResponse)
                let a = this.state.jikanResponse[days[i]]
                for(let j = 0; j < a.length; j++){
                    returnArr.push(a[j].title)
            }
        }
        return returnArr;
    }
    }
    render(){
        let list = this.checkJikanCall();
        return (
            <div>
                <h1>The list will go here</h1>
                <p>{list}</p>
            </div>
        )
    }
}

export default AiringShowsList