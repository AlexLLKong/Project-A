const { request } = require('express')
const express = require('express')
const fetch = require('node-fetch')
const app = express()
const port = process.env.PORT || 5000
const JIKAN_URL = 'https://api.jikan.moe/v3'
// console.log that your server is up and running
app.listen(port, () => console.log(`Listening on port ${port}`))

// create a GET route
app.get('/express_backend', (req, res) => {
	res.send({ express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT!!' })
})

// get schedule from Jikan API
app.get('/api/mal/schedule', (req, res) =>{
	fetch(JIKAN_URL + '/schedule')
		.then(info => info.json())
		.then(json => res.send(json))
})