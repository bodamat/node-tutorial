const http = require("http");

const url = 'http://api.weatherstack.com/current?access_key=cb8c7a553220674fff68f8c8db1931eb&query=40,-75'

const request = http.request(url, (response) => {

    let data = ''

    response.on('data', (chunk) => {
        data += chunk.toString()
    })

    response.on('end', () => {
        const body = JSON.parse(data)
        console.log(body)
    })

})

request.on('error', (error) => {
    console.error('An error', error)
})

request.end()
