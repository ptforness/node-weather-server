const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

// Changes default path for static files
const publicDirectory = path.join(__dirname, '../public')

// Changes default path for views
const viewsPath = path.join(__dirname, '../templates/views')
app.set('views', viewsPath)

// Sets path for partials
const partialsPath = path.join(__dirname, '../templates/partials')
hbs.registerPartials(partialsPath)

// Sets view engine and public directory for static files
app.set('view engine', 'hbs')
app.use(express.static(publicDirectory))

// Since express matches index.html to root, this is never served:
app.get('/', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Paul'
    })
})

app.get('/help', (req, res) => {
    //res.send('Help page')
    res.render('help', {
        title: 'Help',
        name: 'Paul',
        helpMessage: 'A useful message.'
    })
})

app.get('/about', (req, res) => {
    //res.send('About page')
    res.render('about', {
        title: 'About',
        name: 'Paul'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: "You must provide an address"
        })
    }
    
    address = req.query.address
    geocode(address, (error, { latitude, longitude, location } = {}) => {
        if (error) return res.send({error: error})

        let coords = `${latitude}%2C${longitude}`
        forecast(coords, (error, forecastData) => {
            if (error) return res.send({error: error})
            
            res.send({
                location: location,
                data: forecastData
            })
        })
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404 - Help article not found',
        name: 'Paul'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Paul'
    })
})

app.listen(port, () => {
    console.log(`App is listening on port ${port}`)
})