const path = require('path')
const express = require('express')

const app = express()

// Define paths for Express config
const publicDirPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates')

app.set('view engine', 'hbs');
app.set('views', viewsPath);
app.use(express.static(publicDirPath));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Bohdan Matviiv'
    });
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Bohdan Matviiv'
    });
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        message: 'Message that should help you.',
        name: 'Bohdan Matviiv'
    })
})

app.get('/weather', (req, res) => {
    res.send({
        forecast: 'It is snowing',
        location: 'Philadelphia'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000')
})
