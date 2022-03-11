const forecast = require('./forecast.js')

const utils = require('./utils-weather.js')

const place = process.argv[2]


utils.geoFind(place, (error, data) => {
	if (error) {
		return console.log('Error', error)
	}
	//console.log('data', data)
	utils.forecast(data.latitude, data.longtitude, (error, forecastData) => {
		if (error) {
			console.log('Forecast error:', error)
		}
		console.log('Location', data.place)
		console.log('Forecast data', forecastData)
	})
})


//utils.geoFind( 'Istanbul', (error, data) => {
//	console.log('Error', error)
//	console.log('data', data)
//})

//utils.forecast(50, 15, (error, data) => {
//	console.log('Error', error)
//	console.log('Data:', data)
//})