const geocode = require("./utils/geocode");
const forecast = require('./utils/forecast')

const location = process.argv[2];

if (!location) return console.log('Please enter location');

geocode(location, (error, { latitude, longitude, location } = {}) => {
    if (error) {
        return console.error(error)
    }

    forecast(latitude, longitude, (error, forecastData) => {
        if (error) {
            return console.error(error)
        }

        console.log(location)
        console.log(`${forecastData.weather_descriptions}. It is currently ${forecastData.temperature} degrees out. It feels like ${forecastData.feelslike} degrees out`)
    })
})

