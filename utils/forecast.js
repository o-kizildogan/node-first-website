const request = require('request')

const forecast = (latitude, longtitude, callback ) => {
	const url = 'http://api.weatherstack.com/current?access_key=39b770237161a15b437abfae51736996&query='+latitude+','+longtitude
	request({ url: url, json: true}, (error,response) => {
		if (error){
			callback('Could not connect to server', undefined)
		} else if (response.body.error){
			callback('Unable to find the inserted coordinates', undefined)
		} else {
			callback( undefined, 'Currently the temperature in '+ response.body.location.name +' is ' + response.body.current.temperature,'degrees Celcius.','Humidity is '+response.body.current.humidity+'%')
			//callback( undefined, {
			//	temperature: response.body.current.temperature,
			//	place: response.body.location.name,
			//	humidity: response.body.current.humidity
			//})
		}
	})
}

module.exports = forecast