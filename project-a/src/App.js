import React from 'react'
import './App.css';
import AiringShowsList from './AiringShowsList.js'
import ExpressTestComp from './ExpressTestComp'
const _ = require('lodash')
const days = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"]
class App extends React.Component{
  	constructor(){
		super()
		this.handleAddShowUserList = this.handleAddShowUserList.bind(this)
		this.handleRemoveShowUserList = this.handleRemoveShowUserList.bind(this)
    	this.state = {
		loading: true,
      	jikanResponse: {},
		userList: []
    	}
  	}
  	componentDidMount(){
    	this.setState({loading: true})
    	fetch('/api/mal/schedule')
			.then(response => response.json())
			.then(data => {
				this.setState({
					loading: false,
					jikanResponse: _.cloneDeep(data),
					AiringShowsArray: this.createArrayAiringShows(data)
				})
			})
  	}
	displayAiringShows(){
		if(this.state.loading)
			return <h1>'loading...'</h1>
		else{
			return <AiringShowsList value = {{
				data: this.state.AiringShowsArray, 
				handlers: {addShow: this.handleAddShowUserList},
				title: 'Airing Shows'}}/>
		}
	}
	displayUserListShows(){
		// TODO: Add a POST call here to save user list for later.
		if(this.state.userList.length === 0)
			return <h1>Add from the list below to monitor shows!</h1>
		else{
			// console.log(this.state.userList)
			return <AiringShowsList value = {{
				data: this.state.userList,
				handlers: {removeShow: this.handleRemoveShowUserList},
				title: 'Favorites'}}/>
		}
	}
	handleAddShowUserList(show){
		let lastArr = this.state.userList
		if(!lastArr.find(o => o.mal_id === show.mal_id))
		lastArr.push(show)
		this.setState({
			userList: _.sortBy(_.cloneDeep(lastArr), 'title')
		})
	}
	handleRemoveShowUserList(show){
		let lastArr = this.state.userList
		_.remove(lastArr, (o) =>{
			return o.title === show.title
		})
		this.setState({
			userList: _.cloneDeep(lastArr)
		})
	}
	createArrayAiringShows (data){
		
			let objArr = [];
			console.log(data)
			for(let i = 0; i < days.length; i++){
				let a = data[days[i]]
				for(let j = 0; j < a.length; j++){
					objArr.push(a[j])
			}
		}
		objArr = _.sortBy(objArr, 'title')
		return objArr
	}
	render(){
		return(
			<div>
				<ExpressTestComp />
				{this.displayUserListShows()}
				{this.displayAiringShows()}
			</div>
		)
	}
    
}

export default App;
