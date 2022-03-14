const path = require('path')

const express = require('express')

const hbs = require('hbs')

const server = express()

const utils = require('./weather-utils/utils-weather.js')

//port for heroku

const port = process.env.PORT || 3000


// Store the path in a variable

const publicDirPath = path.join(__dirname,'../public')

//change the default views directory's name to something else

const viewsPath = path.join(__dirname,'../templates/views')

// call the change directory name for hbs files

server.set('views', viewsPath)

//partials directory path

const partialsPath = path.join(__dirname,'../templates/partials')

//display static html from the webserver

server.use(express.static(publicDirPath)) //displays html for root route or /index.html ,/about.html, /help.html

//call for hbs module - handlebars for dynamic templates

// previous name of the templates directory was 'views' which is the default name to be indicated

server.set('view engine','hbs')
hbs.registerPartials(partialsPath)

server.get('', (req, res) => {
	res.render('index', {
		title:'Manage your Notes',
		name:'The page footer'
		})
})


server.get('/about', (req, res) => {
	res.render('about', {
		title:'About the App',
		name:'Try the app now.'
		})
})

server.get('/help', (req, res) => {
	res.render('help', {
		title:'Get Help Here',
		name:'FAQ'
		})
})

server.get('/weather-forecast', (req, res) => {
	res.render('weather-forecast', {
		title:'Check the Weather',
		name:'The footer section'
		})
})

//query string from the browser to get the search input

/server.get('/weather', (req, res) => {
	if (!req.query.place) {
		return res.send({
			error: 'A place term is required'
		})
	} 

	utils.geoFind(req.query.place, (error, {latitude, longtitude, place} = {}) => {
		if (error) {
			return res.send({error})
		}

		//return res.send({
		//	latitude: data.latitude,
		//	longtitude: data.longtitude
		//})

		utils.forecast(latitude, longtitude, (error, forecastData) => {
			if (error) {
				res.send({error})
			}
			return res.send({
				forecast: forecastData
			})
			//res.send('Location', data.place)
			//res.send('Forecast data', forecastData)
		})
	})
})




//res.send({
//	place: req.query.place
//})


// * is the wildcard for else

server.get('/help/*', (req, res) => {
	res.render('error', {
		title:'404',
		error:'Help article not found',
		name:'the footer for help page'
		})
})



// * is the wildcard for else

server.get('*', (req, res) => {
	res.render('error', {
		title: '404',
		error:'Page not found',
		name:'the footer'
		})
})


//index page with HTML

//server.get('', (req, res) => {
//	res.send('<h1>Hello This is the index page</h1>')
//})

//contacts page returning an object

//server.get('/contacts', (req, res) => {
//	res.send({
//		address:'Italy',
//		phone:'+39'
//	})
//})

//about page returning a JSON array

//server.get('/about', (req, res) => {
//	res.send([{
//	name:'Website'},{
//	text:'Enter the text here'}])
//})

//weather page

//server.get('/weather', (req, res) => {
//	res.send('Check the weather')
//})


//start the server

//server.listen(3000, () => {
//	console.log('Server is running on port 3000')
//})

//start the server with heroku if not on heroku locally on port 3000

server.listen(port, () => {
	console.log('Server is running on port ' + port)
})
