const request = require('postman-request')

module.exports = function forecast(latitude, longitude, callback) {
    const url = 'http://api.weatherstack.com/current?access_key=cb8c7a553220674fff68f8c8db1931eb&query=' + latitude + ',' + longitude

    request(url, { json: true }, (error, { body } = {}) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, {
                temperature: body.current.temperature,
                feelslike: body.current.feelslike,
                weather_descriptions: body.current.weather_descriptions[0]
            })
        }
    })
}
