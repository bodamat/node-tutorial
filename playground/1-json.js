const fs = require('fs')

const dataBuffer = fs.readFileSync('1-json.json')
const data = JSON.parse(dataBuffer.toString())
data.title = "Hello world!"
data.author = "JS"

const json = JSON.stringify(data)
fs.writeFileSync('1-json.json', json)
