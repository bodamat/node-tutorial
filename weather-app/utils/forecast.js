const request = require('postman-request')

module.exports = function forecast(latitude, longitude, callback) {
    const url = 'http://api.weatherstack.com/current?access_key=cb8c7a553220674fff68f8c8db1931eb&query=' + latitude + ',' + longitude

    request(url, { json: true }, (error, response) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (response.body.error) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, {
                temperature: response.body.current.temperature,
                feelslike: response.body.current.feelslike,
                weather_descriptions: response.body.current.weather_descriptions[0]
            })
        }
    })
}
