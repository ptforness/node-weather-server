const request = require('request')

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const geocode = (address, callback) => {
    if (!process.env.mapBoxApiKey) {
        return callback('Location Service API key not configured', undefined)
    }

    const baseUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places`
    let url = new URL(`${baseUrl}/${address}.json`)
    url.searchParams.set('access_token', process.env.mapBoxApiKey)
    url.searchParams.set('limit', 1)
    request({ url, json: true }, (err, { body } = {}) => {
        if (err) {
            callback('Unable to connect to location services.', undefined)
        } else if (body.message) {
            callback('Invalid query', undefined)
        } else if (body.features.length === 0) {
            callback('No results found.', undefined)
        } else {
            callback(undefined, {
                location: body.features[0].place_name,
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0]
            })
        }
    })
}

module.exports = geocode