const request = require('request')
const getWeatherIcon = require('./getWeatherIcon')

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const getForecastByCoords = (location, callback) => {
    if (!process.env.darkSkyApiKey) {
        return callback('Weather Service API key not configured', undefined)
    }

    const baseUrl = `https://api.darksky.net/forecast`
    const url = new URL(`${baseUrl}/${process.env.darkSkyApiKey}/${location}`)
    request({ url, json: true }, (err, { body }) => {
        if (err) {
            callback('Unable to connect to weather services.', undefined)
        } else if (body.error) {
            callback('Invalid coordinates', undefined)
        } else {
            callback(undefined, {
                summary: body.daily.data[0].summary,
                currentTemp: body.currently.temperature,
                chanceOfRain: body.currently.precipProbability,
                icon: getWeatherIcon(body.currently.icon),
                timezone: body.timezone
            })
        }
    })
}

module.exports = getForecastByCoords