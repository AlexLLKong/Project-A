import React, {Component} from 'react'
import ShowCard from './ShowCard'
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
                this.setState({
                    loading: false,
                    jikanResponse: _.cloneDeep(data)
                })
            })
    }
    checkJikanCall (){
        if(this.state.loading)
            return 'loading...'
        else{
            let objArr = [];
            console.log(this.state.jikanResponse)
            for(let i = 0; i < days.length; i++){
                let a = this.state.jikanResponse[days[i]]
                for(let j = 0; j < a.length; j++){
                    objArr.push(a[j])
                }
            }
            objArr = _.sortBy(objArr, 'title')
            const returnArr = objArr.map(x => {
                return <ShowCard 
                            key = {x.mal_id}
                            value = {x}
                        />
            })
        return returnArr;
        }
    }
    render(){
        let list = this.checkJikanCall();
        return (
            <div className= 'album container'>
                <div className = 'col-12'>
                    <h1 className = 'section-title'>Airing Shows</h1>
                </div>
                <div className = 'row justify-content-around'>
                    {list}
                </div>
            </div>
        )
    }
}

export default AiringShowsList