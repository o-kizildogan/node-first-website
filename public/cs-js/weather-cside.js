//select the html form, e is for event

const formWeather = document.getElementById('weather-form')

const locationValue = document.getElementById('city')

const page = '/weather?place='||'http://localhost:3000/weather?place='

const outputMessage = document.getElementById('output-message')

const errorMessage = document.getElementById('error-message')


formWeather.addEventListener('submit',(e) => {
	e.preventDefault()

	const location = locationValue.value

	outputMessage.textContent = 'Loading...'

	errorMessage.textContent = ''

	fetch(page + location).then((response) => {
		response.json().then((data) => {
			if (data.error){
				errorMessage.textContent = data.error
			} else {
				const forecastData = data.forecast
				outputMessage.textContent = forecastData.place
				console.log(data)
				errorMessage.textContent = "Temperature is "+ forecastData.temperature + " degrees celcius"
			}
		})
	})
})