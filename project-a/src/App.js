import React, { useEffect, useState } from 'react'
import './App.css';
import AiringShowsList from './AiringShowsList.js'
import ExpressTestComp from './ExpressTestComp'
const _ = require('lodash')

export default function App (){

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
	const [loading, setLoading] = useState(true)
	const [userList, setUserList] = useState([])
	const [AiringShowsArray, setAiringShowsArray] = useState([])
	
	useEffect(() => {
		setLoading(loading => true)
    	fetch('/api/mal/schedule')
			.then(response => response.json())
			.then(data => {
				setLoading(loading => false)
				//console.log(data)
				setAiringShowsArray(AiringShowsArray => data.AiringShowsArray)
				this.setState({
					loading: false,
					jikanResponse: _.cloneDeep(data),
					AiringShowsArray: this.createArrayAiringShows(data)
			})
	})
	},[])

	function initNotifications(){

	}

	function displayAiringShows(){
		if(loading)
			return <h1>'loading...'</h1>
		else{
			return <AiringShowsList value = {{
				data: AiringShowsArray, 
				handlers: {addShow: handleAddShowUserList},
				title: 'Airing Shows'}}/>
		}
	}
	function displayUserListShows(){
		if(userList.length === 0)
			return <h1>Add from the list below to monitor shows!</h1>
		else{
			return <AiringShowsList value = {{
				data: userList,
				handlers: {removeShow: handleRemoveShowUserList},
				title: 'Favorites'}}/>
		}
	}

	function handleAddShowUserList(show){
		if(!userList.find(o => o.mal_id === show.mal_id)){	
			setUserList(userList => userList = _.sortBy([...userList, show], 'title'))
		}
	}

	function handleRemoveShowUserList(show){
		setUserList(userList => userList.filter(o => o.title !== show.title))
	}
	

	render(){
	return(
		<div>
			<ExpressTestComp />
			{displayUserListShows()}
			{displayAiringShows()}
		</div>
	)
}

