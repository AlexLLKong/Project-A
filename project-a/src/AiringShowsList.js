import React from 'react'
import ShowCard from './ShowCards/ShowCard'
import UserListCard from './ShowCards/UserListCard'
function createAiringShowCards(props){
    const returnArr = props.value.data.map(x => {
        return <ShowCard 
                    key = {x.mal_id}
                    value = {x}
                    handlers = {props.value.handlers}
                />
    })
return returnArr;
}
function createUserListShowCards(props){
    const returnArr = props.value.data.map(x => {
        return <UserListCard 
                    key = {x.mal_id}
                    value = {x}
                    handlers = {props.value.handlers}
                />
    })
return returnArr;
}
function AiringShowsList(props){
    
        // let list = this.state.title === 'Airing Shows' ? 
        //     this.createAiringShowCards() : this.createUserListShowCards()
        
        // console.log(this.state.data)
        return (
            <div className= 'album container'>
                <div className = 'col-12'>
                    <h1 className = 'section-title'>{props.value.title}</h1>
                </div>
                <div className = 'row justify-content-around'>
                    {
                        props.value.title === 'Airing Shows' ? 
                        createAiringShowCards(props) 
                        : createUserListShowCards(props)
                    }
                </div>
            </div>
        )    
    
}
export default AiringShowsList