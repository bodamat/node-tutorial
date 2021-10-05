const path = require('path')
const express = require('express')
const hbs = require('hbs')

const app = express()

// Define paths for Express config
const publicDirPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
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

app.get('/help/*', (req, res) => {
   res.render('error', {
       title: "404",
       message: "Help article not found",
       name: "Bohdan Matviiv"
   })
})

app.get('*', (req, res) => {
    res.render('error', {
        title: "404",
        message: "Page not found",
        name: "Bohdan Matviiv"
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000')
})
