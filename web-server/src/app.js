const path = require('path')
const express = require('express')
const hbs = require('hbs')

const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express()
const port = process.env.PORT || 3000

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
    if (!req.query.address) {
        return res.send({
            error: "You must provide an address"
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error });
        }

        forecast(latitude, longitude, (error, data) => {
            if (error) {
                return res.send({ error });
            }

            res.send({
                forecast: data.message,
                location,
                address: req.query.address
            })
        })
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

app.listen(port, () => {
    console.log('Server is up on port ' + port);
})
