const request = require('request')


const geoFind = (place, callback) => {
	const geoURL = 'http://api.mapbox.com/geocoding/v5/mapbox.places/'+place+'.json?access_token=pk.eyJ1Ijoib2N1bWN1c2giLCJhIjoiY2t6eWo1ZXJ4MDB0dTNpcGIxOWZlN24zZSJ9.hOw1tyA8X4qzr16imyXVTg&limit=1'
	request({ url: geoURL, json: true},(error,response) => {

		if (error){
			callback("Unable to get response from the server", undefined)
		} else if  (response.body.features == false){
			callback('Unable to find location inserted location', undefined)
		} else if (response.body.error) {
			callback('Unable to find location', undefined)
		} else {
			callback( undefined, {
				latitude : response.body.features[0].center[1],
				//const longtitude = response.body.features.center
				//console.log('latitude:'+latitude,'longtitude:'+longtitude)
				longtitude : response.body.features[0].center[0],
				place: place
			})
		}
	})
}

//geoFind('Ankara', (error,data) => {
//	console.log('Error', error)
//	console.log('Data', data)
//})


//geoFind('Florence', (error,data) => {
//	const url = 'http://api.weatherstack.com/current?access_key=39b770237161a15b437abfae51736996&query='+data.latitude+','+data.longtitude
//	request({ url: url, json: true},(error,response) => {
//		console.log('Currently the temperature in '+data.place+' is '+response.body.current.temperature,'degrees Celcius.','Humidity is '+response.body.current.humidity+'%')
//	})
//	console.log('Error', error)
//	console.log('Data', data)
//})

const forecast = (latitude, longtitude, callback ) => {
	const url = 'http://api.weatherstack.com/current?access_key=39b770237161a15b437abfae51736996&query='+latitude+','+longtitude
	request({ url: url, json: true}, (error, response) => {
		if (error){
			callback('Could not connect to server', undefined)
		} else if (response.body.error){
			callback('Unable to find the inserted coordinates', undefined)
		} else {
			//callback(undefined, 'Currently the temperature in '+ response.body.location.name +' is ' + response.body.current.temperature + ' degrees Celcius.' + ' Humidity is '+response.body.current.humidity+'%')
			callback( undefined, {
				temperature: response.body.current.temperature,
				place: response.body.location.name,
				humidity: response.body.current.humidity,
				latitude: latitude,
				longtitude: longtitude
			})
		}
	})
}

//forecast(43, 11, (error, data) => {
//	console.log('Error', error)
//	console.log('Data', data)
//})


module.exports = {
	geoFind: geoFind,
	forecast: forecast
}

