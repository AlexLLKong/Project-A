const express = require('express')
const fetch = require('node-fetch')
const bodyParser = require('body-parser')
const cors = require('cors')
const compression = require('compression')
const _ = require('lodash')
const subscriptionHandler = require('./subscriptionHandler')
const app = express()
const port = process.env.PORT || 5000
const JIKAN_URL = 'https://api.jikan.moe/v3'
const days = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"]

// create a GET route
app.get('/express_backend', (req, res) => {
	res.send({ express: 'Express is connected' })
})

let jikanResponse = {}
fetch(JIKAN_URL + '/schedule')
	.then(info => info.json())
	.then(body => jikanResponse = createArrayAiringShows(body))


function setNextAirDate(show){
	const firstAirDate = new Date(show.airing_start);
	
	const daysFromFirstAir= Math.ceil((Math.abs(Date.now() - firstAirDate)) / (1000 * 60 * 60 * 24 * 7))*7;

	let nextAirDate = firstAirDate
	nextAirDate.setDate(firstAirDate.getDate() + daysFromFirstAir)
	nextAirDate.setHours(firstAirDate.getHours())
	nextAirDate.setMinutes(firstAirDate.getMinutes())

	show.nextAirDate = nextAirDate
	return show
}
function createArrayAiringShows (data){
	let objArr = [];
	for(let i = 0; i < days.length; i++){
		let a = data[days[i]]
		for(let j = 0; j < a.length; j++){
			a[j] = setNextAirDate(a[j])
			objArr.push(a[j])
		}
	}
	objArr = _.sortBy(objArr, 'title')
	const retObj = {AiringShowsArray: objArr}
	return retObj
}

// get schedule from Jikan API
app.get('/api/mal/schedule', (req, res) =>{
	res.send(jikanResponse)
})

// app.use(
// 	cors({
// 		origin(origin, cb) {
// 			const whitelist = process.env.CORS_ORIGIN ? process.env.CORS_ORIGIN.split(',') : ['http://localhost:3000']
// 			cb(null, whitelist.includes(origin))
// 		},
// 		credentials: true
// 	})
// )

// console.log that your server is up and running
app.listen(port, () => console.log(`Listening on port ${port}`))
